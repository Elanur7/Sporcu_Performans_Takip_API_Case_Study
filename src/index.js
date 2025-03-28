const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const routes = require('./routes/routes');

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(bodyParser.json());
app.use('/api', routes);

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

