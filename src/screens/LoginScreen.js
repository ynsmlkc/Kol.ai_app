import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Eksik Bilgi', 'Lütfen email ve şifrenizi girin!');
      return;
    }
    
    login(email, password);
  };

  const handleGoogleLogin = () => {
    Alert.alert(
      'Çok Yakında!',
      'Google ile giriş özelliği yakında eklenecek!'
    );
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Şifremi Unuttum',
      'Şifre sıfırlama özelliği yakında eklenecek!'
    );
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
          <Text style={styles.tagline}>Yapay Zeka Asistanınız</Text>
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

          {/* Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Şifre"
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

          {/* Forgot Password */}
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Şifremi unuttum?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Giriş Yap</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>VEYA</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Login Button */}
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
            <View style={styles.googleIconContainer}>
              <Text style={styles.googleIconG}>G</Text>
            </View>
            <Text style={styles.googleButtonText}>Google ile devam et</Text>
          </TouchableOpacity>
        </View>

        {/* Register Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Hesabın yok mu? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Kayıt Ol</Text>
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
    marginBottom: 12,
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
  forgotPassword: {
    color: '#8B8B9A',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 28,
  },
  loginButton: {
    backgroundColor: '#5B52FF',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 28,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#2A2A3E',
  },
  dividerText: {
    color: '#5A5A6A',
    fontSize: 12,
    marginHorizontal: 16,
    fontWeight: '500',
    letterSpacing: 1,
  },
  // Google Button
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#2A2A3E',
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  googleIconG: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  googleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
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
  registerLink: {
    color: '#5CDB95',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen;

