// Theme configuration for ReceiptHealth
export const colors = {
  primary: {
    light: '#60A5FA', // blue-400
    DEFAULT: '#3B82F6', // blue-500
    dark: '#2563EB', // blue-600
  },
  secondary: {
    light: '#A7F3D0', // green-200
    DEFAULT: '#34D399', // green-400
    dark: '#059669', // green-600
  },
  background: {
    light: '#FFFFFF',
    dark: '#1F2937',
  },
  text: {
    primary: '#111827',
    secondary: '#4B5563',
    light: '#9CA3AF',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};
export default {
  colors,
  spacing,
  typography,
};
