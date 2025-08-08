import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

/**
 * @typedef {Object} ButtonProps
 * @property {string} title - Button text
 * @property {Function} onPress - Function to call when button is pressed
 * @property {boolean} [disabled=false] - Whether the button is disabled
 * @property {boolean} [loading=false] - Whether to show a loading indicator
 * @property {'primary'|'secondary'|'outline'|'ghost'} [variant='primary'] - Button variant
 * @property {'small'|'medium'|'large'} [size='medium'] - Button size
 * @property {Object} [style] - Additional style for the button
 * @property {Object} [textStyle] - Additional style for the button text
 */

/**
 * Primary Button component with proper touch targets and loading state
 *
 * @param {ButtonProps} props - Component props
 * @returns {React.ReactElement} - Rendered component
 */
const Button = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`button_${variant}`], styles[`button_${size}`]];

    if (disabled || loading) {
      baseStyle.push(styles.button_disabled);
    }

    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`text_${variant}`], styles[`text_${size}`]];

    if (disabled || loading) {
      baseStyle.push(styles.text_disabled);
    }

    if (textStyle) {
      baseStyle.push(textStyle);
    }

    return baseStyle;
  };

  // Colors for the loading indicator
  const loaderColor = variant === 'primary' ? '#FFFFFF' : '#3B82F6';

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{
        disabled: disabled || loading,
        busy: loading,
      }}
      accessibilityLabel={title}
      {...props}>
      {loading ? (
        <ActivityIndicator size="small" color={loaderColor} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // Minimum touch target of 44x44 for accessibility
    minHeight: 44,
    minWidth: 44,
  },
  button_primary: {
    backgroundColor: '#3B82F6', // blue-500
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button_secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3B82F6', // blue-500
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6B7280', // gray-500
  },
  button_ghost: {
    backgroundColor: 'transparent',
  },
  button_small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  button_medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 44,
  },
  button_large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 52,
  },
  button_disabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
  },
  text_primary: {
    color: '#FFFFFF',
  },
  text_secondary: {
    color: '#3B82F6', // blue-500
  },
  text_outline: {
    color: '#6B7280', // gray-500
  },
  text_ghost: {
    color: '#3B82F6', // blue-500
  },
  text_small: {
    fontSize: 14,
  },
  text_medium: {
    fontSize: 16,
  },
  text_large: {
    fontSize: 18,
  },
  text_disabled: {
    opacity: 0.7,
  },
});

export default Button;
