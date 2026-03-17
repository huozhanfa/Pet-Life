import React, { useState, useEffect, useMemo } from 'react';
import { ScrollView, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/useTheme';
import { useSafeRouter, useSafeSearchParams } from '@/hooks/useSafeRouter';
import { createStyles } from './styles';
import { getPetById } from '@/services/petApi';
import type { Pet } from '@/types/pet';

export default function DetailScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const router = useSafeRouter();
  const { id } = useSafeSearchParams<{ id: number }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const { pet: p } = await getPetById(Number(id));
        if (!cancelled) setPet(p);
      } catch (error) {
        console.error('Failed to fetch pet detail:', error);
        if (!cancelled) setPet(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  const getGenderIcon = (gender: 'male' | 'female') => {
    return gender === 'male' ? 'mars' : 'venus';
  };

  const getGenderColor = (gender: 'male' | 'female') => {
    return gender === 'male' ? '#5B9BF5' : '#FF8FAB';
  };

  const getGenderText = (gender: 'male' | 'female') => {
    return gender === 'male' ? '公' : '母';
  };

  if (loading) {
    return (
      <Screen backgroundColor={theme.backgroundRoot}>
        <ActivityIndicator size="large" color={theme.primary} style={styles.loading} />
      </Screen>
    );
  }

  if (!pet) {
    return (
      <Screen backgroundColor={theme.backgroundRoot}>
        <View style={styles.loading}>
          <ThemedText variant="body">未找到宠物信息</ThemedText>
        </View>
      </Screen>
    );
  }

  return (
    <Screen backgroundColor={theme.backgroundRoot}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Image */}
        <Image source={{ uri: pet.avatar }} style={styles.heroImage} />

        {/* Back Button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <FontAwesome6 name="arrow-left" size={18} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Name Section */}
          <View style={styles.nameSection}>
            <ThemedText variant="h1" style={styles.petName}>
              {pet.name}
            </ThemedText>
            <View style={styles.breedBadge}>
              <FontAwesome6 name="heart" size={12} color={theme.primary} />
              <ThemedText variant="smallMedium" style={styles.breedText}>
                {pet.breed || pet.species}
              </ThemedText>
            </View>
          </View>

          {/* Basic Info */}
          <View style={styles.infoCard}>
            <ThemedText variant="title" style={styles.sectionTitle}>
              基本信息
            </ThemedText>

            <View style={styles.infoRow}>
              <View style={[styles.infoIcon, { backgroundColor: '#EDE8FF' }]}>
                <FontAwesome6 name="paw" size={18} color="#7C5CFC" />
              </View>
              <View style={styles.infoContent}>
                <ThemedText variant="caption" style={styles.infoLabel}>
                  类型
                </ThemedText>
                <ThemedText variant="bodyMedium" style={styles.infoValue}>
                  {pet.species}
                </ThemedText>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={[styles.infoIcon, { backgroundColor: getGenderColor(pet.gender) + '20' }]}>
                <FontAwesome6
                  name={getGenderIcon(pet.gender)}
                  size={18}
                  color={getGenderColor(pet.gender)}
                />
              </View>
              <View style={styles.infoContent}>
                <ThemedText variant="caption" style={styles.infoLabel}>
                  性别
                </ThemedText>
                <ThemedText variant="bodyMedium" style={styles.infoValue}>
                  {getGenderText(pet.gender)}
                </ThemedText>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={[styles.infoIcon, { backgroundColor: '#FFF4DD' }]}>
                <FontAwesome6 name="cake-candles" size={18} color="#FFCB57" />
              </View>
              <View style={styles.infoContent}>
                <ThemedText variant="caption" style={styles.infoLabel}>
                  年龄
                </ThemedText>
                <ThemedText variant="bodyMedium" style={styles.infoValue}>
                  {pet.age}
                </ThemedText>
              </View>
            </View>

            {pet.weight && (
              <View style={styles.infoRow}>
                <View style={[styles.infoIcon, { backgroundColor: '#E0F8EC' }]}>
                  <FontAwesome6 name="weight-scale" size={18} color="#5ED6A0" />
                </View>
                <View style={styles.infoContent}>
                  <ThemedText variant="caption" style={styles.infoLabel}>
                    体重
                  </ThemedText>
                  <ThemedText variant="bodyMedium" style={styles.infoValue}>
                    {pet.weight}
                  </ThemedText>
                </View>
              </View>
            )}
          </View>

          {/* Photo Gallery */}
          {pet.photos && pet.photos.length > 0 && (
            <View style={styles.infoCard}>
              <ThemedText variant="title" style={styles.sectionTitle}>
                照片墙
              </ThemedText>
              <View style={styles.photoGrid}>
                {pet.photos.map((photo, index) => (
                  <View key={index} style={styles.photoItem}>
                    <Image source={{ uri: photo }} style={styles.photoImage} />
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
