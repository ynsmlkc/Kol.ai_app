import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { API_URL } from '../config/api';

const QuestionSolverScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: 'Merhaba! Ben soru çözme asistanınım. \n\nMatematik, fizik, programlama ve diğer derslerdeki sorularınızı fotoğraflayabilir veya yazabilirsiniz.\n\nAdım adım çözüm ve açıklamalar ile öğrenmenize yardımcı olacağım!',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const scrollViewRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const addMessage = (type, text, data = null) => {
    const newMessage = {
      id: Date.now(),
      type,
      text,
      data,
      timestamp: new Date().toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const solveQuestion = async (questionText = null, imageUri = null) => {
    try {
      setLoading(true);

      const formData = new FormData();

      // Add question text if provided
      if (questionText && questionText.trim()) {
        formData.append('question', questionText.trim());
      }

      // Add image if provided
      if (imageUri) {
        const filename = imageUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';

        formData.append('file', {
          uri: imageUri,
          name: filename || 'question.jpg',
          type,
        });
      }

      console.log('📤 Soru gönderiliyor...', {
        hasQuestion: !!questionText,
        hasImage: !!imageUri,
        questionText: questionText,
        apiUrl: `${API_URL}/ai/solve`,
      });

      const response = await fetch(`${API_URL}/ai/solve`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      console.log('📥 Yanıt alındı:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Soru çözülemedi');
      }

      const result = await response.json();
      console.log('✅ Çözüm:', result);

      // Add AI response with solution
      addMessage('ai', null, result);
    } catch (error) {
      console.error('❌ Hata:', error);
      addMessage(
        'ai',
        `❌ Hata: ${error.message}\n\nLütfen tekrar deneyin veya soruyu farklı şekilde ifade edin.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) {
      return;
    }

    // Add user message
    addMessage('user', inputText);

    // Solve question
    solveQuestion(inputText);

    // Clear input
    setInputText('');
  };

  const handleCamera = async () => {
    setShowActionSheet(false);

    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'İzin Gerekli',
        'Kamera kullanmak için izin vermeniz gerekiyor.',
        [{ text: 'Tamam' }]
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      base64: false,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const imageUri = result.assets[0].uri;

      // Add user message with image indicator
      addMessage('user', '📸 Fotoğraf gönderildi');

      // Solve question with image
      solveQuestion(null, imageUri);
    }
  };

  const handleGallery = async () => {
    setShowActionSheet(false);

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'İzin Gerekli',
        'Galeriye erişmek için izin vermeniz gerekiyor.',
        [{ text: 'Tamam' }]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      base64: false,
      allowsEditing: false,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const imageUri = result.assets[0].uri;

      // Add user message with image indicator
      addMessage('user', '📸 Fotoğraf gönderildi');

      // Solve question with image
      solveQuestion(null, imageUri);
    }
  };

  const renderMessage = (message) => {
    if (message.type === 'user') {
      return (
        <View key={message.id} style={styles.userMessageContainer}>
          <View style={styles.userMessage}>
            <Text style={styles.userMessageText}>{message.text}</Text>
          </View>
        </View>
      );
    }

    // AI message
    if (message.data) {
      // Solution data
      const {
        detected_question,
        topic,
        difficulty,
        solution_steps,
        final_answer,
        key_concepts,
        formulas_used,
        confidence,
      } = message.data;

      return (
        <View key={message.id} style={styles.aiMessageContainer}>
          <View style={styles.aiMessage}>
            {/* Detected Question */}
            {detected_question && (
              <View style={styles.solutionSection}>
                <Text style={styles.sectionTitle}>📝 Soru:</Text>
                <Text style={styles.sectionText}>{detected_question}</Text>
              </View>
            )}

            {/* Topic & Difficulty */}
            {(topic || difficulty) && (
              <View style={styles.metadataRow}>
                {topic && (
                  <View style={styles.metadataTag}>
                    <Text style={styles.metadataText}>📚 {topic}</Text>
                  </View>
                )}
                {difficulty && (
                  <View
                    style={[
                      styles.metadataTag,
                      difficulty === 'easy' && styles.difficultyEasy,
                      difficulty === 'medium' && styles.difficultyMedium,
                      difficulty === 'hard' && styles.difficultyHard,
                    ]}
                  >
                    <Text style={styles.metadataText}>
                      {difficulty === 'easy'
                        ? '🟢 Kolay'
                        : difficulty === 'medium'
                        ? '🟡 Orta'
                        : '🔴 Zor'}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Solution Steps */}
            {solution_steps && solution_steps.length > 0 && (
              <View style={styles.solutionSection}>
                <Text style={styles.sectionTitle}>🔍 Çözüm Adımları:</Text>
                {solution_steps.map((step, index) => (
                  <View key={index} style={styles.stepContainer}>
                    <Text style={styles.stepNumber}>{index + 1}</Text>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Final Answer */}
            {final_answer && (
              <View style={[styles.solutionSection, styles.finalAnswerSection]}>
                <Text style={styles.sectionTitle}>✅ Son Cevap:</Text>
                <Text style={styles.finalAnswerText}>{final_answer}</Text>
              </View>
            )}

            {/* Key Concepts */}
            {key_concepts && key_concepts.length > 0 && (
              <View style={styles.solutionSection}>
                <Text style={styles.sectionTitle}>💡 Anahtar Kavramlar:</Text>
                {key_concepts.map((concept, index) => (
                  <Text key={index} style={styles.bulletText}>
                    • {concept}
                  </Text>
                ))}
              </View>
            )}

            {/* Formulas */}
            {formulas_used && formulas_used.length > 0 && (
              <View style={styles.solutionSection}>
                <Text style={styles.sectionTitle}>📐 Kullanılan Formüller:</Text>
                {formulas_used.map((formula, index) => (
                  <Text key={index} style={styles.bulletText}>
                    • {formula}
                  </Text>
                ))}
              </View>
            )}

            {/* Confidence */}
            {confidence !== undefined && (
              <View style={styles.confidenceContainer}>
                <Text style={styles.confidenceText}>
                  Güven: {(confidence * 100).toFixed(0)}%
                </Text>
              </View>
            )}
          </View>
        </View>
      );
    }

    // Simple text message
    return (
      <View key={message.id} style={styles.aiMessageContainer}>
        <View style={styles.aiMessage}>
          <Text style={styles.aiMessageText}>{message.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => renderMessage(message))}

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#5B52FF" />
            <Text style={styles.loadingText}>Çözülüyor...</Text>
          </View>
        )}
      </ScrollView>

      {/* Action Sheet */}
      {showActionSheet && (
        <View style={styles.actionSheet}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCamera}>
            <Ionicons name="camera" size={24} color="#5B52FF" />
            <Text style={styles.actionButtonText}>Fotoğraf Çek</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleGallery}>
            <Ionicons name="images" size={24} color="#5B52FF" />
            <Text style={styles.actionButtonText}>Galeriden Seç</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonCancel]}
            onPress={() => setShowActionSheet(false)}
          >
            <Text style={styles.actionButtonCancelText}>İptal</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowActionSheet(!showActionSheet)}
        >
          <Ionicons name="add-circle" size={32} color="#5B52FF" />
        </TouchableOpacity>

        <TextInput
          style={styles.textInput}
          placeholder="Sorunuzu buraya yazın..."
          placeholderTextColor="#666"
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={1000}
        />

        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim() || loading}
        >
          <Ionicons name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  // Messages
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  userMessage: {
    backgroundColor: '#5B52FF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '80%',
  },
  userMessageText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 20,
  },
  aiMessageContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  aiMessage: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    maxWidth: '90%',
  },
  aiMessageText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 22,
  },
  // Solution sections
  solutionSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5B52FF',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  metadataRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  metadataTag: {
    backgroundColor: '#2A2A3E',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  metadataText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  difficultyEasy: {
    backgroundColor: '#1a4d1a',
  },
  difficultyMedium: {
    backgroundColor: '#4d4d1a',
  },
  difficultyHard: {
    backgroundColor: '#4d1a1a',
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#5B52FF',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  finalAnswerSection: {
    backgroundColor: '#2A2A3E',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  finalAnswerText: {
    fontSize: 16,
    color: '#5CDB95',
    fontWeight: '600',
    lineHeight: 22,
  },
  bulletText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    marginBottom: 4,
  },
  confidenceContainer: {
    alignItems: 'flex-end',
  },
  confidenceText: {
    fontSize: 12,
    color: '#8B8B9A',
    fontStyle: 'italic',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#8B8B9A',
  },
  // Action Sheet
  actionSheet: {
    backgroundColor: '#1A1A2E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#2A2A3E',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#2A2A3E',
    borderRadius: 12,
    marginBottom: 10,
  },
  actionButtonText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  actionButtonCancel: {
    backgroundColor: '#3A3A4E',
  },
  actionButtonCancelText: {
    fontSize: 16,
    color: '#FF5252',
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  // Input Bar
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0F1119',
    borderTopWidth: 1,
    borderTopColor: '#1A1A2E',
  },
  addButton: {
    marginRight: 8,
    marginBottom: 4,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#FFFFFF',
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5B52FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  sendButtonDisabled: {
    backgroundColor: '#2A2A3E',
  },
});

export default QuestionSolverScreen;
