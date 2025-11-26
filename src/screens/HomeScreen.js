import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useAuth } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const [searchText, setSearchText] = useState('');

  // Tüm tool'ları bir array'de tanımla
  const allTools = [
    { icon: '🖼️', title: 'Görsel Üret', screen: 'ImageGenerator', keywords: 'görsel üret resim ai' },
    { icon: '🍎', title: 'Kalori Hesapla', screen: 'CalorieTracker', keywords: 'kalori hesapla yemek beslenme' },
    { icon: '📝', title: 'Metni Özetle', screen: 'TextSummary', keywords: 'metin özetle özet makale' },
    { icon: '📄', title: "PDF'ten Cümle", screen: 'PdfAnalyzer', keywords: 'pdf cümle belge' },
    { icon: '✍️', title: 'Metin Yaz', screen: 'TextWriter', keywords: 'metin yaz içerik blog' },
    { icon: '📸', title: 'Fotoğraf Düzenle', screen: 'PhotoEditor', keywords: 'fotoğraf düzenle resim filtre' },
    { icon: '🌐', title: 'Çeviri Yap', screen: 'Translator', keywords: 'çeviri translate dil' },
    { icon: '📋', title: 'Not Oluştur', screen: 'NoteCreator', keywords: 'not oluştur kayıt' },
    { icon: '❓', title: 'Soru Çözücü', screen: 'QuestionSolver', keywords: 'soru çözücü matematik ödev' },
    { icon: '📄', title: 'Belge Analizi', screen: 'DocumentAnalysis', keywords: 'belge analizi döküman word' },
    { icon: '🎤', title: 'Konuşma Trans', screen: 'SpeechTranscription', keywords: 'konuşma trans ses metin' },
    { icon: '💻', title: 'Kod Tamamlama', screen: 'CodeCompletion', keywords: 'kod tamamlama programlama' },
  ];

  // Arama fonksiyonu - küçük harfe çevirerek karşılaştır
  const filteredTools = searchText.trim() === '' 
    ? [] 
    : allTools.filter(tool => 
        tool.title.toLowerCase().includes(searchText.toLowerCase()) ||
        tool.keywords.toLowerCase().includes(searchText.toLowerCase())
      );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>KOL.AI</Text>
      </View>

      {/* Arama Çubuğu */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Ne yapmak istiyorsun?"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Text style={styles.clearButton}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Arama Sonuçları */}
      {searchText.trim() !== '' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Arama Sonuçları {filteredTools.length > 0 && `(${filteredTools.length})`}
          </Text>
          {filteredTools.length > 0 ? (
            <View style={styles.toolGrid}>
              {filteredTools.map((tool, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.toolCard}
                  onPress={() => navigation.navigate(tool.screen)}
                >
                  <Text style={styles.toolIcon}>{tool.icon}</Text>
                  <Text style={styles.toolTitle}>{tool.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>Sonuç bulunamadı</Text>
              <Text style={styles.noResultsSubtext}>"{searchText}" için sonuç yok</Text>
            </View>
          )}
        </View>
      )}

      {/* Kategoriler - Sadece arama yoksa göster */}
      {searchText.trim() === '' && (
        <>
          {/* Favorilerin */}
          <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorilerin</Text>
        <View style={styles.toolGrid}>
          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('ImageGenerator')}
          >
            <Text style={styles.toolIcon}>🖼️</Text>
            <Text style={styles.toolTitle}>Görsel</Text>
            <Text style={styles.toolTitle}>Üret</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('CalorieTracker')}
          >
            <Text style={styles.toolIcon}>🍎</Text>
            <Text style={styles.toolTitle}>Kalori</Text>
            <Text style={styles.toolTitle}>Hesapla</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('TextSummary')}
          >
            <Text style={styles.toolIcon}>📝</Text>
            <Text style={styles.toolTitle}>Metni</Text>
            <Text style={styles.toolTitle}>Özetle</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('PdfAnalyzer')}
          >
            <Text style={styles.toolIcon}>📄</Text>
            <Text style={styles.toolTitle}>PDF'ten</Text>
            <Text style={styles.toolTitle}>Cümle</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Popüler Tool'lar */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popüler Tool'lar</Text>
        <View style={styles.toolGrid}>
          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('TextWriter')}
          >
            <Text style={styles.toolIcon}>✍️</Text>
            <Text style={styles.toolTitle}>Metin</Text>
            <Text style={styles.toolTitle}>Yaz</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('PhotoEditor')}
          >
            <Text style={styles.toolIcon}>📸</Text>
            <Text style={styles.toolTitle}>Fotoğraf</Text>
            <Text style={styles.toolTitle}>Düzenle</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('Translator')}
          >
            <Text style={styles.toolIcon}>🌐</Text>
            <Text style={styles.toolTitle}>Çeviri</Text>
            <Text style={styles.toolTitle}>Yap</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('NoteCreator')}
          >
            <Text style={styles.toolIcon}>📋</Text>
            <Text style={styles.toolTitle}>Not</Text>
            <Text style={styles.toolTitle}>Oluştur</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tüm Tool'lar */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tüm Tool'lar</Text>
        <View style={styles.toolGrid}>
          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('QuestionSolver')}
          >
            <Text style={styles.toolIcon}>❓</Text>
            <Text style={styles.toolTitle}>Soru</Text>
            <Text style={styles.toolTitle}>Çözücü</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('DocumentAnalysis')}
          >
            <Text style={styles.toolIcon}>📄</Text>
            <Text style={styles.toolTitle}>Belge</Text>
            <Text style={styles.toolTitle}>Analizi</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('SpeechTranscription')}
          >
            <Text style={styles.toolIcon}>🎤</Text>
            <Text style={styles.toolTitle}>Konuşma</Text>
            <Text style={styles.toolTitle}>Trans</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('CodeCompletion')}
          >
            <Text style={styles.toolIcon}>💻</Text>
            <Text style={styles.toolTitle}>Kod</Text>
            <Text style={styles.toolTitle}>Tamamlama</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('QuestionSolver')}
          >
            <Text style={styles.toolIcon}>📖</Text>
            <Text style={styles.toolTitle}>Soru</Text>
            <Text style={styles.toolTitle}>Çözücü</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('DocumentAnalysis')}
          >
            <Text style={styles.toolIcon}>📊</Text>
            <Text style={styles.toolTitle}>Belge</Text>
            <Text style={styles.toolTitle}>Analizi</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('SpeechTranscription')}
          >
            <Text style={styles.toolIcon}>🔊</Text>
            <Text style={styles.toolTitle}>Konuşma</Text>
            <Text style={styles.toolTitle}>Trans</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('CodeCompletion')}
          >
            <Text style={styles.toolIcon}>⚙️</Text>
            <Text style={styles.toolTitle}>Kod</Text>
            <Text style={styles.toolTitle}>Tamamlama</Text>
          </TouchableOpacity>
        </View>
      </View>

          {/* Çıkış Butonu */}
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={logout}
          >
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </>
      )}

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    padding: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#007AFF',
    letterSpacing: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  clearButton: {
    fontSize: 20,
    color: '#666',
    paddingHorizontal: 10,
  },
  noResultsContainer: {
    padding: 40,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#888',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
    marginBottom: 15,
  },
  toolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  toolCard: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    margin: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
  },
  toolIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  toolTitle: {
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 40,
  },
});

export default HomeScreen;

