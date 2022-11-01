import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
   appId: 'com.example.com',
   appName: 'Schedule',
   webDir: 'build',
   bundledWebRuntime: false,
   plugins: {
      FirebaseAuthentication: {
         skipNativeAuth: false,
         providers: ["google.com", 'phone'],
      },
   },
   android: {
      path: 'android',
   },
   ios: {
      path: 'ios',
   },
   server: {
      url: 'https://schedule-psi.vercel.app/',
   }
};

export default config;
