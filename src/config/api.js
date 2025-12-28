// ✅ API Configuration
// Otomatik olarak doğru URL'yi seçer

// 🚀 Production API (Railway - Development ve Production için)
const PRODUCTION_URL = 'https://web-production-db012.up.railway.app';

// ✅ Her zaman Railway kullan (IP değişikliği sorunu yok)
export const API_URL = PRODUCTION_URL;

// 💡 NOT: Şimdilik hem development hem production Railway kullanıyor
// İleride Gateway eklendiğinde bu değişecek

// 💡 Başka bilgisayarda çalıştırırken:
// 1. Terminal'de: ifconfig | grep "inet " | grep -v 127.0.0.1
// 2. IP'ni kopyala (örn: 192.168.1.180)
// 3. LOCAL_IP değişkenini güncelle
// 4. npm start --clear ile yeniden başlat

// ✅ API Endpoints
export const API_ENDPOINTS = {
  register: `${API_URL}/api/register`,
  login: `${API_URL}/api/login`,
  me: `${API_URL}/api/me`,
  usersCount: `${API_URL}/api/users/count`,
  users: `${API_URL}/api/users`,
  // 🤖 AI Endpoints
  analyzeFood: `${API_URL}/api/analyze-food`,  // Kalori analizi
};

export default {
  API_URL,
  API_ENDPOINTS
};



