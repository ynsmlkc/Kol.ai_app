# AI Süper Uygulama - React Native (Expo)

AI destekli mobil uygulama iskeleti. PDF analizi ve kalori takibi modülleri içerir.

## 📁 Proje Yapısı

```
kol.ai_app/
├── App.js                          # Ana uygulama giriş noktası
├── app.json                        # Expo yapılandırma dosyası
├── package.json                    # Bağımlılıklar ve script'ler
├── babel.config.js                 # Babel yapılandırması
├── .gitignore                      # Git ignore dosyası
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js        # Ana navigasyon mantığı (Auth & App Stack)
│   └── screens/
│       ├── LoginScreen.js         # Giriş ekranı
│       ├── HomeScreen.js          # Ana sayfa (modül seçimi)
│       ├── PdfAnalyzerScreen.js   # PDF analizör modülü
│       └── CalorieTrackerScreen.js # Kalori takip modülü
└── README.md                       # Bu dosya
```

## 🚀 Başlangıç

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn
- **macOS**: Xcode (iOS Simülatör için)
- **Backend**: Docker & Docker Compose (Local test için)
- **Mobil**: Expo Go uygulaması

### Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. **⚙️ API Konfigürasyonu (ÖNEMLİ!)**:

**Local Docker Test için:**
```bash
# Mac IP'nizi bulun:
ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}'
# Örnek çıktı: 192.168.1.170

# src/config/api.js dosyasını açın
# LOCAL_IP değişkenini güncelleyin:
const LOCAL_IP = '192.168.1.170';  // Kendi IP'nizi buraya yazın
```

**Production (Railway) için:**
```javascript
// Kod zaten ayarlı! Production build'de otomatik Railway kullanılır
```

3. **Backend'i Başlatın (Local test için)**:
```bash
cd ../kol-ai-backend
docker-compose up -d
```

4. **iOS'da Çalıştırma (macOS)**:
```bash
npm start --clear
# Açılan terminalde 'i' tuşuna basın (iOS Simulator)
```

5. **Mobil Cihazda Test**:
```bash
npm start
# QR kodu Expo Go ile tarayın
```

> **🍎 iOS Detaylı Kurulum**: `IOS_KURULUM.md` dosyasına bakın
> **🐳 Backend Kurulum**: `../kol-ai-backend/README.md` dosyasına bakın

## 📱 Özellikler

### Navigasyon Yapısı
- **AuthStack**: Giriş yapılmadan önce gösterilen ekranlar
  - Login Screen
  
- **AppStack**: Giriş yapıldıktan sonra gösterilen ekranlar
  - Home Screen (Ana Sayfa)
  - PDF Analyzer Screen
  - Calorie Tracker Screen

### Mevcut Modüller

#### 1. PDF Analizör Modülü
- PDF dosyası yükleme (Planlanan)
- AI tabanlı içerik analizi (Planlanan)
- Özetleme özellikleri (Planlanan)

#### 2. Kalori Takipçi Modülü
- Günlük kalori takibi (Planlanan)
- AI tabanlı yemek tanıma (Planlanan)
- Besin değeri analizi (Planlanan)

## 🛠️ Teknoloji Yığını

- **Framework**: React Native
- **Platform**: Expo (SDK 54)
- **Navigasyon**: React Navigation v7 (Stack Navigator)
- **Dil**: JavaScript (ES6+)

## 📝 Geliştirme Notları

Bu proje şu anda bir **iskelet yapı** olup, temel navigasyon ve UI akışını içermektedir. Her modülün işlevselliği ilerleyen aşamalarda eklenecektir.

## 🔄 Sonraki Adımlar

- [ ] Backend API entegrasyonu
- [ ] Kullanıcı kimlik doğrulama sistemi
- [ ] PDF işleme kütüphanesi entegrasyonu
- [ ] Kalori hesaplama API'si entegrasyonu
- [ ] AI model entegrasyonları
- [ ] Veri saklama (AsyncStorage/SQLite)
- [ ] UI/UX iyileştirmeleri

## 📄 Lisans

Bu proje özel bir proje olup, geliştirme aşamasındadır.

# Kol.ai.app_frontend
# Kol.ai.app_frontend
# Kol.ai_app
