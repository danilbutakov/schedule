import {
	ActivityIndicator,
	Text,
	TouchableOpacity,
	View,
	StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import { fs } from '../../../firebase';
import Avatar from './Avatar';
import { BlurView } from '@react-native-community/blur';
import useFetchUserData from '../../hooks/useFetchUserData';

const ContactItem = ({ user }) => {
	const navigation = useNavigation();
	const date = new Date();
	const currentUser = auth().currentUser;
	const [isLoading, setIsLoading] = useState(false);
	const { userData } = useFetchUserData();

	const handleSelect = async (user: {
		uid: string | number;
		displayName: string;
		profileName: string;
		photoURL: string;
	}) => {
		// создаем комбо id двух юзеров в чате
		const combinedId =
			currentUser.uid > user.uid
				? currentUser.uid + user.uid
				: user.uid + currentUser.uid;
		try {
			const res = await getDoc(doc(fs, 'chats', combinedId));
			const chat = res.data();

			//создаем чаты юзеров
			if (!res.exists()) {
				setIsLoading(true);
				//создаем чат в коллекции чатов
				await setDoc(doc(fs, 'chats', combinedId), {
					messages: [],
					uids: [currentUser.uid, user.uid],
					names: [user.profileName, userData?.profileName],
					photos: [user.photoURL, currentUser.photoURL],
					date: serverTimestamp(),
					combinedId: combinedId
				});

				const res = await getDoc(doc(fs, 'chats', combinedId));
				const chat = res.data();

				// @ts-ignore
				navigation.navigate('Chat', { chat, userB: user });
			} else {
				// @ts-ignore
				navigation.navigate('Chat', { chat, userB: user });
			}
		} catch (error) {
			setIsLoading(false);
			console.log(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Animatable.View
				style={{
					paddingVertical: 10,
					borderRadius: 20,
					marginBottom: 20,
					flex: 1
				}}
				animation='fadeIn'
				duration={1000}
				useNativeDriver>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						flex: 1
					}}>
					<TouchableOpacity
						onPress={() =>
							// @ts-ignore
							navigation.navigate('ContactInfo', { user })
						}
						style={{
							display: 'flex',
							flexDirection: 'row',
							flex: 1
						}}>
						<Avatar user={user} size={50} />
						<View style={{ flex: 1 }}>
							<Text
								style={{
									fontFamily: 'Montserrat-Bold',
									fontSize: 14,
									marginBottom: 5
								}}>
								{user.profileName || user.displayName}
							</Text>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									flex: 1
								}}>
								<Text
									ellipsizeMode='tail'
									numberOfLines={1}
									style={{
										fontFamily: 'Montserrat-Regular',
										color: '#8E8E93',
										fontSize: 14,
										flex: 3.5,
										paddingRight: 10
									}}>
									{user.univ}, {user.group}
								</Text>
								<Text
									style={{
										fontFamily: 'Montserrat-Regular',
										color: '#b3b3b3',
										fontSize: 13,
										marginBottom: 5,
										flex: 1
									}}>
									{date.getHours()}:{date.getMinutes()}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => handleSelect(user)}>
						<Ionicons
							size={35}
							name='md-chatbubbles-sharp'
							color={'#3eb59f'}
						/>
					</TouchableOpacity>
				</View>
			</Animatable.View>
			{isLoading ? (
				<>
					<BlurView
						style={styles.absolute}
						blurType='light'
						blurAmount={3}
					/>
					<ActivityIndicator
						size='large'
						color='#1E1E1F'
						style={{ backgroundColor: '#F7F7F7' }}
					/>
				</>
			) : null}
		</>
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

export default ContactItem;
