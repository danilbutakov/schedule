import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import AvatarChat from './AvatarChat';

const ChatItem = ({ chat, image }) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('Chat', { chat });
			}}
			key={key}
			style={{
				backgroundColor: '#FFFFFF',
				borderRadius: 150,
				padding: 5,
				marginBottom: 20
			}}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<AvatarChat
						image={chat.photos.filter(photo => photo !== currentUser.photoURL)}
						size={50}
					/>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<View style={{ flexDirection: 'column' }}>
							<Text
								style={{
									fontFamily: 'Montserrat-SemiBold',
									fontSize: 16
								}}>
								{chat.names.filter(name => name !== curUser.profileName)}
							</Text>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center'
								}}>
								{chat?.lastMessage && (
									<View
										style={{
											flexDirection: 'row',
											marginTop: 7
										}}>
										<Text
											style={{
												fontSize: 14,
												color: '#81F2DF',
												fontFamily: 'Montserrat-Regular'
											}}>
											Вы: {''}
										</Text>
										<Text
											style={{
												fontFamily: 'Montserrat-Regular',
												fontSize: 14,
												maxWidth: 160
											}}
											numberOfLines={1}
											ellipsizeMode='tail'>
											{/* {description} */}
										</Text>
									</View>
								)}
								{chat?.date && (
									<View style={{ marginTop: 7, marginLeft: 10 }}>
										<Text
											style={{
												fontFamily: 'Montserrat-Medium',
												color: '#A5A5A5'
											}}>
											{new Date()
												.toLocaleTimeString()
												.replace(/(.*)\D\d+/, '$1')}
										</Text>
									</View>
								)}
							</View>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ChatItem;
