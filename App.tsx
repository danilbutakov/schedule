import * as React from 'react';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './app/hooks/useAuth';

import 'expo-dev-client';

const App = () => {
	return (
		<AuthProvider>
			<NavigationContainer>
				<StackNavigator />
			</NavigationContainer>
		</AuthProvider>
	);
};

export default App;
