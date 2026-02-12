/**
 * Pokemon Card Component
 * Displays detailed information about a single Pokémon
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getTypeColor } from '../utils/api';
import { CUSTOM_FONT } from '../utils/commonStyles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(width - 40, 400);

const PokemonCard = ({ pokemon, isDarkMode }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Theme-based colors
  const colors = isDarkMode
    ? {
        card: '#2a2a3e',
        text: '#ffffff',
        subtext: '#b0b0b0',
        border: '#3a3a4e',
      }
    : {
        card: '#ffffff',
        text: '#333333',
        subtext: '#666666',
        border: '#e0e0e0',
      };

  // Capitalize first letter of strings
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      {/* Pokémon Image */}
      <View style={styles.imageContainer}>
        {imageLoading && !imageError && (
          <ActivityIndicator
            size="large"
            color={isDarkMode ? '#EF5350' : '#E91E63'}
            style={styles.loader}
          />
        )}
        
        {imageError ? (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: colors.subtext }]}>
              Image not available
            </Text>
            <Text style={styles.errorEmoji}>🎴</Text>
          </View>
        ) : (
          <Image
            source={{ uri: pokemon.image }}
            style={styles.image}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            resizeMode="contain"
          />
        )}
      </View>

      {/* Pokémon Name */}
      <Text style={[styles.name, { color: colors.text }]}>
        {capitalize(pokemon.name)}
      </Text>
      
      <Text style={[styles.id, { color: colors.subtext }]}>
        #{String(pokemon.id).padStart(3, '0')}
      </Text>

      {/* Types */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Types</Text>
        <View style={styles.typesContainer}>
          {pokemon.types.map((type, index) => (
            <View
              key={index}
              style={[
                styles.typeBadge,
                { backgroundColor: getTypeColor(type) }
              ]}
            >
              <Text style={styles.typeBadgeText}>
                {capitalize(type)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Abilities */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Abilities</Text>
        <View style={styles.abilitiesContainer}>
          {pokemon.abilities.map((ability, index) => (
            <View
              key={index}
              style={[
                styles.abilityBadge,
                {
                  backgroundColor: isDarkMode ? '#3a3a4e' : '#f5f5f5',
                  borderColor: colors.border,
                }
              ]}
            >
              <Text style={[styles.abilityText, { color: colors.text }]}>
                {ability.split('-').map(capitalize).join(' ')}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Additional Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={[styles.statLabel, { color: colors.subtext }]}>Height</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {(pokemon.height / 10).toFixed(1)}m
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={[styles.statLabel, { color: colors.subtext }]}>Weight</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {(pokemon.weight / 10).toFixed(1)}kg
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  imageContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: CUSTOM_FONT,
    fontSize: 14,
    marginBottom: 8,
  },
  errorEmoji: {
    fontSize: 48,
  },
  name: {
    fontFamily: CUSTOM_FONT,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  id: {
    fontFamily: CUSTOM_FONT,
    fontSize: 16,
    marginBottom: 20,
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: CUSTOM_FONT,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  typeBadgeText: {
    fontFamily: CUSTOM_FONT,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  abilityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  abilityText: {
    fontFamily: CUSTOM_FONT,
    fontSize: 13,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 10,
  },
  statLabel: {
    fontFamily: CUSTOM_FONT,
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: CUSTOM_FONT,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PokemonCard;
