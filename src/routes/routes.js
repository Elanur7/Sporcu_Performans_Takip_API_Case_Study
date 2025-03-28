const express = require('express');
const RegisterController = require('../controllers/auth/registerControllers');
const LoginController  = require('../controllers/auth/loginControllers');
const ProgramController = require('../controllers/programControllers'); 
const FeedBackController = require('../controllers/feedbackControllers');
const AthleteController = require('../controllers/athleteControllers');
const verifyToken = require('../middleware/authMiddleware'); 
const router = express.Router();

router.post('/auth/register', RegisterController.register);
router.post('/auth/login', LoginController.login);

router.get('/programs', verifyToken, ProgramController.getAllPrograms);
router.post('/programs', verifyToken, ProgramController.createTrainingProgram);
router.get('/programs/:programId',verifyToken, ProgramController.getProgramById);
router.put('/programs/:programId', verifyToken, ProgramController.updateProgram);
router.delete('/programs/:programId', verifyToken, ProgramController.deleteProgram);
router.post('/programs/assignProgram', verifyToken, ProgramController.assignProgram);
router.put('/program/completed',verifyToken, ProgramController.markProgramAsCompleted);

router.post('/feedbacks',verifyToken, FeedBackController.createFeedback);
router.get('/feedbacks',verifyToken, FeedBackController.getAllFeedbacks);
router.post('/feedbacks/response', verifyToken, FeedBackController.addFeedbackResponse);

router.get('/athletes/:id/stats', verifyToken, AthleteController.getAthleteStats);
router.get('/athletes/:id/progress', verifyToken, AthleteController.getAthleteProgress);
router.get('/athletes/team/stats', verifyToken, AthleteController.getTeamStatsController);

module.exports = router;
