const { loginService } = require('../../services/auth/loginServices'); 

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Login işlemi için service fonksiyonunu çağır
    const token = await loginService(email, password);

    res.status(200).json({
      message: 'Giriş başarılı!',
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { login };
