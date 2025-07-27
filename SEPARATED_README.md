# Auto Change Tracker - VS Code Extension (Separated)

This is the **separated VS Code extension** for the Auto Change Tracker system.

## 📁 What's Here

This folder contains the complete VS Code extension, separated from the original project for independent development and distribution.

### Files Included
- ✅ **Source Code** (`src/`) - TypeScript source files
- ✅ **Compiled Code** (`out/`) - JavaScript compiled files
- ✅ **Extension Package** (`auto-change-tracker-0.0.1.vsix`) - Ready to install
- ✅ **Build Scripts** - Easy compilation and packaging
- ✅ **Documentation** - Complete setup and usage guides

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Build Extension
```bash
node build-and-package.js
```

### Test Extension
```bash
code --install-extension auto-change-tracker-0.0.1.vsix
```

## 📦 Distribution

### Ready to Share
The extension is already packaged and ready for distribution:
- **File:** `auto-change-tracker-0.0.1.vsix`
- **Size:** 15KB
- **Status:** Ready to install

### Installation Methods
1. **VS Code UI:** Extensions → "..." → "Install from VSIX..."
2. **Command Line:** `code --install-extension auto-change-tracker-0.0.1.vsix`

## 🔧 Development

### Project Structure
```
Auto-Change-Tracker-Extension/
├── src/
│   ├── extension.ts          # Main extension file
│   └── changeTracker.ts      # Core tracking logic
├── out/                      # Compiled JavaScript
├── auto-change-tracker-0.0.1.vsix  # Extension package
├── package.json              # Extension manifest
├── tsconfig.json             # TypeScript config
├── build-and-package.js      # Build script
└── README.md                 # Documentation
```

### Build Commands
```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Package extension
npx vsce package

# Build everything (recommended)
node build-and-package.js
```

## 🌐 Publishing Options

### Option 1: VS Code Marketplace
1. Go to https://marketplace.visualstudio.com/
2. Sign in with Microsoft account
3. Create publisher
4. Upload `auto-change-tracker-0.0.1.vsix`

### Option 2: Direct Share
- Share the .vsix file via email, cloud storage, etc.
- Others install using "Install from VSIX..." in VS Code

### Option 3: GitHub Releases
1. Create GitHub repository
2. Upload extension files
3. Create release with .vsix file
4. Share download link

## 📋 Extension Features

### Automatic Operation
- ✅ Starts when VS Code opens
- ✅ Tracks all file changes
- ✅ Creates daily log files
- ✅ Shows status in status bar

### Commands
- **Start/Stop Auto Change Tracking**
- **Show Tracking Status**
- **Open Today's Log File**
- **Open Logs Folder**

### Configuration
- **Enable/disable** automatic tracking
- **Customize** logs directory
- **Set ignored** file patterns
- **Toggle** notifications

## 🎯 Usage

1. **Install the extension** using one of the methods above
2. **Open a workspace** in VS Code
3. **Check status bar** - should show tracking status
4. **Work normally** - all changes are automatically logged
5. **Check daily-changes folder** for log files

## 📊 What Gets Tracked

- ✅ **File modifications** (when you save files)
- ✅ **File creation** (when you create new files)
- ✅ **File deletion** (when you delete files)
- ✅ **File sizes** (for modified files)
- ✅ **Timestamps** for every change
- ✅ **Session duration** tracking

## 🔄 Updates

### To Update the Extension
1. **Make changes** to source code
2. **Update version** in package.json
3. **Rebuild:** `node build-and-package.js`
4. **Test** the new version
5. **Distribute** the updated .vsix file

## 📞 Support

### For Users
- Check the main README.md for detailed usage
- Use VS Code settings to configure the extension
- Check Output panel for error messages

### For Developers
- Use build scripts for easy compilation
- Follow VS Code extension development guidelines
- Test thoroughly before distribution

---

## 🎉 Summary

This separated extension provides:
- **Independent development** from the main project
- **Easy distribution** via .vsix file
- **Complete build system** for updates
- **Professional packaging** ready for marketplace

**The extension is ready to help developers track their changes automatically! 🚀** 