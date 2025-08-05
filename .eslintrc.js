module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
    requireConfigFile: false,
  },
  plugins: ['react', 'react-native', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 'off', // Since we're using TypeScript later
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': ['warn', { skip: ['Button'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    'no-duplicate-imports': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    'react-native/react-native': true,
    es6: true,
    node: true,
  },
  globals: {
    __DEV__: true,
  },
};
