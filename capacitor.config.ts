import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'crud-confledis',
  webDir: 'build',
  bundledWebRuntime:false,
  server: {
    androidScheme: 'https'
  }
};

export default config;
