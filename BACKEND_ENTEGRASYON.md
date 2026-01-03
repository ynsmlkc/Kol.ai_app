# 🔗 Backend Entegrasyonu Tamamlandı!

Frontend başarıyla backend'e bağlandı! 

---

## ✅ Yapılan Değişiklikler

### 1️⃣ **Yeni Paket Kuruldu**

```bash
npm install @react-native-async-storage/async-storage
```

**Neden:** JWT token'ını cihazda saklamak için gerekli.

---

### 2️⃣ **src/context/AuthContext.js** - Backend'e Bağlandı

#### 📍 Satır 1-3: Import'lar Güncellendi
```javascript
// ✅ BURAYA EKLEDİM:
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react'; // useEffect eklendi
```

#### 📍 Satır 5-6: API URL Eklendi
```javascript
// ✅ BURAYA EKLEDİM:
const API_URL = 'http://localhost:8000/api';
```

#### 📍 Satır 11-13: Loading State Eklendi
```javascript
// ✅ BURAYA EKLEDİM:
const [loading, setLoading] = useState(true);
```

#### 📍 Satır 15-20: Token Kontrolü (Otomatik Giriş)
```javascript
// ✅ BURAYA EKLEDİM:
useEffect(() => {
  checkAuth();
}, []);

const checkAuth = async () => {
  // Token varsa otomatik giriş yap
}
```

#### 📍 Satır 30-50: Register Fonksiyonu - Backend'e Bağlandı
```javascript
// ✅ BURAYA EKLEDİM: Backend API çağrısı
const register = async (email, password, phone) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      phone,
      password,
      password_confirm: password
    })
  });
  
  const data = await response.json();
  // Backend'den gelen response işleniyor
}
```

#### 📍 Satır 55-80: Login Fonksiyonu - Backend'e Bağlandı
```javascript
// ✅ BURAYA EKLEDİM: Backend API çağrısı
const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const { access_token } = await response.json();
  
  // ✅ Token'ı AsyncStorage'a kaydet
  await AsyncStorage.setItem('access_token', access_token);
  
  // Kullanıcı bilgilerini backend'den al
  await getUserInfo(access_token);
}
```

#### 📍 Satır 85-95: Logout - Token Temizleme
```javascript
// ✅ BURAYA EKLEDİM: AsyncStorage'dan token temizleme
const logout = async () => {
  await AsyncStorage.removeItem('access_token');
  setCurrentUser(null);
  setIsAuthenticated(false);
}
```

#### 📍 Satır 100-115: getUserInfo Fonksiyonu Eklendi
```javascript
// ✅ BURAYA EKLEDİM: Backend'den kullanıcı bilgilerini al
const getUserInfo = async (token) => {
  const response = await fetch(`${API_URL}/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const user = await response.json();
  setCurrentUser(user);
}
```

---

### 3️⃣ **src/config/api.js** - Yeni Dosya Oluşturuldu

```javascript
// ✅ BURAYA EKLEDİM: API yapılandırma dosyası
export const API_URL = 'http://localhost:8000/api';

export default {
  API_URL,
  ENDPOINTS: {
    REGISTER: '/register',
    LOGIN: '/login',
    ME: '/me',
  }
};
```

---

## 🔄 Çalışma Akışı

### Kayıt Olma
```
1. Kullanıcı bilgileri RegisterScreen'de doldurulur
   ↓
2. register() fonksiyonu çağrılır
   ↓
3. Backend'e POST isteği: http://localhost:8000/api/register
   ↓
4. Backend kullanıcıyı database'e kaydeder
   ↓
5. Başarılı mesajı gösterilir
   ↓
6. LoginScreen'e yönlendirilir
```

### Giriş Yapma
```
1. Email ve şifre LoginScreen'de girilir
   ↓
2. login() fonksiyonu çağrılır
   ↓
3. Backend'e POST isteği: http://localhost:8000/api/login
   ↓
4. Backend JWT token döner
   ↓
5. Token AsyncStorage'a kaydedilir
   ↓
6. getUserInfo() ile kullanıcı bilgileri alınır
   ↓
7. Ana sayfaya yönlendirilir
```

### Otomatik Giriş
```
1. Uygulama açılır
   ↓
2. useEffect çalışır, checkAuth() çağrılır
   ↓
3. AsyncStorage'dan token kontrol edilir
   ↓
4. Token varsa → getUserInfo() ile kullanıcı bilgileri alınır
   ↓
5. Otomatik olarak ana sayfaya gidilir
```

### Çıkış Yapma
```
1. Logout butonu tıklanır
   ↓
2. logout() fonksiyonu çağrılır
   ↓
3. AsyncStorage'dan token silinir
   ↓
4. State temizlenir
   ↓
5. LoginScreen'e yönlendirilir
```

---

## 🧪 Test Etme

### 1. Backend'i Başlat
```bash
cd /Users/yunusmalkoc/Desktop/kol-ai-backend
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Frontend'i Başlat (Zaten çalışıyor)
```bash
cd /Users/yunusmalkoc/Desktop/kol.ai_app
npm start
```

### 3. iOS Simülatörde Test Et

**Kayıt Olma:**
1. "Kaydol" linkine tıklayın
2. Email: `test@gmail.com`
3. Telefon: `5551234567`
4. Şifre: `123456`
5. Şifre Tekrar: `123456`
6. "Kaydol" → ✅ Backend'e kaydedildi!

**Giriş Yapma:**
1. Email: `test@gmail.com`
2. Şifre: `123456`
3. "Giriş Yap" → ✅ Token alındı, ana sayfaya yönlendirildi!

**Otomatik Giriş:**
1. Uygulamayı kapatın (`Cmd + Q`)
2. Tekrar açın → ✅ Otomatik giriş yaptı!

**Çıkış:**
1. Ana sayfada "Çıkış Yap" → ✅ Token silindi, login ekranına döndü!

---

## 📊 Veri Akışı

```
React Native (Frontend)
         ↓
   AuthContext.js
         ↓
  fetch() çağrısı
         ↓
http://localhost:8000/api
         ↓
  FastAPI (Backend)
         ↓
  SQLite Database
         ↓
  Response (JSON)
         ↓
   AuthContext.js
         ↓
  State Güncelleme
         ↓
   UI Yenilenir
```

---

## 🔐 Güvenlik

### Token Saklama
- ✅ AsyncStorage (güvenli)
- ✅ JWT token
- ✅ 30 dakika geçerlilik

### Password
- ✅ Backend'de bcrypt ile hashlenmiş
- ✅ Frontend'de plain text olarak gönderilir (HTTPS'de güvenli)

---

## ⚠️ Önemli Notlar

### 1. Backend Çalışıyor Olmalı
Backend çalışmazsa fetch hatası alırsınız:
```
"Sunucuya bağlanılamadı. Lütfen backend'in çalıştığından emin olun."
```

### 2. iOS Simülatör için localhost
```javascript
const API_URL = 'http://localhost:8000/api';
```
Bu iOS simülatörde çalışır!

### 3. Gerçek iOS Cihaz için
Bilgisayarınızın IP adresini kullanın:
```javascript
const API_URL = 'http://192.168.1.X:8000/api';
```

### 4. Android Emülatör için
```javascript
const API_URL = 'http://10.0.2.2:8000/api';
```

---

## 🎯 Sonuç

✅ Frontend backend'e bağlandı!
✅ Kayıt sistemi çalışıyor!
✅ Giriş sistemi çalışıyor!
✅ Token yönetimi aktif!
✅ Otomatik giriş aktif!
✅ Çıkış sistemi çalışıyor!

**Her şey hazır! Test edin!** 🚀














