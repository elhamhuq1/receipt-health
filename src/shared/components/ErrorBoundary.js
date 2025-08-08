import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * @typedef {Object} ErrorFallbackProps
 * @property {Error} error - The error that was caught
 * @property {Object} errorInfo - React error info object
 * @property {Function} onRetry - Function to retry/reset
 */

/**
 * Default fallback UI for errors
 *
 * @param {ErrorFallbackProps} props - Component props
 * @returns {React.ReactElement} - Rendered component
 */
const DefaultErrorFallback = ({ error, errorInfo, onRetry }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Oops! Something went wrong</Text>
        <Text style={styles.message}>
          We're sorry, but something unexpected happened. Please try again.
        </Text>

        {__DEV__ && error && (
          <View style={styles.errorDetails}>
            <Text style={styles.errorTitle}>Error Details (Dev Only):</Text>
            <Text style={styles.errorText}>{error.toString()}</Text>
            {errorInfo && <Text style={styles.errorText}>{errorInfo.componentStack}</Text>}
          </View>
        )}

        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.7}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Try Again">
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/**
 * Error boundary component for handling errors
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console in development
    if (__DEV__) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    this.setState({
      error,
      errorInfo,
    });

    // Here you could also log the error to your crash reporting service
    // Example: crashlytics().recordError(error);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    // Call onReset prop if provided
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      const { fallback: CustomFallback } = this.props;

      if (CustomFallback) {
        return (
          <CustomFallback
            error={this.state.error}
            errorInfo={this.state.errorInfo}
            onRetry={this.handleRetry}
          />
        );
      }

      // Default fallback UI
      return (
        <DefaultErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * HOC for wrapping components with error boundary
 *
 * @param {React.ComponentType} WrappedComponent - Component to wrap
 * @param {React.ComponentType} [fallback] - Optional custom fallback component
 * @returns {React.ComponentType} - Wrapped component with error boundary
 */
export const withErrorBoundary = (WrappedComponent, fallback) => {
  const WithErrorBoundaryComponent = props => (
    <ErrorBoundary fallback={fallback}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundaryComponent.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithErrorBoundaryComponent;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    maxWidth: 320,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937', // gray-800
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: '#4B5563', // gray-600
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  errorDetails: {
    backgroundColor: '#FEF2F2', // red-50
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    width: '100%',
  },
  errorTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626', // red-600
    marginBottom: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#7F1D1D', // red-900
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  retryButton: {
    backgroundColor: '#3B82F6', // blue-500
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ErrorBoundary;
