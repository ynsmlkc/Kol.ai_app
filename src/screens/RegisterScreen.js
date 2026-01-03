import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    // Validasyonlar
    if (!email || !password || !confirmPassword || !phone) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun!');
      return;
    }

    // Email formatı kontrolü (basit)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Hata', 'Geçerli bir email adresi girin!');
      return;
    }

    // Şifre eşleşme kontrolü
    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor!');
      return;
    }

    // Şifre uzunluk kontrolü
    if (password.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır!');
      return;
    }

    // Telefon numarası kontrolü
    if (phone.length < 10) {
      Alert.alert('Hata', 'Geçerli bir telefon numarası girin!');
      return;
    }

    // Kayıt işlemi
    const success = register(email, password, phone);
    if (success) {
      // Başarılı kayıt sonrası giriş ekranına dön
      navigation.navigate('Login');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>KolAI</Text>
          <Text style={styles.tagline}>Hesap Oluştur</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="E-posta adresi"
            placeholderTextColor="#8B8B9A"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          {/* Phone Input */}
          <TextInput
            style={styles.input}
            placeholder="Telefon numarası (5XX XXX XX XX)"
            placeholderTextColor="#8B8B9A"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={11}
          />

          {/* Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Şifre (en az 6 karakter)"
              placeholderTextColor="#8B8B9A"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
                size={22} 
                color="#8B8B9A" 
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Şifre tekrar"
              placeholderTextColor="#8B8B9A"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons 
                name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} 
                size={22} 
                color="#8B8B9A" 
              />
            </TouchableOpacity>
          </View>

          {/* Register Button */}
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Kaydol</Text>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Zaten hesabınız var mı? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1119',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 50,
  },
  // Header
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 15,
    color: '#8B8B9A',
    letterSpacing: 0.3,
  },
  // Form
  form: {
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
    borderWidth: 0,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 0,
  },
  passwordInput: {
    flex: 1,
    padding: 18,
    fontSize: 16,
    color: '#FFFFFF',
  },
  eyeIcon: {
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#5B52FF',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#8B8B9A',
    fontSize: 14,
  },
  loginLink: {
    color: '#5CDB95',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RegisterScreen;
