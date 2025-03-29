const athleteStatsService = require('../services/athleteService');
const logger = require('./logger');

const getAthleteStats = async (req, res) => {
  const athleteId = req.params.id;

  if (req.user.role !== 'coach') {
    return res.status(403).json({ error: 'Erişim yetkiniz yok.' }); 
  }

  try {
    const stats = await athleteStatsService.getStatsByAthleteId(athleteId);
    return res.status(200).json(stats);
  } catch (error) {
    logger.error(`Hata oluştu: ${error.message}`);
    return res.status(500).json({
      message: 'Bir hata oluştu.',
      error: error.message,
    });
  }
};

const getAthleteProgress = async (req, res) => {
  const athleteId = req.params.id;

  if (req.user.role !== 'coach') {
    return res.status(403).json({ error: 'Erişim yetkiniz yok.' }); 
  }

  try {
    const result = await athleteStatsService.getAthleteProgress(athleteId);

    if (result.progress === null) {
      return res.status(404).json({ message: result.message });
    }

    return res.status(200).json(result);

  } catch (error) {
    logger.error(`Hata oluştu: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};

const getTeamStatsController = async (req, res) => {
  try {
    const coachId = req.user.id; 

    if (req.user.role !== 'coach') {
      return res.status(403).json({ error: 'Erişim yetkiniz yok.' }); 
    }

    const stats = await athleteStatsService.getTeamStats(coachId);

    res.status(200).json(stats);
  } catch (error) {
    logger.error(`Hata oluştu: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAthleteStats,getAthleteProgress,getTeamStatsController };