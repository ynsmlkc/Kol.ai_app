import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  Image, 
  ActivityIndicator,
  Alert,
  Modal,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CalorieTrackerScreen = ({ navigation }) => {
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  // Action Sheet Aç/Kapat
  const openActionSheet = () => {
    setShowActionSheet(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  };

  const closeActionSheet = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setShowActionSheet(false);
    });
  };

  // Kameradan fotoğraf çek
  const takePhoto = async () => {
    closeActionSheet();
    
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('İzin Gerekli', 'Kamera kullanmak için izin vermelisiniz!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setResult(null);
    }
  };

  // Galeriden fotoğraf seç
  const pickImage = async () => {
    closeActionSheet();
    
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('İzin Gerekli', 'Galeriye erişmek için izin vermelisiniz!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setResult(null);
    }
  };

  // PDF Yükle (placeholder)
  const uploadPDF = () => {
    closeActionSheet();
    Alert.alert('Çok Yakında!', 'PDF yükleme özelliği yakında eklenecek!');
  };

  // Yazarak Gir
  const openTextInput = () => {
    closeActionSheet();
    // Input alanına focus yap (zaten altta var)
  };

  // AI Analizi (Şimdilik Mock Data)
  const analyzeFood = async () => {
    if (!inputText.trim() && !selectedImage) {
      Alert.alert('Eksik Bilgi', 'Lütfen yemek adı girin veya fotoğraf yükleyin!');
      return;
    }

    setLoading(true);
    setResult(null);

    // 🤖 Mock AI Response (2 saniye bekle)
    setTimeout(() => {
      const mockResult = {
        foodName: inputText || 'Tespit Edilen Yemek',
        calories: Math.floor(Math.random() * 500) + 200,
        protein: Math.floor(Math.random() * 40) + 10,
        carbs: Math.floor(Math.random() * 60) + 20,
        fat: Math.floor(Math.random() * 30) + 5,
        portion: '1 porsiyon (200g)',
      };
      
      setResult(mockResult);
      setLoading(false);
    }, 2000);

    // 🔜 İleride gerçek AI API çağrısı yapılacak
  };

  // Temizle
  const resetForm = () => {
    setInputText('');
    setSelectedImage(null);
    setResult(null);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      {/* Ana İçerik Alanı */}
      <ScrollView 
        style={styles.messagesArea}
        contentContainerStyle={styles.messagesContent}
      >
        {/* Başlangıç Mesajı */}
        {!result && !selectedImage && !loading && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🍎</Text>
            <Text style={styles.emptyTitle}>Kalori Hesaplama</Text>
            <Text style={styles.emptySubtitle}>
              Fotoğraf yükleyin veya yemek adı yazın, AI analizini başlatalım!
            </Text>
          </View>
        )}

        {/* Seçilen Fotoğraf (Bubble Tarzı) */}
        {selectedImage && (
          <View style={styles.userBubble}>
            <Image source={{ uri: selectedImage }} style={styles.bubbleImage} />
            <TouchableOpacity 
              style={styles.removeImageButton} 
              onPress={() => setSelectedImage(null)}
            >
              <Text style={styles.removeImageText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Loading */}
        {loading && (
          <View style={styles.aiBubble}>
            <ActivityIndicator color="#007AFF" size="small" />
            <Text style={styles.aiLoadingText}>  Analiz ediliyor...</Text>
          </View>
        )}

        {/* Sonuç Kartı (AI Response Bubble) */}
        {result && (
          <View style={styles.aiBubble}>
            <Text style={styles.aiTitle}>📊 Analiz Sonucu</Text>
            
            <View style={styles.resultInfo}>
              <Text style={styles.foodName}>{result.foodName}</Text>
              <Text style={styles.portion}>{result.portion}</Text>
            </View>

            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionBox}>
                <Text style={styles.nutritionValue}>{result.calories}</Text>
                <Text style={styles.nutritionLabel}>Kalori (kcal)</Text>
              </View>

              <View style={styles.nutritionBox}>
                <Text style={styles.nutritionValue}>{result.protein}g</Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>

              <View style={styles.nutritionBox}>
                <Text style={styles.nutritionValue}>{result.carbs}g</Text>
                <Text style={styles.nutritionLabel}>Karbonhidrat</Text>
              </View>

              <View style={styles.nutritionBox}>
                <Text style={styles.nutritionValue}>{result.fat}g</Text>
                <Text style={styles.nutritionLabel}>Yağ</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.newAnalysisButton} onPress={resetForm}>
              <Text style={styles.newAnalysisText}>🔄 Yeni Analiz</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Alt Input Bar (ChatGPT Tarzı) */}
      <View style={styles.inputBar}>
        {/* + Butonu */}
        <TouchableOpacity 
          style={styles.plusButton} 
          onPress={openActionSheet}
          disabled={loading}
        >
          <Text style={styles.plusButtonText}>+</Text>
        </TouchableOpacity>

        {/* Text Input */}
        <TextInput
          style={styles.messageInput}
          placeholder="Bir yemek yazın veya fotoğraf yükleyin..."
          placeholderTextColor="#888"
          value={inputText}
          onChangeText={setInputText}
          editable={!loading}
          multiline
          maxLength={200}
        />

        {/* Gönder Butonu */}
        <TouchableOpacity 
          style={[styles.sendButton, (!inputText.trim() && !selectedImage) && styles.sendButtonDisabled]}
          onPress={analyzeFood}
          disabled={loading || (!inputText.trim() && !selectedImage)}
        >
          <Text style={styles.sendButtonText}>↑</Text>
        </TouchableOpacity>
      </View>

      {/* Action Sheet Modal (Kartlar) */}
      <Modal
        visible={showActionSheet}
        transparent
        animationType="none"
        onRequestClose={closeActionSheet}
      >
        <Pressable style={styles.modalOverlay} onPress={closeActionSheet}>
          <Animated.View 
            style={[
              styles.actionSheet,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.actionSheetHandle} />
            
            <Text style={styles.actionSheetTitle}>Ne yapmak istersiniz?</Text>

            <TouchableOpacity style={styles.actionItem} onPress={takePhoto}>
              <Text style={styles.actionIcon}>📷</Text>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>Fotoğraf Çek</Text>
                <Text style={styles.actionDesc}>Kamerayı aç ve çek</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem} onPress={pickImage}>
              <Text style={styles.actionIcon}>🖼️</Text>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>Galeriden Seç</Text>
                <Text style={styles.actionDesc}>Mevcut fotoğraflardan seç</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem} onPress={uploadPDF}>
              <Text style={styles.actionIcon}>📄</Text>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>PDF Yükle</Text>
                <Text style={styles.actionDesc}>Besin listesi PDF'i</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem} onPress={openTextInput}>
              <Text style={styles.actionIcon}>✍️</Text>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>Yazarak Gir</Text>
                <Text style={styles.actionDesc}>Yemek adını yazın</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={closeActionSheet}>
              <Text style={styles.cancelButtonText}>İptal</Text>
            </TouchableOpacity>
          </Animated.View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  messagesArea: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 22,
  },
  // User Bubble (Fotoğraf)
  userBubble: {
    alignSelf: 'flex-end',
    maxWidth: '80%',
    marginBottom: 12,
    position: 'relative',
  },
  bubbleImage: {
    width: 250,
    height: 250,
    borderRadius: 16,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImageText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  // AI Bubble (Sonuç)
  aiBubble: {
    alignSelf: 'flex-start',
    maxWidth: '95%',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  aiLoadingText: {
    color: '#888',
    fontSize: 14,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  resultInfo: {
    marginBottom: 16,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  portion: {
    fontSize: 13,
    color: '#888',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  nutritionBox: {
    width: '48%',
    backgroundColor: '#0a0a0a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 11,
    color: '#888',
  },
  newAnalysisButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  newAnalysisText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  // Input Bar (Alt)
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    backgroundColor: '#0a0a0a',
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  plusButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  plusButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '400',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: 10,
    color: '#fff',
    fontSize: 15,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#333',
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#333',
  },
  sendButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  // Action Sheet (Modal)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  actionSheet: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  actionSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#444',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  actionSheetTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#0a0a0a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  actionIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  actionDesc: {
    fontSize: 13,
    color: '#888',
  },
  cancelButton: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default CalorieTrackerScreen;



