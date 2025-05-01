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
import { ArrowLeft, Users, Calendar, Globe, Clock, CircleCheck as CheckCircle, Share2, MessageCircle, Star } from 'lucide-react-native';
import dayjs from 'dayjs';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { getProjects } from '@/utils/api';
import { colors } from '@/constants/theme';
import Button from '@/components/ui/Button';

// Mock data for participants
const participants = [
  {
    id: '1',
    name: 'Maya Johnson',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    name: 'James Wilson',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    name: 'Sophia Chen',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    name: 'Omar Nassif',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Mock milestones data
const milestones = [
  {
    id: '1',
    title: 'Project Launch',
    description: 'Official launch event with stakeholders and participants.',
    date: '2024-11-20T10:00:00Z',
    completed: true,
  },
  {
    id: '2',
    title: 'First Training Session',
    description: 'Initial training for all participants on project goals and methods.',
    date: '2024-12-15T09:00:00Z',
    completed: true,
  },
  {
    id: '3',
    title: 'Community Engagement Phase',
    description: 'Begin outreach to local communities and collect preliminary data.',
    date: '2025-02-10T00:00:00Z',
    completed: false,
  },
  {
    id: '4',
    title: 'Mid-Project Evaluation',
    description: 'Review progress and adjust strategies based on feedback.',
    date: '2025-04-25T00:00:00Z',
    completed: false,
  },
];

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const projects = getProjects();
  const project = projects.find(item => item.id === id);
  
  if (!project) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Project not found</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const getStatusColor = () => {
    switch (project.status) {
      case 'planned':
        return colors.warning;
      case 'active':
        return colors.success;
      case 'completed':
        return colors.textTertiary;
      default:
        return colors.textTertiary;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: project.imageUrl }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
            style={styles.heroGradient}
          >
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={styles.backButton}
              activeOpacity={0.8}
            >
              <ArrowLeft size={24} color={colors.white} />
            </TouchableOpacity>
            
            <View style={styles.statusBadge} 
                  style={[
                    styles.statusBadge, 
                    { backgroundColor: getStatusColor() }
                  ]}>
              <Text style={styles.statusText}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </Text>
            </View>
          </LinearGradient>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{project.title}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Globe size={16} color={colors.textSecondary} />
              <Text style={styles.metaText}>{project.location}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Calendar size={16} color={colors.textSecondary} />
              <Text style={styles.metaText}>
                {dayjs(project.startDate).format('MMM D, YYYY')}
                {project.endDate ? ` - ${dayjs(project.endDate).format('MMM D, YYYY')}` : ' - Ongoing'}
              </Text>
            </View>
            
            <View style={styles.metaItem}>
              <Users size={16} color={colors.textSecondary} />
              <Text style={styles.metaText}>
                {project.participantsCount} participants
              </Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About the Project</Text>
            <Text style={styles.description}>
              {project.description}
              {'\n\n'}
              This collaborative initiative brings together participants from diverse backgrounds to work toward common goals. Through structured dialogue, skills development, and joint activities, we aim to break down barriers and foster lasting connections.
              {'\n\n'}
              The project focuses on sustainable peace-building practices that can be replicated in different contexts. By documenting our methodology and outcomes, we hope to create a model for future peace initiatives.
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Participants</Text>
            <View style={styles.participantsContainer}>
              {participants.map((participant) => (
                <View key={participant.id} style={styles.participantItem}>
                  <Image 
                    source={{ uri: participant.avatar }} 
                    style={styles.participantAvatar}
                    resizeMode="cover"
                  />
                  <Text style={styles.participantName}>{participant.name}</Text>
                </View>
              ))}
              
              {project.participantsCount > 4 && (
                <TouchableOpacity style={styles.moreParticipants} activeOpacity={0.7}>
                  <Text style={styles.moreParticipantsText}>
                    +{project.participantsCount - 4} more
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Project Milestones</Text>
            <View style={styles.milestonesContainer}>
              {milestones.map((milestone, index) => (
                <View key={milestone.id} style={styles.milestoneItem}>
                  <View style={styles.milestoneTimeline}>
                    <View 
                      style={[
                        styles.milestoneCircle,
                        { backgroundColor: milestone.completed ? colors.success : colors.border }
                      ]}
                    >
                      {milestone.completed && (
                        <CheckCircle size={16} color={colors.white} />
                      )}
                    </View>
                    {index < milestones.length - 1 && (
                      <View 
                        style={[
                          styles.milestoneLine,
                          { backgroundColor: milestone.completed ? colors.success : colors.border }
                        ]} 
                      />
                    )}
                  </View>
                  
                  <View style={styles.milestoneContent}>
                    <Text style={styles.milestoneTitle}>{milestone.title}</Text>
                    <Text style={styles.milestoneDate}>
                      {dayjs(milestone.date).format('MMMM D, YYYY')}
                    </Text>
                    <Text style={styles.milestoneDescription}>
                      {milestone.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.actionButtons}>
            <Button 
              title="Join Project" 
              onPress={() => {}}
              variant="primary"
              size="large"
              style={styles.joinButton}
            />
            
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                <MessageCircle size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                <Share2 size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                <Star size={20} color={colors.textSecondary} />
              </TouchableOpacity>
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
  heroContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'space-between',
    padding: 16,
    flexDirection: 'row',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    height: 28,
    paddingHorizontal: 12,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: colors.white,
  },
  content: {
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  metaContainer: {
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  participantsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  participantItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  participantName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textPrimary,
  },
  moreParticipants: {
    width: '50%',
    paddingLeft: 16,
    justifyContent: 'center',
  },
  moreParticipantsText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.primary,
  },
  milestonesContainer: {
    marginTop: 8,
  },
  milestoneItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  milestoneTimeline: {
    width: 24,
    alignItems: 'center',
  },
  milestoneCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  milestoneLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  milestoneContent: {
    flex: 1,
    marginLeft: 12,
  },
  milestoneTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  milestoneDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  milestoneDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  actionButtons: {
    marginTop: 8,
  },
  joinButton: {
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});