import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MessageSquare, Users, Clock } from 'lucide-react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { colors } from '@/constants/theme';
import Card from '@/components/ui/Card';

dayjs.extend(relativeTime);

export interface Discussion {
  id: string;
  title: string;
  description: string;
  created: string; // ISO date string
  lastActive: string; // ISO date string
  participants: number;
  messages: number;
  region: string;
  topic: string;
}

interface DiscussionCardProps {
  discussion: Discussion;
}

export default function DiscussionCard({ discussion }: DiscussionCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/discussions/${discussion.id}`);
  };
  
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <Card>
        <View style={styles.topicContainer}>
          <View style={styles.topicBadge}>
            <Text style={styles.topicText}>{discussion.topic}</Text>
          </View>
          <View style={styles.regionBadge}>
            <Text style={styles.regionText}>{discussion.region}</Text>
          </View>
        </View>
        
        <Text style={styles.title}>{discussion.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {discussion.description}
        </Text>
        
        <View style={styles.stats}>
          <View style={styles.stat}>
            <MessageSquare size={16} color={colors.textSecondary} />
            <Text style={styles.statText}>{discussion.messages}</Text>
          </View>
          
          <View style={styles.stat}>
            <Users size={16} color={colors.textSecondary} />
            <Text style={styles.statText}>{discussion.participants}</Text>
          </View>
          
          <View style={styles.stat}>
            <Clock size={16} color={colors.textSecondary} />
            <Text style={styles.statText}>
              {dayjs(discussion.lastActive).fromNow()}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  topicContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  topicBadge: {
    backgroundColor: colors.secondaryLight,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  topicText: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '600',
  },
  regionBadge: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  regionText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
    color: colors.textSecondary,
  },
});