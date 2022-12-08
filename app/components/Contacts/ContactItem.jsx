import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import {
	addDoc,
	collection,
	doc,
	onSnapshot,
	setDoc,
	updateDoc,
	query,
	getDocs
} from 'firebase/firestore';

import { fs } from '../../../firebase';
import Avatar from './Avatar';

const randomId = nanoid();

const ContactItem = ({ user, room, image, type }) => {
	const navigation = useNavigation();
	const [roomId, setRoomId] = useState('');
	const [userRoom, setUserRoom] = useState([]);

	useEffect(() => {
		if (room) {
			setRoomId(room.id);
		}
		if (!room) {
			setRoomId(randomId);
		}
	}, [room, user, roomId]);

	useEffect(() => {
		(async () => {
			const q = query(collection(fs, 'rooms'));

			await getDocs(q).then(snapshot => {
				const newData = snapshot.docs.map(doc => ({
					...doc.data()
				}));

				// console.log(newData);
				setUserRoom(newData);
			});
		})();
	}, [user]);

	console.log(user);

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate('Chat', { user, room, image, roomId })}
			style={{
				paddingVertical: 10,
				borderRadius: 20,
				marginBottom: 20
			}}>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center'
					}}>
					<Avatar user={user} size={type === 'contacts' ? 80 : 60} />
					<View>
						<Text
							style={{
								fontFamily: 'Montserrat-Bold',
								fontSize: 16,
								marginBottom: 5
							}}>
							{user.profileName || user.displayName}
						</Text>
						<Text
							style={{
								fontFamily: 'Montserrat-Regular',
								color: '#8E8E93',
								fontSize: 14,
								marginBottom: 5
							}}>
							{user.email}
						</Text>
						<Text
							style={{
								fontFamily: 'Montserrat-Regular',
								color: '#81F2DE',
								fontSize: 14
							}}>
							Написать сообщение
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ContactItem;
