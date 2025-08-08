import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReceiptHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receipt History</Text>
      <Text style={styles.subtitle}>Past Receipts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default ReceiptHistoryScreen;
