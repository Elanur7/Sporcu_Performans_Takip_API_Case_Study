const Feedback = require("../models/Feedback");

const getAllFeedbacks = async () => {
  try {
    const feedbacks = await Feedback.findAll();

    return feedbacks;
  } catch (error) {
    throw new Error(
      "Geri bildirimler alınırken bir hata oluştu: " + error.message
    );
  }
};

const createFeedback = async (athleteId, programId, message) => {
  try {
    const feedback = await Feedback.create({
      athlete_id: athleteId,
      program_id: programId,
      message: message,
    });

    return feedback;
  } catch (error) {
    throw new Error(
      "Geri bildirim eklenirken bir hata oluştu: " + error.message
    );
  }
};

const addFeedbackResponse = async (feedbackId, responseMessage, userRole) => {
  // Geri bildirim var mı kontrol et
  const feedback = await Feedback.findOne({
    where: { id: feedbackId },
  });

  if (!feedback) {
    throw new Error('Geri bildirim bulunamadı');
  }

  // Antrenör olup olmadığını kontrol et
  if (userRole !== 'coach') {
    throw new Error('Bu işlem için yetkiniz yok');
  }

  feedback.response_message = responseMessage;
  feedback.response_date = new Date();
  
  await feedback.save();

  return feedback;
};

module.exports = {
  getAllFeedbacks,
  createFeedback,
  addFeedbackResponse
};
