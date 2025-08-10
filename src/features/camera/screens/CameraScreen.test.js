import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CameraScreen from './CameraScreen';

jest.mock('expo-camera', () => {
  const ReactModule = require('react');
  const RN = require('react-native');
  return {
    useCameraPermissions: jest.fn(() => [{ granted: true }, jest.fn()]),
    CameraView: ReactModule.forwardRef((props, ref) => {
      const takePictureAsync = jest.fn(async () => ({ uri: 'file:///mock-photo.jpg' }));
      if (ref) {
        ref.current = { takePictureAsync };
      }
      return ReactModule.createElement(RN.View, { ...props, testID: 'camera-view' });
    }),
  };
});

describe('CameraScreen', () => {
  it('renders camera when permission granted', () => {
    const { getByTestId } = render(<CameraScreen />);
    expect(getByTestId('camera-view')).toBeTruthy();
  });

  it('captures a photo and shows preview', async () => {
    const { getByText, queryByTestId, findByLabelText } = render(
      <CameraScreen navigation={{ navigate: jest.fn(), goBack: jest.fn() }} />,
    );

    fireEvent.press(getByText('Capture'));

    const preview = await findByLabelText('Captured photo preview');
    expect(preview).toBeTruthy();
    expect(queryByTestId('camera-view')).toBeNull();
  });

  it('retakes after preview', async () => {
    const { getByText, findByLabelText } = render(
      <CameraScreen navigation={{ navigate: jest.fn(), goBack: jest.fn() }} />,
    );

    fireEvent.press(getByText('Capture'));
    await findByLabelText('Captured photo preview');

    fireEvent.press(getByText('Retake'));

    await waitFor(() => expect(getByText('Capture')).toBeTruthy());
  });
});
