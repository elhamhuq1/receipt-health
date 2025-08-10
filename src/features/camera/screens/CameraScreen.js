import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Button from '../../../shared/components/Button';

const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);

  const handleRequestPermission = useCallback(async () => {
    await requestPermission();
  }, [requestPermission]);

  const handleCapture = useCallback(async () => {
    if (!cameraRef.current || isCapturing) return;
    try {
      setIsCapturing(true);
      const result = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      setPhotoUri(result?.uri ?? null);
    } catch (error) {
      // noop for now; ErrorBoundary handles UI-level failures
    } finally {
      setIsCapturing(false);
    }
  }, [isCapturing]);

  const handleRetake = useCallback(() => {
    setPhotoUri(null);
  }, []);

  if (!permission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
        <Text style={styles.message}>Checking camera permissions…</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Camera Access Needed</Text>
        <Text style={styles.subtitle}>Allow access to scan receipts.</Text>
        <Button title="Allow Camera" onPress={handleRequestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: photoUri }}
            style={styles.preview}
            resizeMode="cover"
            accessibilityLabel="Captured photo preview"
          />
          <View style={styles.actionsRow}>
            <Button title="Retake" variant="outline" onPress={handleRetake} style={styles.action} />
            <Button
              title="Analyze"
              variant="secondary"
              onPress={() =>
                navigation.navigate('ReceiptAnalysis', {
                  imageUri: photoUri,
                  timestamp: Date.now(),
                })
              }
              style={styles.action}
            />
          </View>
        </View>
      ) : (
        <View style={styles.cameraWrapper}>
          <CameraView ref={cameraRef} style={styles.camera} facing="back" testID="camera-view" />
          <View style={styles.captureBar}>
            <Button
              title={isCapturing ? 'Capturing…' : 'Capture'}
              onPress={handleCapture}
              loading={isCapturing}
              style={styles.captureButton}
              accessibilityLabel="Capture"
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  message: {
    marginTop: 12,
    color: '#4B5563',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  cameraWrapper: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  captureBar: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    width: 180,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  preview: {
    width: '90%',
    height: '70%',
    borderRadius: 8,
  },
  actionsRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  action: {
    marginHorizontal: 8,
    minWidth: 120,
  },
});

export default CameraScreen;
