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
    headerTitle: {
      color: theme.textPrimary,
    },
    postCard: {
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
    postHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.lg,
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: BorderRadius.full,
      backgroundColor: theme.backgroundTertiary,
    },
    userInfo: {
      flex: 1,
      marginLeft: Spacing.md,
    },
    userName: {
      color: theme.textPrimary,
    },
    postTime: {
      color: theme.textMuted,
      marginTop: Spacing.xs,
    },
    postImage: {
      width: '100%',
      height: 200,
    },
    postContent: {
      padding: Spacing.lg,
    },
    postText: {
      color: theme.textPrimary,
      lineHeight: 22,
    },
    postActions: {
      flexDirection: 'row',
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing.lg,
      gap: Spacing['2xl'],
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionText: {
      color: theme.textSecondary,
      marginLeft: Spacing.sm,
    },
  });
};
