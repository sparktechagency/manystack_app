# iOS Build Setup Guide

## Prerequisites

### 1. Install Xcode
- **Xcode 15+** from Mac App Store
- Open Xcode and accept license agreements
- Install Command Line Tools:
  ```bash
  xcode-select --install
  ```

### 2. Install Homebrew (if not installed)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 3. Install Ruby & Bundler
```bash
brew install ruby
gem install bundler
```

### 4. Install Node.js (v18+)
```bash
brew install node
# Or use nvm (recommended)
brew install nvm
nvm install 18
nvm use 18
```

### 5. Install Watchman
```bash
brew install watchman
```

---

## First-Time Setup

### Step 1: Install Ruby Dependencies
From the project root:
```bash
bundle install
```

This installs CocoaPods and other Ruby gems specified in `Gemfile`.

### Step 2: Install Node Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Install CocoaPods Dependencies
```bash
cd ios
bundle exec pod install
cd ..
```

**Important:** Always use `bundle exec pod install` (not just `pod install`) to ensure you're using the correct CocoaPods version from your Gemfile.

### Step 4: Configure Bundle Identifier (Required for Building)
1. Open `ios/many.xcworkspace` in Xcode (NOT `.xcodeproj`)
2. Select the project in the navigator
3. Under "Signing & Capabilities":
   - Select a team (or create a free Apple Developer account)
   - Update Bundle Identifier to something unique: `com.yourcompany.many`

---

## Running the App

### Option 1: Using React Native CLI (Recommended for Development)
```bash
# Start Metro bundler in one terminal
npm start

# In another terminal
npm run ios
# or specify a simulator
npm run ios -- --simulator="iPhone 15 Pro"
```

### Option 2: Using Xcode
1. Open `ios/many.xcworkspace` in Xcode
2. Select a simulator or device
3. Press ⌘R to build and run

---

## Key Files & Their Purpose

### Configuration Files
- **`ios/Podfile`** - Native iOS dependencies (CocoaPods)
- **`ios/many/Info.plist`** - App metadata, permissions, bundle ID
- **`ios/many/AppDelegate.swift`** - App lifecycle & React Native bridge
- **`ios/.xcode.env`** - Node environment for Xcode builds
- **`Gemfile`** - Ruby dependencies (CocoaPods version)

### Xcode Project Files
- **`ios/many.xcworkspace`** - Main file to open (after `pod install`)
- **`ios/many.xcodeproj`** - Project config (don't open directly if using Pods)

---

## Required Permissions (Already Added to Info.plist)

Your app uses these native features, which require user permissions:

✓ **Location Services** (`react-native-geolocation-service`)
- `NSLocationWhenInUseUsageDescription`
- `NSLocationAlwaysAndWhenInUseUsageDescription`
- `NSLocationAlwaysUsageDescription`

✓ **Camera** (`react-native-image-picker`, `react-native-image-crop-picker`)
- `NSCameraUsageDescription`

✓ **Photo Library** (`react-native-image-picker`, `react-native-image-crop-picker`)
- `NSPhotoLibraryUsageDescription`
- `NSPhotoLibraryAddUsageDescription`

✓ **Microphone** (if using video recording)
- `NSMicrophoneUsageDescription`

---

## When to Re-run Pod Install

Run `bundle exec pod install` after:
- Adding/removing native dependencies in `package.json`
- Updating React Native version
- Changing any iOS-specific configuration
- Cloning the project on a new machine

---

## Common Issues & Solutions

### Issue: "No such module 'React'"
**Solution:** Make sure you opened `many.xcworkspace`, not `many.xcodeproj`

### Issue: Pod install fails
**Solution:** 
```bash
cd ios
bundle exec pod deintegrate
bundle exec pod install --repo-update
cd ..
```

### Issue: Build fails with signing errors
**Solution:** 
1. Open `ios/many.xcworkspace` in Xcode
2. Select the project → Signing & Capabilities
3. Ensure "Automatically manage signing" is checked
4. Select your team

### Issue: Metro bundler not found
**Solution:**
```bash
npm start -- --reset-cache
```

### Issue: Simulator not loading
**Solution:**
```bash
# Clean build
cd ios
xcodebuild clean
cd ..
# Rebuild
npm run ios
```

---

## Building for Production

### 1. Update Version & Build Number
In Xcode:
- General tab → Version (e.g., 1.0.0)
- General tab → Build (e.g., 1)

### 2. Configure Release Scheme
1. Product → Scheme → Edit Scheme
2. Set Build Configuration to "Release"

### 3. Archive the App
1. Product → Archive
2. Once archived, Organizer window opens
3. Select archive → Distribute App
4. Choose distribution method (App Store, Ad Hoc, etc.)

### 4. Submit to App Store Connect
- Follow Xcode prompts to upload
- Complete app metadata in App Store Connect
- Submit for review

---

## Environment-Specific Configuration

### For Development
The app currently uses:
- `http://localhost:8081` for Metro bundler (see `AppDelegate.swift`)
- Debug mode with Fast Refresh enabled

### For Production
- JS bundle is compiled into the app (`main.jsbundle`)
- No Metro connection needed
- See `AppDelegate.swift` lines 42-46

---

## Native Dependencies in Your Project

Your project uses these native iOS libraries:
- `@react-native-async-storage/async-storage`
- `@react-native-community/datetimepicker`
- `react-native-blob-util`
- `react-native-geolocation-service`
- `react-native-gesture-handler`
- `react-native-iap` (In-App Purchases)
- `react-native-image-crop-picker`
- `react-native-image-picker`
- `react-native-keyboard-controller`
- `react-native-linear-gradient`
- `react-native-reanimated`
- `react-native-restart`
- `react-native-safe-area-context`
- `react-native-screens`
- `react-native-splash-screen`
- `react-native-svg`
- `react-native-webview`

All of these are automatically linked via CocoaPods when you run `pod install`.

---

## Quick Reference Commands

```bash
# Install dependencies (first time or after package.json changes)
npm install && cd ios && bundle exec pod install && cd ..

# Run on iOS simulator
npm run ios

# Run on specific simulator
npm run ios -- --simulator="iPhone 15"

# Clean and rebuild
cd ios && xcodebuild clean && cd .. && npm run ios

# Reset Metro cache
npm start -- --reset-cache

# Check available simulators
xcrun simctl list devices
```

---

## Next Steps

1. ✅ Permissions added to `Info.plist`
2. ⏳ Run `bundle install` (if not done)
3. ⏳ Run `cd ios && bundle exec pod install`
4. ⏳ Configure Bundle ID & Signing in Xcode
5. ⏳ Run `npm run ios` to test

**Note:** You're on Windows, so you'll need access to a Mac to build and run the iOS app. Consider using:
- A physical Mac
- Cloud Mac service (MacStadium, AWS EC2 Mac instances)
- CI/CD service with Mac runners (GitHub Actions, Bitrise, etc.)
