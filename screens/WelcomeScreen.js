/**
 * Welcome Screen Component
 * The landing page that introduces users to PokéSwipe
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { usePokemon } from '../context/PokemonContext';
import { CUSTOM_FONT } from '../utils/commonStyles';

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const { isDarkMode } = usePokemon();

  // Theme-based colors
  const colors = isDarkMode
    ? {
        background: ['#1a1a2e', '#16213e'],
        text: '#ffffff',
        subtext: '#b0b0b0',
        card: '#2a2a3e',
        accent: '#EF5350',
      }
    : {
        background: ['#EF5350', '#E91E63'],
        text: '#ffffff',
        subtext: '#ffffffdd',
        card: '#ffffff',
        accent: '#FFD700',
      };

  return (
    <LinearGradient
      colors={colors.background}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* App Logo/Title */}
        <View style={styles.header}>
          <Text style={[styles.logo, { color: colors.text }]}>
            PokéSwipe
          </Text>
          <Text style={[styles.tagline, { color: colors.subtext }]}>
            Gotta Catch Your Love!
          </Text>
        </View>

        {/* Instructions Card */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.cardTitle, { color: isDarkMode ? '#fff' : '#333' }]}>
            How to Play
          </Text>
          
          <View style={styles.instruction}>
            <Text style={[styles.instructionText, { color: isDarkMode ? '#ccc' : '#666' }]}>
              Pokemon Appear One at a Time
            </Text>
          </View>

          <View style={styles.instruction}>
            <Text style={[styles.instructionText, { color: isDarkMode ? '#ccc' : '#666' }]}>
              Choose "Like" or "Dislike"
            </Text>
          </View>

          <View style={styles.instruction}>
            <Text style={[styles.instructionText, { color: isDarkMode ? '#ccc' : '#666' }]}>
              Build Your Favourite Team
            </Text>
          </View>
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('Swipe')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Let`s Go!</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={[styles.footer, { color: colors.subtext }]}>
          Built with ❤️ for Pokémon trainers
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontFamily: CUSTOM_FONT,
    fontSize: 48,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 10,
    textAlign: 'center',
  },
  tagline: {
    fontFamily: CUSTOM_FONT,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.3,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
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
  cardTitle: {
    fontFamily: CUSTOM_FONT,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.4,
    marginBottom: 20,
    textAlign: 'center',
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  emoji: {
    fontSize: 24,
    marginRight: 12,
    width: 32,
  },
  instructionText: {
    fontFamily: CUSTOM_FONT,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
    flex: 1,
    lineHeight: 22,
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: CUSTOM_FONT,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  footer: {
    fontFamily: CUSTOM_FONT,
    position: 'absolute',
    bottom: 20,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
