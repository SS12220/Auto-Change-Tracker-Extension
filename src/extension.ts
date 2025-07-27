import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { ChangeTracker } from './changeTracker';

export function activate(context: vscode.ExtensionContext) {
    console.log('Auto Change Tracker extension is now active!');

    const changeTracker = new ChangeTracker();
    let statusBarItem: vscode.StatusBarItem;

    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'autoChangeTracker.showStatus';
    context.subscriptions.push(statusBarItem);

    // Update status bar
    function updateStatusBar() {
        if (changeTracker.isTracking()) {
            statusBarItem.text = '$(record) Auto Tracking';
            statusBarItem.tooltip = 'Auto Change Tracker is running';
            statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.prominentBackground');
        } else {
            statusBarItem.text = '$(circle-slash) Auto Tracking';
            statusBarItem.tooltip = 'Auto Change Tracker is stopped';
            statusBarItem.backgroundColor = undefined;
        }
        statusBarItem.show();
    }

    // Start tracking command
    let startTrackingCommand = vscode.commands.registerCommand('autoChangeTracker.startTracking', () => {
        try {
            changeTracker.startTracking();
            updateStatusBar();
            vscode.window.showInformationMessage('Auto Change Tracker started!');
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to start tracking: ${error}`);
        }
    });

    // Stop tracking command
    let stopTrackingCommand = vscode.commands.registerCommand('autoChangeTracker.stopTracking', () => {
        try {
            changeTracker.stopTracking();
            updateStatusBar();
            vscode.window.showInformationMessage('Auto Change Tracker stopped!');
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to stop tracking: ${error}`);
        }
    });

    // Show status command
    let showStatusCommand = vscode.commands.registerCommand('autoChangeTracker.showStatus', () => {
        const status = changeTracker.getStatus();
        vscode.window.showInformationMessage(
            `Auto Change Tracker Status:\n` +
            `Status: ${status.isTracking ? 'Running' : 'Stopped'}\n` +
            `Files Tracked: ${status.filesTracked}\n` +
            `Changes Today: ${status.changesToday}\n` +
            `Session Duration: ${status.sessionDuration}\n` +
            `Log File: ${status.currentLogFile}`
        );
    });

    // Open daily log command
    let openDailyLogCommand = vscode.commands.registerCommand('autoChangeTracker.openDailyLog', () => {
        const logFile = changeTracker.getCurrentLogFile();
        if (fs.existsSync(logFile)) {
            vscode.workspace.openTextDocument(logFile).then(doc => {
                vscode.window.showTextDocument(doc);
            });
        } else {
            vscode.window.showWarningMessage('No log file found for today');
        }
    });

    // Open logs folder command
    let openLogsFolderCommand = vscode.commands.registerCommand('autoChangeTracker.openLogsFolder', () => {
        const logsDir = changeTracker.getLogsDirectory();
        if (fs.existsSync(logsDir)) {
            vscode.commands.executeCommand('revealInExplorer', vscode.Uri.file(logsDir));
        } else {
            vscode.window.showWarningMessage('Logs directory not found');
        }
    });

    // Register commands
    context.subscriptions.push(
        startTrackingCommand,
        stopTrackingCommand,
        showStatusCommand,
        openDailyLogCommand,
        openLogsFolderCommand
    );

    // Auto-start tracking if enabled
    const config = vscode.workspace.getConfiguration('autoChangeTracker');
    if (config.get('enabled', true)) {
        // Wait a bit for workspace to be ready
        setTimeout(() => {
            changeTracker.startTracking();
            updateStatusBar();
        }, 2000);
    }

    // Update status bar initially
    updateStatusBar();

    // Handle workspace changes
    vscode.workspace.onDidChangeWorkspaceFolders(() => {
        if (config.get('enabled', true)) {
            changeTracker.stopTracking();
            setTimeout(() => {
                changeTracker.startTracking();
                updateStatusBar();
            }, 1000);
        }
    });

    // Handle configuration changes
    vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration('autoChangeTracker')) {
            const newConfig = vscode.workspace.getConfiguration('autoChangeTracker');
            if (newConfig.get('enabled', true)) {
                if (!changeTracker.isTracking()) {
                    changeTracker.startTracking();
                    updateStatusBar();
                }
            } else {
                if (changeTracker.isTracking()) {
                    changeTracker.stopTracking();
                    updateStatusBar();
                }
            }
        }
    });
}

export function deactivate() {
    console.log('Auto Change Tracker extension is now deactivated!');
} 