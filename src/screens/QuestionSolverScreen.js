import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const QuestionSolverScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>❓</Text>
        <Text style={styles.title}>Soru Çözücü</Text>
        <Text style={styles.subtitle}>AI ile soru çözün</Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Matematik, fizik, kimya ve diğer derslerdeki sorularınızı AI ile çözün.
          </Text>
          <Text style={styles.infoText}>
            Adım adım çözüm ve açıklamalar ile öğrenin.
          </Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Soru Gönder</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 500,
  },
  icon: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    marginBottom: 30,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
  },
  infoText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QuestionSolverScreen;












