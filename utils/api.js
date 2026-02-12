/**
 * API Utilities for PokéSwipe
 * Handles all interactions with the PokéAPI
 */

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

// Total number of Pokémon available (Gen 1-9)
const MAX_POKEMON_ID = 1010;

/**
 * Generates a random Pokémon ID
 * @returns {number} Random ID between 1 and MAX_POKEMON_ID
 */
export const getRandomPokemonId = () => {
  return Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
};

/**
 * Gets the best available image URL from Pokémon sprites data
 * Uses fallback chain: official-artwork > home > dream-world > front_default
 * @param {Object} sprites - Sprites object from PokéAPI
 * @returns {string} Best available image URL
 */
const getBestImageUrl = (sprites) => {
  // Try official artwork first (highest quality)
  if (sprites.other?.['official-artwork']?.front_default) {
    return sprites.other['official-artwork'].front_default;
  }
  
  // Try home sprites (high quality)
  if (sprites.other?.home?.front_default) {
    return sprites.other.home.front_default;
  }
  
  // Try dream world sprites
  if (sprites.other?.dream_world?.front_default) {
    return sprites.other.dream_world.front_default;
  }
  
  // Fallback to regular front sprite
  return sprites.front_default || '';
};

/**
 * Fetches a random Pokémon from the PokéAPI
 * @returns {Promise<Object>} Pokémon data object
 */
export const fetchRandomPokemon = async () => {
  const randomId = getRandomPokemonId();
  
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${randomId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the API response to a cleaner format
    return {
      id: data.id,
      name: data.name,
      image: getBestImageUrl(data.sprites),
      abilities: data.abilities.map(a => a.ability.name),
      types: data.types.map(t => t.type.name),
      height: data.height,
      weight: data.weight,
    };
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    throw error;
  }
};

/**
 * Fetches a specific Pokémon by ID
 * @param {number} id - Pokémon ID
 * @returns {Promise<Object>} Pokémon data object
 */
export const fetchPokemonById = async (id) => {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      id: data.id,
      name: data.name,
      image: getBestImageUrl(data.sprites),
      abilities: data.abilities.map(a => a.ability.name),
      types: data.types.map(t => t.type.name),
      height: data.height,
      weight: data.weight,
    };
  } catch (error) {
    console.error('Error fetching Pokémon by ID:', error);
    throw error;
  }
};

/**
 * Gets the type color for UI styling
 * @param {string} type - Pokémon type
 * @returns {string} Hex color code
 */
export const getTypeColor = (type) => {
  const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  
  return typeColors[type.toLowerCase()] || '#777777';
};
