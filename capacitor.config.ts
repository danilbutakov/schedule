import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
   appId: 'ScheduleApp',
   appName: 'ScheduleApp',
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
      path: 'android',
   },
   server: {
      url: 'https://schedule-psi.vercel.app/',
   }
};

export default config;
