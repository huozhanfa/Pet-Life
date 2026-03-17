import React, { useMemo } from 'react';
import { ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/useTheme';
import { createStyles } from './styles';

interface Post {
  id: number;
  userName: string;
  userAvatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
}

const mockPosts: Post[] = [
  {
    id: 1,
    userName: '小橘子',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    time: '2小时前',
    content: '今天带小橘去公园散步，它玩得可开心了！一路上遇到好多小伙伴，还交了个新朋友',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    likes: 128,
    comments: 32,
  },
  {
    id: 2,
    userName: '布偶控',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    time: '5小时前',
    content: '分享一下我家布偶的日常，每天早上都要在窗台上晒太阳，太治愈了~',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
    likes: 256,
    comments: 48,
  },
];

export default function CommunityScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderPost = (post: Post) => (
    <View key={post.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <ThemedText variant="bodyMedium" style={styles.userName}>
            {post.userName}
          </ThemedText>
          <ThemedText variant="caption" style={styles.postTime}>
            {post.time}
          </ThemedText>
        </View>
      </View>
      {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
      <View style={styles.postContent}>
        <ThemedText variant="body" style={styles.postText}>
          {post.content}
        </ThemedText>
      </View>
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome6 name="heart" size={18} color={theme.textMuted} />
          <ThemedText variant="small" style={styles.actionText}>
            {post.likes}
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome6 name="comment" size={18} color={theme.textMuted} />
          <ThemedText variant="small" style={styles.actionText}>
            {post.comments}
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome6 name="share" size={18} color={theme.textMuted} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Screen backgroundColor={theme.backgroundRoot}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText variant="h2" style={styles.headerTitle}>
            宠物社区
          </ThemedText>
        </View>
        {mockPosts.map(renderPost)}
      </ScrollView>
    </Screen>
  );
}
