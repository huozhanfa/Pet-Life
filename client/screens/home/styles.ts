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
      marginBottom: Spacing.xl,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.lg,
    },
    welcomeText: {
      color: theme.textSecondary,
    },
    headerTitle: {
      color: theme.textPrimary,
      marginTop: Spacing.xs,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: BorderRadius.full,
      backgroundColor: theme.backgroundTertiary,
    },
    heroCard: {
      backgroundColor: theme.primary,
      borderRadius: BorderRadius['3xl'],
      paddingVertical: Spacing['3xl'],
      paddingHorizontal: Spacing.xl,
      alignItems: 'center',
      marginBottom: Spacing['2xl'],
      borderWidth: 1.5,
      borderColor: 'rgba(255,255,255,0.25)',
      shadowColor: '#5A3ED9',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.35,
      shadowRadius: 24,
      elevation: 10,
    },
    heroLabel: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    heroLabelText: {
      color: '#FFCB57',
      marginLeft: Spacing.xs,
    },
    heroTitle: {
      color: '#FFFFFF',
      marginTop: Spacing.md,
      textAlign: 'center',
    },
    heroSubtitle: {
      color: 'rgba(255,255,255,0.7)',
      marginTop: Spacing.sm,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.lg,
    },
    sectionTitle: {
      color: theme.textPrimary,
    },
    seeAllText: {
      color: theme.primary,
    },
    petCard: {
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
    petImage: {
      width: '100%',
      height: 180,
      borderTopLeftRadius: BorderRadius['2xl'],
      borderTopRightRadius: BorderRadius['2xl'],
    },
    petInfo: {
      padding: Spacing.lg,
    },
    petNameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.xs,
    },
    petName: {
      color: theme.textPrimary,
      flex: 1,
    },
    genderBadge: {
      width: 24,
      height: 24,
      borderRadius: BorderRadius.full,
      alignItems: 'center',
      justifyContent: 'center',
    },
    petDetails: {
      flexDirection: 'row',
      marginTop: Spacing.sm,
      gap: Spacing.md,
    },
    petDetail: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    petDetailText: {
      color: theme.textSecondary,
      marginLeft: Spacing.xs,
    },
    addButton: {
      position: 'absolute',
      right: Spacing.lg,
      bottom: Spacing['4xl'],
      width: 60,
      height: 60,
      borderRadius: BorderRadius.full,
      backgroundColor: theme.primary,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderColor: 'rgba(255,255,255,0.3)',
      shadowColor: '#5A3ED9',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 6,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Spacing['6xl'],
    },
    emptyIcon: {
      width: 80,
      height: 80,
      borderRadius: BorderRadius['2xl'],
      backgroundColor: theme.backgroundTertiary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Spacing.lg,
    },
    emptyText: {
      color: theme.textSecondary,
      marginTop: Spacing.md,
    },
    emptySubtext: {
      color: theme.textMuted,
      marginTop: Spacing.sm,
      textAlign: 'center',
    },
  });
};
