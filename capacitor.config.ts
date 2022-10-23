import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ScheduleApp',
  appName: 'ScheduleApp',
  webDir: 'build',
  bundledWebRuntime: false,
  android: {
   path: 'android',
  },
  ios: {
   path: 'android',
  },
  server: {
   url: 'https://schedule-psi.vercel.app/',
  }
};

export default config;
