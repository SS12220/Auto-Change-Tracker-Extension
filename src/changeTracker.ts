import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export interface TrackingStatus {
    isTracking: boolean;
    filesTracked: number;
    changesToday: number;
    sessionDuration: string;
    currentLogFile: string;
}

export class ChangeTracker {
    private isTrackingActive: boolean = false;
    private sessionStart: Date | null = null;
    private changesToday: number = 0;
    private logsDirectory: string;
    private currentLogFile: string;
    private ignoredPatterns: string[];

    constructor() {
        const config = vscode.workspace.getConfiguration('autoChangeTracker');
        this.logsDirectory = config.get('logsDirectory', 'daily-changes');
        this.ignoredPatterns = config.get('ignoredPatterns', [
            'node_modules', '.git', '.vscode', 'dist', 'build', '*.log', 'daily-changes'
        ]);
        this.currentLogFile = this.getDailyLogFile();
        this.ensureLogsDirectory();
    }

    public startTracking(): void {
        if (this.isTrackingActive) {
            return;
        }

        this.isTrackingActive = true;
        this.sessionStart = new Date();
        this.changesToday = 0;
        this.currentLogFile = this.getDailyLogFile();
        this.ensureLogsDirectory();
        this.trackSessionStart();

        // Set up file system watchers
        this.setupFileWatchers();

        // Set up workspace file change listeners
        this.setupWorkspaceListeners();

        console.log('Auto Change Tracker started');
    }

    public stopTracking(): void {
        if (!this.isTrackingActive) {
            return;
        }

        this.isTrackingActive = false;
        this.trackSessionEnd();
        console.log('Auto Change Tracker stopped');
    }

    public isTracking(): boolean {
        return this.isTrackingActive;
    }

    public getStatus(): TrackingStatus {
        return {
            isTracking: this.isTrackingActive,
            filesTracked: this.getFilesTrackedCount(),
            changesToday: this.changesToday,
            sessionDuration: this.getSessionDuration(),
            currentLogFile: this.currentLogFile
        };
    }

    public getCurrentLogFile(): string {
        return this.currentLogFile;
    }

    public getLogsDirectory(): string {
        return this.logsDirectory;
    }

    private getDailyLogFile(): string {
        const date = new Date().toISOString().split('T')[0];
        const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '';
        return path.join(workspaceRoot, this.logsDirectory, `${date}-changes.txt`);
    }

    private ensureLogsDirectory(): void {
        const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '';
        const logsDir = path.join(workspaceRoot, this.logsDirectory);
        
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }
    }

    private shouldIgnoreFile(filePath: string): boolean {
        const relativePath = path.relative(vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '', filePath);
        return this.ignoredPatterns.some(pattern => {
            if (pattern.includes('*')) {
                const regex = new RegExp(pattern.replace('*', '.*'));
                return regex.test(relativePath);
            }
            return relativePath.includes(pattern);
        });
    }

    private writeToLog(content: string): void {
        if (!this.isTrackingActive) {
            return;
        }

        try {
            const timestamp = new Date().toLocaleString();
            const logEntry = `[${timestamp}] ${content}\n`;
            fs.appendFileSync(this.currentLogFile, logEntry);
            this.changesToday++;
        } catch (error) {
            console.error('Error writing to log file:', error);
        }
    }

    private trackSessionStart(): void {
        const workspaceName = vscode.workspace.workspaceFolders?.[0]?.name || 'Unknown';
        this.writeToLog('=== SESSION STARTED ===');
        this.writeToLog(`Project: ${workspaceName}`);
        this.writeToLog(`Session Start: ${this.sessionStart?.toLocaleString()}`);
        this.writeToLog(`Daily Log File: ${path.basename(this.currentLogFile)}`);
        this.writeToLog('');
        this.writeToLog('=== AUTO TRACKING STARTED ===');
        this.writeToLog(`Watching workspace: ${vscode.workspace.workspaceFolders?.[0]?.uri.fsPath}`);
        this.writeToLog('');
    }

    private trackSessionEnd(): void {
        this.writeToLog('');
        this.writeToLog('=== SESSION ENDED ===');
        this.writeToLog(`Session End: ${new Date().toLocaleString()}`);
        this.writeToLog(`Total Session Time: ${this.getSessionDuration()}`);
        this.writeToLog(`Total Changes Today: ${this.changesToday}`);
    }

    private getSessionDuration(): string {
        if (!this.sessionStart) {
            return '0m 0s';
        }

        const now = new Date();
        const diff = now.getTime() - this.sessionStart.getTime();
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        return `${minutes}m ${seconds}s`;
    }

    private getFilesTrackedCount(): number {
        if (!vscode.workspace.workspaceFolders) {
            return 0;
        }

        let count = 0;
        const workspaceRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
        
        const countFiles = (dir: string): void => {
            try {
                const items = fs.readdirSync(dir);
                items.forEach(item => {
                    const fullPath = path.join(dir, item);
                    if (!this.shouldIgnoreFile(fullPath)) {
                        const stats = fs.statSync(fullPath);
                        if (stats.isFile()) {
                            count++;
                        } else if (stats.isDirectory()) {
                            countFiles(fullPath);
                        }
                    }
                });
            } catch (error) {
                // Ignore errors for inaccessible directories
            }
        };

        countFiles(workspaceRoot);
        return count;
    }

    private setupFileWatchers(): void {
        // This is handled by VS Code's built-in file system watchers
        // We'll use the workspace file change events instead
    }

    private setupWorkspaceListeners(): void {
        // Listen for file changes
        const fileChangeListener = vscode.workspace.onDidSaveTextDocument((document) => {
            if (this.shouldIgnoreFile(document.fileName)) {
                return;
            }

            const relativePath = path.relative(
                vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '',
                document.fileName
            );

            const fileSize = Buffer.byteLength(document.getText(), 'utf8');
            const fileSizeKB = (fileSize / 1024).toFixed(2);
            const timeFromStart = this.getSessionDuration();

            this.writeToLog(`MODIFIED: ${relativePath} (${timeFromStart}) - Size: ${fileSizeKB} KB`);

            const config = vscode.workspace.getConfiguration('autoChangeTracker');
            if (config.get('showNotifications', false)) {
                vscode.window.showInformationMessage(`Tracked: ${relativePath}`);
            }
        });

        // Listen for file creation
        const fileCreateListener = vscode.workspace.onDidCreateFiles((event) => {
            event.files.forEach(file => {
                if (this.shouldIgnoreFile(file.fsPath)) {
                    return;
                }

                const relativePath = path.relative(
                    vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '',
                    file.fsPath
                );

                const timeFromStart = this.getSessionDuration();
                this.writeToLog(`CREATED: ${relativePath} (${timeFromStart})`);

                const config = vscode.workspace.getConfiguration('autoChangeTracker');
                if (config.get('showNotifications', false)) {
                    vscode.window.showInformationMessage(`Created: ${relativePath}`);
                }
            });
        });

        // Listen for file deletion
        const fileDeleteListener = vscode.workspace.onDidDeleteFiles((event) => {
            event.files.forEach(file => {
                if (this.shouldIgnoreFile(file.fsPath)) {
                    return;
                }

                const relativePath = path.relative(
                    vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '',
                    file.fsPath
                );

                const timeFromStart = this.getSessionDuration();
                this.writeToLog(`DELETED: ${relativePath} (${timeFromStart})`);

                const config = vscode.workspace.getConfiguration('autoChangeTracker');
                if (config.get('showNotifications', false)) {
                    vscode.window.showInformationMessage(`Deleted: ${relativePath}`);
                }
            });
        });

        // Store listeners for cleanup
        this.fileChangeListener = fileChangeListener;
        this.fileCreateListener = fileCreateListener;
        this.fileDeleteListener = fileDeleteListener;
    }

    private fileChangeListener?: vscode.Disposable;
    private fileCreateListener?: vscode.Disposable;
    private fileDeleteListener?: vscode.Disposable;

    public dispose(): void {
        this.stopTracking();
        this.fileChangeListener?.dispose();
        this.fileCreateListener?.dispose();
        this.fileDeleteListener?.dispose();
    }
} 