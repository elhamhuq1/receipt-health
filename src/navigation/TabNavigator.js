import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Platform } from 'react-native';

/**
 * @typedef {import('./types').RootTabParamList} RootTabParamList
 */

// Import stack navigators instead of individual screens
import {
  HomeStackNavigator,
  CameraStackNavigator,
  ReceiptHistoryStackNavigator,
  FitnessDashboardStackNavigator,
} from './StackNavigators';

/** @type {ReturnType<typeof createBottomTabNavigator<RootTabParamList>>} */
const Tab = createBottomTabNavigator();

/**
 * Tab navigator with enhanced transitions
 * This allows for nested navigation within each tab with smooth UX
 * @returns {React.ReactElement} The root tab navigator
 */
const TabNavigator = () => {
  // Enhanced tab bar configuration with smooth transitions
  const tabBarOptions = {
    headerShown: false,
    lazy: true, // Load tabs lazily for better performance
    tabBarActiveTintColor: '#3B82F6', // Blue color for health theme
    tabBarInactiveTintColor: '#6B7280',
    tabBarStyle: {
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
      paddingBottom: Platform.OS === 'ios' ? 5 : 8, // Account for safe area
      paddingTop: 5,
      height: Platform.OS === 'ios' ? 60 : 65,
      // Smooth shadow for iOS
      ...(Platform.OS === 'ios' && {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }),
      // Elevation for Android
      ...(Platform.OS === 'android' && {
        elevation: 8,
      }),
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '500',
      marginTop: 2,
    },
    tabBarIconStyle: {
      marginTop: 2,
    },
    // Smooth animation configuration
    animationEnabled: true,
    swipeEnabled: false, // Disable swipe for more predictable UX
  };

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={tabBarOptions}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                width: size,
                height: size,
                backgroundColor: color,
                borderRadius: size / 2,
                transform: [{ scale: focused ? 1.1 : 1 }], // Subtle scale animation
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraStackNavigator}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                width: size,
                height: size,
                backgroundColor: color,
                borderRadius: size / 2,
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ReceiptHistory"
        component={ReceiptHistoryStackNavigator}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                width: size,
                height: size,
                backgroundColor: color,
                borderRadius: size / 2,
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FitnessDashboard"
        component={FitnessDashboardStackNavigator}
        options={{
          tabBarLabel: 'Fitness',
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                width: size,
                height: size,
                backgroundColor: color,
                borderRadius: size / 2,
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
