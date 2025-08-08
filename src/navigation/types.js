/**
 * @typedef {Object} HomeStackParamList
 * @property {undefined} HomeMain - Main home screen with no params
 */

/**
 * @typedef {Object} CameraStackParamList
 * @property {undefined} CameraMain - Main camera screen with no params
 * @property {Object} ReceiptAnalysis - Receipt analysis screen
 * @property {string} ReceiptAnalysis.imageUri - URI of the captured receipt image
 * @property {number} ReceiptAnalysis.timestamp - Timestamp of when the image was captured
 */

/**
 * @typedef {Object} ReceiptHistoryStackParamList
 * @property {undefined} ReceiptHistoryMain - Main receipt history screen with no params
 * @property {Object} ReceiptDetails - Receipt details screen
 * @property {string} ReceiptDetails.receiptId - ID of the receipt to display
 */

/**
 * @typedef {Object} FitnessDashboardStackParamList
 * @property {undefined} FitnessDashboardMain - Main fitness dashboard screen with no params
 * @property {Object} FitnessDetails - Fitness details screen
 * @property {string} FitnessDetails.date - Date to display details for
 * @property {'nutrition' | 'activity'} FitnessDetails.category - Category of fitness data to display
 */

/**
 * @typedef {Object} RootTabParamList
 * @property {HomeStackParamList} Home - Home stack navigator params
 * @property {CameraStackParamList} Camera - Camera stack navigator params
 * @property {ReceiptHistoryStackParamList} ReceiptHistory - Receipt history stack navigator params
 * @property {FitnessDashboardStackParamList} FitnessDashboard - Fitness dashboard stack navigator params
 */

/**
 * @typedef {Object} ScreenProps
 * @property {Object} navigation - Navigation prop
 * @property {function} navigation.navigate - Navigate to another screen
 * @property {function} navigation.goBack - Go back to previous screen
 * @property {Object} route - Route information
 * @property {string} route.key - Unique key for the route
 * @property {string} route.name - Name of the current screen
 * @property {*} route.params - Parameters passed to the screen
 */

export const NavigationTypes = {
  // This empty object serves as a namespace for our types
  // The actual types are defined in JSDoc comments above
};
