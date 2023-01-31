import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { images } from '../../../assets/globalImages';
import Avatar from './AvatarChat';
import auth from '@react-native-firebase/auth';

const ChatHeader = () => {
	const navigation = useNavigation();
	const currentUser = auth().currentUser;
	const route = useRoute();
	const [image, setImage] = useState(null);
	console.log(route.params.userB);

	return (
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
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Image
					source={images.arrowLeft}
					style={{
						width: 10,
						height: 20,
						marginRight: 5
					}}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() =>
					navigation.navigate('ContactInfo', {
						user: route.params.userB
					})
				}>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						marginLeft: 20,
						alignItems: 'center'
					}}>
					<Avatar
						size={40}
						image={String(route.params.userB.photoURL)}
					/>
					<Text
						style={{
							fontFamily: 'Montserrat-SemiBold',
							fontSize: 19,
							lineHeight: 25,
							color: '1E1E1F'
						}}>
						{route.params.userB?.profileName ||
							route.params.userB?.displayName}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default ChatHeader;
