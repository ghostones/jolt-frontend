# Environment Configuration Setup Guide

This guide explains how to set up the secure environment configuration file for your JOLT application.

## 📁 Files Created

1. **`env-config.js`** - Your actual configuration file (DO NOT commit to git!)
2. **`env-config.example.js`** - Template/example file (safe to commit)
3. **`.gitignore`** - Ensures `env-config.js` is not committed

## 🔒 Security

- ⚠️ **IMPORTANT**: `env-config.js` contains sensitive keys and should NEVER be committed to public repositories
- The file is already added to `.gitignore`
- Only commit `env-config.example.js` as a template for other developers

## 🚀 Quick Setup

### Step 1: Copy the Example File
```bash
# If the file doesn't exist, copy from example
cp env-config.example.js env-config.js
```

### Step 2: Edit `env-config.js`

Open `env-config.js` and fill in your actual values:

```javascript
// Google AdSense
window.ADSENSE_PUBLISHER_ID = 'ca-pub-1234567890123456';  // Your real Publisher ID
window.ADSENSE_SLOTS = {
  leftSidebar: '1234567890',    // Your left sidebar slot ID
  rightSidebar: '0987654321',   // Your right sidebar slot ID
  banner: '1122334455'          // Your banner slot ID
};
```

### Step 3: Deploy

- Deploy `env-config.js` to your server (with real values)
- Do NOT commit it to git
- Only the example file should be in your repository

## 📝 Configuration Options

### Google AdSense
- **ADSENSE_PUBLISHER_ID**: Your AdSense Publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)
- **ADSENSE_SLOTS**: Object containing your ad slot IDs
  - `leftSidebar`: Left sidebar ad slot ID
  - `rightSidebar`: Right sidebar ad slot ID
  - `banner`: Banner ad slot ID

### API Keys (Optional)
Add any frontend API keys here (remember: frontend keys are visible to users, so don't put sensitive backend keys):

```javascript
window.API_KEYS = {
  googleMaps: 'YOUR_GOOGLE_MAPS_API_KEY',
  analyticsId: 'G-XXXXXXXXXX'
};
```

### CDN URLs (Optional)
Customize CDN URLs if needed:

```javascript
window.CDN_URLS = {
  socketIO: 'https://cdn.socket.io/4.7.5/socket.io.min.js',
  razorpay: 'https://checkout.razorpay.com/v1/checkout.js',
  // Add more as needed
};
```

### Feature Flags
Control feature availability by environment:

```javascript
window.FEATURE_FLAGS = {
  enableAds: true,          // Show ads (usually true in production)
  enableAnalytics: true,    // Enable analytics
  enableDebug: false        // Debug mode (usually false in production)
};
```

## 🔍 Environment Detection

The config automatically detects your environment:

- **Development**: `localhost` or `127.0.0.1`
- **Staging**: Hostname contains `netlify` or `vercel`
- **Production**: Everything else

Feature flags can use `window.ENV_CONFIG.isProduction` to conditionally enable features.

## ✅ Verification

After setup, check the browser console:

1. **Valid Configuration**: No warnings, ads load normally
2. **Missing Config**: Warnings about unconfigured Publisher ID or Slot IDs
3. **Debug Mode**: Console logs showing environment and configuration status

## 🛠️ Usage in Code

Access configuration in your JavaScript:

```javascript
// Check if ads are enabled
if (window.FEATURE_FLAGS.enableAds) {
  // Show ads
}

// Get AdSense Publisher ID
const publisherId = window.ADSENSE_PUBLISHER_ID;

// Check environment
if (window.ENV_CONFIG.isProduction) {
  // Production-only code
}

// Get CDN URL
const socketIOUrl = window.CDN_URLS.socketIO;
```

## 📦 For Team Development

1. Each developer copies `env-config.example.js` to `env-config.js`
2. Each developer fills in their own values (or uses test/dummy values)
3. Only `env-config.example.js` is committed to git
4. Production server has the real `env-config.js` with production keys

## 🔄 Updating Configuration

When adding new configuration options:

1. Update `env-config.example.js` with the new option (with placeholder values)
2. Update `env-config.js` with your actual values
3. Document the new option in this README
4. Update any code that uses the configuration

## ⚠️ Important Notes

- Frontend JavaScript is always visible to users - don't put truly secret keys here
- Backend API keys should stay on the server, never in frontend code
- AdSense Publisher IDs and Slot IDs are safe to put in frontend (they're meant to be public)
- The config file is loaded BEFORE other scripts, so values are available immediately
