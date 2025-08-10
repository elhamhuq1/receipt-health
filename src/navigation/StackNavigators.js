import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/**
 * @typedef {import('./types').HomeStackParamList} HomeStackParamList
 * @typedef {import('./types').CameraStackParamList} CameraStackParamList
 * @typedef {import('./types').ReceiptHistoryStackParamList} ReceiptHistoryStackParamList
 * @typedef {import('./types').FitnessDashboardStackParamList} FitnessDashboardStackParamList
 */

// Import screens for each feature area
import HomeScreen from '../features/home/screens/HomeScreen';
import CameraScreen from '../features/camera/screens/CameraScreen';
import ReceiptAnalysisScreen from '../features/receipt-analysis/screens/ReceiptAnalysisScreen';
import ReceiptHistoryScreen from '../features/receipt-history/screens/ReceiptHistoryScreen';
import FitnessDashboardScreen from '../features/fitness-dashboard/screens/FitnessDashboardScreen';

// Create typed stack navigators for each feature area
/** @type {import('@react-navigation/native-stack').createNativeStackNavigator<HomeStackParamList>} */
const HomeStack = createNativeStackNavigator();

/** @type {import('@react-navigation/native-stack').createNativeStackNavigator<CameraStackParamList>} */
const CameraStack = createNativeStackNavigator();

/** @type {import('@react-navigation/native-stack').createNativeStackNavigator<ReceiptHistoryStackParamList>} */
const ReceiptHistoryStack = createNativeStackNavigator();

/** @type {import('@react-navigation/native-stack').createNativeStackNavigator<FitnessDashboardStackParamList>} */
const FitnessDashboardStack = createNativeStackNavigator();

// Navigation transition configurations
const transitionConfig = {
  // Smooth slide transition for most screens
  slideFromRight: {
    animation: 'slide_from_right',
  },
  slideFromBottom: {
    animation: 'slide_from_bottom',
  },
  fadeIn: {
    animation: 'fade',
  },
  // No animation for tab switches
  none: {
    animation: 'none',
  },
};

// Default stack screen options with transitions and loading states
const defaultStackOptions = {
  headerStyle: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  headerBackTitleVisible: false,
  headerTintColor: '#3B82F6',
  // Transition configurations
  ...transitionConfig.slideFromRight,
  // Loading state configuration
  freezeOnBlur: true, // Freeze previous screen during transition
  // Performance optimizations
  lazy: true, // Load screens lazily
  unmountOnBlur: false, // Keep screens mounted for better performance
};

// Loading state wrapper for screen transitions
const createScreenWithLoading = (ScreenComponent, screenName) => {
  const WrappedComponent = React.memo(props => {
    return <ScreenComponent {...props} />;
  });
  WrappedComponent.displayName = `ScreenWithLoading(${screenName})`;
  return WrappedComponent;
};

// Screen options for different screen types
const getScreenOptions = (screenType, title, options = {}) => {
  const baseOptions = {
    title,
    headerShown: false, // Hide header on main tab screens for clean look
    // Specific transitions based on screen type
    ...(screenType === 'modal' && transitionConfig.slideFromBottom),
    ...(screenType === 'detail' && transitionConfig.slideFromRight),
    ...(screenType === 'overlay' && transitionConfig.fadeIn),
    ...options,
  };

  return baseOptions;
};

// Home Stack Navigator
/**
 * @returns {React.ReactElement} Home stack navigator component
 */
export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        ...defaultStackOptions,
        // Optimized for main tab navigation
        animation: 'none', // No animation when switching tabs
      }}>
      <HomeStack.Screen
        name="HomeMain"
        component={createScreenWithLoading(HomeScreen, 'HomeMain')}
        options={getScreenOptions('main', 'Home')}
      />
      {/* Future screens can be added here with proper transitions */}
    </HomeStack.Navigator>
  );
};

// Camera Stack Navigator
/**
 * @returns {React.ReactElement} Camera stack navigator component
 */
export const CameraStackNavigator = () => {
  return (
    <CameraStack.Navigator
      screenOptions={{
        ...defaultStackOptions,
        // Camera needs quick access
        animation: 'none',
      }}>
      <CameraStack.Screen
        name="CameraMain"
        component={createScreenWithLoading(CameraScreen, 'CameraMain')}
        options={getScreenOptions('main', 'Scan Receipt')}
      />
      <CameraStack.Screen
        name="ReceiptAnalysis"
        component={createScreenWithLoading(ReceiptAnalysisScreen, 'ReceiptAnalysis')}
        options={getScreenOptions('detail', 'Receipt Analysis', { headerShown: true })}
      />
    </CameraStack.Navigator>
  );
};

// Receipt History Stack Navigator
/**
 * @returns {React.ReactElement} Receipt history stack navigator component
 */
export const ReceiptHistoryStackNavigator = () => {
  return (
    <ReceiptHistoryStack.Navigator
      screenOptions={{
        ...defaultStackOptions,
        animation: 'none', // Smooth tab switching
      }}>
      <ReceiptHistoryStack.Screen
        name="ReceiptHistoryMain"
        component={createScreenWithLoading(ReceiptHistoryScreen, 'ReceiptHistoryMain')}
        options={getScreenOptions('main', 'Receipt History')}
      />
      {/* Future screens like ReceiptDetailsScreen will use detail transitions */}
    </ReceiptHistoryStack.Navigator>
  );
};

// Fitness Dashboard Stack Navigator
/**
 * @returns {React.ReactElement} Fitness dashboard stack navigator component
 */
export const FitnessDashboardStackNavigator = () => {
  return (
    <FitnessDashboardStack.Navigator
      screenOptions={{
        ...defaultStackOptions,
        animation: 'none', // Smooth for dashboard data
      }}>
      <FitnessDashboardStack.Screen
        name="FitnessDashboardMain"
        component={createScreenWithLoading(FitnessDashboardScreen, 'FitnessDashboardMain')}
        options={getScreenOptions('main', 'Fitness Dashboard')}
      />
      {/* Future screens like FitnessDetailsScreen will be added here */}
    </FitnessDashboardStack.Navigator>
  );
};
