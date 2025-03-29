const winston = require('winston');

// Logger konfigürasyonu
const logger = winston.createLogger({
  level: 'info', // Varsayılan log seviyesi
  format: winston.format.combine(
    winston.format.colorize(), // Renkli çıktı
    winston.format.timestamp(), // Zaman damgası ekle
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    // Konsola log yazdırma
    new winston.transports.Console(),
    // Log dosyasına yazma
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

module.exports = logger;
