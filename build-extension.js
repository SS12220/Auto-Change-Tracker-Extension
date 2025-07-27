#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Building VS Code Extension...');
console.log('================================');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
    console.error('❌ Error: package.json not found. Please run this script from the vscode-extension directory.');
    process.exit(1);
}

try {
    // Install dependencies if node_modules doesn't exist
    if (!fs.existsSync('node_modules')) {
        console.log('📦 Installing dependencies...');
        execSync('npm install', { stdio: 'inherit' });
    }

    // Compile TypeScript
    console.log('🔧 Compiling TypeScript...');
    execSync('npm run compile', { stdio: 'inherit' });

    // Check if compilation was successful
    if (!fs.existsSync('out/extension.js')) {
        console.error('❌ Error: Compilation failed. extension.js not found in out/ directory.');
        process.exit(1);
    }

    console.log('✅ Extension compiled successfully!');
    console.log('');
    console.log('🎉 Next steps:');
    console.log('1. Open the vscode-extension folder in VS Code');
    console.log('2. Press F5 to run the extension in development mode');
    console.log('3. Or use "vsce package" to create a .vsix file for distribution');
    console.log('');
    console.log('📁 Compiled files are in the "out/" directory');

} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
} 