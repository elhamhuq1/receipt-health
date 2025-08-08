import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

describe('HomeScreen', () => {
  const createNavigation = () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  });

  it('renders welcome message and summary text', () => {
    const navigation = createNavigation();
    const { getByText } = render(<HomeScreen navigation={navigation} />);

    expect(getByText('Welcome Back!')).toBeTruthy();
    expect(getByText("Here's your health summary for today.")).toBeTruthy();
    expect(getByText("Today's Summary")).toBeTruthy();
  });

  it('navigates to Camera when pressing Scan a Receipt', () => {
    const navigation = createNavigation();
    const { getByText } = render(<HomeScreen navigation={navigation} />);

    fireEvent.press(getByText('Scan a Receipt'));
    expect(navigation.navigate).toHaveBeenCalledWith('Camera');
  });

  it('navigates to ReceiptHistory when pressing View History', () => {
    const navigation = createNavigation();
    const { getByText } = render(<HomeScreen navigation={navigation} />);

    fireEvent.press(getByText('View History'));
    expect(navigation.navigate).toHaveBeenCalledWith('ReceiptHistory');
  });

  it('navigates to FitnessDashboard when pressing the summary card', () => {
    const navigation = createNavigation();
    const { getByText } = render(<HomeScreen navigation={navigation} />);

    fireEvent.press(getByText("Today's Summary"));
    expect(navigation.navigate).toHaveBeenCalledWith('FitnessDashboard');
  });
});
