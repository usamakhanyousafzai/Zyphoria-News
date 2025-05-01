import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { Search, Filter, Plus } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import DiscussionCard from '@/components/discussions/DiscussionCard';
import { getDiscussions } from '@/utils/api';
import { colors } from '@/constants/theme';

const topics = ['All Topics', 'Conflict Resolution', 'Education', 'Media', 'Resources', 'Politics'];
const regions = ['All Regions', 'Global', 'Middle East', 'Eastern Europe', 'Africa', 'Asia Pacific'];

export default function DiscussionsScreen() {
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const discussions = getDiscussions();
  
  const filteredDiscussions = discussions.filter(discussion => {
    const topicMatch = selectedTopic === 'All Topics' || discussion.topic === selectedTopic;
    const regionMatch = selectedRegion === 'All Regions' || discussion.region === selectedRegion;
    return topicMatch && regionMatch;
  });
  
  const renderTopicItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedTopic === item && styles.selectedFilterButton,
      ]}
      onPress={() => setSelectedTopic(item)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.filterButtonText,
          selectedTopic === item && styles.selectedFilterButtonText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
  
  const renderRegionItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedRegion === item && styles.selectedFilterButton,
      ]}
      onPress={() => setSelectedRegion(item)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.filterButtonText,
          selectedRegion === item && styles.selectedFilterButtonText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.title}>Discussions</Text>
            <Text style={styles.subtitle}>Join conversations for peace</Text>
          </View>
          <TouchableOpacity style={styles.newDiscussionButton} activeOpacity={0.7}>
            <Plus size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchBar}>
          <Search size={20} color={colors.textSecondary} />
          <Text style={styles.searchPlaceholder}>Search discussions...</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Topics</Text>
        <FlatList
          data={topics}
          renderItem={renderTopicItem}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        />
        
        <Text style={styles.sectionTitle}>Regions</Text>
        <FlatList
          data={regions}
          renderItem={renderRegionItem}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        />
      </View>
      
      <FlatList
        data={filteredDiscussions}
        renderItem={({ item }) => <DiscussionCard discussion={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.discussionsList}
        showsVerticalScrollIndicator={false}
      />
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
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
  newDiscussionButton: {
    width: 44,
    height: 44,
    backgroundColor: colors.primary,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
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
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  filtersContainer: {
    paddingRight: 16,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.backgroundLight,
    borderRadius: 20,
    marginRight: 12,
  },
  selectedFilterButton: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textSecondary,
  },
  selectedFilterButtonText: {
    color: colors.white,
  },
  discussionsList: {
    padding: 16,
    paddingBottom: 24,
  },
});