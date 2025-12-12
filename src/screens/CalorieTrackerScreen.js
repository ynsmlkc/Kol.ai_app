import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  Image, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CalorieTrackerScreen = ({ navigation }) => {
  const [foodName, setFoodName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Kameradan fotoğraf çek
  const takePhoto = async () => {
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
      setResult(null); // Eski sonucu temizle
    }
  };

  // Galeriden fotoğraf seç
  const pickImage = async () => {
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
      setResult(null); // Eski sonucu temizle
    }
  };

  // AI Analizi (Şimdilik Mock Data)
  const analyzeFood = async () => {
    if (!foodName && !selectedImage) {
      Alert.alert('Eksik Bilgi', 'Lütfen yemek adı girin veya fotoğraf yükleyin!');
      return;
    }

    setLoading(true);
    setResult(null);

    // 🤖 Mock AI Response (2 saniye bekle, gerçek gibi görünsün)
    setTimeout(() => {
      const mockResult = {
        foodName: foodName || 'Tespit Edilen Yemek',
        calories: Math.floor(Math.random() * 500) + 200, // 200-700 arası
        protein: Math.floor(Math.random() * 40) + 10,
        carbs: Math.floor(Math.random() * 60) + 20,
        fat: Math.floor(Math.random() * 30) + 5,
        portion: '1 porsiyon (200g)',
      };
      
      setResult(mockResult);
      setLoading(false);
    }, 2000);

    // 🔜 İleride gerçek AI API çağrısı yapılacak:
    // const response = await fetch(`${API_URL}/api/analyze-food`, {
    //   method: 'POST',
    //   body: formData
    // });
  };

  // Temizle
  const resetForm = () => {
    setFoodName('');
    setSelectedImage(null);
    setResult(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.icon}>🍎</Text>
        <Text style={styles.title}>Kalori Hesaplama</Text>
        <Text style={styles.subtitle}>AI ile yemek analizü</Text>

        {/* Fotoğraf Yükleme Butonları */}
        <View style={styles.photoButtons}>
          <TouchableOpacity 
            style={styles.photoButton} 
            onPress={takePhoto}
            disabled={loading}
          >
            <Text style={styles.photoButtonIcon}>📷</Text>
            <Text style={styles.photoButtonText}>Fotoğraf Çek</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.photoButton} 
            onPress={pickImage}
            disabled={loading}
          >
            <Text style={styles.photoButtonIcon}>🖼️</Text>
            <Text style={styles.photoButtonText}>Galeriden Seç</Text>
          </TouchableOpacity>
        </View>

        {/* Seçilen Fotoğraf */}
        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
            <TouchableOpacity 
              style={styles.removeImageButton} 
              onPress={() => setSelectedImage(null)}
            >
              <Text style={styles.removeImageText}>❌</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Veya Yazarak Gir */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>VEYA</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Text Input */}
        <TextInput
          style={styles.input}
          placeholder="Yemek adı girin (örn: 'Tavuk göğsü 200gr')"
          placeholderTextColor="#555"
          value={foodName}
          onChangeText={setFoodName}
          editable={!loading}
        />

        {/* Analiz Et Butonu */}
        <TouchableOpacity 
          style={[styles.analyzeButton, loading && styles.analyzeButtonDisabled]} 
          onPress={analyzeFood}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.analyzeButtonText}>🤖 AI ile Analiz Et</Text>
          )}
        </TouchableOpacity>

        {/* Sonuç Kartı */}
        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>📊 Analiz Sonucu</Text>
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Yemek:</Text>
              <Text style={styles.resultValue}>{result.foodName}</Text>
            </View>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Porsiyon:</Text>
              <Text style={styles.resultValue}>{result.portion}</Text>
            </View>

            <View style={styles.dividerLine2} />

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>🔥 Kalori:</Text>
              <Text style={styles.resultValueBig}>{result.calories} kcal</Text>
            </View>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>🥩 Protein:</Text>
              <Text style={styles.resultValue}>{result.protein}g</Text>
            </View>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>🍞 Karbonhidrat:</Text>
              <Text style={styles.resultValue}>{result.carbs}g</Text>
            </View>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>🧈 Yağ:</Text>
              <Text style={styles.resultValue}>{result.fat}g</Text>
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
              <Text style={styles.resetButtonText}>🔄 Yeni Analiz</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Mock Data Uyarısı */}
        <Text style={styles.mockWarning}>
          ⚠️ Şu anda test verileri gösteriliyor. Gerçek AI entegrasyonu yakında!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  icon: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    marginBottom: 25,
    textAlign: 'center',
  },
  photoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  photoButton: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  photoButtonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImageText: {
    fontSize: 18,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  dividerLine2: {
    width: '100%',
    height: 1,
    backgroundColor: '#333',
    marginVertical: 15,
  },
  dividerText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '600',
    marginHorizontal: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 20,
  },
  analyzeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  analyzeButtonDisabled: {
    backgroundColor: '#555',
  },
  analyzeButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  resultCard: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 15,
    color: '#888',
    fontWeight: '500',
  },
  resultValue: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },
  resultValueBig: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '700',
  },
  resetButton: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 15,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  mockWarning: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 30,
  },
});

export default CalorieTrackerScreen;



