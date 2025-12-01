// ✅ BURAYA EKLEDİM: Railway Production URL
export const API_URL = 'https://web-production-db012.up.railway.app';

// Development için localhost kullanmak isterseniz:
// export const API_URL = 'http://localhost:8000';

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



