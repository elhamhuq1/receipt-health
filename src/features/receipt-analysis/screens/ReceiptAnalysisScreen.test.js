import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ReceiptAnalysisScreen from './ReceiptAnalysisScreen';

const createNav = () => ({ navigate: jest.fn(), goBack: jest.fn() });

describe('ReceiptAnalysisScreen', () => {
  it('renders with image and editable items', () => {
    const navigation = createNav();
    const route = { params: { imageUri: 'file:///mock.jpg', timestamp: Date.now() } };
    const { getByLabelText, getByDisplayValue } = render(
      <ReceiptAnalysisScreen navigation={navigation} route={route} />,
    );

    expect(getByLabelText('Analyzed receipt image')).toBeTruthy();
    expect(getByDisplayValue('Item A')).toBeTruthy();
  });

  it('allows adding an item and editing fields, then saving', () => {
    const navigation = createNav();
    const route = { params: { imageUri: undefined } };
    const { getByText, getByLabelText } = render(
      <ReceiptAnalysisScreen navigation={navigation} route={route} />,
    );

    fireEvent.press(getByText('Add Item'));
    const nameInput = getByLabelText('Item 3 name');
    fireEvent.changeText(nameInput, 'Bananas');

    fireEvent.press(getByText('Save'));
    expect(navigation.goBack).toHaveBeenCalled();
  });

  it('deletes an existing item', () => {
    const navigation = createNav();
    const route = { params: { imageUri: undefined } };
    const { getByLabelText, queryByLabelText } = render(
      <ReceiptAnalysisScreen navigation={navigation} route={route} />,
    );

    // Ensure item 1 exists
    expect(getByLabelText('Item 1 name')).toBeTruthy();

    // Delete item 1 (use specific accessibility label)
    fireEvent.press(getByLabelText('Delete Item 1'));

    // Now item 1 name input should be gone
    expect(queryByLabelText('Item 1 name')).toBeNull();
  });
});
