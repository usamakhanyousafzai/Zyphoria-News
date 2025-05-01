import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Search, Filter } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { NewsItem } from '@/components/news/NewsCard';
import NewsCard from '@/components/news/NewsCard';
import { getNewsFeed } from '@/utils/api';
import { colors } from '@/constants/theme';

const categories = ['All', 'Peace', 'Conflict', 'Diplomacy', 'Humanitarian'];

export default function NewsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const newsItems = getNewsFeed();
  
  const filteredNews = selectedCategory === 'All' 
    ? newsItems 
    : newsItems.filter(item => 
        item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
  
  const renderCategoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.selectedCategoryButton,
      ]}
      onPress={() => setSelectedCategory(item)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === item && styles.selectedCategoryButtonText,
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
        <Text style={styles.title}>Zyphoria News</Text>
        <Text style={styles.subtitle}>Stay informed on global developments</Text>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={colors.textSecondary} />
            <Text style={styles.searchPlaceholder}>Search news and updates...</Text>
          </View>
          <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
            <Filter size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        />
      </View>
      
      <FlatList
        data={filteredNews}
        renderItem={({ item }) => <NewsCard item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.newsList}
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
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    height: 44,
    backgroundColor: colors.backgroundLight,
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
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    paddingRight: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.backgroundLight,
    borderRadius: 20,
    marginRight: 12,
  },
  selectedCategoryButton: {
    backgroundColor: colors.primary,
  },
  categoryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textSecondary,
  },
  selectedCategoryButtonText: {
    color: colors.white,
  },
  newsList: {
    padding: 16,
    paddingBottom: 24,
  },
});