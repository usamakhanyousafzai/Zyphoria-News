import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  Image,
  ScrollView
} from 'react-native';
import { Search, Calendar, MapPin, Users, Award } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/constants/theme';
import Card from '@/components/ui/Card';

const upcomingEvents = [
  {
    id: '1',
    title: 'International Peace Day Virtual Summit',
    date: '2025-09-21T14:00:00Z',
    location: 'Online',
    participants: 1240,
    imageUrl: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'Cross-Cultural Dialogue Workshop',
    date: '2025-08-15T10:30:00Z',
    location: 'Berlin, Germany',
    participants: 75,
    imageUrl: 'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    title: 'Youth Peace Ambassador Training',
    date: '2025-08-28T09:00:00Z',
    location: 'Amsterdam, Netherlands',
    participants: 120,
    imageUrl: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const organizations = [
  {
    id: '1',
    name: 'Global Peace Initiative',
    description: 'International organization focused on conflict resolution and peace building.',
    members: 3850,
    logoUrl: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    name: 'Educational Bridges',
    description: 'Promoting cross-cultural understanding through educational exchange programs.',
    members: 1240,
    logoUrl: 'https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    name: 'Mediators Without Borders',
    description: 'Network of professional mediators supporting dialogue in conflict zones.',
    members: 950,
    logoUrl: 'https://images.pexels.com/photos/3790810/pexels-photo-3790810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const tabs = ['Events', 'Organizations', 'Resources'];

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('Events');
  
  const renderEventItem = ({ item }: { item: typeof upcomingEvents[0] }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.eventCard}>
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.eventImage}
        resizeMode="cover"
      />
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        
        <View style={styles.eventMetaItem}>
          <Calendar size={16} color={colors.textSecondary} />
          <Text style={styles.eventMetaText}>
            {new Date(item.date).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </Text>
        </View>
        
        <View style={styles.eventMetaItem}>
          <MapPin size={16} color={colors.textSecondary} />
          <Text style={styles.eventMetaText}>{item.location}</Text>
        </View>
        
        <View style={styles.eventMetaItem}>
          <Users size={16} color={colors.textSecondary} />
          <Text style={styles.eventMetaText}>{item.participants} participants</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const renderOrganizationItem = ({ item }: { item: typeof organizations[0] }) => (
    <TouchableOpacity activeOpacity={0.8}>
      <Card style={styles.orgCard}>
        <View style={styles.orgHeader}>
          <Image 
            source={{ uri: item.logoUrl }} 
            style={styles.orgLogo}
            resizeMode="cover"
          />
          <View style={styles.orgInfo}>
            <Text style={styles.orgName}>{item.name}</Text>
            <View style={styles.orgMembersContainer}>
              <Users size={14} color={colors.textSecondary} />
              <Text style={styles.orgMembers}>{item.members} members</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.orgDescription}>{item.description}</Text>
        
        <TouchableOpacity style={styles.joinButton} activeOpacity={0.8}>
          <Text style={styles.joinButtonText}>Join Organization</Text>
        </TouchableOpacity>
      </Card>
    </TouchableOpacity>
  );
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Events':
        return (
          <FlatList
            data={upcomingEvents}
            renderItem={renderEventItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.eventsList}
            showsVerticalScrollIndicator={false}
          />
        );
      
      case 'Organizations':
        return (
          <FlatList
            data={organizations}
            renderItem={renderOrganizationItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.orgsList}
            showsVerticalScrollIndicator={false}
          />
        );
      
      case 'Resources':
        return (
          <ScrollView 
            style={styles.resourcesContainer}
            contentContainerStyle={styles.resourcesContent}
            showsVerticalScrollIndicator={false}
          >
            <Card style={styles.resourceCard}>
              <View style={styles.resourceHeader}>
                <Award size={24} color={colors.primary} />
                <Text style={styles.resourceTitle}>Educational Materials</Text>
              </View>
              <Text style={styles.resourceDescription}>
                Access guides, curricula, and presentations on conflict resolution, 
                cross-cultural communication, and peace building.
              </Text>
              <TouchableOpacity style={styles.resourceButton} activeOpacity={0.8}>
                <Text style={styles.resourceButtonText}>Browse Materials</Text>
              </TouchableOpacity>
            </Card>
            
            <Card style={styles.resourceCard}>
              <View style={styles.resourceHeader}>
                <Award size={24} color={colors.primary} />
                <Text style={styles.resourceTitle}>Training Programs</Text>
              </View>
              <Text style={styles.resourceDescription}>
                Find online and in-person training opportunities to develop 
                mediation, dialogue facilitation, and peace advocacy skills.
              </Text>
              <TouchableOpacity style={styles.resourceButton} activeOpacity={0.8}>
                <Text style={styles.resourceButtonText}>Explore Trainings</Text>
              </TouchableOpacity>
            </Card>
            
            <Card style={styles.resourceCard}>
              <View style={styles.resourceHeader}>
                <Award size={24} color={colors.primary} />
                <Text style={styles.resourceTitle}>Research Publications</Text>
              </View>
              <Text style={styles.resourceDescription}>
                Read the latest research on conflict prevention, peace 
                processes, and the impact of community-led peace initiatives.
              </Text>
              <TouchableOpacity style={styles.resourceButton} activeOpacity={0.8}>
                <Text style={styles.resourceButtonText}>View Publications</Text>
              </TouchableOpacity>
            </Card>
          </ScrollView>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <Text style={styles.subtitle}>Connect with peace advocates worldwide</Text>
        
        <View style={styles.searchBar}>
          <Search size={20} color={colors.textSecondary} />
          <Text style={styles.searchPlaceholder}>Search community...</Text>
        </View>
        
        <View style={styles.tabsContainer}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {renderTabContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  searchBar: {
    height: 44,
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchPlaceholder: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  eventsList: {
    padding: 16,
    paddingBottom: 24,
  },
  eventCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 160,
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  eventMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventMetaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  orgsList: {
    padding: 16,
    paddingBottom: 24,
  },
  orgCard: {
    marginBottom: 16,
  },
  orgHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  orgLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  orgInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  orgName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  orgMembersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orgMembers: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  orgDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  joinButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.primary,
  },
  resourcesContainer: {
    flex: 1,
  },
  resourcesContent: {
    padding: 16,
    paddingBottom: 24,
  },
  resourceCard: {
    marginBottom: 16,
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resourceTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
    marginLeft: 12,
  },
  resourceDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  resourceButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  resourceButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.white,
  },
});