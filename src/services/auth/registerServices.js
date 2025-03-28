require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

class RegisterService {
  static async register(name, email, password, role) {
    // Kullanıcı zaten var mı diye kontrol et
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Bu email adresi zaten kayıtlı!');
    }

    // Şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Yeni kullanıcı oluştur
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // JWT token oluştur
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { user: newUser, token };
  }
}

module.exports = RegisterService;
