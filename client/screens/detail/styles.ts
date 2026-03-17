import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius, Theme } from '@/constants/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    scrollContent: {
      flexGrow: 1,
      paddingBottom: Spacing['6xl'],
    },
    heroImage: {
      width: '100%',
      height: 300,
    },
    content: {
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.xl,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.xl,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: BorderRadius.xl,
      backgroundColor: theme.backgroundDefault,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    nameSection: {
      marginBottom: Spacing.xl,
    },
    petName: {
      color: theme.textPrimary,
      marginBottom: Spacing.sm,
    },
    breedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.backgroundTertiary,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.full,
      alignSelf: 'flex-start',
    },
    breedText: {
      color: theme.primary,
      marginLeft: Spacing.xs,
    },
    infoCard: {
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
    sectionTitle: {
      color: theme.textPrimary,
      marginBottom: Spacing.lg,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.lg,
    },
    infoIcon: {
      width: 44,
      height: 44,
      borderRadius: BorderRadius.xl,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: Spacing.md,
    },
    infoContent: {
      flex: 1,
    },
    infoLabel: {
      color: theme.textMuted,
    },
    infoValue: {
      color: theme.textPrimary,
      marginTop: Spacing.xs,
    },
    photoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.md,
      marginTop: Spacing.md,
    },
    photoItem: {
      width: '31%',
      aspectRatio: 1,
      borderRadius: BorderRadius.lg,
      overflow: 'hidden',
    },
    photoImage: {
      width: '100%',
      height: '100%',
    },
    loading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
