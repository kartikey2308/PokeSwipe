/**
 * Swipe Screen Component
 * Main screen where users swipe through Pokémon
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import PokemonCard from '../components/PokemonCard';
import { fetchRandomPokemon } from '../utils/api';
import { usePokemon } from '../context/PokemonContext';
import { CUSTOM_FONT } from '../utils/commonStyles';

const SwipeScreen = ({ navigation }) => {
  const {
    likePokemon,
    isDarkMode,
    toggleDarkMode,
    markPokemonAsSeen,
    isPokemonSeen,
    stats,
  } = usePokemon();

  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionDisabled, setActionDisabled] = useState(false);

  // Theme-based colors
  const colors = isDarkMode
    ? {
        background: ['#1a1a2e', '#16213e'],
        text: '#ffffff',
        subtext: '#b0b0b0',
        likeButton: '#4CAF50',
        dislikeButton: '#EF5350',
      }
    : {
        background: ['#FFF8E1', '#FFE0B2'],
        text: '#333333',
        subtext: '#666666',
        likeButton: '#4CAF50',
        dislikeButton: '#EF5350',
      };

  /**
   * Loads a new random Pokémon
   */
  const loadNewPokemon = async () => {
    setLoading(true);
    setError(null);
    setActionDisabled(false);
    
    try {
      let pokemon = await fetchRandomPokemon();
      
      // Try to get a new Pokémon we haven't seen yet (max 5 attempts)
      let attempts = 0;
      while (isPokemonSeen(pokemon.id) && attempts < 5) {
        pokemon = await fetchRandomPokemon();
        attempts++;
      }
      
      markPokemonAsSeen(pokemon.id);
      setCurrentPokemon(pokemon);
    } catch (err) {
      setError('Failed to load Pokémon. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load first Pokémon on mount
  useEffect(() => {
    loadNewPokemon();
  }, []);

  /**
   * Handles the Like action
   */
  const handleLike = () => {
    if (!currentPokemon || actionDisabled) return;
    
    setActionDisabled(true);
    likePokemon(currentPokemon);
    
    // Show brief feedback then load next Pokémon
    setTimeout(() => {
      loadNewPokemon();
    }, 300);
  };

  /**
   * Handles the Dislike action
   */
  const handleDislike = () => {
    if (!currentPokemon || actionDisabled) return;
    
    setActionDisabled(true);
    
    // Load next Pokémon after brief delay
    setTimeout(() => {
      loadNewPokemon();
    }, 300);
  };

  /**
   * Handles retry after error
   */
  const handleRetry = () => {
    loadNewPokemon();
  };

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
          Discover Pokémon
        </Text>
        
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={toggleDarkMode}
            style={styles.themeButton}
          >
            <Ionicons
              name={isDarkMode ? 'sunny' : 'moon'}
              size={22}
              color={isDarkMode ? '#FFD700' : '#666'}
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => navigation.navigate('Liked')}
            style={styles.headerButton}
          >
            <Ionicons name="heart" size={24} color={colors.likeButton} />
            {stats.totalLiked > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{stats.totalLiked}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsBar}>
        <Text style={[styles.statsText, { color: colors.subtext }]}>
          Seen: {stats.totalSeen} | Liked: {stats.totalLiked}
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator
              size="large"
              color={isDarkMode ? '#EF5350' : '#E91E63'}
            />
            <Text style={[styles.loadingText, { color: colors.text }]}>
              Finding a Pokémon...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={[styles.errorText, { color: colors.text }]}>
              {error}
            </Text>
            <TouchableOpacity
              style={[styles.retryButton, { backgroundColor: colors.likeButton }]}
              onPress={handleRetry}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : currentPokemon ? (
          <>
            {/* Pokemon Card */}
            <PokemonCard pokemon={currentPokemon} isDarkMode={isDarkMode} />

            {/* Action Buttons */}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.dislikeButton,
                  { backgroundColor: colors.dislikeButton },
                  actionDisabled && styles.disabledButton,
                ]}
                onPress={handleDislike}
                disabled={actionDisabled}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={36} color="#ffffff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.likeButton,
                  { backgroundColor: colors.likeButton },
                  actionDisabled && styles.disabledButton,
                ]}
                onPress={handleLike}
                disabled={actionDisabled}
                activeOpacity={0.7}
              >
                <Ionicons name="heart" size={36} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Helpful Text */}
            <Text style={[styles.hintText, { color: colors.subtext }]}>
              Choose wisely, Trainer!
            </Text>
          </>
        ) : null}
      </View>
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
    position: 'relative',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themeButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#EF5350',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontFamily: CUSTOM_FONT,
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontFamily: CUSTOM_FONT,
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsBar: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  statsText: {
    fontFamily: CUSTOM_FONT,
    fontSize: 14,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: CUSTOM_FONT,
    marginTop: 15,
    fontSize: 16,
  },
  errorText: {
    fontFamily: CUSTOM_FONT,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    fontFamily: CUSTOM_FONT,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginTop: 30,
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
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
  disabledButton: {
    opacity: 0.5,
  },
  hintText: {
    fontFamily: CUSTOM_FONT,
    marginTop: 20,
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default SwipeScreen;
