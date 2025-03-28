const feedbackService = require("../services/feedbackServices");

const getAllFeedbacks = async (req, res) => {
  // Kullanıcı rolünü kontrol et 
  if (req.user.role !== "coach") {
    return res
      .status(403)
      .json({ message: "Sadece antrenörler geri bildirimleri görebilir." });
  }

  try {
    // Antrenörün tüm geri bildirimlerini çek
    const feedbacks = await feedbackService.getAllFeedbacks();

    return res.status(200).json({
      message: "Tüm geri bildirimler başarıyla listelendi.",
      data: feedbacks,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Geri bildirimler listelenirken bir hata oluştu: " + error.message,
    });
  }
};

const createFeedback = async (req, res) => {
  const { programId, message } = req.body;
  const athleteId = req.user.id; 

  try {
    const newFeedback = await feedbackService.createFeedback(
      athleteId,
      programId,
      message
    );

    if (req.user.role !== "athlete") {
      return res
        .status(403)
        .json({ message: "Sadece sporcular geri bildirim bırakabilir." });
    }

    return res.status(201).json({
      message: "Geri bildirim başarıyla oluşturuldu.",
      data: newFeedback,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Antrenör geri bildirim yanıtı ekleme
const addFeedbackResponse = async (req, res) => {
  const { feedbackId, responseMessage } = req.body;

  try {
    // Servisi çağır ve geri bildirim yanıtını ekle
    const feedback = await feedbackService.addFeedbackResponse(
      feedbackId,
      responseMessage,
      req.user.role 
    );

    res.status(200).json({ message: 'Geri bildirim yanıtı başarıyla eklendi', feedback });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllFeedbacks,
  createFeedback,
  addFeedbackResponse
};
