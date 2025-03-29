const jwt = require("jsonwebtoken");
const logger = require('../utils/logger');

// JWT doğrulama middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Token kontrolü
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Yetkilendirme reddedildi. Token eksik veya yanlış formatta." });
  }

  // "Bearer" kısmını çıkarıp token'ı al
  const token = authHeader.split(" ")[1];

  try {
    // Token doğrulama
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Kullanıcı bilgilerini req.user'a ekle
    next();
  } catch (err) {
    logger.error(`Hata oluştu: ${err.message}`);
    return res.status(401).json({ message: "Geçersiz token." });
  }
};

module.exports = verifyToken;
