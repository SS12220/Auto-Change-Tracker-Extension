# Auto Change Tracker - VS Code Extension

A VS Code extension that automatically tracks all your project changes to daily text files.

## Features

- 🔄 **Automatic Tracking**: Records all file changes without manual intervention
- 📅 **Daily Log Files**: Creates separate log files for each day
- 📊 **Status Bar Integration**: Shows tracking status in the status bar
- ⚙️ **Configurable**: Customize ignored patterns and settings
- 🎯 **VS Code Native**: Uses VS Code's built-in file system events

## Installation

### From Source (Development)

1. Clone or download this extension
2. Navigate to the `vscode-extension` folder
3. Install dependencies:
   ```bash
   npm install
   ```
4. Compile the extension:
   ```bash
   npm run compile
   ```
5. Press `F5` in VS Code to run the extension in a new Extension Development Host window

### From VSIX (When Published)

1. Download the `.vsix` file
2. In VS Code, go to Extensions (Ctrl+Shift+X)
3. Click the "..." menu and select "Install from VSIX..."
4. Select the downloaded file

## Usage

### Automatic Start

The extension automatically starts tracking when you open a workspace (if enabled in settings).

### Manual Control

Use the Command Palette (Ctrl+Shift+P) to access these commands:

- **Auto Change Tracker: Start Auto Change Tracking** - Start tracking manually
- **Auto Change Tracker: Stop Auto Change Tracking** - Stop tracking
- **Auto Change Tracker: Show Tracking Status** - Show current status
- **Auto Change Tracker: Open Today's Log File** - Open today's log file
- **Auto Change Tracker: Open Logs Folder** - Open the logs directory

### Status Bar

The extension adds a status bar item that shows:
- 🟢 **$(record) Auto Tracking** - When tracking is active
- 🔴 **$(circle-slash) Auto Tracking** - When tracking is stopped

Click the status bar item to see detailed status information.

## Configuration

Open VS Code settings (Ctrl+,) and search for "Auto Change Tracker" to configure:

### Settings

- **autoChangeTracker.enabled** (boolean, default: true)
  - Enable or disable automatic change tracking

- **autoChangeTracker.logsDirectory** (string, default: "daily-changes")
  - Directory to store daily log files

- **autoChangeTracker.ignoredPatterns** (array, default: see below)
  - File patterns to ignore during tracking
  - Default patterns: `["node_modules", ".git", ".vscode", "dist", "build", "*.log", "daily-changes"]`

- **autoChangeTracker.showNotifications** (boolean, default: false)
  - Show notifications when files are tracked

### Example Settings

```json
{
  "autoChangeTracker.enabled": true,
  "autoChangeTracker.logsDirectory": "project-logs",
  "autoChangeTracker.ignoredPatterns": [
    "node_modules",
    ".git",
    "dist",
    "build",
    "*.log",
    "temp"
  ],
  "autoChangeTracker.showNotifications": true
}
```

## Log File Format

Daily log files are created in the format: `YYYY-MM-DD-changes.txt`

### Example Log File

```
[27/7/2025, 7:24:31 pm] === SESSION STARTED ===
[27/7/2025, 7:24:31 pm] Project: My-Portfolio
[27/7/2025, 7:24:31 pm] Session Start: 27/7/2025, 7:24:31 pm
[27/7/2025, 7:24:31 pm] Daily Log File: 2025-07-27-changes.txt
[27/7/2025, 7:24:31 pm] 
[27/7/2025, 7:24:31 pm] === AUTO TRACKING STARTED ===
[27/7/2025, 7:24:31 pm] Watching workspace: C:\Files\My-Portfolio
[27/7/2025, 7:24:31 pm] 
[27/7/2025, 7:25:15 pm] MODIFIED: src/App.jsx (0m 44s) - Size: 2.45 KB
[27/7/2025, 7:26:30 pm] CREATED: src/components/NewComponent.jsx (1m 59s)
[27/7/2025, 7:27:45 pm] DELETED: old-file.js (3m 14s)
[27/7/2025, 7:30:00 pm] 
[27/7/2025, 7:30:00 pm] === SESSION ENDED ===
[27/7/2025, 7:30:00 pm] Session End: 27/7/2025, 7:30:00 pm
[27/7/2025, 7:30:00 pm] Total Session Time: 5m 29s
[27/7/2025, 7:30:00 pm] Total Changes Today: 3
```

## What Gets Tracked

- ✅ **File modifications** (when you save files)
- ➕ **File creation** (when you create new files)
- ❌ **File deletion** (when you delete files)
- 📊 **File sizes** (for modified files)
- ⏰ **Timestamps** for every change
- 🕒 **Session duration** tracking

## Development

### Building the Extension

```bash
npm install
npm run compile
```

### Running in Development Mode

1. Open the `vscode-extension` folder in VS Code
2. Press `F5` to run the extension in a new window
3. The extension will be loaded in the Extension Development Host

### Testing

```bash
npm run test
```

## Troubleshooting

### Extension Not Working

1. Check if the extension is enabled in VS Code
2. Verify the workspace has a root folder
3. Check the Output panel for error messages
4. Ensure the logs directory is writable

### No Log Files Created

1. Check if tracking is enabled in settings
2. Verify the workspace has files to track
3. Check if all files are being ignored by patterns
4. Look for error messages in the Output panel

### Performance Issues

1. Reduce the number of files being tracked
2. Add more patterns to ignoredPatterns
3. Disable notifications if not needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This extension is provided as-is for educational and development purposes.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the configuration options
3. Check the Output panel for error messages
4. Create an issue in the repository 