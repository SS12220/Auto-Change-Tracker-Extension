#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Building and Packaging VS Code Extension');
console.log('===========================================');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
    console.error('❌ Error: package.json not found. Please run this script from the vscode-extension directory.');
    process.exit(1);
}

try {
    // Step 1: Install dependencies if needed
    if (!fs.existsSync('node_modules')) {
        console.log('📦 Installing dependencies...');
        execSync('npm install', { stdio: 'inherit' });
    }

    // Step 2: Clean previous builds
    console.log('🧹 Cleaning previous builds...');
    if (fs.existsSync('out')) {
        fs.rmSync('out', { recursive: true, force: true });
    }

    // Step 3: Compile TypeScript
    console.log('🔧 Compiling TypeScript...');
    execSync('npm run compile', { stdio: 'inherit' });

    // Step 4: Check if compilation was successful
    if (!fs.existsSync('out/extension.js')) {
        console.error('❌ Error: Compilation failed. extension.js not found in out/ directory.');
        process.exit(1);
    }

    // Step 5: Package the extension
    console.log('📦 Packaging extension...');
    execSync('npx vsce package', { stdio: 'inherit' });

    // Step 6: Check if packaging was successful
    const vsixFiles = fs.readdirSync('.').filter(file => file.endsWith('.vsix'));
    if (vsixFiles.length === 0) {
        console.error('❌ Error: Packaging failed. No .vsix file found.');
        process.exit(1);
    }

    const vsixFile = vsixFiles[0];
    const stats = fs.statSync(vsixFile);
    const fileSize = (stats.size / 1024).toFixed(2);

    console.log('');
    console.log('✅ Extension successfully built and packaged!');
    console.log('============================================');
    console.log(`📁 Package: ${vsixFile}`);
    console.log(`📊 Size: ${fileSize} KB`);
    console.log(`📅 Created: ${new Date().toLocaleString()}`);
    console.log('');

    console.log('🎉 Next steps:');
    console.log('1. Test the extension:');
    console.log(`   code --install-extension ${vsixFile}`);
    console.log('');
    console.log('2. Publish to marketplace:');
    console.log('   - Go to https://marketplace.visualstudio.com/');
    console.log('   - Sign in and create a publisher');
    console.log('   - Upload the .vsix file');
    console.log('');
    console.log('3. Share directly:');
    console.log('   - Share the .vsix file via email, cloud storage, etc.');
    console.log('   - Others can install using "Install from VSIX..." in VS Code');
    console.log('');

    console.log('📋 Files created:');
    console.log(`   - ${vsixFile} (ready to install)`);
    console.log('   - out/ (compiled JavaScript)');
    console.log('   - *.js.map (source maps for debugging)');

} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
} 