import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { useFetchUserData } from '../../hooks/useFetchUserData';
import { useFetchChats } from '../../hooks/useFetchChats';

const Chats = React.lazy(() => import('../../components/Chat/Chats'));

const ChatsScreen = () => {
	const { userData } = useFetchUserData();

	const { chatsFiltered, isLoading } = useFetchChats(userData);

	const renderChats = chatsFiltered.length > 0 && isLoading === false;
	const renderEmptyChats = chatsFiltered.length === 0 && isLoading === false;

	return (
		<Animatable.View
			duration={1000}
			animation={'fadeIn'}
			useNativeDriver
			style={{
				flex: 1,
				paddingTop: 10,
				backgroundColor: '#F7F7F7',
				paddingHorizontal: 10
			}}>
			{isLoading && (
				<View
					style={{
						justifyContent: 'center',
						flex: 1
					}}>
					<ActivityIndicator size={'large'} />
				</View>
			)}
			{renderChats && <Chats />}
			{renderEmptyChats && (
				<View
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%'
					}}>
					<Text
						style={{
							fontFamily: 'Montserrat-SemiBold',
							fontSize: 17
						}}>
						Начните общение с кем нибудь &#128521;
					</Text>
				</View>
			)}
		</Animatable.View>
	);
};

export default ChatsScreen;
