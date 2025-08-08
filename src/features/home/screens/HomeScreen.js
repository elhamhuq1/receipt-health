import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { HealthCard, NutritionSummaryCard, MealCard } from '../../../shared/components/HealthCard';
import Button from '../../../shared/components/Button';

/**
 * HomeScreen component
 *
 * @param {import('../../navigation/types').ScreenProps} props - Screen props
 * @returns {React.ReactElement} - Rendered component
 */
const HomeScreen = ({ navigation }) => {
  const dailyIntake = {
    calories: 1200,
    protein: 80,
    carbs: 150,
    fat: 50,
  };

  const dailyTargets = {
    calories: 2000,
    protein: 120,
    carbs: 250,
    fat: 65,
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Here's your health summary for today.</Text>

      <NutritionSummaryCard
        title="Today's Summary"
        dailyIntake={dailyIntake}
        targets={dailyTargets}
        onPress={() => navigation.navigate('FitnessDashboard')}
      />

      <View style={styles.actionsContainer}>
        <Button
          title="Scan a Receipt"
          onPress={() => navigation.navigate('Camera')}
          variant="primary"
          style={styles.actionButton}
        />
        <Button
          title="View History"
          onPress={() => navigation.navigate('ReceiptHistory')}
          variant="secondary"
          style={styles.actionButton}
        />
      </View>

      <MealCard
        mealName="Recent Meal: Lunch"
        mealTime="12:30 PM"
        nutritionData={{
          calories: 450,
          protein: 30,
          carbs: 40,
          fat: 20,
        }}
        style={styles.mealCard}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  mealCard: {
    marginTop: 10,
  },
});

export default HomeScreen;
