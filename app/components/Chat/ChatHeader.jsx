import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { images } from '../../../assets/globalImages';
import Avatar from '../Contacts/Avatar';

const ChatHeader = () => {
	const navigation = useNavigation();
	const route = useRoute();
	return (
		<TouchableOpacity onPress={() => navigation.navigate('chats')}>
			<View
				style={{
					backgroundColor: '#F7F7F7',
					borderBottomColor: 'rgba(60, 60, 67, 0.13)',
					borderBottomWidth: 1,
					marginTop: 10,
					paddingBottom: 10,
					paddingLeft: 20,
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center'
				}}>
				<Image
					source={images.arrowLeft}
					style={{
						width: 10,
						height: 20
					}}
				/>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						marginLeft: 20,
						alignItems: 'center'
					}}>
					<Avatar size={40} user={route.params.user} />
					<Text
						style={{
							fontFamily: 'Montserrat-SemiBold',
							fontSize: 19,
							lineHeight: 25,
							color: '1E1E1F'
						}}>
						{route.params.user.profileName || route.params.user.displayName}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ChatHeader;
