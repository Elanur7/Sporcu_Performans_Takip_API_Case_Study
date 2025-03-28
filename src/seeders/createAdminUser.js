const bcrypt = require('bcrypt');
const User = require('../models/User');  

module.exports = {
  up: async () => {
    try {
      // Şifreyi hash'lemek
      const hashedPassword = await bcrypt.hash('admin_password', 10); // 'admin_password' yerine istediğiniz şifreyi koyabilirsiniz

      // Admin kullanıcısını oluşturma
      await User.create({
        name: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin', // Admin rolü
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log('Admin kullanıcısı başarıyla oluşturuldu!');
    } catch (error) {
      console.error('Admin kullanıcısı oluşturulurken hata oluştu:', error);
    }
  },

  down: async () => {
    try {
      // Geri alma işlemi: admin kullanıcısını sil
      await User.destroy({
        where: { role: 'admin' },
      });

      console.log('Admin kullanıcısı başarıyla silindi!');
    } catch (error) {
      console.error('Admin kullanıcısı silinirken hata oluştu:', error);
    }
  }
};
