import { CapacitorConfig } from '@capacitor/cli';
import { SplashScreen } from '@capacitor/splash-screen';

await SplashScreen.hide();

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'schedule',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
   url: 'https://schedule-psi.vercel.app/',
   cleartext: true
  }
};

export default config;
