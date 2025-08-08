import React, { useState, useRef, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Platform, ActivityIndicator } from 'react-native';
import TabNavigator from './TabNavigator';
import NavigationErrorBoundary from './ErrorBoundary';
import NavigationGuard from './NavigationGuard';

/**
 * @typedef {import('./types').RootTabParamList} RootTabParamList
 */

// Custom theme for the navigation container
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3B82F6',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#1F2937',
    border: '#E5E7EB',
    notification: '#EF4444',
  },
};

// Main navigation configuration
export const navigationConfig = {
  initialRouteName: 'Home',
  screens: {
    Home: 'Home',
    Camera: 'Camera',
    ReceiptHistory: 'ReceiptHistory',
    FitnessDashboard: 'FitnessDashboard',
  },
};

/**
 * Main navigation component with error boundaries and navigation guards
 * @returns {React.ReactElement} The root navigation container
 */
const AppNavigator = () => {
  // Navigation reference for programmatic navigation
  const navigationRef = useRef(null);

  // Navigation state for tracking and analytics
  const [navigationState, setNavigationState] = useState();

  // Navigation ready state
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  // Track navigation state changes for analytics or state persistence
  const handleNavigationStateChange = state => {
    setNavigationState(state);

    // Here you could log navigation events to analytics
    // Example: logNavigationEvent(state);
  };

  // Handle when navigation is ready
  const onNavigationReady = () => {
    setIsNavigationReady(true);
  };

  // Example navigation guard condition - can be expanded for auth, permissions, etc.
  const navigationGuardCondition = () => {
    // Always allow navigation in this example
    // In a real app, this could check auth state, permissions, etc.
    return true;
  };

  return (
    <NavigationErrorBoundary>
      <NavigationGuard
        condition={navigationGuardCondition}
        fallback={
          <NavigationContainer theme={navigationTheme}>
            {/* Fallback navigation if guard condition fails */}
            {/* This could redirect to login, onboarding, etc. */}
            <TabNavigator initialRouteName="Home" />
          </NavigationContainer>
        }>
        <NavigationContainer
          ref={navigationRef}
          theme={navigationTheme}
          onStateChange={handleNavigationStateChange}
          onReady={onNavigationReady}
          linking={{
            // Deep linking configuration
            prefixes: ['receiptHealth://', 'https://receiptHealth.app'],
            config: {
              screens: navigationConfig.screens,
            },
          }}
          documentTitle={{
            formatter: (options, route) => `${options?.title ?? route?.name} - ReceiptHealth`,
          }}
          fallback={Platform.OS === 'web' ? <ActivityIndicator /> : null}>
          <TabNavigator />
        </NavigationContainer>
      </NavigationGuard>
    </NavigationErrorBoundary>
  );
};

export default AppNavigator;
