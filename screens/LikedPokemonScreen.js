/**
 * Liked Pokemon Screen Component
 * Displays all Pokémon that the user has liked
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { usePokemon } from '../context/PokemonContext';
import { getTypeColor } from '../utils/api';
import { CUSTOM_FONT } from '../utils/commonStyles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2; // 2 columns with spacing

const LikedPokemonScreen = ({ navigation }) => {
  const { likedPokemon, unlikePokemon, isDarkMode, toggleDarkMode } = usePokemon();

  // Theme-based colors
  const colors = isDarkMode
    ? {
        background: ['#1a1a2e', '#16213e'],
        text: '#ffffff',
        subtext: '#b0b0b0',
        card: '#2a2a3e',
        border: '#3a3a4e',
      }
    : {
        background: ['#FFF8E1', '#FFE0B2'],
        text: '#333333',
        subtext: '#666666',
        card: '#ffffff',
        border: '#e0e0e0',
      };

  // Capitalize first letter
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  /**
   * Handles removing a Pokémon from liked list
   */
  const handleUnlike = (pokemonId) => {
    unlikePokemon(pokemonId);
  };

  /**
   * Renders a single Pokémon card in the grid
   */
  const renderPokemonCard = (pokemon) => (
    <View
      key={pokemon.id}
      style={[styles.gridCard, { backgroundColor: colors.card }]}
    >
      {/* Remove Button */}
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleUnlike(pokemon.id)}
      >
        <Ionicons name="close-circle" size={24} color="#EF5350" />
      </TouchableOpacity>

      {/* Pokémon Image */}
      <Image
        source={{ uri: pokemon.image }}
        style={styles.gridImage}
        resizeMode="contain"
      />

      {/* Pokémon Name */}
      <Text style={[styles.gridName, { color: colors.text }]} numberOfLines={1}>
        {capitalize(pokemon.name)}
      </Text>

      {/* Pokémon ID */}
      <Text style={[styles.gridId, { color: colors.subtext }]}>
        #{String(pokemon.id).padStart(3, '0')}
      </Text>

      {/* Types */}
      <View style={styles.gridTypes}>
        {pokemon.types.slice(0, 2).map((type, index) => (
          <View
            key={index}
            style={[
              styles.gridTypeBadge,
              { backgroundColor: getTypeColor(type) }
            ]}
          >
            <Text style={styles.gridTypeText} numberOfLines={1}>
              {capitalize(type)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          My Pokémon ({likedPokemon.length})
        </Text>
        
        <TouchableOpacity
          onPress={toggleDarkMode}
          style={styles.headerButton}
        >
          <Ionicons
            name={isDarkMode ? 'sunny' : 'moon'}
            size={22}
            color={isDarkMode ? '#FFD700' : '#666'}
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {likedPokemon.length === 0 ? (
          // Empty State
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>💔</Text>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No Pokémon Yet
            </Text>
            <Text style={[styles.emptyText, { color: colors.subtext }]}>
              Start swiping to build your dream team!
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('Swipe')}
            >
              <Text style={styles.emptyButtonText}>Start Swiping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Grid of Liked Pokémon
          <>
            {/* Stats Summary */}
            <View style={styles.summary}>
              <Text style={[styles.summaryText, { color: colors.subtext }]}>
                You've collected {likedPokemon.length} amazing Pokémon! 🎉
              </Text>
            </View>

            {/* Grid */}
            <View style={styles.grid}>
              {likedPokemon.map(renderPokemonCard)}
            </View>

            {/* Bottom Padding */}
            <View style={{ height: 20 }} />
          </>
        )}
      </ScrollView>

      {/* Floating Action Button - Back to Swiping */}
      {likedPokemon.length > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('Swipe')}
        >
          <Ionicons name="add" size={28} color="#ffffff" />
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 15,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: CUSTOM_FONT,
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  summary: {
    marginBottom: 20,
    alignItems: 'center',
  },
  summaryText: {
    fontFamily: CUSTOM_FONT,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: CARD_WIDTH,
    borderRadius: 15,
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  gridImage: {
    width: CARD_WIDTH - 40,
    height: CARD_WIDTH - 40,
    marginBottom: 8,
  },
  gridName: {
    fontFamily: CUSTOM_FONT,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    marginBottom: 4,
  },
  gridId: {
    fontFamily: CUSTOM_FONT,
    fontSize: 12,
    marginBottom: 8,
  },
  gridTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4,
  },
  gridTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    minWidth: 50,
    alignItems: 'center',
  },
  gridTypeText: {
    fontFamily: CUSTOM_FONT,
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontFamily: CUSTOM_FONT,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    fontFamily: CUSTOM_FONT,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 40,
  },
  emptyButton: {
    backgroundColor: '#EF5350',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  emptyButtonText: {
    fontFamily: CUSTOM_FONT,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});

export default LikedPokemonScreen;
