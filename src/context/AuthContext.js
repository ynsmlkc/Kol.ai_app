import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ BURAYA EKLEDİM: AsyncStorage import'u token saklamak için

// ✅ BURAYA EKLEDİM: Backend API URL
const API_URL = 'http://localhost:8000/api';

// Auth Context oluştur
const AuthContext = createContext();

// Auth Provider bileşeni
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ BURAYA EKLEDİM: Uygulama açıldığında token kontrolü
  useEffect(() => {
    checkAuth();
  }, []);

  // Token kontrolü
  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        // Token varsa kullanıcı bilgilerini al
        await getUserInfo(token);
      }
    } catch (error) {
      console.log('Token kontrolü hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ BURAYA EKLEDİM: Backend'den kullanıcı bilgilerini al
  const getUserInfo = async (token) => {
    try {
      const response = await fetch(`${API_URL}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
        setIsAuthenticated(true);
        return true;
      } else {
        // Token geçersiz, temizle
        await AsyncStorage.removeItem('access_token');
        return false;
      }
    } catch (error) {
      console.error('Kullanıcı bilgisi alınamadı:', error);
      return false;
    }
  };

  // ✅ BURAYA EKLEDİM: Backend'e kayıt API çağrısı
  const register = async (email, password, phone) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          phone,
          password,
          password_confirm: password // password tekrar aynı
        })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Başarılı', 'Kayıt başarıyla tamamlandı! Şimdi giriş yapabilirsiniz.');
        return true;
      } else {
        // Backend'den gelen hata mesajı
        Alert.alert('Hata', data.detail || 'Kayıt başarısız!');
        return false;
      }
    } catch (error) {
      console.error('Kayıt hatası:', error);
      Alert.alert('Hata', 'Sunucuya bağlanılamadı. Lütfen backend\'in çalıştığından emin olun.');
      return false;
    }
  };

  // ✅ BURAYA EKLEDİM: Backend'e login API çağrısı
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        const { access_token } = data;
        
        // ✅ Token'ı AsyncStorage'a kaydet
        await AsyncStorage.setItem('access_token', access_token);
        
        // Kullanıcı bilgilerini al
        await getUserInfo(access_token);
        
        Alert.alert('Hoş Geldiniz!', `${email} olarak giriş yaptınız.`);
        return true;
      } else {
        Alert.alert('Hata', data.detail || 'Email veya şifre hatalı!');
        return false;
      }
    } catch (error) {
      console.error('Giriş hatası:', error);
      Alert.alert('Hata', 'Sunucuya bağlanılamadı. Lütfen backend\'in çalıştığından emin olun.');
      return false;
    }
  };

  // ✅ BURAYA EKLEDİM: Token'ı temizleyerek çıkış yap
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      setCurrentUser(null);
      setIsAuthenticated(false);
      Alert.alert('Çıkış Yapıldı', 'Başarıyla çıkış yaptınız.');
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      currentUser,
      loading, // ✅ BURAYA EKLEDİM: Loading state
      login, 
      logout,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook - Auth state'i kullanmak için
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

