# Changelog

All notable changes to the Auto Change Tracker VS Code Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2024-07-27

### Added
- Initial release of Auto Change Tracker VS Code Extension
- Automatic file change tracking (modify, create, delete)
- Daily log files with timestamps and file sizes
- Status bar integration showing tracking status
- Commands for manual control (start/stop tracking)
- Commands for accessing log files and folders
- Configuration options for logs directory and ignored patterns
- Session duration tracking
- File size monitoring for modified files
- Automatic startup when VS Code opens
- Notification system for tracked changes

### Features
- **Automatic Tracking**: Monitors all file changes in the workspace
- **Daily Logs**: Creates separate log files for each day (YYYY-MM-DD-changes.txt)
- **Status Bar**: Shows current tracking status and file count
- **Commands**: 
  - `Auto Change Tracker: Start/Stop Tracking`
  - `Auto Change Tracker: Show Status`
  - `Auto Change Tracker: Open Today's Log File`
  - `Auto Change Tracker: Open Logs Folder`
- **Configuration**:
  - `autoChangeTracker.enableAutoStart`: Enable/disable automatic startup
  - `autoChangeTracker.logsDirectory`: Customize logs directory
  - `autoChangeTracker.ignoredPatterns`: Set ignored file patterns
  - `autoChangeTracker.showNotifications`: Toggle change notifications

### Technical Details
- Built with TypeScript
- Uses VS Code Extension API
- Compatible with VS Code 1.74.0+
- Lightweight and efficient file monitoring
- Cross-platform compatibility

### Installation
- Extension package: `auto-change-tracker-0.0.1.vsix`
- Install via VS Code Extensions panel or command line
- No additional dependencies required

---

## Future Plans

### Planned Features
- [ ] Export logs in different formats (JSON, CSV)
- [ ] Custom log templates
- [ ] Integration with version control systems
- [ ] Advanced filtering options
- [ ] Log analysis and statistics
- [ ] Cloud sync for logs
- [ ] Team collaboration features

### Known Issues
- None reported yet

### Breaking Changes
- None in this version 