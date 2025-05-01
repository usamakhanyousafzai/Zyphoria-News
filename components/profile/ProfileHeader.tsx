import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CreditCard as Edit2, MapPin, Calendar } from 'lucide-react-native';
import dayjs from 'dayjs';
import { colors } from '@/constants/theme';
import { User } from '@/types/user';

interface ProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
}

export default function ProfileHeader({ 
  user, 
  isOwnProfile = false,
  onEditProfile
}: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.coverContainer}>
        <Image 
          source={{ uri: user.coverImageUrl }} 
          style={styles.coverImage} 
          resizeMode="cover"
        />
        {isOwnProfile && (
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={onEditProfile}
            activeOpacity={0.8}
          >
            <Edit2 size={18} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: user.avatarUrl }} 
          style={styles.avatar} 
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.name}</Text>
        
        <View style={styles.locationContainer}>
          <MapPin size={16} color={colors.textSecondary} />
          <Text style={styles.locationText}>{user.location}</Text>
        </View>
        
        <View style={styles.joinedContainer}>
          <Calendar size={16} color={colors.textSecondary} />
          <Text style={styles.joinedText}>
            Joined {dayjs(user.joinedDate).format('MMMM YYYY')}
          </Text>
        </View>
        
        <Text style={styles.bio}>{user.bio}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.discussionsCount}</Text>
            <Text style={styles.statLabel}>Discussions</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.projectsCount}</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.peaceActionsCount}</Text>
            <Text style={styles.statLabel}>Peace Actions</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  coverContainer: {
    height: 160,
    width: '100%',
    position: 'relative',
  },
  coverImage: {
    height: '100%',
    width: '100%',
  },
  editButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: colors.primaryTransparent,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
    marginTop: -50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: colors.white,
  },
  infoContainer: {
    padding: 16,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  joinedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  joinedText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  bio: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: colors.border,
    alignSelf: 'center',
  },
});