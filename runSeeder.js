const sequelize = require('./src/config/database'); 
const createAdminUserSeeder = require('./src/seeders/createAdminUser'); 

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
