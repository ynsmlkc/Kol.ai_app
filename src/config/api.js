// ✅ API Configuration
// Otomatik olarak doğru URL'yi seçer

// 🔧 Local Development için IP (sadece development sırasında kullanılır)
const LOCAL_IP = '172.31.157.25';  // ⚠️ Mac IP'ni buraya yaz! (ifconfig ile bul)

// 🚀 Production API (Railway - App Store build için)
const PRODUCTION_URL = 'https://web-production-db012.up.railway.app';

// 🌍 Environment otomatik seçimi
const __DEV__ = __DEV__ ?? process.env.NODE_ENV === 'development';

// 🔒 Gateway kullanarak güvenli bağlantı
export const API_URL = __DEV__
  ? `http://${LOCAL_IP}`        // 🔥 Development: Local Docker Gateway
  : PRODUCTION_URL;             // 🚀 Production: Railway Gateway (ileride eklenecek)

// 💡 Başka bilgisayarda çalıştırırken:
// 1. Terminal'de: ifconfig | grep "inet " | grep -v 127.0.0.1
// 2. IP'ni kopyala (örn: 192.168.1.180)
// 3. LOCAL_IP değişkenini güncelle
// 4. npm start --clear ile yeniden başlat

// ✅ BURAYA EKLEDİM: API Endpoints
export const API_ENDPOINTS = {
  register: `${API_URL}/api/register`,
  login: `${API_URL}/api/login`,
  me: `${API_URL}/api/me`,
  usersCount: `${API_URL}/api/users/count`,
  users: `${API_URL}/api/users`
};

export default {
  API_URL,
  API_ENDPOINTS
};



