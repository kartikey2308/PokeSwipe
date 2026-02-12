# 🎮 PokéSwipe - Gotta Catch Your Love!

A delightful mobile application that blends Pokémon wonder with Tinder-style swiping! Encounter random Pokémon, swipe through their details, and build your dream team of favorites.

## ✨ Features

### Core Features
- 🎯 **Welcome Screen** - Engaging intro with clear instructions
- 🎴 **Swipe Interface** - Discover random Pokémon one at a time
- 💖 **Like/Dislike System** - Choose your favorites with intuitive buttons
- 📱 **Liked Collection** - View all your favorited Pokémon
- 🎨 **Responsive Design** - Perfect experience on all screen sizes

### Bonus Features
- 🌙 **Dark Mode** - Toggle between light and dark themes
- ✨ **Smooth Animations** - Delightful card transitions and interactions
- 🎭 **Beautiful UI** - Pokemon-themed color scheme with gradient backgrounds
- 💾 **Persistent State** - Your likes are saved across sessions
- 🔄 **Smart Loading** - Elegant loading states and error handling

## 🛠️ Technologies Used

- **React Native** - Cross-platform mobile development
- **Expo** - Rapid development and easy deployment
- **React Navigation** - Seamless navigation between screens
- **Context API** - Efficient state management
- **PokéAPI** - Rich Pokémon data source
- **Expo Linear Gradient** - Beautiful gradient backgrounds

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (optional, can use npx)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PokeSwipe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
   - **iOS**: Scan the QR code with Camera app
   - **Android**: Scan the QR code with Expo Go app
   - **Web**: Press `w` in the terminal

## 📱 How to Use

1. **Welcome** - Tap "Start Swiping" to begin your adventure
2. **Swipe** - View each Pokémon's details (image, name, abilities, types)
3. **Choose** - Tap 💚 to Like or 💔 to Dislike
4. **Collect** - View your liked Pokémon by tapping "View My Pokémon"
5. **Theme** - Toggle dark/light mode with the moon/sun icon

## 🎯 Technical Highlights

### State Management
- Context API for global state (liked Pokémon, theme preference)
- Efficient updates without prop drilling
- Persistent storage using AsyncStorage simulation

### API Integration
- Fetches random Pokémon from PokéAPI
- Constructs high-quality SVG image URLs
- Handles loading and error states gracefully

### Responsive Design
- Adapts to all screen sizes (phone, tablet, desktop)
- Fixed-width cards on desktop, centered layout
- Touch-optimized buttons for mobile

### Code Quality
- Well-commented and organized code
- Reusable components
- Consistent naming conventions
- Separation of concerns (screens, components, utils)

## 📐 Project Structure

```
PokeSwipe/
├── App.js                      # Main app entry with navigation
├── context/
│   └── PokemonContext.js       # Global state management
├── screens/
│   ├── WelcomeScreen.js        # Landing page
│   ├── SwipeScreen.js          # Main swiping interface
│   └── LikedPokemonScreen.js   # Collection view
├── components/
│   └── PokemonCard.js          # Reusable Pokémon display card
└── utils/
    └── api.js                  # PokéAPI integration
```

## 🎨 Design Philosophy

- **User-First**: Intuitive interactions, clear feedback
- **Pokémon-Themed**: Colors inspired by Pokémon branding
- **Modern**: Gradients, shadows, smooth animations
- **Accessible**: High contrast, readable fonts, clear buttons

## 🌟 Future Enhancements

- 🔍 Search and filter liked Pokémon
- 📊 Stats visualization
- 🏆 Achievement system
- 🔄 Swipe gestures (drag to like/dislike)
- 💾 Cloud sync with user accounts
- 🎵 Sound effects and music
- 📤 Share your collection

## 📄 License

This project is created for educational purposes.
Pokémon and PokéAPI are properties of their respective owners.

## 👨‍💻 Author

Built with ❤️ by a passionate Pokémon trainer and developer!

---

**Gotta Catch 'Em All!** 🎯✨
