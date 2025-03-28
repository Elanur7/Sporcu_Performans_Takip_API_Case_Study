const express = require('express');
require('dotenv').config();
const sequelize = require('./config/database');

const app = express();
const PORT = 3000;

app.use(express.json());

// Veritabanı bağlantısını test et
sequelize
  .authenticate()
  .then(() => {
    console.log('MySQL bağlantısı başarılı!');
    
    // Tabloları senkronize et
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    // Sunucuyu başlat
    app.listen(PORT, () => {
      console.log(`Sunucu ${PORT} portunda çalışıyor...`);
    });
  })
  .catch((err) => {
    console.error('Veritabanı bağlantı hatası:', err);
  });

