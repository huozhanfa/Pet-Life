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
    profileCard: {
      backgroundColor: theme.backgroundDefault,
      borderRadius: BorderRadius['2xl'],
      padding: Spacing['2xl'],
      alignItems: 'center',
      marginBottom: Spacing['2xl'],
      borderWidth: 1.5,
      borderColor: 'rgba(255,255,255,0.7)',
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 6,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: BorderRadius.full,
      backgroundColor: theme.backgroundTertiary,
      marginBottom: Spacing.lg,
      borderWidth: 3,
      borderColor: theme.primary,
    },
    userName: {
      color: theme.textPrimary,
      marginBottom: Spacing.xs,
    },
    userBio: {
      color: theme.textSecondary,
      textAlign: 'center',
    },
    stats: {
      flexDirection: 'row',
      marginTop: Spacing.xl,
      gap: Spacing['4xl'],
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      color: theme.primary,
    },
    statLabel: {
      color: theme.textMuted,
      marginTop: Spacing.xs,
    },
    sectionTitle: {
      color: theme.textPrimary,
      marginBottom: Spacing.lg,
    },
    menuCard: {
      backgroundColor: theme.backgroundDefault,
      borderRadius: BorderRadius['2xl'],
      marginBottom: Spacing.lg,
      borderWidth: 1.5,
      borderColor: 'rgba(255,255,255,0.7)',
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 6,
      overflow: 'hidden',
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderLight,
    },
    menuIcon: {
      width: 44,
      height: 44,
      borderRadius: BorderRadius.xl,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: Spacing.md,
    },
    menuText: {
      flex: 1,
      color: theme.textPrimary,
    },
    menuArrow: {
      color: theme.textMuted,
    },
  });
};
