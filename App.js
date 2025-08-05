import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Create the navigator
const Stack = createNativeStackNavigator();

// Theme colors
const COLORS = {
  primary: '#3B82F6',
  white: '#FFFFFF',
  background: '#FFFFFF',
};

// Temporary Home Screen
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ReceiptHealth</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
        <Text style={styles.buttonText}>Go to About</Text>
      </TouchableOpacity>
    </View>
  );
}

// Temporary About Screen
function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About ReceiptHealth</Text>
      <Text style={styles.text}>
        Your smart grocery & wellness companion that helps you make better nutritional choices.
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'ReceiptHealth',
          }}
        />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
