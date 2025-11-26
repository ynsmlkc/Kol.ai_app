# iOS'da Çalıştırma Rehberi 🍎

## ✅ Gereksinimler

### 1. Xcode Kurulumu
Xcode, Mac App Store'dan **ücretsiz** indirilebilir.

```bash
# Xcode'un kurulu olup olmadığını kontrol edin
xcode-select -p
```

Eğer kurulu değilse:
1. **Mac App Store**'u açın
2. **"Xcode"** arayın
3. **İndir** butonuna tıklayın (yaklaşık 12-15 GB)
4. Kurulum bittikten sonra terminalde şunu çalıştırın:

```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
```

### 2. iOS Simülatörü Kurulumu

Xcode ile birlikte iOS simülatörleri gelir. Ek bir şey yüklemenize gerek yok!

---

## 🚀 iOS'da Uygulamayı Çalıştırma

### Yöntem 1: Otomatik iOS Simülatör (Önerilen)

```bash
# 1. Terminal'de proje klasörüne gidin
cd /Users/yunusmalkoc/Desktop/kol.ai_app

# 2. Direkt iOS simülatörde açın
npm run ios
```

Bu komut:
- ✅ Expo sunucusunu başlatır
- ✅ iOS simülatörü otomatik açar
- ✅ Uygulamayı simülatörde yükler

---

### Yöntem 2: Manuel Kontrol (Daha Esnek)

```bash
# 1. Önce Expo sunucusunu başlatın
npm start

# 2. Terminal'de 'i' tuşuna basın
# (iOS simülatörü otomatik açılır)
```

---

## 📱 Farklı iOS Cihazlarında Test Etme

### Mevcut Simülatörleri Listele
```bash
xcrun simctl list devices
```

### Belirli Bir Cihazda Çalıştır
```bash
# Örnek: iPhone 15 Pro
npx expo start --ios --simulator "iPhone 15 Pro"

# Örnek: iPhone 14
npx expo start --ios --simulator "iPhone 14"

# Örnek: iPad Air
npx expo start --ios --simulator "iPad Air"
```

---

## ⚙️ Simülatör Ayarları

### Simülatörü Temizle (Cache Problemi Yaşarsanız)
```bash
# Simülatör içeriğini ve ayarlarını sıfırla
xcrun simctl erase all
```

### Belirli Bir Simülatörü Aç
```bash
# Simülatör uygulamasını aç
open -a Simulator
```

---

## 🔧 Hızlı Geliştirme Komutları

```bash
# Cache temizleyerek başlat
npm start -- --clear

# Sadece iOS için optimize başlangıç
npm run ios

# Production modunda test et
npx expo start --no-dev
```

---

## 🐛 Sorun Giderme

### 1. "Cannot find Xcode" Hatası
```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

### 2. Simülatör Açılmıyor
```bash
# Simülatörü manuel aç
open -a Simulator
# Sonra expo start'ta 'i' tuşuna bas
```

### 3. Metro Bundler Hatası
```bash
# Cache'i temizle ve yeniden başlat
rm -rf node_modules .expo
npm install
npm start -- --clear
```

### 4. "Bundling failed" Hatası
```bash
# Watchman kurulumu (Opsiyonel ama önerilir)
brew install watchman
```

---

## 📦 İOS için Ek Paketler (Opsiyonel)

Eğer iOS'a özel özellikler eklemek isterseniz:

```bash
# Haptic feedback (Titreşim)
npx expo install expo-haptics

# Bildirimler
npx expo install expo-notifications

# Kamera erişimi
npx expo install expo-camera

# Konum servisleri
npx expo install expo-location
```

---

## 🎯 Performans İpuçları

1. **Developer Menu Açma**: Simülatörde `Cmd + D` tuşlarına basın
2. **Reload**: Simülatörde `Cmd + R` tuşlarına basın
3. **Debug Menu**: Shake gesture için `Cmd + Ctrl + Z`
4. **Hot Reload**: Otomatik aktif (kod değiştirince sayfa yenilenir)

---

## ✅ Hızlı Başlangıç Checklist

- [ ] Xcode kuruldu mu? (`xcode-select -p`)
- [ ] Node.js kuruldu mu? (`node --version`)
- [ ] Paketler yüklendi mi? (`npm install`)
- [ ] Simülatör çalışıyor mu? (`open -a Simulator`)
- [ ] Expo sunucusu başladı mı? (`npm run ios`)

---

## 🎉 Başarılı Kurulum

Eğer simülatörde "AI Süper Uygulama" giriş ekranını görüyorsanız, her şey hazır! 🚀

Şimdi kod yazmaya başlayabilirsiniz. Her değişiklik otomatik olarak simülatörde yenilenecek.



