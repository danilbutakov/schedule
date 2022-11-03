import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
   appId: 'com.thirdTeam.schedule',
   appName: 'schedule',
   webDir: 'build',
   bundledWebRuntime: false,
   plugins: {
      GoogleAuth: {
         scopes: ['profile', 'email'],
         serverClientId: '676713652988-tkn7efgb8i2gng0ut42kkcb6a8ch3aoh.apps.googleusercontent.com',
         forceCodeForRefreshToken: true,
      },
   },
   android: {
      path: 'android',
   },
   ios: {
      path: 'ios',
   },
   server: {
      url: 'https://schedule-11f30.web.app',
   }
};

export default config;
