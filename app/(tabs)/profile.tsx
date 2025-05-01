import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { ChevronRight, Settings, CreditCard as Edit3 } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { getCurrentUser } from '@/utils/api';
import Card from '@/components/ui/Card';
import { colors } from '@/constants/theme';

export default function ProfileScreen() {
  const user = getCurrentUser();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.settingsButton} activeOpacity={0.8}>
            <Settings size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
        
        <ProfileHeader user={user} isOwnProfile={true} />
        
        <View style={styles.content}>
          <Card>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Peace Pledge</Text>
              <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
                <Edit3 size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.pledgeText}>{user.peacePledge}</Text>
          </Card>
          
          <Card>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Interests</Text>
              <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
                <Edit3 size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.tagsContainer}>
              {user.interests?.map((interest, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{interest}</Text>
                </View>
              ))}
            </View>
          </Card>
          
          <Card>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Languages</Text>
              <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
                <Edit3 size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.tagsContainer}>
              {user.languages?.map((language, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{language}</Text>
                </View>
              ))}
            </View>
          </Card>
          
          <Card>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Organizations</Text>
              <TouchableOpacity style={styles.viewAllButton} activeOpacity={0.7}>
                <Text style={styles.viewAllText}>View All</Text>
                <ChevronRight size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
            
            {user.organizations?.map((org, index) => (
              <TouchableOpacity key={index} style={styles.organizationItem} activeOpacity={0.7}>
                <View>
                  <Text style={styles.organizationName}>{org.name}</Text>
                  <Text style={styles.organizationRole}>{org.role}</Text>
                </View>
                <ChevronRight size={16} color={colors.textTertiary} />
              </TouchableOpacity>
            ))}
          </Card>
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <Text style={styles.actionButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.secondaryActionButton]} activeOpacity={0.7}>
              <Text style={styles.secondaryActionButtonText}>Share Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  headerActions: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
  },
  editButton: {
    padding: 4,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.primary,
    marginRight: 4,
  },
  pledgeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.primary,
  },
  organizationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  organizationName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  organizationRole: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
  actionsContainer: {
    marginTop: 16,
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.white,
  },
  secondaryActionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryActionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.primary,
  },
});