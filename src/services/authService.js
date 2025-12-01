// ✅ BURAYA EKLEDİM: Tüm authentication API çağrıları bu dosyada

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS } from '../config/api';

// ✅ Kayıt (Register)
export const register = async (email, phone, password, passwordConfirm) => {
  try {
    const response = await fetch(API_ENDPOINTS.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        phone,
        password,
        password_confirm: passwordConfirm
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Kayıt başarısız');
    }

    return data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

// ✅ Giriş (Login)
export const login = async (email, password) => {
  try {
    const response = await fetch(API_ENDPOINTS.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Giriş başarısız');
    }

    // ✅ Token'ı kaydet
    await AsyncStorage.setItem('access_token', data.access_token);
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// ✅ Kullanıcı Bilgilerini Al
export const getUserInfo = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    const response = await fetch(API_ENDPOINTS.me, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Kullanıcı bilgisi alınamadı');
    }

    return data;
  } catch (error) {
    console.error('Get user info error:', error);
    throw error;
  }
};

// ✅ Çıkış (Logout)
export const logout = async () => {
  await AsyncStorage.removeItem('access_token');
};

// ✅ Token kontrolü
export const isLoggedIn = async () => {
  const token = await AsyncStorage.getItem('access_token');
  return !!token;
};



