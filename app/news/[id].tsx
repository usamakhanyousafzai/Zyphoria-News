import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  SafeAreaView 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Share2, MessageCircle, Clock, MapPin } from 'lucide-react-native';
import dayjs from 'dayjs';
import { StatusBar } from 'expo-status-bar';
import { getNewsFeed } from '@/utils/api';
import { colors } from '@/constants/theme';

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const newsItems = getNewsFeed();
  const newsItem = newsItems.find(item => item.id === id);
  
  if (!newsItem) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>News article not found</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: newsItem.imageUrl }} 
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{newsItem.category}</Text>
          </View>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
            activeOpacity={0.8}
          >
            <ArrowLeft size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{newsItem.title}</Text>
          
          <View style={styles.sourceContainer}>
            <Text style={styles.source}>{newsItem.source}</Text>
            <View style={styles.metaItem}>
              <Clock size={14} color={colors.textSecondary} />
              <Text style={styles.metaText}>
                {dayjs(newsItem.published).format('MMMM D, YYYY')}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <MapPin size={14} color={colors.textSecondary} />
              <Text style={styles.metaText}>{newsItem.location}</Text>
            </View>
          </View>
          
          <Text style={styles.body}>
            {`${newsItem.summary}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc sapien aliquam nunc, vitae aliquam nisl nunc eget nisl. Nullam auctor, nisl eget ultricies aliquam, nunc sapien aliquam nunc, vitae aliquam nisl nunc eget nisl.\n\nProin sed libero enim sed faucibus turpis in eu mi bibendum neque. Id porta nibh venenatis cras sed felis eget velit. Ut morbi tincidunt augue interdum velit euismod in pellentesque massa. Malesuada fames ac turpis egestas integer eget aliquet nibh praesent. Sed viverra tellus in hac habitasse platea dictumst.\n\nSed euismod nisi porta lorem mollis aliquam ut porttitor. Cum sociis natoque penatibus et magnis dis parturient montes nascetur. Cursus eget nunc scelerisque viverra mauris in aliquam sem. Ultricies leo integer malesuada nunc. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. In cursus turpis massa tincidunt dui ut ornare lectus.`}
          </Text>
          
          <View style={styles.tagsContainer}>
            <Text style={styles.tagLabel}>Related Topics:</Text>
            <View style={styles.tags}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Peace Process</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Diplomacy</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>International Relations</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.commentSection}>
            <View style={styles.commentHeader}>
              <View style={styles.commentCount}>
                <MessageCircle size={18} color={colors.textPrimary} />
                <Text style={styles.commentCountText}>
                  {newsItem.commentCount} Comments
                </Text>
              </View>
              <TouchableOpacity style={styles.shareButton} activeOpacity={0.7}>
                <Share2 size={18} color={colors.primary} />
                <Text style={styles.shareButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.commentInput}>
              <Text style={styles.commentPlaceholder}>Add your comment...</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.textSecondary,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  categoryText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: colors.white,
    textTransform: 'capitalize',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: colors.textPrimary,
    marginBottom: 16,
    lineHeight: 32,
  },
  sourceContainer: {
    marginBottom: 24,
  },
  source: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  body: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 24,
    marginBottom: 24,
  },
  tagsContainer: {
    marginBottom: 32,
  },
  tagLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.backgroundLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.textSecondary,
  },
  commentSection: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  commentCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentCountText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.textPrimary,
    marginLeft: 8,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.primary,
    marginLeft: 8,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
  },
  commentPlaceholder: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textTertiary,
  },
});