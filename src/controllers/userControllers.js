const userService = require('../services/userServices');

const updateUserByAdmin = async (req, res) => {
    const { userId } = req.params; 

    if(req.body.name || req.body.password){
        return res.status(404).json({message:"Sadece rol bilgisi değiştirilebilir."});
    }
  
    try {
      const adminId = req.user.id;

      // Servis fonksiyonunu çağır
      const result = await userService.updateUserByAdmin(adminId, userId, req.body.role);
  
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    updateUserByAdmin,
};
