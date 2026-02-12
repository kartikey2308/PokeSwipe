/**
 * Pokemon Context - Global State Management
 * Manages liked Pokémon and theme preferences
 */

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const PokemonContext = createContext();

/**
 * Custom hook to use the Pokemon context
 * @returns {Object} Context value with state and methods
 */
export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};

/**
 * Pokemon Provider Component
 * Wraps the app and provides global state
 */
export const PokemonProvider = ({ children }) => {
  // State for liked Pokémon (array of Pokémon objects)
  const [likedPokemon, setLikedPokemon] = useState([]);
  
  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // State for tracking seen Pokémon IDs (to avoid duplicates in current session)
  const [seenPokemonIds, setSeenPokemonIds] = useState(new Set());

  /**
   * Adds a Pokémon to the liked list
   * @param {Object} pokemon - Pokémon object to add
   */
  const likePokemon = (pokemon) => {
    setLikedPokemon(prev => {
      // Check if already liked (by ID)
      const alreadyLiked = prev.some(p => p.id === pokemon.id);
      if (alreadyLiked) {
        return prev;
      }
      return [...prev, pokemon];
    });
  };

  /**
   * Removes a Pokémon from the liked list
   * @param {number} pokemonId - ID of Pokémon to remove
   */
  const unlikePokemon = (pokemonId) => {
    setLikedPokemon(prev => prev.filter(p => p.id !== pokemonId));
  };

  /**
   * Checks if a Pokémon is already liked
   * @param {number} pokemonId - ID to check
   * @returns {boolean} True if liked
   */
  const isPokemonLiked = (pokemonId) => {
    return likedPokemon.some(p => p.id === pokemonId);
  };

  /**
   * Marks a Pokémon as seen (for tracking during session)
   * @param {number} pokemonId - ID to mark as seen
   */
  const markPokemonAsSeen = (pokemonId) => {
    setSeenPokemonIds(prev => new Set([...prev, pokemonId]));
  };

  /**
   * Checks if a Pokémon has been seen in current session
   * @param {number} pokemonId - ID to check
   * @returns {boolean} True if seen
   */
  const isPokemonSeen = (pokemonId) => {
    return seenPokemonIds.has(pokemonId);
  };

  /**
   * Toggles dark mode
   */
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  /**
   * Clears all liked Pokémon (useful for reset)
   */
  const clearLikedPokemon = () => {
    setLikedPokemon([]);
  };

  // Context value object
  const value = {
    likedPokemon,
    likePokemon,
    unlikePokemon,
    isPokemonLiked,
    clearLikedPokemon,
    isDarkMode,
    toggleDarkMode,
    markPokemonAsSeen,
    isPokemonSeen,
    // Stats for UI display
    stats: {
      totalLiked: likedPokemon.length,
      totalSeen: seenPokemonIds.size,
    },
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext;
