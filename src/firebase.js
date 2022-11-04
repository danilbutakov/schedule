import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyA0anmBNEIbwWpAZhGIvdr5Qk47bL8H4rY',
	authDomain: 'schedule-11f30.web.app',
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
export const db = getDatabase(app);
export const auth = getAuth();
