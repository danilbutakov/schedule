import { View, Text, Button, TextInput } from 'react-native';
import useAuth from '../hooks/useAuth';

const AuthScreen = () => {
	const { onGoogleButtonPress, loading, user } = useAuth();

	return (
		<View className=''>
			<Text className=''>{loading ? 'Loading...' : 'Войти с помощью'}</Text>
			<Button title='Войти' onPress={onGoogleButtonPress} />
		</View>
	);
};

export default AuthScreen;
