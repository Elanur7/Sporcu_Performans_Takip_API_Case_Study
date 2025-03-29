const User = require("../models/User");

const updateUserByAdmin = async (adminId, userId, role) => {
  try {
    // Admin'in doğruluğunu kontrol et
    const adminUser = await User.findByPk(adminId);
    if (!adminUser || adminUser.role !== "admin") {
      throw new Error("Yetersiz izinler: Admin değil.");
    }

    // Güncellenmesi gereken kullanıcıyı bul
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      throw new Error("Kullanıcı bulunamadı");
    }

    // Eğer rol bilgisi varsa, rolü güncelle
    if (role) {
      userToUpdate.role = role; 
    }

    // Kullanıcıyı kaydet
    await userToUpdate.save();

    return { message: "Kullanıcı başarıyla güncellendi." };
  } catch (error) {
    throw new Error(`Kullanıcı güncellenirken hata oluştu: ${error.message}`);
  }
};

module.exports = {
  updateUserByAdmin,
};
