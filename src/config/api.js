// ✅ Backend API Yapılandırması

// Development (localhost)
export const API_URL = 'http://localhost:8000/api';

// Production (deploy ettiğinizde bu URL'i kullanın)
// export const API_URL = 'https://your-backend-url.com/api';

// iOS Simülatör için alternatif URL'ler:
// export const API_URL = 'http://127.0.0.1:8000/api';

// Gerçek iOS cihaz veya Android için:
// Bilgisayarınızın local IP'sini kullanın
// export const API_URL = 'http://192.168.1.X:8000/api';

export default {
  API_URL,
  ENDPOINTS: {
    REGISTER: '/register',
    LOGIN: '/login',
    ME: '/me',
    USERS_COUNT: '/users/count',
  }
};

