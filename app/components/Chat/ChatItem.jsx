import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

import Avatar from '../Contacts/Avatar';
import useAuth from '../../hooks/useAuth';

const ChatItem = ({ chat, type }) => {
	const navigation = useNavigation();
	const [user, setUser] = useState();
	useEffect(() => {
		// setUser(chat[1]);
		console.log(chat[1]);
	}, []);
	return (
		<TouchableOpacity
			// onPress={() => navigation.navigate('Chat', { user, room, image, roomId })}
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
					{/* <Avatar user={user} size={type === 'contacts' ? 60 : 60} /> */}
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<View style={{ flexDirection: 'column' }}>
							<Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>
								{/* {user.displayName} */}
							</Text>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								{/* {description && (
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
											{description}
										</Text>
									</View>
								)} */}
								{/* {time && (
									<View style={{ marginTop: 7, marginLeft: 10 }}>
										<Text
											style={{
												fontFamily: 'Montserrat-Medium',
												color: '#A5A5A5'
											}}>
											{new Date(time.seconds * 1000)
												.toLocaleTimeString()
												.replace(/(.*)\D\d+/, '$1')}
										</Text>
									</View>
								)} */}
							</View>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ChatItem;
