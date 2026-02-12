# 🚀 Quick Start Guide

Get PokéSwipe up and running in minutes!

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- (Optional) Expo Go app on your phone

## Installation

```bash
# 1. Navigate to project directory
cd PokeSwipe

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

## Running the App

### On Your Phone (Recommended)
1. Install "Expo Go" app from App Store (iOS) or Play Store (Android)
2. After running `npm start`, scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app
3. The app will load on your device!

### On Web Browser
1. Run `npm start`
2. Press `w` in the terminal
3. App opens in your browser

### On iOS Simulator (Mac only)
1. Run `npm start`
2. Press `i` in the terminal

### On Android Emulator
1. Run `npm start`
2. Press `a` in the terminal

## Available Commands

```bash
npm start          # Start development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator  
npm run web        # Run in web browser
```

## First Time Setup

The first time you run the app:
1. Dependencies will be installed
2. Metro bundler will start
3. A QR code will appear in your terminal
4. Scan it with your phone to open the app

## Troubleshooting

### Port already in use
```bash
# Kill the process on port 8081
npx kill-port 8081
# Then try npm start again
```

### Cache issues
```bash
# Clear cache and restart
npx expo start -c
```

### Dependencies not installing
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

## Project Structure

```
PokeSwipe/
├── App.js                 # Main app entry point
├── screens/              # All screen components
├── components/           # Reusable components
├── context/              # State management
├── utils/                # API and helper functions
└── package.json          # Dependencies
```

## What's Next?

1. ✅ Run the app
2. 🎮 Start swiping Pokémon
3. 💚 Build your collection
4. 🌙 Try dark mode
5. 🚀 Deploy and share!

## Need Help?

Check out:
- [README.md](README.md) - Full documentation
- [FEATURES.md](FEATURES.md) - Feature details
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide

---

**Happy Swiping! 🎯✨**
