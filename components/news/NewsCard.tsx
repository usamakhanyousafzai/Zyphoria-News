import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, MapPin, MessageCircle } from 'lucide-react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { colors } from '@/constants/theme';
import Card from '@/components/ui/Card';

dayjs.extend(relativeTime);

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  source: string;
  location: string;
  published: string; // ISO date string
  commentCount: number;
  category: 'conflict' | 'peace' | 'diplomacy' | 'humanitarian';
}

interface NewsCardProps {
  item: NewsItem;
  compact?: boolean;
}

export default function NewsCard({ item, compact = false }: NewsCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/news/${item.id}`);
  };
  
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
      <Card style={compact ? styles.compactCard : styles.card}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        
        <Image 
          source={{ uri: item.imageUrl }} 
          style={compact ? styles.compactImage : styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={compact ? 2 : 3}>
            {item.title}
          </Text>
          
          {!compact && (
            <Text style={styles.summary} numberOfLines={2}>
              {item.summary}
            </Text>
          )}
          
          <View style={styles.meta}>
            <View style={styles.metaItem}>
              <Clock size={14} color={colors.textSecondary} />
              <Text style={styles.metaText}>
                {dayjs(item.published).fromNow()}
              </Text>
            </View>
            
            <View style={styles.metaItem}>
              <MapPin size={14} color={colors.textSecondary} />
              <Text style={styles.metaText}>{item.location}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <MessageCircle size={14} color={colors.textSecondary} />
              <Text style={styles.metaText}>{item.commentCount}</Text>
            </View>
          </View>
          
          <Text style={styles.source}>{item.source}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  compactCard: {
    padding: 0,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 120,
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  compactImage: {
    width: 120,
    height: '100%',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  content: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  meta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  source: {
    fontSize: 12,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    zIndex: 1,
  },
  categoryText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});