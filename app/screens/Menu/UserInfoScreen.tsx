import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { FlashList } from '@shopify/flash-list';

import useAuth from '../../hooks/useAuth';
import { BlurView } from '@react-native-community/blur';
import { useFetchUserDataItems } from '../../hooks/useFetchDataItems';

const UserInfoItem = React.lazy(
	() => import('../../components/Menu/UserInfoItem')
);
const UserInfoItems = React.lazy(
	() => import('../../components/Menu/UserInfoItems')
);

const { height } = Dimensions.get('screen');

const UserInfoScreen = () => {
	const [existsParams, setExistsParams] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// @ts-ignore
	const { user } = useAuth();
	const { profileItems } = useFetchUserDataItems();

	return (
		<View
			style={{
				height,
				backgroundColor: '#F7F7F7',
				display: 'flex',
				flexDirection: 'column',
				width: '100%'
			}}>
			<View
				style={{
					paddingHorizontal: 20,
					display: 'flex',
					backgroundColor: '#ffffff',
					borderBottomLeftRadius: 20,
					borderBottomRightRadius: 20,
					paddingVertical: 20
				}}>
				<UserInfoItems
					user={user}
					existsParams={existsParams}
					setIsLoading={setIsLoading}
				/>
			</View>
			<View
				style={{
					display: 'flex',
					flex: 1,
					backgroundColor: '#ffffff',
					marginTop: 30,
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20
				}}>
				<FlashList
					contentContainerStyle={{ paddingBottom: 10 }}
					data={profileItems}
					renderItem={({ item }) => (
						<UserInfoItem
							item={item}
							setExistsParams={setExistsParams}
						/>
					)}
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
