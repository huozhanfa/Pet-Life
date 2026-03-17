import React, { useState, useMemo } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome6 } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/useTheme';
import { useSafeRouter } from '@/hooks/useSafeRouter';
import { createStyles } from './styles';
import { createPet } from '@/services/petApi';

export default function AddPetScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const router = useSafeRouter();

  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: 'male' as 'male' | 'female',
    weight: '',
    avatar: '',
  });
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('提示', '需要相册权限才能选择图片');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setFormData({ ...formData, avatar: result.assets[0].uri });
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      Alert.alert('提示', '请输入宠物名字');
      return;
    }
    if (!formData.species.trim()) {
      Alert.alert('提示', '请选择宠物类型');
      return;
    }

    setLoading(true);
    try {
      await createPet({
        name: formData.name,
        species: formData.species,
        breed: formData.breed,
        age: formData.age,
        gender: formData.gender,
        weight: formData.weight,
        avatar: formData.avatar,
      });
      Alert.alert('成功', '宠物添加成功', [
        { text: '确定', onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error('Failed to add pet:', error);
      Alert.alert('错误', '添加失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen backgroundColor={theme.backgroundRoot}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <FontAwesome6 name="arrow-left" size={18} color={theme.textPrimary} />
            </TouchableOpacity>
            <ThemedText variant="h2" style={styles.headerTitle}>
              添加宠物
            </ThemedText>
          </View>

          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
              {formData.avatar ? (
                <Image source={{ uri: formData.avatar }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <FontAwesome6 name="camera" size={32} color={theme.textMuted} />
                  <ThemedText variant="caption" style={styles.avatarText}>
                    点击上传头像
                  </ThemedText>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.formCard}>
            <View style={styles.formGroup}>
              <ThemedText variant="bodyMedium" style={styles.label}>
                宠物名字 *
              </ThemedText>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="请输入宠物名字"
                placeholderTextColor={theme.textMuted}
              />
            </View>

            <View style={styles.formGroup}>
              <ThemedText variant="bodyMedium" style={styles.label}>
                宠物类型 *
              </ThemedText>
              <TextInput
                style={styles.input}
                value={formData.species}
                onChangeText={(text) => setFormData({ ...formData, species: text })}
                placeholder="如：猫咪、狗狗"
                placeholderTextColor={theme.textMuted}
              />
            </View>

            <View style={styles.formGroup}>
              <ThemedText variant="bodyMedium" style={styles.label}>
                品种
              </ThemedText>
              <TextInput
                style={styles.input}
                value={formData.breed}
                onChangeText={(text) => setFormData({ ...formData, breed: text })}
                placeholder="如：英短、金毛"
                placeholderTextColor={theme.textMuted}
              />
            </View>

            <View style={styles.formGroup}>
              <ThemedText variant="bodyMedium" style={styles.label}>
                年龄
              </ThemedText>
              <TextInput
                style={styles.input}
                value={formData.age}
                onChangeText={(text) => setFormData({ ...formData, age: text })}
                placeholder="如：2岁"
                placeholderTextColor={theme.textMuted}
              />
            </View>

            <View style={styles.formGroup}>
              <ThemedText variant="bodyMedium" style={styles.label}>
                性别
              </ThemedText>
              <View style={styles.genderRow}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    formData.gender === 'male' ? styles.genderButtonActive : styles.genderButtonInactive,
                  ]}
                  onPress={() => setFormData({ ...formData, gender: 'male' })}
                >
                  <FontAwesome6
                    name="mars"
                    size={18}
                    color={formData.gender === 'male' ? '#5B9BF5' : theme.textMuted}
                  />
                  <ThemedText
                    variant="body"
                    style={[
                      styles.genderText,
                      { color: formData.gender === 'male' ? '#5B9BF5' : theme.textMuted },
                    ]}
                  >
                    公
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    formData.gender === 'female' ? styles.genderButtonActive : styles.genderButtonInactive,
                  ]}
                  onPress={() => setFormData({ ...formData, gender: 'female' })}
                >
                  <FontAwesome6
                    name="venus"
                    size={18}
                    color={formData.gender === 'female' ? '#FF8FAB' : theme.textMuted}
                  />
                  <ThemedText
                    variant="body"
                    style={[
                      styles.genderText,
                      { color: formData.gender === 'female' ? '#FF8FAB' : theme.textMuted },
                    ]}
                  >
                    母
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formGroup}>
              <ThemedText variant="bodyMedium" style={styles.label}>
                体重
              </ThemedText>
              <TextInput
                style={styles.input}
                value={formData.weight}
                onChangeText={(text) => setFormData({ ...formData, weight: text })}
                placeholder="如：5kg"
                placeholderTextColor={theme.textMuted}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            <ThemedText variant="bodyMedium" style={styles.submitButtonText}>
              {loading ? '添加中...' : '添加宠物'}
            </ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
