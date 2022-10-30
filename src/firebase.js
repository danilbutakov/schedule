// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyA0anmBNEIbwWpAZhGIvdr5Qk47bL8H4rY',
	authDomain: 'schedule-11f30.firebaseapp.com',
	databaseURL:
		'https://schedule-11f30-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'schedule-11f30',
	storageBucket: 'schedule-11f30.appspot.com',
	messagingSenderId: '676713652988',
	appId: '1:676713652988:web:70cc2f79558d633ebfad79',
	measurementId: 'G-28ZS3Y6NFD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth();
