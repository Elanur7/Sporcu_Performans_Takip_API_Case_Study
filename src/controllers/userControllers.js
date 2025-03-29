const userService = require('../services/userServices');
const logger = require('../utils/logger');

const updateUserByAdmin = async (req, res) => {
    const { userId } = req.params; 
    const adminId = req.user.id;

    if(req.body.name || req.body.password){
        return res.status(404).json({message:"Sadece rol bilgisi değiştirilebilir."});
    }

    if (String(adminId) === String(userId)) {
      return res.status(404).json({message:"Admin kendi rolünü güncelleyemez."});
    }
  
    try {
      // Servis fonksiyonunu çağır
      const result = await userService.updateUserByAdmin(adminId, userId, req.body.role);
  
      return res.status(200).json(result);
    } catch (error) {
      logger.error(`Hata oluştu: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    updateUserByAdmin,
};
