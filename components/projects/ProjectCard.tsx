import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Users, Calendar, Globe } from 'lucide-react-native';
import dayjs from 'dayjs';
import { colors } from '@/constants/theme';
import Card from '@/components/ui/Card';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDate: string; // ISO date string
  endDate: string | null; // ISO date string or null if ongoing
  participantsCount: number;
  location: string;
  status: 'planned' | 'active' | 'completed';
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/projects/${project.id}`);
  };
  
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
    <TouchableOpacity activeOpacity={0.85} onPress={handlePress}>
      <Card>
        <View style={styles.statusContainer}>
          <View 
            style={[
              styles.statusBadge, 
              { backgroundColor: getStatusColor() }
            ]}
          >
            <Text style={styles.statusText}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Text>
          </View>
        </View>
        
        <Image 
          source={{ uri: project.imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {project.description}
        </Text>
        
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
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 8,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
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
    marginBottom: 16,
    lineHeight: 20,
  },
  metaContainer: {
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.textSecondary,
  },
});