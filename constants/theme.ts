import { useColorScheme } from 'react-native';
import { useMemo } from 'react';

const lightTheme = {
  // Primary colors
  primary: '#1E3A8A', // Navy blue
  primaryLight: '#DBEAFE',
  primaryDark: '#1E40AF',
  primaryTransparent: 'rgba(30, 58, 138, 0.8)',
  
  // Secondary colors
  secondary: '#3B82F6',
  secondaryLight: '#EFF6FF',
  secondaryDark: '#2563EB',
  
  // Accent colors
  accent: '#60A5FA',
  accentLight: '#F0F9FF',
  accentDark: '#3B82F6',
  
  // Success, warning, error states
  success: '#10B981',
  successLight: '#ECFDF5',
  warning: '#F59E0B',
  warningLight: '#FFFBEB',
  error: '#EF4444',
  errorLight: '#FEF2F2',
  
  // Text colors
  textPrimary: '#111827',
  textSecondary: '#4B5563',
  textTertiary: '#9CA3AF',
  textLight: '#FFFFFF',
  
  // Background colors
  background: '#FFFFFF',
  backgroundLight: '#F9FAFB',
  cardBackground: '#FFFFFF',
  
  // Border and divider
  border: '#E5E7EB',
  divider: '#F3F4F6',
  
  // Other
  shadow: '#000000',
  white: '#FFFFFF',
  black: '#000000',
};

const darkTheme = {
  // Primary colors
  primary: '#DC2626', // Red
  primaryLight: '#FEE2E2',
  primaryDark: '#B91C1C',
  primaryTransparent: 'rgba(220, 38, 38, 0.8)',
  
  // Secondary colors
  secondary: '#EF4444',
  secondaryLight: '#FEF2F2',
  secondaryDark: '#DC2626',
  
  // Accent colors
  accent: '#F87171',
  accentLight: '#FEF2F2',
  accentDark: '#EF4444',
  
  // Success, warning, error states
  success: '#10B981',
  successLight: '#064E3B',
  warning: '#F59E0B',
  warningLight: '#78350F',
  error: '#EF4444',
  errorLight: '#7F1D1D',
  
  // Text colors
  textPrimary: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textTertiary: '#9CA3AF',
  textLight: '#FFFFFF',
  
  // Background colors
  background: '#000000',
  backgroundLight: '#111827',
  cardBackground: '#1F2937',
  
  // Border and divider
  border: '#374151',
  divider: '#1F2937',
  
  // Other
  shadow: '#000000',
  white: '#FFFFFF',
  black: '#000000',
};

export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  
  // Use useMemo to prevent unnecessary recalculations
  return useMemo(() => {
    // Always return a valid theme object, defaulting to light theme if colorScheme is null
    return colorScheme === 'dark' ? darkTheme : lightTheme;
  }, [colorScheme]);
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const fontWeights = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  circle: 9999,
};