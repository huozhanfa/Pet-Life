import React, { useState, useCallback, useMemo } from 'react';
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/hooks/useTheme';
import { useSafeRouter } from '@/hooks/useSafeRouter';
import { createStyles } from './styles';
import { getPets } from '@/services/petApi';
import type { Pet } from '@/types/pet';

export default function HomeScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const router = useSafeRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = useCallback(async () => {
    try {
      setLoading(true);
      const { pets: list } = await getPets();
      setPets(list);
    } catch (error) {
      console.error('Failed to fetch pets:', error);
      setPets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { fetchPets(); }, [fetchPets]));

  const navigateToDetail = (pet: Pet) => {
    router.push('/detail', { id: pet.id });
  };

  const navigateToAddPet = () => {
    router.push('/add-pet');
  };

  const getGenderIcon = (gender: 'male' | 'female') => {
    return gender === 'male' ? 'mars' : 'venus';
  };

  const getGenderColor = (gender: 'male' | 'female') => {
    return gender === 'male' ? '#5B9BF5' : '#FF8FAB';
  };

  const renderPetCard = (pet: Pet) => (
    <TouchableOpacity
      key={pet.id}
      style={styles.petCard}
      onPress={() => navigateToDetail(pet)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: pet.avatar }} style={styles.petImage} />
      <View style={styles.petInfo}>
        <View style={styles.petNameRow}>
          <ThemedText variant="h4" style={styles.petName}>
            {pet.name}
          </ThemedText>
          <View
            style={[
              styles.genderBadge,
              { backgroundColor: getGenderColor(pet.gender) + '20' },
            ]}
          >
            <FontAwesome6
              name={getGenderIcon(pet.gender)}
              size={12}
              color={getGenderColor(pet.gender)}
            />
          </View>
        </View>
        <View style={styles.petDetails}>
          <View style={styles.petDetail}>
            <FontAwesome6 name="paw" size={12} color={theme.textMuted} />
            <ThemedText variant="small" style={styles.petDetailText}>
              {pet.species}
            </ThemedText>
          </View>
          <View style={styles.petDetail}>
            <FontAwesome6 name="heart" size={12} color={theme.textMuted} />
            <ThemedText variant="small" style={styles.petDetailText}>
              {pet.breed}
            </ThemedText>
          </View>
          <View style={styles.petDetail}>
            <FontAwesome6 name="cake-candles" size={12} color={theme.textMuted} />
            <ThemedText variant="small" style={styles.petDetailText}>
              {pet.age}
            </ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <FontAwesome6 name="paw" size={32} color={theme.textMuted} />
      </View>
      <ThemedText variant="title" style={styles.emptyText}>
        还没有宠物档案
      </ThemedText>
      <ThemedText variant="small" style={styles.emptySubtext}>
        点击下方按钮添加你的第一只宠物吧
      </ThemedText>
    </View>
  );

  return (
    <Screen backgroundColor={theme.backgroundRoot}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <ThemedText variant="small" style={styles.welcomeText}>
                欢迎回来
              </ThemedText>
              <ThemedText variant="h2" style={styles.headerTitle}>
                我的宠物
              </ThemedText>
            </View>
            <View style={styles.avatar}>
              <FontAwesome6 name="user" size={20} color={theme.textMuted} style={{ alignSelf: 'center', marginTop: 14 }} />
            </View>
          </View>
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroLabel}>
            <FontAwesome6 name="star" size={14} color="#FFCB57" solid />
            <ThemedText variant="labelSmall" style={styles.heroLabelText}>
              今日推荐
            </ThemedText>
          </View>
          <ThemedText variant="h2" style={styles.heroTitle}>
            给毛孩子最好的照顾
          </ThemedText>
          <ThemedText variant="small" style={styles.heroSubtitle}>
            记录每一个温馨时刻
          </ThemedText>
        </View>

        {/* Pet List */}
        <View style={styles.sectionHeader}>
          <ThemedText variant="title" style={styles.sectionTitle}>
            宠物档案
          </ThemedText>
          <TouchableOpacity onPress={fetchPets}>
            <ThemedText variant="smallMedium" style={styles.seeAllText}>
              刷新
            </ThemedText>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={theme.primary} />
        ) : pets.length === 0 ? (
          renderEmpty()
        ) : (
          pets.map(renderPetCard)
        )}
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={navigateToAddPet}>
        <FontAwesome6 name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </Screen>
  );
}
