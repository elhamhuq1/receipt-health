// Export all shared components from this file

// Nutrition and health components
export {
  default as NutritionTag,
  ProteinTag,
  CarbsTag,
  FatTag,
  FiberTag,
  SugarTag,
  SodiumTag,
  CalciumTag,
  IronTag,
  VitaminCTag,
  CaloriesTag,
} from './NutritionTag';

export {
  default as HealthCard,
  NutritionSummaryCard,
  MealCard,
  ReceiptSummaryCard,
} from './HealthCard';

// UI components
export { default as Button } from './Button';
export { default as BackButton } from './BackButton';
export { default as Loading, FullScreenLoading, InlineLoading } from './Loading';
export { default as ErrorBoundary, withErrorBoundary } from './ErrorBoundary';

// Legacy components (to be replaced)
export { default as Card } from './Card';
export { default as Typography } from './Typography';
