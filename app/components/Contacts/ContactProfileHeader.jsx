import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';

import { images } from '../../../assets/globalImages';
import Avatar from './Avatar';

const ContactProfileHeader = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const user = route.params.user;
	const currentUser = auth().currentUser;

	return (
		<View>
			<TouchableOpacity
				style={{
					backgroundColor: '#F7F7F7',
					borderBottomColor: 'rgba(60, 60, 67, 0.13)',
					borderBottomWidth: 1,
					marginTop: 10,
					paddingBottom: 10,
					paddingHorizontal: 20,
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
				onPress={() => navigation.goBack()}>
				<View
					style={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'row'
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
						<Avatar size={40} user={user} />
						<Text
							style={{
								fontFamily: 'Montserrat-SemiBold',
								fontSize: 19,
								lineHeight: 25,
								color: '1E1E1F'
							}}>
							{user.profileName || user.displayName}
						</Text>
					</View>
				</View>
				{user.uid === currentUser.uid && (
					<TouchableOpacity
						style={{
							backgroundColor: '#d1d1d1b2',
							padding: 7,
							borderRadius: 50
						}}
						onPress={() => navigation.navigate('UserInfo')}>
						<Entypo name='dots-three-vertical' size={20} />
					</TouchableOpacity>
				)}
			</TouchableOpacity>
		</View>
	);
};

export default ContactProfileHeader;
