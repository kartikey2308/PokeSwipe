# 💻 Code Guide - Technical Documentation

A comprehensive guide to understanding the PokéSwipe codebase.

---

## 📁 Project Architecture

### Overview
PokéSwipe follows a modular architecture with clear separation of concerns:

```
PokeSwipe/
├── App.js                      # Entry point & navigation setup
├── screens/                    # Screen components
│   ├── WelcomeScreen.js       # Landing page
│   ├── SwipeScreen.js         # Main swiping interface
│   └── LikedPokemonScreen.js  # Collection view
├── components/                 # Reusable UI components
│   └── PokemonCard.js         # Pokémon display card
├── context/                    # State management
│   └── PokemonContext.js      # Global state provider
└── utils/                      # Helper functions
    └── api.js                 # API integration
```

---

## 🏗️ Core Concepts

### 1. State Management (Context API)

**File:** `context/PokemonContext.js`

**Why Context API?**
- Global state without prop drilling
- Simple for this app's scope
- No need for Redux complexity

**State Structure:**
```javascript
{
  likedPokemon: [],           // Array of liked Pokémon objects
  isDarkMode: false,          // Boolean for theme
  seenPokemonIds: Set(),      // Set of seen IDs (fast lookup)
}
```

**Key Functions:**
- `likePokemon(pokemon)` - Adds to favorites
- `unlikePokemon(id)` - Removes from favorites
- `toggleDarkMode()` - Switches theme
- `isPokemonLiked(id)` - Checks if liked
- `markPokemonAsSeen(id)` - Tracks seen Pokémon

**Usage Example:**
```javascript
const { likePokemon, isDarkMode } = usePokemon();
```

---

### 2. API Integration

**File:** `utils/api.js`

**Key Functions:**

#### `fetchRandomPokemon()`
```javascript
// Fetches a random Pokémon from PokéAPI
// Returns: Promise<PokemonObject>
const pokemon = await fetchRandomPokemon();
```

#### `getPokemonImageUrl(id)`
```javascript
// Constructs high-quality image URL
// Returns: String (SVG URL)
const imageUrl = getPokemonImageUrl(25); // Pikachu
```

#### `getTypeColor(type)`
```javascript
// Maps Pokémon type to color
// Returns: String (hex color)
const color = getTypeColor('fire'); // #F08030
```

**API Response Transformation:**
```javascript
// Raw API response → Clean object
{
  id: 25,
  name: "pikachu",
  image: "https://..../25.svg",
  abilities: ["static", "lightning-rod"],
  types: ["electric"],
  height: 4,
  weight: 60
}
```

---

### 3. Navigation Setup

**File:** `App.js`

**Stack Navigator:**
```
Welcome Screen (Initial)
    ↓
Swipe Screen
    ↓
Liked Pokémon Screen
```

**Navigation Props:**
```javascript
// Navigate forward
navigation.navigate('Swipe');

// Go back
navigation.goBack();
```

**Header Configuration:**
- Transparent headers
- Custom right button (dark mode toggle)
- No default back button (custom implementation)

---

## 🎨 Styling Approach

### Theme System

**Dynamic Colors:**
```javascript
const colors = isDarkMode
  ? {
      background: ['#1a1a2e', '#16213e'],
      text: '#ffffff',
      card: '#2a2a3e',
    }
  : {
      background: ['#FFF8E1', '#FFE0B2'],
      text: '#333333',
      card: '#ffffff',
    };
```

### Responsive Design

**Screen Width Detection:**
```javascript
const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(width - 40, 400);
```

**Platform-Specific Styling:**
```javascript
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
})
```

---

## 🔄 Data Flow

### Like/Dislike Flow

```
1. User sees Pokémon card
    ↓
2. User taps Like/Dislike button
    ↓
3. Action disabled (prevents double-tap)
    ↓
4. If Like: Add to context state
    ↓
5. Brief delay (300ms for feedback)
    ↓
6. Load new random Pokémon
    ↓
7. Mark as seen
    ↓
8. Display new card
```

### Code Implementation:
```javascript
const handleLike = () => {
  setActionDisabled(true);        // Prevent double-tap
  likePokemon(currentPokemon);    // Update state
  setTimeout(() => {
    loadNewPokemon();             // Load next
  }, 300);
};
```

---

## 📦 Component Structure

### Screen Component Template

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { usePokemon } from '../context/PokemonContext';

const ScreenName = ({ navigation }) => {
  const { isDarkMode } = usePokemon();
  
  // Theme colors
  const colors = isDarkMode ? {...} : {...};
  
  return (
    <LinearGradient colors={colors.background}>
      {/* Content */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  // Styles
});

export default ScreenName;
```

---

## 🎯 Key Design Patterns

### 1. **Custom Hook Pattern**
```javascript
// Encapsulate context logic
export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) throw new Error('...');
  return context;
};
```

### 2. **Loading States**
```javascript
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Always handle: loading, success, error
```

### 3. **Conditional Rendering**
```javascript
{loading ? (
  <ActivityIndicator />
) : error ? (
  <ErrorMessage />
) : (
  <Content />
)}
```

### 4. **Event Handler Naming**
```javascript
handleLike()      // User action handlers
loadNewPokemon()  // Data fetching
toggleDarkMode()  // State updates
```

---

## 🔧 Best Practices Used

### 1. **Code Comments**
- JSDoc for function documentation
- Inline comments for complex logic
- Section headers for organization

### 2. **Error Handling**
```javascript
try {
  const data = await fetchRandomPokemon();
  setCurrentPokemon(data);
} catch (err) {
  setError('User-friendly message');
  console.error(err); // Developer debug
}
```

### 3. **Performance Optimization**
- Using Set for O(1) lookup of seen Pokémon
- Image lazy loading with loading states
- Preventing unnecessary re-renders
- Efficient filter operations

### 4. **Accessibility**
- High contrast colors
- Large touch targets (70x70px buttons)
- Clear visual feedback
- Readable font sizes

---

## 🧪 Testing Considerations

### Key Areas to Test

1. **API Integration**
   - Random Pokémon fetching
   - Error handling
   - Image loading

2. **State Management**
   - Like/unlike functionality
   - Dark mode toggle
   - Duplicate prevention

3. **Navigation**
   - Screen transitions
   - Back navigation
   - Header buttons

4. **UI/UX**
   - Responsive layouts
   - Loading states
   - Empty states
   - Error states

---

## 🚀 Performance Tips

### 1. **Image Optimization**
```javascript
<Image
  source={{ uri: pokemon.image }}
  resizeMode="contain"  // Maintains aspect ratio
  onLoadStart={...}     // Show loader
  onError={...}         // Handle failures
/>
```

### 2. **Efficient State Updates**
```javascript
// Use functional update for arrays
setLikedPokemon(prev => [...prev, newPokemon]);

// Use Set for fast lookups
const seen = new Set(seenIds);
```

### 3. **Debouncing API Calls**
```javascript
// Wait before loading next Pokémon
setTimeout(() => loadNewPokemon(), 300);
```

---

## 📚 Code Walkthrough

### Starting the App

1. **App.js** wraps everything in `PokemonProvider`
2. **NavigationContainer** sets up routing
3. **Stack.Navigator** defines screen stack
4. Welcome screen loads first

### Swiping Flow

1. **SwipeScreen** mounts
2. `useEffect` triggers `loadNewPokemon()`
3. API call fetches random Pokémon
4. `setCurrentPokemon()` updates state
5. **PokemonCard** renders with data
6. User taps Like/Dislike
7. State updates in **PokemonContext**
8. New Pokémon loads

### Viewing Collection

1. User taps heart icon in header
2. Navigation to **LikedPokemonScreen**
3. Context provides `likedPokemon` array
4. Grid renders cards for each Pokémon
5. User can remove Pokémon
6. State updates, UI re-renders

---

## 🔐 Security Considerations

- No authentication needed (local app)
- API calls are public (PokéAPI)
- No sensitive data storage
- All state is client-side

---

## 🎓 Learning Resources

**Concepts Used:**
- React Hooks (useState, useEffect, useContext)
- React Native Components
- React Navigation
- REST API consumption
- Context API for state management
- Gradient backgrounds
- Platform-specific styling

**Recommended Reading:**
- [React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Documentation](https://docs.expo.dev/)
- [PokéAPI Docs](https://pokeapi.co/docs/v2)

---

## 🐛 Common Issues & Solutions

### Issue: "Module not found"
**Solution:** Run `npm install` to install dependencies

### Issue: Images not loading
**Solution:** Check internet connection, PokéAPI may be slow

### Issue: Dark mode not working
**Solution:** Ensure Context Provider wraps the app

### Issue: Navigation not working
**Solution:** Check NavigationContainer is properly set up

---

## 🎨 Customization Guide

### Change Color Scheme
Edit color objects in each screen component

### Add New Screen
1. Create file in `screens/`
2. Add to Stack.Navigator in `App.js`
3. Navigate using `navigation.navigate('ScreenName')`

### Add New Feature to Context
1. Add state to `PokemonContext.js`
2. Create update function
3. Add to context value object
4. Use via `usePokemon()` hook

---

**Happy Coding! 🎮✨**

Remember: Good code is code that others can understand and maintain!
