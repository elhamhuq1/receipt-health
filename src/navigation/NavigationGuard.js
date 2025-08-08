import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

/**
 * Navigation guard component that can be used to protect routes
 * and handle authentication, permissions, or other conditions
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render when conditions are met
 * @param {Function} props.condition - Function that returns a boolean or Promise<boolean>
 * @param {React.ReactNode} props.fallback - Component to render when condition is not met
 * @param {React.ReactNode} props.loadingComponent - Component to render while checking condition
 * @returns {React.ReactElement} The guarded component
 */
const NavigationGuard = ({ children, condition, fallback, loadingComponent }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkCondition = async () => {
      try {
        setIsLoading(true);
        // Handle both synchronous and asynchronous conditions
        const result = await Promise.resolve(condition());
        setIsAllowed(!!result);
      } catch (error) {
        console.error('Navigation guard condition error:', error);
        setIsAllowed(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkCondition();
  }, [condition]);

  if (isLoading) {
    return (
      loadingComponent || (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )
    );
  }

  return isAllowed ? children : fallback;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4B5563',
  },
});

export default NavigationGuard;
