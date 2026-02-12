/**
 * PokéSwipe - Main App Component
 * Gotta Catch Your Love!
 * 
 * A delightful mobile app that combines Pokémon with Tinder-style swiping.
 * Users discover random Pokémon, choose their favorites, and build their dream team!
 * 
 * Features:
 * - Random Pokémon discovery with PokéAPI integration
 * - Like/Dislike system with persistent state
 * - Beautiful UI with responsive design
 * - Dark mode support
 * - Collection view for liked Pokémon
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PokemonProvider, usePokemon } from './context/PokemonContext';

// Import screens
import WelcomeScreen from './screens/WelcomeScreen';
import SwipeScreen from './screens/SwipeScreen';
import LikedPokemonScreen from './screens/LikedPokemonScreen';

const Stack = createStackNavigator();

/**
 * Navigation Component
 * Handles all screen navigation and dark mode toggle
 */
const AppNavigator = () => {
  const { isDarkMode, toggleDarkMode } = usePokemon();

  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyle: { backgroundColor: 'transparent' },
            ...Platform.select({
              ios: {
                cardStyleInterpolator: ({ current, layouts }) => {
                  return {
                    cardStyle: {
                      transform: [
                        {
                          translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                          }),
                        },
                      ],
                    },
                  };
                },
              },
            }),
          }}
        >
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen}
            options={({ navigation }) => ({
              headerShown: true,
              headerTransparent: true,
              headerTitle: '',
              headerLeft: () => null,
              headerRight: () => (
                <TouchableOpacity
                  onPress={toggleDarkMode}
                  style={{
                    marginRight: 20,
                    padding: 8,
                    borderRadius: 20,
                    backgroundColor: isDarkMode ? '#2a2a3e' : '#ffffff50',
                  }}
                >
                  <Ionicons
                    name={isDarkMode ? 'sunny' : 'moon'}
                    size={24}
                    color={isDarkMode ? '#FFD700' : '#333333'}
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen 
            name="Swipe" 
            component={SwipeScreen}
            options={({ navigation }) => ({
              headerShown: true,
              headerTransparent: true,
              headerTitle: '',
              headerLeft: () => null,
              headerRight: () => (
                <TouchableOpacity
                  onPress={toggleDarkMode}
                  style={{
                    marginRight: 20,
                    padding: 8,
                    borderRadius: 20,
                    backgroundColor: isDarkMode ? '#2a2a3e' : '#ffffff50',
                  }}
                >
                  <Ionicons
                    name={isDarkMode ? 'sunny' : 'moon'}
                    size={24}
                    color={isDarkMode ? '#FFD700' : '#333333'}
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen 
            name="Liked" 
            component={LikedPokemonScreen}
            options={({ navigation }) => ({
              headerShown: true,
              headerTransparent: true,
              headerTitle: '',
              headerLeft: () => null,
              headerRight: () => (
                <TouchableOpacity
                  onPress={toggleDarkMode}
                  style={{
                    marginRight: 20,
                    padding: 8,
                    borderRadius: 20,
                    backgroundColor: isDarkMode ? '#2a2a3e' : '#ffffff50',
                  }}
                >
                  <Ionicons
                    name={isDarkMode ? 'sunny' : 'moon'}
                    size={24}
                    color={isDarkMode ? '#FFD700' : '#333333'}
                  />
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

/**
 * Main App Component
 * Wraps the app with necessary providers
 */
export default function App() {
  return (
    <PokemonProvider>
      <AppNavigator />
    </PokemonProvider>
  );
}
