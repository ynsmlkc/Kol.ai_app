# 📱 App Store Yayınlama Rehberi

> **📝 NOT:** Bu rehber uygulamayı **hızlıca** App Store'a çıkarmak için hazırlanmıştır.
> 
> **🔒 Güvenlik:** Production'da şu anda Gateway YOK (Railway'e direkt bağlanıyor).
> 
> - **50-100 kullanıcı** topladıktan sonra **Railway Gateway** eklemelisiniz!
> - Rehber: `RAILWAY_GATEWAY_KURULUM.md` dosyasına bakın.

---

## ✅ Yapılması Gerekenler

### 1. 🌐 API URL Kontrolü (ÖNEMLİ!)

**Durum:** ✅ Hallettik!

`src/config/api.js` dosyası otomatik olarak:
- **Development:** Local Docker Gateway kullanır (`http://172.31.157.25`)
- **Production Build:** Railway Backend kullanır (`https://web-production-db012.up.railway.app`)
  - ⚠️ İleride Gateway eklenecek (50-100 kullanıcıda)

**Test Et:**
```bash
# Development modda (npm start)
console.log(API_URL);  // http://192.168.1.170

# Production build'de
console.log(API_URL);  // https://web-production-db012.up.railway.app
```

---

### 2. 📦 Expo/EAS Build Kurulumu

#### Adım 1: EAS CLI Yükle
```bash
npm install -g eas-cli
```

#### Adım 2: Expo Hesabı ile Giriş
```bash
eas login
# Email ve şifrenle giriş yap
```

#### Adım 3: Projeyi Yapılandır
```bash
cd /Users/yunusmalkoc/Desktop/kol.ai_app
eas build:configure
```

Bu komut `eas.json` dosyası oluşturacak.

---

### 3. 🍎 iOS Build (App Store için)

#### app.json Güncelleme (GEREKLİ)

```json
{
  "expo": {
    "name": "KOL.AI",
    "slug": "kol-ai-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "dark",
    "ios": {
      "bundleIdentifier": "com.yunusmalkoc.kolai",  // ⚠️ Benzersiz olmalı!
      "buildNumber": "1",
      "supportsTablet": true,
      "infoPlist": {
        "NSCameraUsageDescription": "Fotoğraf çekmek için kamera erişimi gerekli",
        "NSPhotoLibraryUsageDescription": "Fotoğraf seçmek için galeri erişimi gerekli"
      }
    },
    "android": {
      "package": "com.yunusmalkoc.kolai",  // ⚠️ Benzersiz olmalı!
      "versionCode": 1,
      "adaptiveIcon": {
        "backgroundColor": "#000000"
      }
    },
    "plugins": [
      "expo-router"
    ]
  }
}
```

#### Build Komutu
```bash
# iOS için build (App Store)
eas build --platform ios

# Seçenekler:
# 1. Build type: All (veya "archive" - App Store için)
# 2. Distribution: App Store Connect
```

**Build süresi:** ~15-20 dakika ⏱️

---

### 4. 📋 Apple Developer Hesabı (GEREKLİ)

#### Gereksinimler:
- ✅ Apple Developer Program ($99/yıl)
- ✅ Kayıtlı Bundle ID: `com.yunusmalkoc.kolai`
- ✅ App Store Connect hesabı

#### Kayıt:
1. https://developer.apple.com → Kayıt ol
2. Apple Developer Program → $99 öde
3. Certificates, Identifiers & Profiles → App ID oluştur
4. App Store Connect → Yeni uygulama ekle

---

### 5. 🔑 Code Signing (Otomatik)

EAS Build otomatik halleder:
```bash
eas build --platform ios
# EAS sertifikaları otomatik oluşturur ve yönetir
```

Manuel yapmak istersen:
```bash
eas credentials
```

---

### 6. 📤 App Store Connect'e Yükleme

#### Build Tamamlandıktan Sonra:

```bash
# Build indirme linki gelecek
# Örnek: https://expo.dev/accounts/.../builds/...

# Veya doğrudan App Store Connect'e yükle:
eas submit --platform ios
```

**Gerekli Bilgiler:**
- Apple ID
- App-specific password
- Bundle ID

---

### 7. 🖼️ App Store Listesi (Metadata)

App Store Connect → Uygulamana git:

#### Gerekli Görseller:
- **App Icon:** 1024x1024px (PNG, şeffaflık yok)
- **Screenshots (iPhone):**
  - 6.7" (iPhone 14 Pro Max): 1290x2796px - 3 tane
  - 6.5" (iPhone 11 Pro Max): 1242x2688px - 3 tane
  - 5.5" (iPhone 8 Plus): 1242x2208px - 3 tane

#### Açıklamalar:
```
Başlık: KOL.AI - AI Süper Uygulama

Açıklama:
KOL.AI, yapay zeka destekli çok amaçlı mobil uygulamanızdır.

Özellikler:
• PDF Analizi ve Özetleme
• Kalori Takibi ve Beslenme Analizi
• Görsel Oluşturma
• Metin Çevirisi
• Kod Tamamlama
• Ve daha fazlası...

Anahtar Kelimeler:
AI, yapay zeka, PDF, kalori, çeviri, asistan
```

---

### 8. 📝 Review Süreci

#### Apple İnceleme için Notlar:
```
Demo Hesap:
Email: demo@example.com
Şifre: Demo123456

Uygulama Açıklaması:
KOL.AI, kullanıcılara AI destekli araçlar sunar.
Kullanıcılar kayıt olup giriş yaparak 12 farklı
AI aracını kullanabilir.

Backend: Railway (https://web-production-db012.up.railway.app)
```

#### Review Süresi:
- ⏱️ 1-3 gün (ilk inceleme)
- 🔄 Red edilirse düzeltip tekrar gönder

---

## 🚀 Hızlı Başlangıç (Adım Adım)

```bash
# 1. EAS CLI yükle
npm install -g eas-cli

# 2. Giriş yap
eas login

# 3. Projeyi yapılandır
cd /Users/yunusmalkoc/Desktop/kol.ai_app
eas build:configure

# 4. app.json'u güncelle (yukarıdaki örneğe göre)
# Bundle ID, name, slug vs.

# 5. Build başlat
eas build --platform ios

# 6. Build tamamlanınca App Store'a yükle
eas submit --platform ios

# 7. App Store Connect'te metadata ekle
# - Screenshots
# - Açıklama
# - Anahtar kelimeler

# 8. Review'a gönder
# App Store Connect → Version → Submit for Review
```

---

## ⚠️ Önemli Kontroller

### Kod Tarafı:
- ✅ API_URL production'da Railway kullanıyor
- ✅ app.json güncel
- ✅ Bundle ID benzersiz
- ⚠️ Icon ve splash ekle (şu an yok)
- ⚠️ Permissions (camera, photo library) ekle

### Apple Tarafı:
- ⚠️ Apple Developer Program kaydı ($99/yıl)
- ⚠️ App Store Connect'te uygulama oluştur
- ⚠️ Screenshots hazırla
- ⚠️ Privacy Policy hazırla (gerekli!)

### Backend Tarafı:
- ✅ Railway production'da çalışıyor
- ✅ HTTPS aktif
- ⚠️ Rate limiting ekle (önerilir)
- ⚠️ Email verification ekle (önerilir)

---

## 🎨 Görseller Hazırlama

### App Icon (1024x1024):
```bash
# Figma, Canva veya Adobe Illustrator kullan
# Basit, temiz, dark theme uyumlu
# Örnek: "KOL.AI" logosu, AI temalı
```

### Screenshots:
```bash
# iOS Simulator'da screenshot al
# Cmd + S (simulator'da)
# Veya: Device → Trigger Screenshot

# 3 farklı ekran göster:
1. Login/Register ekranı
2. Home (tool listesi)
3. Bir tool ekranı (örn: PDF Analyzer)
```

---

## 💰 Maliyetler

| İşlem | Maliyet |
|-------|---------|
| Apple Developer Program | $99/yıl |
| EAS Build | Ücretsiz (aylık 30 build) |
| Railway Backend | $5/ay (başlangıç) |
| Domain (optional) | $10/yıl |
| **TOPLAM (İlk Yıl)** | **~$170** |

---

## 📚 Faydalı Linkler

- **Expo EAS Build Docs:** https://docs.expo.dev/build/introduction/
- **App Store Review Guidelines:** https://developer.apple.com/app-store/review/guidelines/
- **Apple Developer:** https://developer.apple.com
- **App Store Connect:** https://appstoreconnect.apple.com

---

## 🆘 Sorun Giderme

### "Bundle ID already exists"
```bash
# app.json'da bundle ID'yi değiştir:
"bundleIdentifier": "com.yunusmalkoc.kolai2"
```

### "Build failed"
```bash
# Logları kontrol et:
eas build:list
# Son build'e tıkla → Logs
```

### "API çalışmıyor (Production)"
```bash
# Railway backend'i kontrol et:
curl https://web-production-db012.up.railway.app/health

# api.js'de production URL doğru mu?
console.log(API_URL);  # Railway olmalı
```

---

**Hazır mısın?** 🚀

İlk adım: `npm install -g eas-cli` 

Sonra devam edelim! 💪




