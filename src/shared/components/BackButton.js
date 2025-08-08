import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * @typedef {Object} BackButtonProps
 * @property {Function} [onPress] - Custom function to call when button is pressed
 * @property {string} [title] - Text to display next to the back arrow
 * @property {Object} [style] - Additional style for the button
 * @property {Object} [textStyle] - Additional style for the button text
 * @property {boolean} [showTitle] - Whether to show the title text
 */

/**
 * Back button component with consistent placement and styling
 *
 * @param {BackButtonProps} props - Component props
 * @returns {React.ReactElement} - Rendered component
 */
const BackButton = ({
  onPress,
  title = Platform.OS === 'ios' ? 'Back' : '',
  style,
  textStyle,
  showTitle = Platform.OS === 'ios',
  ...props
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.7}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title || 'Back'}
      accessibilityHint="Navigate to the previous screen"
      {...props}>
      {/* Platform-specific back arrow */}
      <Text style={[styles.arrow, textStyle]}>{Platform.OS === 'ios' ? '‹' : '←'}</Text>

      {showTitle && title ? <Text style={[styles.title, textStyle]}>{title}</Text> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 4,
    // Minimum touch target for accessibility
    minHeight: 44,
    minWidth: 44,
  },
  arrow: {
    fontSize: 24,
    fontWeight: '400',
    color: '#3B82F6', // blue-500
    lineHeight: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: '#3B82F6', // blue-500
    marginLeft: 4,
  },
});

export default BackButton;
