import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  Image
} from 'react-native';
import { Search, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import ProjectCard from '@/components/projects/ProjectCard';
import { getProjects } from '@/utils/api';
import { colors } from '@/constants/theme';

const filters = ['All Projects', 'Active', 'Planned', 'Completed'];

export default function ProjectsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All Projects');
  const projects = getProjects();
  
  const filteredProjects = selectedFilter === 'All Projects'
    ? projects
    : projects.filter(project => 
        project.status.toLowerCase() === selectedFilter.toLowerCase()
      );
  
  const renderFilterItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === item && styles.selectedFilterButton,
      ]}
      onPress={() => setSelectedFilter(item)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.filterButtonText,
          selectedFilter === item && styles.selectedFilterButtonText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
          style={styles.heroGradient}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Peace Projects</Text>
            <Text style={styles.heroSubtitle}>Join hands with others to make a difference</Text>
            
            <TouchableOpacity style={styles.heroButton} activeOpacity={0.8}>
              <Text style={styles.heroButtonText}>Start a Project</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={colors.textSecondary} />
            <Text style={styles.searchPlaceholder}>Search projects...</Text>
          </View>
          
          <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
            <Plus size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={filters}
          renderItem={renderFilterItem}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        />
        
        <FlatList
          data={filteredProjects}
          renderItem={({ item }) => <ProjectCard project={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.projectsList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  heroContainer: {
    height: 240,
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
    justifyContent: 'flex-end',
  },
  heroContent: {
    padding: 20,
  },
  heroTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: colors.white,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    marginBottom: 16,
  },
  heroButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.primary,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    height: 44,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  searchPlaceholder: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  addButton: {
    width: 44,
    height: 44,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.white,
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
  projectsList: {
    padding: 16,
    paddingBottom: 24,
  },
});