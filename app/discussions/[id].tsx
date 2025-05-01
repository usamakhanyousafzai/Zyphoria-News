import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  TextInput
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Send, MoveVertical as MoreVertical } from 'lucide-react-native';
import dayjs from 'dayjs';
import { StatusBar } from 'expo-status-bar';
import { getDiscussions } from '@/utils/api';
import { colors } from '@/constants/theme';

// Mock message data
const messages = [
  {
    id: '1',
    text: 'I believe we need to focus more on educational exchanges. When young people from different sides of a conflict interact, stereotypes break down naturally.',
    author: {
      id: '1',
      name: 'Maya Johnson',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    timestamp: '2025-04-02T10:30:00Z',
    likes: 12,
  },
  {
    id: '2',
    text: 'Agreed. In my experience working with youth from conflict regions, personal relationships formed through these programs create lasting change and understanding.',
    author: {
      id: '2',
      name: 'James Wilson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    timestamp: '2025-04-02T11:15:00Z',
    likes: 8,
  },
  {
    id: '3',
    text: 'Educational exchanges are valuable, but we also need structured dialogue programs that specifically address the historical context of conflicts. Without addressing root causes, surface-level connections may not translate to systemic change.',
    author: {
      id: '3',
      name: 'Sophia Chen',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    timestamp: '2025-04-02T12:05:00Z',
    likes: 15,
  },
  {
    id: '4',
    text: 'I can share a successful case from my region where educational exchanges were combined with joint community projects. Students not only formed friendships but worked together to solve local problems, creating tangible results.',
    author: {
      id: '4',
      name: 'Omar Nassif',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    timestamp: '2025-04-02T13:40:00Z',
    likes: 10,
  },
];

export default function DiscussionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const discussions = getDiscussions();
  const discussion = discussions.find(item => item.id === id);
  
  if (!discussion) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Discussion not found</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const renderMessage = ({ item }: { item: typeof messages[0] }) => (
    <View style={styles.messageContainer}>
      <Image 
        source={{ uri: item.author.avatar }} 
        style={styles.avatar}
        resizeMode="cover"
      />
      
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.authorName}>{item.author.name}</Text>
          <Text style={styles.timestamp}>
            {dayjs(item.timestamp).format('MMM D, h:mm A')}
          </Text>
        </View>
        
        <Text style={styles.messageText}>{item.text}</Text>
        
        <View style={styles.messageActions}>
          <TouchableOpacity style={styles.likeButton} activeOpacity={0.7}>
            <Text style={styles.likeButtonText}>Like • {item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.replyButton} activeOpacity={0.7}>
            <Text style={styles.replyButtonText}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
        <MoreVertical size={16} color={colors.textTertiary} />
      </TouchableOpacity>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discussion</Text>
        <View style={styles.headerRight} />
      </View>
      
      <View style={styles.discussionInfo}>
        <View style={styles.topicContainer}>
          <View style={styles.topicBadge}>
            <Text style={styles.topicText}>{discussion.topic}</Text>
          </View>
          <View style={styles.regionBadge}>
            <Text style={styles.regionText}>{discussion.region}</Text>
          </View>
        </View>
        
        <Text style={styles.title}>{discussion.title}</Text>
        <Text style={styles.description}>{discussion.description}</Text>
        
        <View style={styles.stats}>
          <Text style={styles.statsText}>
            {discussion.participants} participants • {discussion.messages} messages • 
            Started {dayjs(discussion.created).format('MMMM D, YYYY')}
          </Text>
        </View>
      </View>
      
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add to the discussion..."
          multiline
          placeholderTextColor={colors.textTertiary}
        />
        <TouchableOpacity style={styles.sendButton} activeOpacity={0.7}>
          <Send size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
  },
  headerRight: {
    width: 40,
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
  discussionInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
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
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  stats: {
    marginTop: 8,
  },
  statsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.textTertiary,
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  authorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.textPrimary,
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.textTertiary,
  },
  messageText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
    marginBottom: 8,
  },
  messageActions: {
    flexDirection: 'row',
  },
  likeButton: {
    marginRight: 16,
  },
  likeButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.textSecondary,
  },
  replyButton: {},
  replyButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.textSecondary,
  },
  moreButton: {
    padding: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    maxHeight: 100,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textPrimary,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});