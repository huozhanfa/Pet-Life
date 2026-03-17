import React, { useMemo } from 'react';
import { ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/useTheme';
import { createStyles } from './styles';

interface MenuItem {
  icon: string;
  iconBgColor: string;
  iconColor: string;
  title: string;
  onPress?: () => void;
}

export default function ProfileScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const menuItems: MenuItem[] = [
    {
      icon: 'paw',
      iconBgColor: '#EDE8FF',
      iconColor: '#7C5CFC',
      title: '我的宠物',
    },
    {
      icon: 'camera',
      iconBgColor: '#FFE8EE',
      iconColor: '#FF8FAB',
      title: '相册管理',
    },
    {
      icon: 'calendar-check',
      iconBgColor: '#FFF4DD',
      iconColor: '#FFCB57',
      title: '健康记录',
    },
    {
      icon: 'gear',
      iconBgColor: '#E0F8EC',
      iconColor: '#5ED6A0',
      title: '设置',
    },
  ];

  const renderMenuItem = (item: MenuItem, index: number) => (
    <TouchableOpacity
      key={index}
      style={[styles.menuItem, index === menuItems.length - 1 && { borderBottomWidth: 0 }]}
      onPress={item.onPress}
    >
      <View style={[styles.menuIcon, { backgroundColor: item.iconBgColor }]}>
        <FontAwesome6 name={item.icon} size={18} color={item.iconColor} />
      </View>
      <ThemedText variant="bodyMedium" style={styles.menuText}>
        {item.title}
      </ThemedText>
      <FontAwesome6 name="chevron-right" size={16} color={theme.textMuted} />
    </TouchableOpacity>
  );

  return (
    <Screen backgroundColor={theme.backgroundRoot}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <FontAwesome6
              name="user"
              size={40}
              color={theme.textMuted}
              style={{ alignSelf: 'center', marginTop: 30 }}
            />
          </View>
          <ThemedText variant="h3" style={styles.userName}>
            宠物爱好者
          </ThemedText>
          <ThemedText variant="small" style={styles.userBio}>
            热爱生活，爱护小动物
          </ThemedText>
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <ThemedText variant="h3" style={styles.statNumber}>
                3
              </ThemedText>
              <ThemedText variant="caption" style={styles.statLabel}>
                宠物
              </ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText variant="h3" style={styles.statNumber}>
                128
              </ThemedText>
              <ThemedText variant="caption" style={styles.statLabel}>
                动态
              </ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText variant="h3" style={styles.statNumber}>
                256
              </ThemedText>
              <ThemedText variant="caption" style={styles.statLabel}>
                关注
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Menu */}
        <ThemedText variant="title" style={styles.sectionTitle}>
          功能菜单
        </ThemedText>
        <View style={styles.menuCard}>{menuItems.map(renderMenuItem)}</View>
      </ScrollView>
    </Screen>
  );
}
