import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { FlashList } from '@shopify/flash-list';

import { BlurView } from '@react-native-community/blur';
import { useFetchUserDataItems } from '../../hooks/useFetchDataItems';
import AppContext from '../../utils/Context';

const UserInfoItem = React.lazy(
	() => import('../../components/Menu/UserInfoItem')
);
const UserInfoItems = React.lazy(
	() => import('../../components/Menu/UserInfoItems')
);

const { height } = Dimensions.get('screen');

const UserInfoScreen = () => {
	const { profileItems } = useFetchUserDataItems();
	const { isLoading } = useContext(AppContext);

	const renderItem = useCallback(({ item }) => {
		return <UserInfoItem item={item} />;
	}, []);

	const RenderItems = useCallback(() => {
		return <UserInfoItems />;
	}, []);

	return (
		<View
			style={{
				height,
				backgroundColor: '#1E1E1F',
				display: 'flex',
				flexDirection: 'column',
				width: '100%'
			}}>
			<View
				style={{
					paddingHorizontal: 20,
					display: 'flex',
					backgroundColor: '#4B4B4B',
					borderBottomLeftRadius: 20,
					borderBottomRightRadius: 20,
					paddingVertical: 20
				}}>
				<RenderItems />
			</View>
			<View
				style={{
					display: 'flex',
					flex: 1,
					backgroundColor: '#4B4B4B',
					marginTop: 30,
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20
				}}>
				<FlashList
					contentContainerStyle={{ paddingBottom: 10 }}
					data={profileItems}
					renderItem={renderItem}
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
