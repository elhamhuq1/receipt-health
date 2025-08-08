import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

/**
 * @typedef {Object} LoadingProps
 * @property {'small'|'large'} [size='large'] - Size of the loading indicator
 * @property {string} [color='#3B82F6'] - Color of the loading indicator
 * @property {string} [message] - Optional message to display
 * @property {Object} [style] - Additional style for the container
 * @property {boolean} [overlay=false] - Whether to display as an overlay
 */

/**
 * Loading spinner component for async operations
 *
 * @param {LoadingProps} props - Component props
 * @returns {React.ReactElement} - Rendered component
 */
const Loading = ({
  size = 'large',
  color = '#3B82F6', // blue-500
  message,
  style,
  overlay = false,
  ...props
}) => {
  const containerStyle = [styles.container, overlay && styles.overlay, style];

  return (
    <View
      style={containerStyle}
      accessible={true}
      accessibilityRole="progressbar"
      accessibilityLabel={message || 'Loading'}
      accessibilityState={{ busy: true }}
      {...props}>
      <ActivityIndicator size={size} color={color} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

/**
 * Fullscreen loading component
 *
 * @param {Object} props - Component props
 * @param {string} [props.message='Loading...'] - Loading message
 * @returns {React.ReactElement} - Rendered component
 */
export const FullScreenLoading = ({ message = 'Loading...', ...props }) => {
  return <Loading overlay message={message} style={styles.fullScreen} {...props} />;
};

/**
 * Inline loading component for smaller areas
 *
 * @param {Object} props - Component props
 * @param {'small'|'large'} [props.size='small'] - Size of the loading indicator
 * @returns {React.ReactElement} - Rendered component
 */
export const InlineLoading = ({ size = 'small', ...props }) => {
  return <Loading size={size} style={styles.inline} {...props} />;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 1000,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inline: {
    padding: 8,
  },
  message: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280', // gray-500
    textAlign: 'center',
  },
});

export default Loading;
