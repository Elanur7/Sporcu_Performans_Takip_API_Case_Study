const sequelize = require('./config/database'); 
const createAdminUserSeeder = require('./seeders/createAdminUser'); 

(async () => {
  try {
    // Veritabanı bağlantısını doğrula
    await sequelize.authenticate();
    console.log('Veritabanı bağlantısı başarılı!');

    // Admin kullanıcısını oluştur
    await createAdminUserSeeder.up();

    console.log('Seeder başarıyla çalıştırıldı!');
  } catch (error) {
    console.error('Seeder çalıştırılırken hata oluştu:', error);
  } finally {
    // Veritabanı bağlantısını kapat
    await sequelize.close();
  }
})();
