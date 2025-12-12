import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  ActivityIndicator,
  Alert 
} from 'react-native';

const TextSummaryScreen = ({ navigation }) => {
  const [inputText, setInputText] = useState('');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  const lengthOptions = [
    { id: 'short', name: 'Kısa', icon: '⚡', desc: '2-3 cümle' },
    { id: 'medium', name: 'Orta', icon: '📄', desc: '1 paragraf' },
    { id: 'detailed', name: 'Detaylı', icon: '📋', desc: '2-3 paragraf' },
  ];

  const generateSummary = async () => {
    if (!inputText.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen özetlemek istediğiniz metni girin!');
      return;
    }

    if (inputText.length < 100) {
      Alert.alert('Çok Kısa Metin', 'Lütfen en az 100 karakter uzunluğunda bir metin girin!');
      return;
    }

    setLoading(true);
    setSummary(null);

    // 🤖 Mock AI Summary (2 saniye bekle)
    setTimeout(() => {
      const mockSummaries = {
        short: 'Bu metnin ana fikri X konusunu ele almaktadır. Sonuç olarak Y önerilmektedir.',
        medium: 'Bu kapsamlı metnin temel amacı, X konusundaki önemli gelişmeleri ve Y faktörlerini incelemektir. Analiz sonucunda Z konusunun kritik öneme sahip olduğu belirtilmektedir. Gelecek projeksiyonlarına göre bu alandaki çalışmaların artması beklenmektedir.',
        detailed: 'Sunulan metin, modern çağın karmaşık problemlerinden biri olan X konusunu derinlemesine ele almaktadır. Yazarın temel argümanı, Y faktörünün bu süreçte oynadığı kritik roldür.\n\nMetinde öne çıkan ikinci önemli nokta, Z gelişmelerinin uzun vadeli etkilerinin kapsamlı bir şekilde değerlendirilmesidir. Bu değerlendirmeler ışığında, sektörel ve akademik çevrelerde yeni yaklaşımların benimsenmesi önerilmektedir.\n\nSonuç olarak, bu çalışmanın gelecek araştırmalar için sağlam bir temel oluşturduğu ve konuya yeni perspektifler kazandırdığı görülmektedir.'
      };
      
      const mockResult = {
        summary: mockSummaries[summaryLength],
        wordCount: inputText.split(' ').length,
        summaryWordCount: mockSummaries[summaryLength].split(' ').length,
        compressionRate: Math.floor((1 - (mockSummaries[summaryLength].length / inputText.length)) * 100),
        timestamp: new Date().toLocaleString('tr-TR'),
      };
      
      setSummary(mockResult);
      setLoading(false);
    }, 2000);

    // 🔜 İleride gerçek AI API (GPT-4, Claude):
    // const response = await fetch(`${API_URL}/api/summarize-text`, {
    //   method: 'POST',
    //   body: JSON.stringify({ text: inputText, length: summaryLength })
    // });
  };

  const resetForm = () => {
    setInputText('');
    setSummary(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.icon}>📝</Text>
        <Text style={styles.title}>Metin Özetleyici</Text>
        <Text style={styles.subtitle}>AI ile hızlı özet çıkarın</Text>

        {/* Text Input */}
        <TextInput
          style={styles.textInput}
          placeholder="Özetlemek istediğiniz metni buraya yapıştırın... (En az 100 karakter)"
          placeholderTextColor="#555"
          value={inputText}
          onChangeText={setInputText}
          multiline
          numberOfLines={10}
          editable={!loading}
        />

        <Text style={styles.charCount}>
          {inputText.length} karakter • {inputText.split(' ').filter(w => w).length} kelime
        </Text>

        {/* Özet Uzunluğu Seçimi */}
        <Text style={styles.sectionTitle}>📏 Özet Uzunluğu</Text>
        <View style={styles.lengthOptions}>
          {lengthOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.lengthButton,
                summaryLength === option.id && styles.lengthButtonActive,
              ]}
              onPress={() => setSummaryLength(option.id)}
              disabled={loading}
            >
              <Text style={styles.lengthIcon}>{option.icon}</Text>
              <Text style={[
                styles.lengthName,
                summaryLength === option.id && styles.lengthNameActive,
              ]}>
                {option.name}
              </Text>
              <Text style={styles.lengthDesc}>{option.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Özetle Butonu */}
        <TouchableOpacity 
          style={[styles.summarizeButton, loading && styles.summarizeButtonDisabled]} 
          onPress={generateSummary}
          disabled={loading}
        >
          {loading ? (
            <>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={styles.summarizeButtonText}>  Özetleniyor...</Text>
            </>
          ) : (
            <Text style={styles.summarizeButtonText}>✨ Özetle</Text>
          )}
        </TouchableOpacity>

        {/* Sonuç */}
        {summary && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>📊 Özet Sonucu</Text>
            
            <View style={styles.summaryBox}>
              <Text style={styles.summaryText}>{summary.summary}</Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{summary.wordCount}</Text>
                <Text style={styles.statLabel}>Orijinal Kelime</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statValue}>{summary.summaryWordCount}</Text>
                <Text style={styles.statLabel}>Özet Kelime</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statValue}>%{summary.compressionRate}</Text>
                <Text style={styles.statLabel}>Sıkıştırma</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
              <Text style={styles.resetButtonText}>🔄 Yeni Özet</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Mock Data Uyarısı */}
        <Text style={styles.mockWarning}>
          ⚠️ Şu anda test özetleri gösteriliyor. Gerçek AI entegrasyonu yakında!
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
  textInput: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 10,
    minHeight: 150,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  lengthOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  lengthButton: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#333',
  },
  lengthButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  lengthIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  lengthName: {
    color: '#888',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  lengthNameActive: {
    color: '#fff',
  },
  lengthDesc: {
    color: '#666',
    fontSize: 10,
  },
  summarizeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 25,
  },
  summarizeButtonDisabled: {
    backgroundColor: '#555',
  },
  summarizeButtonText: {
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
  summaryBox: {
    backgroundColor: '#0a0a0a',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  summaryText: {
    fontSize: 14,
    color: '#ddd',
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#888',
  },
  resetButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
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

export default TextSummaryScreen;
