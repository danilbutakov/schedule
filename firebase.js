import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyA0anmBNEIbwWpAZhGIvdr5Qk47bL8H4rY',
	authDomain: 'schedule-11f30.firebaseapp.com',
	databaseURL:
		'https://schedule-11f30-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'schedule-11f30',
	storageBucket: 'schedule-11f30.appspot.com',
	messagingSenderId: '676713652988',
	appId: '1:676713652988:web:70cc2f79558d633ebfad79',
	measurementId: 'G-28ZS3Y6NFD'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
