import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Ekranları import et
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import PdfAnalyzerScreen from '../screens/PdfAnalyzerScreen';
import CalorieTrackerScreen from '../screens/CalorieTrackerScreen';
import ImageGeneratorScreen from '../screens/ImageGeneratorScreen';
import TextSummaryScreen from '../screens/TextSummaryScreen';
import TextWriterScreen from '../screens/TextWriterScreen';
import PhotoEditorScreen from '../screens/PhotoEditorScreen';
import TranslatorScreen from '../screens/TranslatorScreen';
import NoteCreatorScreen from '../screens/NoteCreatorScreen';
import QuestionSolverScreen from '../screens/QuestionSolverScreen';
import DocumentAnalysisScreen from '../screens/DocumentAnalysisScreen';
import SpeechTranscriptionScreen from '../screens/SpeechTranscriptionScreen';
import CodeCompletionScreen from '../screens/CodeCompletionScreen';

const Stack = createStackNavigator();

// Auth Stack - Giriş yapılmadan önce gösterilen ekranlar
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

// App Stack - Giriş yapıldıktan sonra gösterilen ana uygulama ekranları
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0a0a0a',
        },
        headerTintColor: '#007AFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#fff',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'KOL.AI',
          headerShown: false, // Header'ı gizle, kendi tasarımımızı kullanıyoruz
        }}
      />
      <Stack.Screen 
        name="PdfAnalyzer" 
        component={PdfAnalyzerScreen}
        options={{
          title: 'PDF Analizör',
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#007AFF',
        }}
      />
      <Stack.Screen 
        name="CalorieTracker" 
        component={CalorieTrackerScreen}
        options={{
          title: 'Kalori Takipçi',
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#007AFF',
        }}
      />
      <Stack.Screen 
        name="ImageGenerator" 
        component={ImageGeneratorScreen}
        options={{
          title: 'Görsel Üret',
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#007AFF',
        }}
      />
      <Stack.Screen 
        name="TextSummary" 
        component={TextSummaryScreen}
        options={{
          title: 'Metin Özetle',
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#007AFF',
        }}
      />
      <Stack.Screen 
        name="TextWriter" 
        component={TextWriterScreen}
        options={{
          title: 'Metin Yaz',
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#007AFF',
        }}
      />
      <Stack.Screen 
        name="PhotoEditor" 
        component={PhotoEditorScreen}
        options={{
          title: 'Fotoğraf Düzenle',
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#007AFF',
        }}
      />
      <Stack.Screen 
        name="Translator" 
        component={TranslatorScreen}
        options={{
          title: 'Çeviri',
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#007AFF',
        }}
      />
      <Stack.Screen 
        name="NoteCreator" 
        component={NoteCreatorScreen}
        options={{
          title: 'Not Oluştur',
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#007AFF',
        }}
      />
      <Stack.Screen 
        name="QuestionSolver" 
        component={QuestionSolverScreen}
        options={{
          title: 'Soru Çözücü',
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#007AFF',
        }}
      />
      <Stack.Screen 
        name="DocumentAnalysis" 
        component={DocumentAnalysisScreen}
        options={{
          title: 'Belge Analizi',
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#007AFF',
        }}
      />
      <Stack.Screen 
        name="SpeechTranscription" 
        component={SpeechTranscriptionScreen}
        options={{
          title: 'Konuşma Transkripsiyonu',
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#007AFF',
        }}
      />
      <Stack.Screen 
        name="CodeCompletion" 
        component={CodeCompletionScreen}
        options={{
          title: 'Kod Tamamlama',
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#007AFF',
        }}
      />
    </Stack.Navigator>
  );
};

// Navigation - Auth durumuna göre doğru stack'i gösterir
const Navigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

// Ana Navigator - AuthProvider ile sarmalı
const AppNavigator = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default AppNavigator;

