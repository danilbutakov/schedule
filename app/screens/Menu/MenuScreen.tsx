import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import React from 'react';
import { BlurView } from '@react-native-community/blur';
import useAuth from '../../hooks/useAuth';
import { useTheme } from '@react-navigation/native';

const ProfileItems = React.lazy(
	() => import('../../components/Menu/ProfileItems')
);
const MenuItems = React.lazy(() => import('../../components/Menu/MenuItems'));

const { width } = Dimensions.get('screen');

const MenuScreen = () => {
	// @ts-ignore
	const { loading } = useAuth();
	const theme = useTheme();

	return (
		<View
			style={[
				styles.mainContainer,
				{ backgroundColor: theme.colors.first }
			]}>
			<ProfileItems />
			<MenuItems />
			{loading ? (
				<>
					<BlurView
						style={styles.absolute}
						blurType='dark'
						blurAmount={3}
					/>
					<ActivityIndicator
						size='large'
						color='#1E1E1F'
						style={{ backgroundColor: '#1E1E1F' }}
					/>
				</>
			) : null}
		</View>
	);
};

export default MenuScreen;

const styles = StyleSheet.create({
	mainContainer: {
		height: '100%',
		width
	},
	absolute: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	}
});
