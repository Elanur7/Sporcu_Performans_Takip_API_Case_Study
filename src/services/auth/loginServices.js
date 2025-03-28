require("dotenv").config(); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User'); 

const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Kullanıcı bulunamadı!');
    }

    // Şifreyi bcrypt ile doğrulayın
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Geçersiz şifre!');
    }

    // JWT token oluşturun
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    return token; 
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { loginService };
