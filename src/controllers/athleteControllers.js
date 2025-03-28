const athleteStatsService = require('../services/athleteService');

const getAthleteStats = async (req, res) => {
  const athleteId = req.params.id;

  try {
    const stats = await athleteStatsService.getStatsByAthleteId(athleteId);
    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).json({
      message: 'Bir hata oluştu.',
      error: error.message,
    });
  }
};

const getAthleteProgress = async (req, res) => {
  const athleteId = req.params.id;

  try {
    const result = await athleteStatsService.getAthleteProgress(athleteId);

    if (result.progress === null) {
      return res.status(404).json({ message: result.message });
    }

    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTeamStatsController = async (req, res) => {
  try {
    const coachId = req.user.id; 
    const stats = await athleteStatsService.getTeamStats(coachId);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAthleteStats,getAthleteProgress,getTeamStatsController };