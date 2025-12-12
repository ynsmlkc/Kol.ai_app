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

const ImageGeneratorScreen = ({ navigation }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const styles_options = [
    { id: 'realistic', name: 'Gerçekçi', icon: '📸' },
    { id: 'artistic', name: 'Sanatsal', icon: '🎨' },
    { id: 'anime', name: 'Anime', icon: '🎌' },
    { id: 'sketch', name: 'Sketch', icon: '✏️' },
  ];

  const generateImage = async () => {
    if (!prompt.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen görsel açıklaması girin!');
      return;
    }

    setLoading(true);
    setGeneratedImage(null);

    // 🤖 Mock AI Image Generation (3 saniye bekle)
    setTimeout(() => {
      // Mock image URL (placeholder)
      const mockImageUrl = `https://picsum.photos/512/512?random=${Date.now()}`;
      
      setGeneratedImage({
        url: mockImageUrl,
        prompt: prompt,
        style: selectedStyle,
        timestamp: new Date().toLocaleString('tr-TR'),
      });
      
      setLoading(false);
    }, 3000);

    // 🔜 İleride gerçek AI API (DALL-E, Midjourney, Stable Diffusion):
    // const response = await fetch(`${API_URL}/api/generate-image`, {
    //   method: 'POST',
    //   body: JSON.stringify({ prompt, style: selectedStyle })
    // });
  };

  const resetForm = () => {
    setPrompt('');
    setGeneratedImage(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.icon}>🖼️</Text>
        <Text style={styles.title}>Görsel Üretici</Text>
        <Text style={styles.subtitle}>AI ile benzersiz görseller oluşturun</Text>

        {/* Prompt Input */}
        <TextInput
          style={styles.promptInput}
          placeholder="Görseli açıklayın (örn: 'Gün batımında okyanus manzarası')"
          placeholderTextColor="#555"
          value={prompt}
          onChangeText={setPrompt}
          multiline
          numberOfLines={3}
          editable={!loading}
        />

        {/* Stil Seçimi */}
        <Text style={styles.sectionTitle}>🎨 Stil Seçin</Text>
        <View style={styles.styleGrid}>
          {styles_options.map((style) => (
            <TouchableOpacity
              key={style.id}
              style={[
                styles.styleButton,
                selectedStyle === style.id && styles.styleButtonActive,
              ]}
              onPress={() => setSelectedStyle(style.id)}
              disabled={loading}
            >
              <Text style={styles.styleIcon}>{style.icon}</Text>
              <Text style={[
                styles.styleText,
                selectedStyle === style.id && styles.styleTextActive,
              ]}>
                {style.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Üret Butonu */}
        <TouchableOpacity 
          style={[styles.generateButton, loading && styles.generateButtonDisabled]} 
          onPress={generateImage}
          disabled={loading}
        >
          {loading ? (
            <>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={styles.generateButtonText}>  Oluşturuluyor...</Text>
            </>
          ) : (
            <Text style={styles.generateButtonText}>✨ Görsel Oluştur</Text>
          )}
        </TouchableOpacity>

        {/* Sonuç */}
        {generatedImage && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>🎉 Görseliniz Hazır!</Text>
            
            <Image 
              source={{ uri: generatedImage.url }} 
              style={styles.generatedImage}
              resizeMode="cover"
            />

            <View style={styles.imageInfo}>
              <Text style={styles.imageInfoLabel}>Prompt:</Text>
              <Text style={styles.imageInfoValue}>{generatedImage.prompt}</Text>
            </View>

            <View style={styles.imageInfo}>
              <Text style={styles.imageInfoLabel}>Stil:</Text>
              <Text style={styles.imageInfoValue}>
                {styles_options.find(s => s.id === generatedImage.style)?.name}
              </Text>
            </View>

            <View style={styles.imageInfo}>
              <Text style={styles.imageInfoLabel}>Oluşturulma:</Text>
              <Text style={styles.imageInfoValue}>{generatedImage.timestamp}</Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>💾 İndir</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>🔗 Paylaş</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
              <Text style={styles.resetButtonText}>🔄 Yeni Görsel</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Mock Data Uyarısı */}
        <Text style={styles.mockWarning}>
          ⚠️ Şu anda test görselleri gösteriliyor. Gerçek AI entegrasyonu yakında!
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
  promptInput: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 25,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  styleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  styleButton: {
    width: '48%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  styleButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  styleIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  styleText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
  },
  styleTextActive: {
    color: '#fff',
  },
  generateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 25,
  },
  generateButtonDisabled: {
    backgroundColor: '#555',
  },
  generateButtonText: {
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
  generatedImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  imageInfo: {
    marginBottom: 10,
  },
  imageInfoLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  imageInfoValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
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

export default ImageGeneratorScreen;













