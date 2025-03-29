const User = require('../models/User');
const ProgramService = require('../services/programServices'); 
const logger = require('../utils/logger');

// Tüm programları listele (Sadece antrenör)
const getAllPrograms = async (req, res) => {
  try {
    const programs = await ProgramService.getAllProgramsForCoach(req.user.id); 
    
    return res.status(200).json({
      data: programs,
    });
  } catch (error) {
    logger.error(`Hata oluştu: ${error.message}`);
    return res.status(403).json({ message: error.message });
  }
};

const getProgramById = async (req, res) => {
  const { programId } = req.params;
  const userId = req.user.id; 

  try {
    const program = await ProgramService.getProgramById(programId, userId);
    res.json(program);  
  } catch (error) {
    logger.error(`Hata oluştu: ${error.message}`);
    res.status(400).json({ message: error.message });  
  }
};

const createTrainingProgram = async (req, res) => {
  try {
    if (req.user.role !== "coach") {
      return res.status(403).json({ error: "Bu işlemi gerçekleştirme yetkiniz yok." });
    }
    
    const coach_id = req.user.id; 
    const trainingProgramData = { ...req.body, coach_id }; 

    const createdProgram = await ProgramService.createTrainingProgram(trainingProgramData);
    res.status(201).json(createdProgram);
  } catch (error) {
    logger.error(`Hata oluştu: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const assignProgram = async (req, res) => {
  const { athleteId, programId } = req.body;
  const coachId = req.user.id; 

  try {
    const newAssignment = await ProgramService.assignProgramToAthlete(coachId, athleteId, programId);
    return res.status(201).json({
      message: 'Program başarıyla sporcuya atandı.',
      data: newAssignment,
    });
  } catch (error) {
    logger.error(`Hata oluştu: ${error.message}`);
    return res.status(500).json({
      message: error.message || 'Bir hata oluştu.',
    });
  }
};

// Sporcu Program Durumunu Güncelle
const markProgramAsCompleted = async (req, res) => {
  const { programId } = req.body;  

  try {
    if (req.user.role !== "athlete") {
      return res.status(403).json({ error: "Bu işlemi sadece sporcular gerçekleştirebilir." });
    }

    const result = await ProgramService.markProgramAsCompleted(req.user.id, programId);
    res.status(200).json(result); 
  } catch (error) {
    logger.error(`Hata oluştu: ${error.message}`);
    res.status(400).json({ error: error.message });  
  }
};

const updateProgram = async (req, res) => {
  const { programId } = req.params;
  const { title, description, start_date, end_date } = req.body;
  const userId = req.user.id;  

  try {
    // Kullanıcının antrenör olup olmadığını kontrol et
    const user = await User.findByPk(userId);
    if (!user || user.role !== 'coach') {
      return res.status(403).json({ message: 'Sadece antrenörler programları güncelleyebilir.' });
    }

    const updatedProgram = await ProgramService.updateProgram(programId, {
      title,
      description,
      start_date,
      end_date,
    });

    if (!updatedProgram) {
      return res.status(404).json({ message: 'Program bulunamadı.' });
    }

    res.json(updatedProgram); 
  } catch (error) {
    logger.error(`Hata oluştu: ${error.message}`);
    res.status(500).json({ message: 'Bir hata oluştu.', error: error.message });
  }
};

const deleteProgram = async (req, res) => {
  const { programId } = req.params;
  const userId = req.user.id; 

  try {
    const user = await User.findByPk(userId);
    if (!user || user.role !== 'coach') {
      return res.status(403).json({ message: 'Sadece antrenörler programları silebilir.' });
    }

    const deletedProgram = await ProgramService.deleteProgram(programId);

    if (!deletedProgram) {
      return res.status(404).json({ message: 'Program bulunamadı.' });
    }

    res.status(200).json({ message: 'Program başarıyla silindi.' });
  } catch (error) {
    logger.error(`Hata oluştu: ${error.message}`);
    res.status(500).json({ message: 'Bir hata oluştu.', error: error.message });
  }
};

module.exports = {
  getAllPrograms,
  getProgramById,
  createTrainingProgram,
  assignProgram,
  markProgramAsCompleted,
  updateProgram,
  deleteProgram
};
