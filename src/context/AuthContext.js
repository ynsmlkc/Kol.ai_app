import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';

// ✅ BURAYA EKLEDİM: authService'den tüm fonksiyonları import et
import * as authService from '../services/authService';

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

  // ✅ BURAYA EKLEDİM: Token kontrolü - authService kullanıyor
  const checkAuth = async () => {
    try {
      const isLoggedIn = await authService.isLoggedIn();
      if (isLoggedIn) {
        // Token varsa kullanıcı bilgilerini al
        const user = await authService.getUserInfo();
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('Token kontrolü hatası:', error);
      // Token geçersizse temizle
      await authService.logout();
    } finally {
      setLoading(false);
    }
  };

  // ✅ BURAYA EKLEDİM: Kayıt fonksiyonu - authService kullanıyor
  const registerUser = async (email, password, phone) => {
    try {
      await authService.register(email, phone, password, password);
      Alert.alert('Başarılı', 'Kayıt başarıyla tamamlandı! Şimdi giriş yapabilirsiniz.');
      return true;
    } catch (error) {
      console.error('Kayıt hatası:', error);
      Alert.alert('Hata', error.message || 'Kayıt başarısız!');
      return false;
    }
  };

  // ✅ BURAYA EKLEDİM: Giriş fonksiyonu - authService kullanıyor
  const loginUser = async (email, password) => {
    try {
      await authService.login(email, password);
      
      // Kullanıcı bilgilerini al
      const user = await authService.getUserInfo();
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      Alert.alert('Hoş Geldiniz!', `${email} olarak giriş yaptınız.`);
      return true;
    } catch (error) {
      console.error('Giriş hatası:', error);
      Alert.alert('Hata', error.message || 'Giriş başarısız!');
      return false;
    }
  };

  // ✅ BURAYA EKLEDİM: Çıkış fonksiyonu - authService kullanıyor
  const logoutUser = async () => {
    try {
      await authService.logout();
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
      loading,
      login: loginUser, // ✅ BURAYA EKLEDİM: Yeni isimle export
      logout: logoutUser, // ✅ BURAYA EKLEDİM: Yeni isimle export
      register: registerUser, // ✅ BURAYA EKLEDİM: Yeni isimle export
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

