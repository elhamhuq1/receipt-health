// App-wide configuration constants

export const API_CONFIG = {
  // Will be populated with API endpoints and configuration
  baseUrl: process.env.API_BASE_URL || 'https://api.receiptHealth.com',
  timeout: 10000,
};

export const STRAVA_CONFIG = {
  // Strava API configuration
  clientId: process.env.STRAVA_CLIENT_ID,
  clientSecret: process.env.STRAVA_CLIENT_SECRET,
  redirectUri: process.env.STRAVA_REDIRECT_URI,
};

export const HEALTHKIT_CONFIG = {
  // HealthKit permissions and configuration
  permissions: {
    read: [
      'ActivitySummary',
      'Workout',
      'StepCount',
      'DistanceWalking',
    ],
    write: [
      // Add write permissions if needed
    ],
  },
};

export const APP_CONFIG = {
  version: '1.0.0',
  buildNumber: '1',
  supportEmail: 'support@receiptHealth.com',
};