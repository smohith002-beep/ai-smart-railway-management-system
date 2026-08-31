import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'in.smartrailway.app',
  appName: 'Smart Railway Live',
  webDir: 'dist',
  server: {
    // Allows hot reload and USB development connection over adb reverse
    androidScheme: 'http',
    cleartext: true
  },
  android: {
    allowMixedContent: true,
    buildOptions: {
      keystorePath: undefined,
      releaseType: 'APK'
    }
  },
  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#000000'
    }
  }
};

export default config;
