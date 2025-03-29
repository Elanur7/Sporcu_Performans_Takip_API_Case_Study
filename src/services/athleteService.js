const AthletePrograms  = require('../models/AthleteProgram');
const  TrainingProgram  = require('../models/TrainingProgram');
const   Workout  = require('../models/Workout');

const getStatsByAthleteId = async (athleteId) => {
  try {
    const athletePrograms = await AthletePrograms.findAll({
      where: { athlete_id: athleteId },
    });
  
    const programsWithDetails = [];
    for (const program of athletePrograms) {
      // Her bir AthleteProgram için ilgili TrainingProgram'ı alın
      const trainingProgram = await TrainingProgram.findOne({
        where: { id: program.program_id },
      });
  
      // Eğer trainingProgram bulunamazsa, işlemi atla
      if (!trainingProgram) {
        continue; 
      }
  
      // Her bir TrainingProgram için ilgili Workout'ları alın
      const workouts = await Workout.findAll({
        where: { program_id: trainingProgram.id },
      });
  
      programsWithDetails.push({
        athleteProgram: program,
        trainingProgram: trainingProgram,
        workouts: workouts,
      });
    }
  
    let totalDuration = 0;
    let totalCalories = 0;
    let progress = 0; 
  
    // Her bir programın antrenmanlarını topluyoruz
    programsWithDetails.forEach((programWithDetail) => {
      programWithDetail.workouts.forEach((workout) => {
        totalDuration += workout.duration;
        totalCalories += workout.calories_burned;
      });
    });
  
    // Gelişim Trendini Hesaplama 
    progress = totalCalories > 0 ? (totalDuration / totalCalories) * 100 : 0;
  
    return {
      totalDuration,    // Toplam antrenman süresi (dakika)
      totalCalories,    // Toplam yakılan kalori
      progress,         // Gelişim (İlerleme) yüzdesi
    };
  } catch (error) {
    throw new Error('Sporcu istatistikleri alınırken hata oluştu: ' + error.message);
  }
};

const getAthleteProgress = async (athleteId) => {
  try {
    const athlete = await AthletePrograms.findOne({ where: { athlete_id: athleteId } });

    if (!athlete) {
      return { message: 'Sporcu bulunamadı.', progress: null };
    }

    //Sporcunun tamamladığı programları bul 
    const completedPrograms = await AthletePrograms.findAll({
      where: { athlete_id: athleteId, status: 'completed' },
    });

    if (completedPrograms.length === 0) {
      return { message: 'Sporcu henüz herhangi bir programı tamamlamadı.', progress: 0 };
    }

    const totalPrograms = await AthletePrograms.findAll({
      where: { athlete_id: athleteId },
    });

    const progress = (completedPrograms.length / totalPrograms.length) * 100;

    return {
      message: `Sporcunun gelişimi: %${progress.toFixed(2)}`,
      progress: progress.toFixed(2),
      completedPrograms: completedPrograms.length,
      totalPrograms: totalPrograms.length,
    };

  } catch (error) {
    throw new Error('Sporcu istatistikleri alınırken hata oluştu: ' + error.message);
  }
};

const getTeamStats = async (coachId) => {
  try {
    // Antrenörün oluşturduğu tüm antrenman programları
    const trainingPrograms = await TrainingProgram.findAll({ where: { coach_id: coachId } });

    if (trainingPrograms.length === 0) {
      return { message: 'Antrenörün yönettiği herhangi bir program bulunamadı.' };
    }

    let totalCalories = 0;
    let totalDuration = 0;
    let completedPrograms = 0;
    let totalPrograms = 0;

    for (const program of trainingPrograms) {
      // Programa kayıtlı tüm sporcular
      const athletePrograms = await AthletePrograms.findAll({ where: { program_id: program.id } });

      for (const athleteProgram of athletePrograms) {
        totalPrograms++;

        if (athleteProgram.status === 'completed') {
          completedPrograms++;
        }

        // Programa ait tüm antrenmanlar
        const workouts = await Workout.findAll({ where: { program_id: program.id } });

        workouts.forEach((workout) => {
          totalCalories += workout.calories_burned;
          totalDuration += workout.duration;
        });
      }
    }

    // Ortalama ilerleme yüzdesi 
    const progressPercentage = totalPrograms > 0 ? (completedPrograms / totalPrograms) * 100 : 0;

    return {
      totalCalories,
      totalDuration,
      averageProgress: progressPercentage.toFixed(2) + '%'
    };

  } catch (error) {
    throw new Error('Genel takım istatistikleri alınırken hata oluştu: ' + error.message);
  }
};

module.exports = {
  getStatsByAthleteId,
  getAthleteProgress,
  getTeamStats,
};
