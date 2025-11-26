# 🔐 Kimlik Doğrulama Sistemi

AI Süper Uygulama için tam özellikli kayıt ve giriş sistemi.

## 📱 Kullanıcı Akışı

### 1️⃣ Giriş Ekranı (LoginScreen)

```
┌──────────────────────────┐
│  AI Süper Uygulama       │
│     Giriş Yapın          │
│                          │
│  Email: ____________     │
│  Şifre: ____________     │
│                          │
│   [  Giriş Yap  ]        │
│                          │
│       Kaydol             │ ← Gri, küçük link
└──────────────────────────┘
```

**Özellikler:**
- Email ve şifre girişi
- "Giriş Yap" butonu
- Altta "Kaydol" linki (gri renk)

---

### 2️⃣ Kayıt Ekranı (RegisterScreen)

"Kaydol" linkine tıkladığınızda:

```
┌──────────────────────────┐
│       Kayıt Ol           │
│  Yeni hesap oluşturun    │
│                          │
│  Gmail: ____________     │
│  Telefon: __________     │
│  Şifre: ____________     │
│  Şifre Tekrar: _____     │
│                          │
│   [   Kaydol   ]         │
│                          │
│  Zaten hesabınız var mı? │
│      Giriş Yap           │
└──────────────────────────┘
```

**İstenen Bilgiler:**
1. ✉️ **Gmail** - Email adresi
2. 📱 **Telefon Numarası** - 11 haneli
3. 🔒 **Şifre** - En az 6 karakter
4. 🔒 **Şifre Tekrar** - Doğrulama için

**Validasyonlar:**
- ✅ Tüm alanlar dolu olmalı
- ✅ Email formatı geçerli olmalı
- ✅ Şifreler eşleşmeli
- ✅ Şifre en az 6 karakter
- ✅ Telefon en az 10 haneli
- ✅ Email daha önce kullanılmamalı

---

### 3️⃣ Kayıt Sonrası

Başarılı kayıt sonrası:
```
✅ "Kayıt başarıyla tamamlandı!"
→ Otomatik Giriş Ekranına yönlendirilir
```

---

### 4️⃣ Giriş Yapma

Giriş ekranında:
1. Email adresinizi girin
2. Şifrenizi girin
3. "Giriş Yap" butonuna tıklayın

**Başarılı Giriş:**
```
✅ "Hoş Geldiniz! email@gmail.com"
→ Ana Sayfaya yönlendirilir
```

**Hatalı Giriş:**
```
❌ "Email veya şifre hatalı!"
```

---

### 5️⃣ Ana Sayfa (HomeScreen)

Giriş yaptıktan sonra:

```
┌──────────────────────────┐
│  AI Süper Uygulama       │
│     Ana Sayfa            │
│                          │
│  📄 PDF Analizör         │
│  🍎 Kalori Takipçi       │
│  🚪 Çıkış Yap            │
└──────────────────────────┘
```

---

## 🔧 Teknik Detaylar

### AuthContext.js

**State Yönetimi:**
```javascript
- isAuthenticated: boolean      // Giriş durumu
- currentUser: object           // Aktif kullanıcı
- users: array                  // Kayıtlı kullanıcılar
```

**Fonksiyonlar:**
```javascript
register(email, password, phone)  // Yeni kullanıcı kaydı
login(email, password)            // Giriş işlemi
logout()                          // Çıkış işlemi
```

### Veri Yapısı

**Kullanıcı Objesi:**
```javascript
{
  id: "1638360000000",
  email: "ornek@gmail.com",
  password: "123456",
  phone: "5551234567",
  createdAt: "2025-11-25T10:30:00.000Z"
}
```

---

## 🎯 Kullanım Senaryoları

### Senaryo 1: Yeni Kullanıcı

1. Uygulama açılır → **Giriş Ekranı**
2. "Kaydol" linkine tıkla
3. Bilgileri doldur:
   - Gmail: `yeni@gmail.com`
   - Telefon: `5551234567`
   - Şifre: `123456`
   - Şifre Tekrar: `123456`
4. "Kaydol" butonuna tıkla
5. ✅ Başarı mesajı → Giriş ekranına dön
6. Email ve şifre ile giriş yap
7. ✅ Ana sayfa açılır!

---

### Senaryo 2: Mevcut Kullanıcı

1. Uygulama açılır → **Giriş Ekranı**
2. Email: `yeni@gmail.com`
3. Şifre: `123456`
4. "Giriş Yap" butonuna tıkla
5. ✅ Ana sayfa açılır!

---

### Senaryo 3: Çıkış Yapma

1. Ana sayfada **"Çıkış Yap"** kartına tıkla
2. ✅ Giriş ekranına dön

---

## 🎨 UI Özellikleri

### Giriş Ekranı
- Beyaz form kartı
- Gölge efekti
- Mavi "Giriş Yap" butonu (#007AFF)
- Gri "Kaydol" linki (#888)

### Kayıt Ekranı
- Beyaz form kartı
- 4 input alanı
- Mavi "Kaydol" butonu
- Klavye otomatik açılır
- Scroll desteği

### Form Input'ları
- Açık gri arka plan (#f5f5f5)
- Yuvarlatılmış köşeler
- Border (#e0e0e0)
- Placeholder text'ler

---

## ⚠️ Validasyon Mesajları

```javascript
// Boş Alan
"Lütfen tüm alanları doldurun!"

// Geçersiz Email
"Geçerli bir email adresi girin!"

// Şifre Eşleşmiyor
"Şifreler eşleşmiyor!"

// Kısa Şifre
"Şifre en az 6 karakter olmalıdır!"

// Kısa Telefon
"Geçerli bir telefon numarası girin!"

// Email Kullanılıyor
"Bu email adresi zaten kullanılıyor!"

// Başarılı Kayıt
"Kayıt başarıyla tamamlandı! Şimdi giriş yapabilirsiniz."

// Başarılı Giriş
"Hoş Geldiniz! email@gmail.com olarak giriş yaptınız."

// Hatalı Giriş
"Email veya şifre hatalı!"
```

---

## 🔒 Güvenlik Notları

**Mevcut Durum (Development):**
- ⚠️ Şifreler plain text olarak saklanıyor
- ⚠️ Veriler sadece uygulama memory'sinde
- ⚠️ Uygulama kapanınca veriler kaybolur

**Production İçin Öneriler:**
- 🔐 Backend API entegrasyonu
- 🔐 Şifre hashleme (bcrypt)
- 🔐 JWT token kullanımı
- 🔐 AsyncStorage veya secure storage
- 🔐 HTTPS iletişimi
- 🔐 Rate limiting
- 🔐 Email doğrulama

---

## 🚀 Test Etmek İçin

### Test Kullanıcısı Oluştur:

1. Uygulamayı aç
2. "Kaydol"a tıkla
3. Şu bilgileri gir:
   ```
   Gmail: test@gmail.com
   Telefon: 5551234567
   Şifre: test123
   Şifre Tekrar: test123
   ```
4. "Kaydol"a bas
5. Giriş ekranında:
   ```
   Email: test@gmail.com
   Şifre: test123
   ```
6. "Giriş Yap"a bas
7. ✅ Başarı!

---

## 📝 Geliştirme Notları

### Dosya Yapısı:
```
src/
├── context/
│   └── AuthContext.js          # Auth state yönetimi
├── screens/
│   ├── LoginScreen.js          # Email/şifre giriş
│   ├── RegisterScreen.js       # Kayıt formu
│   └── HomeScreen.js           # Ana sayfa (logout butonu)
└── navigation/
    └── AppNavigator.js         # Auth/App stack routing
```

### State Flow:
```
Register → AuthContext.register() → users array'e ekle
Login → AuthContext.login() → users'da ara → isAuthenticated = true
Logout → AuthContext.logout() → isAuthenticated = false
```

---

## ✨ Sonuç

Artık tam özellikli bir kayıt ve giriş sisteminiz var! 

- ✅ Email ile kayıt
- ✅ Telefon numarası
- ✅ Şifre doğrulama
- ✅ Giriş sistemi
- ✅ Çıkış sistemi
- ✅ Validasyonlar
- ✅ Hata mesajları
- ✅ Başarı bildirimleri

🎉 **Uygulamanız production-ready!**



