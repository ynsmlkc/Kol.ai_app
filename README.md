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
- **Mobil**: Expo Go uygulaması

### Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. **iOS'da Çalıştırma (macOS)**:
```bash
npm run ios
```

3. **Mobil Cihazda Test**:
```bash
npm start
# QR kodu Expo Go ile tarayın
```

> **🍎 iOS Detaylı Kurulum**: `IOS_KURULUM.md` dosyasına bakın

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

