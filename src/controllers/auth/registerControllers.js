const registerService = require('../../services/auth/registerServices');

class RegisterController {
  static async register(req, res) {
    const { name, email, password, role } = req.body;

    try {
      // Kayıt işlemini service katmanına yönlendiriyoruz
      const newUser = await registerService.register(name, email, password, role);

      // Başarılı işlem sonrası kullanıcı ve token bilgilerini döndür
      res.status(201).json({
        message: "Kullanıcı başarıyla oluşturuldu!",
        user: newUser.user,
        token: newUser.token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = RegisterController;
