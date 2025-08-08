import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NutritionTag from './NutritionTag';

/**
 * @typedef {Object} NutritionData
 * @property {number} [calories] - Calories in kcal
 * @property {number} [protein] - Protein in grams
 * @property {number} [carbs] - Carbohydrates in grams
 * @property {number} [fat] - Fat in grams
 * @property {number} [fiber] - Fiber in grams
 * @property {number} [sugar] - Sugar in grams
 * @property {number} [sodium] - Sodium in milligrams
 * @property {number} [calcium] - Calcium in milligrams
 * @property {number} [iron] - Iron in milligrams
 * @property {number} [vitaminC] - Vitamin C in milligrams
 */

/**
 * @typedef {Object} HealthCardProps
 * @property {string} [title] - Card title
 * @property {string} [subtitle] - Card subtitle
 * @property {NutritionData} [nutritionData={}] - Nutrition data to display
 * @property {Function} [onPress] - Function to call when card is pressed
 * @property {Object} [style] - Additional style for the card
 * @property {'default'|'summary'|'meal'|'receipt'} [variant='default'] - Card variant
 * @property {boolean} [showAllNutrition=false] - Whether to show all nutrition data
 * @property {string[]} [primaryNutrients=['calories', 'protein', 'carbs', 'fat']] - Primary nutrients to display
 */

/**
 * HealthCard component for displaying nutrition summaries
 *
 * @param {HealthCardProps} props - Component props
 * @returns {React.ReactElement} - Rendered component
 */
const HealthCard = ({
  title,
  subtitle,
  nutritionData = {},
  onPress,
  style,
  variant = 'default',
  showAllNutrition = false,
  primaryNutrients = ['calories', 'protein', 'carbs', 'fat'],
  ...props
}) => {
  const isInteractive = !!onPress;

  const getCardStyle = () => [
    styles.card,
    styles[`card_${variant}`],
    isInteractive && styles.card_interactive,
    style,
  ];

  const renderNutritionTags = () => {
    if (!nutritionData || Object.keys(nutritionData).length === 0) {
      return null;
    }

    const nutrientsToShow = showAllNutrition
      ? Object.keys(nutritionData)
      : primaryNutrients.filter(key => nutritionData[key] !== undefined);

    return (
      <View style={styles.nutritionContainer}>
        {nutrientsToShow.map(nutrient => {
          const value = nutritionData[nutrient];
          if (value === undefined || value === null) return null;

          return (
            <NutritionTag
              key={nutrient}
              category={nutrient}
              value={value}
              size="small"
              style={styles.nutritionTag}
            />
          );
        })}
      </View>
    );
  };

  const CardContent = () => (
    <View style={getCardStyle()}>
      <View style={styles.header}>
        {title && <Text style={styles.title}>{title}</Text>}
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {renderNutritionTags()}
    </View>
  );

  if (isInteractive) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.touchable}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityHint={`View details for ${title}`}
        {...props}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent {...props} />;
};

/**
 * Specialized HealthCard for nutrition summaries
 *
 * @param {Object} props - Component props
 * @param {NutritionData} [props.dailyIntake={}] - Current daily intake values
 * @param {NutritionData} [props.targets={}] - Target daily intake values
 * @returns {React.ReactElement} - Rendered component
 */
export const NutritionSummaryCard = ({ dailyIntake = {}, targets = {}, ...props }) => {
  const calculateProgress = (current, target) => {
    if (!target || target === 0) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const nutritionWithProgress = Object.keys(dailyIntake).reduce((acc, key) => {
    const current = dailyIntake[key] || 0;
    const target = targets[key] || 0;
    const progress = calculateProgress(current, target);

    acc[key] = {
      current,
      target,
      progress,
    };

    return acc;
  }, {});

  return <HealthCard variant="summary" nutritionData={dailyIntake} {...props} />;
};

/**
 * Specialized HealthCard for meals
 *
 * @param {Object} props - Component props
 * @param {string} [props.mealName] - Name of the meal
 * @param {string} [props.mealTime] - Time of the meal
 * @param {NutritionData} [props.nutritionData] - Nutrition data for the meal
 * @returns {React.ReactElement} - Rendered component
 */
export const MealCard = ({ mealName, mealTime, nutritionData, ...props }) => {
  return (
    <HealthCard
      title={mealName}
      subtitle={mealTime}
      nutritionData={nutritionData}
      variant="meal"
      primaryNutrients={['calories', 'protein', 'carbs']}
      {...props}
    />
  );
};

/**
 * Specialized HealthCard for receipt summaries
 *
 * @param {Object} props - Component props
 * @param {string} [props.storeName] - Name of the store
 * @param {string} [props.date] - Date of the receipt
 * @param {number} [props.totalItems] - Total number of items
 * @param {NutritionData} [props.nutritionData] - Nutrition data from the receipt
 * @returns {React.ReactElement} - Rendered component
 */
export const ReceiptSummaryCard = ({ storeName, date, totalItems, nutritionData, ...props }) => {
  const subtitle = `${storeName} • ${date}${totalItems ? ` • ${totalItems} items` : ''}`;

  return (
    <HealthCard
      title="Receipt Summary"
      subtitle={subtitle}
      nutritionData={nutritionData}
      variant="receipt"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  card_default: {
    // Default styling already applied above
  },
  card_summary: {
    backgroundColor: '#F8FAFC',
    borderColor: '#60A5FA', // blue-400
    borderWidth: 1,
  },
  card_meal: {
    backgroundColor: '#FEFEFE',
    borderLeftWidth: 4,
    borderLeftColor: '#34D399', // green-400
  },
  card_receipt: {
    backgroundColor: '#FAFAFA',
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6', // blue-500
  },
  card_interactive: {
    shadowOpacity: 0.15,
    elevation: 8,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  nutritionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  nutritionTag: {
    marginRight: 8,
    marginBottom: 8,
  },
});

export default HealthCard;
