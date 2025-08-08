import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * @typedef {Object} NutritionTagProps
 * @property {string} [category='default'] - Nutrition category (protein, carbs, fat, etc.)
 * @property {number|string} value - The nutrition value to display
 * @property {string} [unit=''] - Unit of measurement (g, mg, cal, etc.)
 * @property {string} [label] - Custom label (defaults to category name if not provided)
 * @property {'small'|'medium'|'large'} [size='medium'] - Size variant
 * @property {Object} [style] - Additional style for the container
 * @property {boolean} [showLabel=true] - Whether to show the label
 */

// Nutrition category colors - health-focused palette
const NUTRITION_COLORS = {
  protein: {
    background: '#FEF3C7', // amber-100
    border: '#F59E0B', // amber-500
    text: '#92400E', // amber-800
  },
  carbs: {
    background: '#DBEAFE', // blue-100
    border: '#3B82F6', // blue-500
    text: '#1E40AF', // blue-800
  },
  fat: {
    background: '#FEE2E2', // red-100
    border: '#EF4444', // red-500
    text: '#991B1B', // red-800
  },
  fiber: {
    background: '#D1FAE5', // green-100
    border: '#10B981', // green-500
    text: '#065F46', // green-800
  },
  sugar: {
    background: '#FCE7F3', // pink-100
    border: '#EC4899', // pink-500
    text: '#BE185D', // pink-800
  },
  sodium: {
    background: '#F3E8FF', // purple-100
    border: '#8B5CF6', // purple-500
    text: '#6B21A8', // purple-800
  },
  calcium: {
    background: '#ECFDF5', // green-50
    border: '#059669', // green-600
    text: '#064E3B', // green-900
  },
  iron: {
    background: '#FDF4FF', // fuchsia-50
    border: '#C026D3', // fuchsia-600
    text: '#86198F', // fuchsia-800
  },
  vitaminC: {
    background: '#FFF7ED', // orange-50
    border: '#EA580C', // orange-600
    text: '#9A3412', // orange-800
  },
  calories: {
    background: '#F9FAFB', // gray-50
    border: '#6B7280', // gray-500
    text: '#374151', // gray-700
  },
  default: {
    background: '#F9FAFB', // gray-50
    border: '#D1D5DB', // gray-300
    text: '#4B5563', // gray-600
  },
};

/**
 * NutritionTag component for displaying nutrition information with color coding
 *
 * @param {NutritionTagProps} props - Component props
 * @returns {React.ReactElement} - Rendered component
 */
const NutritionTag = ({
  category = 'default',
  value,
  unit = '',
  label,
  size = 'medium',
  style,
  showLabel = true,
  ...props
}) => {
  const colors = NUTRITION_COLORS[category] || NUTRITION_COLORS.default;

  const getContainerStyle = () => [
    styles.container,
    styles[`container_${size}`],
    {
      backgroundColor: colors.background,
      borderColor: colors.border,
    },
    style,
  ];

  const getTextStyle = textType => [
    styles[textType],
    styles[`${textType}_${size}`],
    { color: colors.text },
  ];

  const displayLabel = label || category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <View style={getContainerStyle()} {...props}>
      {showLabel && <Text style={getTextStyle('label')}>{displayLabel}</Text>}
      <Text style={getTextStyle('value')}>
        {value}
        {unit && <Text style={getTextStyle('unit')}> {unit}</Text>}
      </Text>
    </View>
  );
};

// Predefined nutrition tag components for common nutrients
export const ProteinTag = props => <NutritionTag category="protein" unit="g" {...props} />;
export const CarbsTag = props => <NutritionTag category="carbs" unit="g" {...props} />;
export const FatTag = props => <NutritionTag category="fat" unit="g" {...props} />;
export const FiberTag = props => <NutritionTag category="fiber" unit="g" {...props} />;
export const SugarTag = props => <NutritionTag category="sugar" unit="g" {...props} />;
export const SodiumTag = props => <NutritionTag category="sodium" unit="mg" {...props} />;
export const CalciumTag = props => <NutritionTag category="calcium" unit="mg" {...props} />;
export const IronTag = props => <NutritionTag category="iron" unit="mg" {...props} />;
export const VitaminCTag = props => <NutritionTag category="vitaminC" unit="mg" {...props} />;
export const CaloriesTag = props => <NutritionTag category="calories" unit="cal" {...props} />;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  container_small: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  container_medium: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  container_large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  label: {
    fontWeight: '500',
    textAlign: 'center',
  },
  label_small: {
    fontSize: 12,
    marginBottom: 1,
  },
  label_medium: {
    fontSize: 14,
    marginBottom: 2,
  },
  label_large: {
    fontSize: 16,
    marginBottom: 4,
  },
  value: {
    fontWeight: '600',
    textAlign: 'center',
  },
  value_small: {
    fontSize: 14,
  },
  value_medium: {
    fontSize: 16,
  },
  value_large: {
    fontSize: 18,
  },
  unit: {
    fontWeight: '400',
    opacity: 0.8,
  },
  unit_small: {
    fontSize: 12,
  },
  unit_medium: {
    fontSize: 14,
  },
  unit_large: {
    fontSize: 16,
  },
});

export default NutritionTag;
