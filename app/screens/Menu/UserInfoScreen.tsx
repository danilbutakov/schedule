import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import React, { useCallback, useContext } from 'react';
import { FlashList } from '@shopify/flash-list';

import { BlurView } from '@react-native-community/blur';
import { useFetchUserDataItems } from '../../hooks/useFetchDataItems';
import AppContext from '../../utils/Context';
import { useTheme } from '@react-navigation/native';
import { PreferencesContext } from '../../utils/PreferencesContext';

const UserForm = React.lazy(() => import('../../components/Menu/UserForm'));
const UserInfoItems = React.lazy(
	() => import('../../components/Menu/UserInfoItems')
);

const { height } = Dimensions.get('screen');

const UserInfoScreen = () => {
	const { profileItems } = useFetchUserDataItems();
	const { isLoading } = useContext(AppContext);

	const theme = useTheme();
	const { isThemeDark } = useContext(PreferencesContext);

	const Form = useCallback(({ item }) => {
		return <UserForm item={item} />;
	}, []);

	const UserItems = useCallback(() => {
		return <UserInfoItems />;
	}, []);

	return (
		<View
			style={[
				{
					height,
					display: 'flex',
					flexDirection: 'column',
					width: '100%'
				},
				{ backgroundColor: theme.colors.first }
			]}>
			<View
				style={[
					{
						paddingHorizontal: 20,
						display: 'flex',
						borderBottomLeftRadius: 20,
						borderBottomRightRadius: 20,
						paddingVertical: 20
					},
					{
						backgroundColor: isThemeDark
							? theme.colors.gray800
							: theme.colors.fullWhite
					}
				]}>
				<UserItems />
			</View>
			<View
				style={[
					{
						display: 'flex',
						flex: 1,
						marginTop: 30,
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20
					},
					{
						backgroundColor: isThemeDark
							? theme.colors.gray800
							: theme.colors.fullWhite
					}
				]}>
				<FlashList
					contentContainerStyle={{ paddingBottom: 10 }}
					data={profileItems}
					renderItem={Form}
					estimatedItemSize={376}
				/>
			</View>
			{isLoading ? (
				<>
					<BlurView
						style={styles.absolute}
						blurType='light'
						blurAmount={1}>
						<ActivityIndicator
							size='large'
							color='#1E1E1F'
							style={{ backgroundColor: '#F7F7F710' }}
						/>
					</BlurView>
				</>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	absolute: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	}
});
export default UserInfoScreen;
