#!/usr/bin/env node

/**
 * ============================================================================
 * AI SMART RAILWAY MANAGEMENT SYSTEM - ONE-CLICK USB ANDROID AUTOMATION
 * Author: MOHITH S | smohith002@gmail.com
 * ============================================================================
 * 
 * Automatically detects connected Android device via USB, sets up port forwarding,
 * builds web assets, synchronizes Capacitor, compiles native Android APK,
 * installs APK directly onto the phone, and launches the app instantly.
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const androidDir = path.join(rootDir, 'android');

// ANSI Color formatting
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  emerald: '\x1b[38;2;16;185;129m',
};

const log = (msg) => console.log(msg);
const logSuccess = (msg) => console.log(`${colors.emerald}✅ ${msg}${colors.reset}`);
const logInfo = (msg) => console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`);
const logWarn = (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`);
const logError = (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`);

function printBanner() {
  console.clear();
  log(`
${colors.bright}${colors.emerald}===================================================================
      🚆 SMART RAILWAY LIVE - ONE-CLICK USB ANDROID DEPLOYMENT
===================================================================${colors.reset}
`);
}

/**
 * Automatically locates Android SDK and Java Environment
 */
function resolveEnvironment() {
  logInfo('Detecting development environment & Android toolchain...');

  // 1. Android SDK Discovery
  let androidHome = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
  const standardSdkPaths = [
    path.join(process.env.LOCALAPPDATA || '', 'Android', 'Sdk'),
    'C:\\Android\\Sdk',
    'C:\\Users\\Default\\AppData\\Local\\Android\\Sdk'
  ];

  if (!androidHome || !fs.existsSync(androidHome)) {
    for (const p of standardSdkPaths) {
      if (fs.existsSync(p)) {
        androidHome = p;
        break;
      }
    }
  }

  if (androidHome && fs.existsSync(androidHome)) {
    process.env.ANDROID_HOME = androidHome;
    process.env.ANDROID_SDK_ROOT = androidHome;
    logSuccess(`Android SDK: ${androidHome}`);
  } else {
    logWarn('Android SDK directory not explicitly found. Proceeding with system PATH.');
  }

  // 2. Java Home Discovery (Android Studio JBR or JDK)
  let javaHome = process.env.JAVA_HOME;
  const standardJbrPaths = [
    'C:\\Program Files\\Android\\Android Studio\\jbr',
    'C:\\Program Files\\Eclipse Adoptium\\jdk-21.0.10.108-hotspot',
    'C:\\Program Files\\Java\\jdk-21',
    'C:\\Program Files\\Java\\jdk-17'
  ];

  if (!javaHome || !fs.existsSync(javaHome)) {
    for (const p of standardJbrPaths) {
      if (fs.existsSync(p)) {
        javaHome = p;
        break;
      }
    }
  }

  if (javaHome && fs.existsSync(javaHome)) {
    process.env.JAVA_HOME = javaHome;
    process.env.PATH = `${path.join(javaHome, 'bin')}${path.delimiter}${process.env.PATH}`;
    logSuccess(`Java Runtime: ${javaHome}`);
  } else {
    logWarn('Java Home not explicitly found. Using system Java executable.');
  }

  // 3. ADB Discovery
  let adbCmd = 'adb';
  if (androidHome) {
    const platformToolsAdb = path.join(androidHome, 'platform-tools', 'adb.exe');
    if (fs.existsSync(platformToolsAdb)) {
      adbCmd = `"${platformToolsAdb}"`;
      process.env.PATH = `${path.join(androidHome, 'platform-tools')}${path.delimiter}${process.env.PATH}`;
    }
  }

  return { adbCmd, androidHome, javaHome };
}

/**
 * Checks connected USB Android devices
 */
function checkConnectedDevices(adbCmd) {
  logInfo('Searching for connected Android devices over USB cable...');

  let output = '';
  try {
    output = execSync(`${adbCmd} devices -l`, { encoding: 'utf-8' });
  } catch (err) {
    logError('Failed to execute ADB command. Please verify Android Platform Tools are installed.');
    process.exit(1);
  }

  const lines = output.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('List of devices attached'));

  if (lines.length === 0) {
    log(`
${colors.yellow}===================================================================
                ⚠️  NO ANDROID PHONE DETECTED VIA USB
===================================================================${colors.reset}

Please follow these quick steps:
  1. Connect your Android phone to this laptop using a USB data cable.
  2. On your phone, go to:
     ${colors.bright}Settings -> About Phone -> Tap 'Build Number' 7 times${colors.reset} (Enables Developer Options).
  3. Go to:
     ${colors.bright}Settings -> Developer Options -> Turn ON 'USB Debugging'${colors.reset}.
  4. Once connected, re-run:
     ${colors.emerald}npm run android:usb${colors.reset}

`);
    process.exit(0);
  }

  const firstLine = lines[0];
  const parts = firstLine.split(/\s+/);
  const serial = parts[0];
  const status = parts[1];

  if (status === 'unauthorized') {
    log(`
${colors.yellow}===================================================================
                   ⚠️  DEVICE PERMISSION REQUIRED
===================================================================${colors.reset}

Your phone is connected, but USB Debugging is not yet authorized!
  1. Look at your phone's screen right now.
  2. Check "Always allow from this computer" and tap ${colors.bright}'ALLOW'${colors.reset}.
  3. Then re-run: ${colors.emerald}npm run android:usb${colors.reset}
`);
    process.exit(0);
  }

  if (status === 'offline') {
    logWarn(`Device ${serial} is offline. Restarting ADB server...`);
    execSync(`${adbCmd} kill-server && ${adbCmd} start-server`, { stdio: 'inherit' });
    return checkConnectedDevices(adbCmd);
  }

  logSuccess(`Target Android Device: ${colors.bright}${serial}${colors.reset} (${firstLine})`);
  return serial;
}

/**
 * Main execution flow
 */
async function main() {
  printBanner();

  const { adbCmd, androidHome } = resolveEnvironment();
  const deviceSerial = checkConnectedDevices(adbCmd);

  // 1. Setup Reverse Port Forwarding (Connects phone to laptop dev server over USB)
  logInfo('Setting up USB reverse port forwarding (tcp:5173 -> laptop:5173)...');
  try {
    execSync(`${adbCmd} reverse tcp:5173 tcp:5173`, { stdio: 'inherit' });
    logSuccess('USB port forwarding active. Phone will connect directly to local dev server.');
  } catch (err) {
    logWarn('Could not set adb reverse port forwarding. App will use configured fallback URL.');
  }

  // 2. Build Web Assets
  logInfo('Compiling web application bundle & static assets...');
  try {
    execSync('npm.cmd run build', { cwd: rootDir, stdio: 'inherit' });
    logSuccess('Web build completed.');
  } catch (err) {
    logError('Web build failed.');
    process.exit(1);
  }

  // 3. Sync with Capacitor
  logInfo('Synchronizing Capacitor Android assets...');
  try {
    execSync('npx.cmd cap sync android', { cwd: rootDir, stdio: 'inherit' });
    logSuccess('Capacitor synchronization complete.');
  } catch (err) {
    logError('Capacitor sync failed.');
    process.exit(1);
  }

  // 4. Build Android APK with Gradle
  logInfo('Building native Android APK with Gradle (assembleDebug)...');
  const gradlewCmd = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
  try {
    execSync(`${gradlewCmd} assembleDebug`, {
      cwd: androidDir,
      stdio: 'inherit',
      env: process.env
    });
    logSuccess('Native Android APK build successful.');
  } catch (err) {
    logError('Gradle APK compilation failed. Please check Android SDK and Java configurations.');
    process.exit(1);
  }

  // 5. Install APK onto connected Android Device
  const apkPath = path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
  if (!fs.existsSync(apkPath)) {
    logError(`APK file not found at expected location: ${apkPath}`);
    process.exit(1);
  }

  logInfo(`Installing APK onto phone (${deviceSerial})...`);
  try {
    execSync(`${adbCmd} install -r "${apkPath}"`, { stdio: 'inherit' });
    logSuccess('APK installed and updated successfully on your phone!');
  } catch (err) {
    logError('APK installation failed.');
    process.exit(1);
  }

  // 6. Launch App on Phone Screen
  logInfo('Launching Smart Railway Live application on phone...');
  const appPackage = 'in.smartrailway.app';
  const mainActivity = 'in.smartrailway.app.MainActivity';
  try {
    execSync(`${adbCmd} shell am start -n ${appPackage}/${mainActivity}`, { stdio: 'inherit' });
    logSuccess('Application launched on your Android phone screen!');
  } catch (err) {
    logWarn(`Could not auto-start activity. You can tap the 'Smart Railway Live' icon on your phone.`);
  }

  // 7. Completion Summary
  log(`
${colors.bright}${colors.emerald}===================================================================
              🎉 ANDROID APP INSTALLED & RUNNING!
===================================================================${colors.reset}

Features live on your Android phone:
  • 13,198+ Authentic Indian Railways Trains & Routes
  • Real-Time Live Running Status & Delays (Zero Simulated Movement)
  • Official Route Progression with Passed, Current & Upcoming stops
  • Interactive OpenStreetMap GIS Radar
  • Official IRCTC Online Booking Gateway
  • Bottom Navigation (Home, Search, Live Track, Saved, Profile)

${colors.dim}To push future changes, just reconnect USB and run: npm run android:usb${colors.reset}
`);
}

main().catch(err => {
  logError(`Execution error: ${err.message}`);
  process.exit(1);
});
