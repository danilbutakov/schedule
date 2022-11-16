import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';
import { Alert } from 'react-native';

import 'expo-dev-client';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	// Set an initializing state whilst Firebase connects
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(false);

	GoogleSignin.configure({
		webClientId:
			'676713652988-tkn7efgb8i2gng0ut42kkcb6a8ch3aoh.apps.googleusercontent.com'
	});

	// Handle user state changes
	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	const onGoogleButtonPress = async () => {
		setLoading(true);
		// Check if your device supports Google Play
		await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
		// Get the users ID token
		const { idToken } = await GoogleSignin.signIn();

		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);

		// Sign-in the user with the credential
		// return auth().signInWithCredential(googleCredential);
		const userSignIn = auth().signInWithCredential(googleCredential);
		userSignIn
			.then(user => {
				Alert.alert(user);
			})
			.catch(error => {
				Alert.alert(error.message);
			})
			.finally(() => setLoading(false));
	};

	const signOut = async () => {
		setLoading(true);
		try {
			await GoogleSignin.revokeAccess();
			await auth().signOut();
		} catch (error) {
			Alert.alert(error.message);
		} finally {
			setLoading(false);
		}
	};

	const memoedValue = useMemo(
		() => ({
			onGoogleButtonPress,
			user,
			signOut,
			loading
		}),
		[user, loading]
	);

	if (initializing) return null;

	return (
		<AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
	);
};

export default function useAuth() {
	return useContext(AuthContext);
}