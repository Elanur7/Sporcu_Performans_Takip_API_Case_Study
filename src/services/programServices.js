const  AthleteProgram = require('../models/AthleteProgram');
const  TrainingProgram  = require('../models/TrainingProgram');
const  User  = require('../models/User');
const Workout = require('../models/Workout');
const { Op } = require('sequelize')

// Antrenörlere ait tüm programları çekme fonksiyonu
const getAllProgramsForCoach = async (userId) => {
  // Kullanıcının antrenör olup olmadığını kontrol et
  const user = await User.findByPk(userId);
  if (!user || user.role !== 'coach') {
    throw new Error('Sadece antrenörler tüm programları görebilir.');
  }

  const programs = await TrainingProgram.findAll({
    where: {
      coach_id: userId,  
    },
    attributes: ['id', 'title', 'description', 'start_date', 'end_date'], 
  });

  return programs;
};

const getProgramById = async (programId, userId) => {
  // Kullanıcının antrenör mü yoksa sporcu mu olduğunu kontrol et
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('Kullanıcı bulunamadı.');
  }

  let program;

  if (user.role === "coach") {
    // Antrenör herhangi bir programı getirebilir
    program = await TrainingProgram.findOne({
      where: {
        id: programId,
      },
      attributes: ['id', 'title', 'description', 'start_date', 'end_date'],
    });

  } else if (user.role === "athlete") {
    program = await AthleteProgram.findOne({
      where: {
        program_id: programId,
        athlete_id: userId,
      }
    });

    if (program) {
      const trainingProgram = await TrainingProgram.findOne({
        where: { id: program.program_id },
        attributes: ['id', 'title', 'description', 'start_date', 'end_date']
      });

      program = { ...program.toJSON(), trainingProgram };
    }
    
  } else {
    throw new Error('Geçersiz kullanıcı rolü.');
  }

  if (!program) {
    throw new Error('Program bulunamadı.');
  }

  return program;
};

const createTrainingProgram = async (data) => {
  const { coach_id, title, description, start_date, end_date, workouts } = data;

  // Daha önce eklenmiş egzersiz kontrolü
  if (workouts && workouts.length > 0) {
    const existingWorkouts = [];

    for (const workout of workouts) {
      const { name, duration, calories_burned } = workout;

      // Egzersizin zaten mevcut olduğu bir programda olup olmadığını kontrol et
      const workoutExists = await Workout.findOne({
        where: {
          name: name.trim(),
          program_id: {
            [Op.ne]: null, 
          },
        },
      });

      if (!workoutExists) {
        existingWorkouts.push({
          name,
          duration,
          calories_burned,
        });
      } else {
        console.log(`Egzersiz "${name}" zaten başka bir programda mevcut.`);
      }
    }

    if (existingWorkouts.length > 0) {
      const newProgram = await TrainingProgram.create({
        coach_id,
        title,
        description,
        start_date,
        end_date,
      });

      await Workout.bulkCreate(
        existingWorkouts.map(workout => ({
          program_id: newProgram.id,
          name: workout.name,
          duration: workout.duration,
          calories_burned: workout.calories_burned,
        }))
      );

      return newProgram;
    } else {
      throw new Error('Tüm egzersizler zaten mevcut' );
    }
  } else {
    throw new Error('Egzersiz bulunamadı' );
  }
};

const assignProgramToAthlete = async (coachId, athleteId, programId) => {
  // Antrenörün rolünü kontrol et
  const coach = await User.findByPk(coachId);
  if (!coach || coach.role !== 'coach') {
    throw new Error('Sadece antrenörler program atayabilir.');
  }

  // Programın var olup olmadığını kontrol et
  const program = await TrainingProgram.findByPk(programId);
  if (!program) {
    throw new Error('Program bulunamadı.');
  }

  // Sporcu var mı kontrol et
  const athlete = await User.findByPk(athleteId);
  if (!athlete || athlete.role !== 'athlete') {
    throw new Error('Sporcu bulunamadı.');
  }

  // Programı sporcuya ata
  try {
    const newAssignment = await AthleteProgram.create({
      athlete_id: athleteId,
      program_id: programId,
      status: 'active',
    });
    return newAssignment;
  } catch (error) {
    throw new Error('Program atama işlemi sırasında bir hata oluştu.');
  }
};

const markProgramAsCompleted = async (athleteId, programId) => {
  try {
    // Sporcu ve program ilişkisini bulalım
    const athleteProgram = await AthleteProgram.findOne({
      where: {
        athlete_id: athleteId,
        program_id: programId,
      }
    });

    if (!athleteProgram) {
      throw new Error('Sporcu ve program ilişkisi bulunamadı.');
    }

    if (athleteProgram.status === "completed") {
      throw new Error("Bu program zaten tamamlanmış.");
    }

    // Programın durumunu 'completed' olarak güncelle
    athleteProgram.status = 'completed';
    await athleteProgram.save();

    // Programdaki tüm egzersizleri 'completed' olarak işaretleyelim
    const workouts = await Workout.findAll({
      where: {
        program_id: programId
      }
    });

    if (workouts.length > 0) {
      await Promise.all(workouts.map(async (workout) => {
        workout.completed = true;
        await workout.save();
      }));
    }

    return { success: 'Program ve egzersizler başarıyla tamamlandı.' };
  } catch (error) {
    throw new Error(`Bir hata oluştu: ${error.message}`);
  }
};

const updateProgram = async (programId, updateData) => {
  try {
    const program = await TrainingProgram.findByPk(programId);

    if (!program) {
      throw new Error('Program bulunamadı.');
    }

    await program.update(updateData);

    return program; 
  } catch (error) {
    throw new Error('Program güncellenirken bir hata oluştu: ' + error.message);
  }
};

const deleteProgram = async (programId) => {
  try {
    const program = await TrainingProgram.findByPk(programId);

    if (!program) {
      throw new Error('Program bulunamadı.');
    }

    await Workout.destroy({ where: { program_id: programId } });

    await TrainingProgram.destroy({ where: { id: programId } });

    return program;
  } catch (error) {
    throw new Error('Program silinirken bir hata oluştu: ' + error.message);
  }
};

module.exports = {
  getAllProgramsForCoach,
  getProgramById,
  createTrainingProgram,
  assignProgramToAthlete,
  markProgramAsCompleted,
  updateProgram,
  deleteProgram
};
