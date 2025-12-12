# 🔒 Railway Gateway Kurulum Rehberi

> **Ne Zaman Kurulmalı?**
> - İlk 50-100 kullanıcı geldiğinde
> - Uygulamadan gelir elde etmeye başladığında
> - Güvenlik endişeleri arttığında

---

## 🎯 Hedef Mimari

```
Kullanıcılar (App Store)
       ↓
Railway Gateway (Nginx) - Public 🌍
       ↓
Railway Backend (FastAPI) - Private 🔒
```

**Avantajlar:**
- ✅ Kullanıcılar backend'i direkt görmez
- ✅ DDoS koruması
- ✅ Rate limiting eklenebilir
- ✅ SSL/TLS yönetimi kolaylaşır
- ✅ İleride microservice'lere geçiş kolay

---

## 📋 Adım Adım Kurulum

### **Adım 1: Railway'de Yeni Servis Oluştur**

1. Railway Dashboard'a git: https://railway.app
2. Projenizi açın (`kol-ai-backend`)
3. **"+ New Service"** butonuna tıklayın
4. **"Empty Service"** seçin
5. Servis adı: `gateway`

---

### **Adım 2: Nginx Gateway Dockerfile Oluştur**

Backend projesinde yeni bir klasör oluşturun:

```bash
cd /Users/yunusmalkoc/Desktop/kol-ai-backend
mkdir gateway
cd gateway
```

**`gateway/Dockerfile`** oluşturun:

```dockerfile
FROM nginx:alpine

# Nginx konfigürasyonunu kopyala
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

### **Adım 3: Nginx Konfigürasyonu**

**`gateway/nginx.conf`** oluşturun:

```nginx
events {
    worker_connections 1024;
}

http {
    # Backend servisinin Railway internal URL'i
    # Railway'de backend servisinin "Private Networking" URL'ini buraya yazın
    # Örnek: kol-ai-backend.railway.internal:8000
    upstream backend {
        server kol-ai-backend.railway.internal:8000;
    }

    # Rate Limiting (DDoS Koruması)
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req_status 429;

    server {
        listen 80;
        server_name _;

        # Health check
        location /health {
            limit_req zone=api_limit burst=5;
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # API endpoints
        location /api/ {
            limit_req zone=api_limit burst=20;
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # Timeout ayarları
            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }

        # Swagger UI (Dokümantasyon)
        location /docs {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /redoc {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # OpenAPI JSON
        location /openapi.json {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

---

### **Adım 4: Railway'de Gateway Servisini Deploy Et**

1. **Railway Dashboard'da `gateway` servisine tıklayın**
2. **Settings → Source**
   - Repository: `kol-ai-backend` repo'nuzu seçin
   - Root Directory: `gateway`
3. **Settings → Deploy**
   - Build Command: (boş bırak)
   - Dockerfile Path: `Dockerfile`
4. **Deploy** edin

---

### **Adım 5: Backend'i Private Yap**

1. **Railway'de `backend` servisine tıklayın**
2. **Settings → Networking**
3. **"Public Networking"** → **Kapat** ❌
4. **"Private Networking"** → **Aç** ✅
   - Internal URL görünecek: `kol-ai-backend.railway.internal:8000`

---

### **Adım 6: Gateway Public URL'ini Al**

1. **Railway'de `gateway` servisine tıklayın**
2. **Settings → Networking**
3. **"Generate Domain"** butonuna tıklayın
4. URL'yi kopyalayın (Örn: `gateway-production-abc123.up.railway.app`)

---

### **Adım 7: Frontend'i Güncelle**

**`src/config/api.js`** dosyasını düzenleyin:

```javascript
// 🔧 Local Development için IP
const LOCAL_IP = '172.31.157.25';  // Mac IP

// 🚀 Production API - Gateway URL
const PRODUCTION_URL = 'https://gateway-production-abc123.up.railway.app';  // ⬅️ BURAYA Gateway URL

// 🌍 Environment otomatik seçimi
const __DEV__ = __DEV__ ?? process.env.NODE_ENV === 'development';

export const API_URL = __DEV__
  ? `http://${LOCAL_IP}`        // 🔥 Development: Local Docker Gateway
  : PRODUCTION_URL;             // 🔒 Production: Railway Gateway

// ✅ API Endpoints
export const API_ENDPOINTS = {
  register: `${API_URL}/api/register`,
  login: `${API_URL}/api/login`,
  me: `${API_URL}/api/me`,
  usersCount: `${API_URL}/api/users/count`,
  users: `${API_URL}/api/users`
};
```

---

### **Adım 8: Test Et**

**Terminal'de:**

```bash
# Health check
curl https://gateway-production-abc123.up.railway.app/health

# Login testi
curl -X POST https://gateway-production-abc123.up.railway.app/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

**Başarılı Sonuç:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer"
}
```

---

### **Adım 9: App Güncellemesi Yayınla**

```bash
# EAS Build
cd /Users/yunusmalkoc/Desktop/kol.ai_app
eas build --platform ios
eas submit -p ios
```

---

## 🔍 Doğrulama

### **Gateway Çalışıyor mu?**
- ✅ `https://gateway-url/health` → 200 OK
- ✅ `https://gateway-url/api/users` → JSON Response
- ✅ `https://gateway-url/docs` → Swagger UI

### **Backend Private mı?**
- ✅ Eski backend URL'i artık çalışmamalı
- ✅ Sadece Gateway backend'e erişebilmeli

---

## 📊 Maliyet

- **Backend (FastAPI):** $5/ay
- **Gateway (Nginx):** $5/ay
- **Toplam:** ~$10/ay

---

## 🐛 Sorun Giderme

### **"Bad Gateway" Hatası:**
```bash
# Backend'in internal URL'ini kontrol et
# nginx.conf'da doğru URL var mı?
upstream backend {
    server kol-ai-backend.railway.internal:8000;
}
```

### **Gateway Deploy Olmuyor:**
```bash
# Dockerfile'ın doğru dizinde olduğundan emin ol
cd gateway
ls -la  # Dockerfile ve nginx.conf görünmeli
```

### **Backend Erişilemiyor:**
- Backend Private Networking açık mı?
- Gateway ile aynı Railway projesinde mi?

---

## ✅ Kurulum Tamamlandı!

Artık production'da da Gateway var! 🎉

**Mimari:**
```
Local Development:
  iPhone → Docker Gateway → Docker Backend

Production (App Store):
  Kullanıcılar → Railway Gateway → Railway Backend
```

**İleride Eklenebilir:**
- 🔐 JWT token validation (Gateway seviyesinde)
- 🚦 Rate limiting (API kısıtlamaları)
- 📊 Logging & Monitoring
- 🌍 CDN entegrasyonu
- 🔄 Load balancing (birden fazla backend)

