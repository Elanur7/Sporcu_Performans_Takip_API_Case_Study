# Sporcu Performans Takip API Case Study

Bu proje, Node.js(Express.js) kullanılarak geliştirilmiş bir REST API sistemidir. API, sporcu performans takibi için JWT tabanlı kimlik doğrulama kullanmaktadır.

## Gereksinimler

Projenin çalışabilmesi için aşağıdaki yazılımlar gereklidir:
- Node.js(Express.js)
- MySQL
- JWT (JSON Web Token)

## Kurulum

### 1. Depoyu Klonlayın

İlk olarak, projenin repository'sini klonlayın:

```bash
git clone https://github.com/Elanur7/Sporcu_Performans_Takip_API_Case_Study.git
```
```bash
cd Sporcu_Performans_Takip_API_Case_Study
```

### 2. Bağımlılıkları Yükleyin
Gerekli bağımlılıklarını yükleyin:
```bash
npm install
```
Ardından nodemon yükleyin:
```bash
npm install -g nodemon
```

### 3. .env Dosyasını Oluşturun
.env.dosyasını oluşturun. Dosyadaki veritabanı ve JWT ayarlarını kendi ortamınıza göre düzenleyin:

Örnek Veritabanı Ayarları:
```bash
JWT_SECRET=secret_key
DB_HOST="localhost"
DB_USERNAME=kullanici_adi
DB_PASSWORD=sifre
DB_NAME=veritabani_adi
```

### 4. DB Seed
Otomatik veri tanımlamak için seeder dosyasını çalıştırın:
```bash
node runSeeder.js
```

### 5. Çalıştırma
Projeyi çalıştırmak için aşağıdaki komutu kullanabilirsiniz:
```bash
npm run dev
```
