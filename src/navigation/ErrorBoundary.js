import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * Error fallback component for navigation errors
 *
 * @param {Object} props - Component props
 * @param {Error} props.error - The error that was caught
 * @param {Function} props.resetError - Function to reset the error state
 * @returns {React.ReactElement} Error UI
 */
const NavigationErrorFallback = ({ error, resetError }) => {
  const navigation = useNavigation();

  const handleGoHome = () => {
    resetError();
    navigation.navigate('Home');
  };

  const handleRetry = () => {
    resetError();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Navigation Error</Text>
      <Text style={styles.message}>We encountered an issue while navigating to this screen.</Text>

      {__DEV__ && error && (
        <View style={styles.errorDetails}>
          <Text style={styles.errorTitle}>Error Details (Dev Only):</Text>
          <Text style={styles.errorText}>{error.toString()}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRetry}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={handleGoHome}>
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/**
 * Error boundary class component for catching navigation errors
 */
class NavigationErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error
    if (__DEV__) {
      console.error('Navigation error:', error, errorInfo);
    }

    // Here you could log to an error reporting service
    // Example: reportError(error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;

      if (fallback) {
        return fallback(this.state.error, this.resetError);
      }

      return <NavigationErrorFallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 24,
  },
  errorDetails: {
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    marginBottom: 24,
  },
  errorTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B91C1C',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#991B1B',
    fontFamily: 'monospace',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#4B5563',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NavigationErrorBoundary;
