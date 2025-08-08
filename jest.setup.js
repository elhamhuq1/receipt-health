/* eslint-env jest */
// Ensure __DEV__ is defined for react-native code paths
global.__DEV__ = true;

// Basic mocks for React Native environment pieces that might be accessed
jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const platform = jest.requireActual('react-native/Libraries/Utilities/Platform');
  return {
    ...platform,
    OS: 'ios',
    select: objs => ('ios' in objs ? objs.ios : objs.default),
  };
});

// Silence React Native warn logs in tests
const originalWarn = console.warn;
console.warn = (...args) => {
  const message = args[0] ?? '';
  if (typeof message === 'string' && message.includes('ViewPropTypes will be removed')) {
    return;
  }
  originalWarn(...args);
};
