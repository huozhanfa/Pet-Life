import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius, Theme } from '@/constants/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing['2xl'],
      paddingBottom: Spacing['6xl'],
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing['2xl'],
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: BorderRadius.xl,
      backgroundColor: theme.backgroundTertiary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: Spacing.md,
    },
    headerTitle: {
      color: theme.textPrimary,
    },
    formCard: {
      backgroundColor: theme.backgroundDefault,
      borderRadius: BorderRadius['2xl'],
      padding: Spacing.xl,
      marginBottom: Spacing.lg,
      borderWidth: 1.5,
      borderColor: 'rgba(255,255,255,0.7)',
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 6,
    },
    avatarSection: {
      alignItems: 'center',
      marginBottom: Spacing['2xl'],
    },
    avatarContainer: {
      width: 120,
      height: 120,
      borderRadius: BorderRadius.full,
      backgroundColor: theme.backgroundTertiary,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 3,
      borderColor: theme.primary,
      overflow: 'hidden',
    },
    avatarImage: {
      width: '100%',
      height: '100%',
    },
    avatarPlaceholder: {
      alignItems: 'center',
    },
    avatarText: {
      color: theme.textMuted,
      marginTop: Spacing.sm,
      fontSize: 12,
    },
    formGroup: {
      marginBottom: Spacing.xl,
    },
    label: {
      color: theme.textPrimary,
      marginBottom: Spacing.sm,
    },
    input: {
      backgroundColor: theme.backgroundTertiary,
      borderRadius: BorderRadius.xl,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      fontSize: 16,
      color: theme.textPrimary,
      borderWidth: 1.5,
      borderColor: 'rgba(255,255,255,0.7)',
    },
    genderRow: {
      flexDirection: 'row',
      gap: Spacing.md,
    },
    genderButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Spacing.md,
      borderRadius: BorderRadius.xl,
      borderWidth: 1.5,
    },
    genderButtonActive: {
      borderColor: theme.primary,
    },
    genderButtonInactive: {
      borderColor: theme.borderLight,
    },
    genderText: {
      marginLeft: Spacing.sm,
    },
    submitButton: {
      backgroundColor: theme.primary,
      borderRadius: BorderRadius.xl,
      paddingVertical: Spacing.lg,
      alignItems: 'center',
      marginTop: Spacing.xl,
      borderWidth: 1.5,
      borderColor: 'rgba(255,255,255,0.3)',
      shadowColor: '#5A3ED9',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 6,
    },
    submitButtonText: {
      color: '#FFFFFF',
    },
  });
};
