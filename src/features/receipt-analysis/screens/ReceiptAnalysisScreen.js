import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TextInput } from 'react-native';
import Button from '../../../shared/components/Button';

/**
 * @param {import('../../../navigation/types').ScreenProps} props
 */
const ReceiptAnalysisScreen = ({ navigation, route }) => {
  const { imageUri, timestamp } = route?.params ?? {};

  const initialItems = useMemo(
    () => [
      { id: '1', name: 'Item A', quantity: '1', price: '5.99' },
      { id: '2', name: 'Item B', quantity: '2', price: '3.50' },
    ],
    [],
  );

  const [items, setItems] = useState(initialItems);

  const handleChange = (id, key, value) => {
    setItems(prev => prev.map(it => (it.id === id ? { ...it, [key]: value } : it)));
  };

  const handleAddItem = () => {
    const newId = (items.length + 1).toString();
    setItems(prev => [...prev, { id: newId, name: '', quantity: '1', price: '' }]);
  };

  const handleSave = () => {
    // In a real app this would persist and maybe navigate to history/details
    navigation.goBack();
  };

  const handleDelete = id => {
    setItems(prev => prev.filter(it => it.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <TextInput
        placeholder="Name"
        value={item.name}
        onChangeText={text => handleChange(item.id, 'name', text)}
        style={[styles.input, styles.name]}
        accessibilityLabel={`Item ${item.id} name`}
      />
      <TextInput
        placeholder="Qty"
        value={item.quantity}
        onChangeText={text => handleChange(item.id, 'quantity', text)}
        keyboardType="number-pad"
        style={[styles.input, styles.qty]}
        accessibilityLabel={`Item ${item.id} quantity`}
      />
      <TextInput
        placeholder="Price"
        value={item.price}
        onChangeText={text => handleChange(item.id, 'price', text)}
        keyboardType="decimal-pad"
        style={[styles.input, styles.price]}
        accessibilityLabel={`Item ${item.id} price`}
      />
      <Button
        title="Delete"
        variant="outline"
        onPress={() => handleDelete(item.id)}
        accessibilityLabel={`Delete Item ${item.id}`}
        style={styles.deleteBtn}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receipt Analysis</Text>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
          accessibilityLabel="Analyzed receipt image"
        />
      ) : null}

      <FlatList
        data={items}
        keyExtractor={it => it.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.actions}>
        <Button title="Add Item" variant="outline" onPress={handleAddItem} style={styles.action} />
        <Button title="Save" onPress={handleSave} style={styles.action} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#E5E7EB',
  },
  listContent: {
    paddingBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 8,
    color: '#111827',
  },
  name: { flex: 1 },
  qty: { width: 60, textAlign: 'center' },
  price: { width: 90 },
  deleteBtn: { width: 80 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  action: { flex: 1, marginHorizontal: 6 },
});

export default ReceiptAnalysisScreen;
