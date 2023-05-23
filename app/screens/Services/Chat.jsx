import 'react-native-get-random-values';
import { View, StyleSheet, Text, Image, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { fs } from '../../../firebase';
import {
	arrayUnion,
	collection,
	doc,
	onSnapshot,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where
} from 'firebase/firestore';
import { pickImage, uploadImage } from '../../utils/Functions';
import useAuth from '../../hooks/useAuth';
import useFetchUserData from '../../hooks/useFetchUserData';

const Chat = () => {
	const route = useRoute();
	const chat = route.params.chat;
	const { user } = useAuth();
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [image, setImage] = useState(null);

	const { userData } = useFetchUserData();

	const sendMessage = async () => {
		const curName = userData?.profileName;
		if (!messages) {
			await setDoc(doc(fs, 'messages', chat.combinedId), {
				messages: [{ curName, message }],
				timestamp: serverTimestamp(),
				combinedId: chat.combinedId
			}).then(async () => {
				setMessage('');
				if (image !== null) {
					let photoUrl;
					const { url } = await uploadImage(
						image,
						`images/${chat.combinedId}`,
						`picture.${user.uid}`
					);
					photoUrl = url;
					if (photoUrl) {
						setImage(photoUrl);
					}
				}
				setImage(null);
			});
		} else {
			await updateDoc(doc(fs, 'messages', chat.combinedId), {
				messages: arrayUnion({ curName, message })
			}).then(() => {
				setMessage('');
			});
		}
	};

	const getMessages = async () => {
		const q = query(
			collection(fs, 'messages'),
			where('combinedId', '==', chat.combinedId)
		);
		const unsub = onSnapshot(q, snapshot => {
			const messagesDoc = snapshot.docs.map(doc => ({
				...doc.data()
			}));
			setMessages(messagesDoc);
		});

		return () => unsub();
	};

	useEffect(() => {
		getMessages();
	}, [user]);

	const handleProfilePicture = async () => {
		const result = await pickImage();
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		// <DismissKeyboardView style={{ flex: 1 }}>
		// 	<View style={{ flex: 1, backgroundColor: '#ffffff' }}>
		// 		<Messages chat={chat} />
		// 	</View>
		// 	<InputChat />
		// </DismissKeyboardView>
		<View style={styles.container}>
			<View style={styles.messages}>
				{messages.map((msg, key) => (
					<View key={key} style={styles.message}>
						{msg.images && (
							<Image
								source={{ uri: msg.image }}
								style={styles.image}
							/>
						)}
						<Text style={styles.messageText}>
							{msg.messages.map(m => m.message)}
						</Text>
					</View>
				))}
			</View>
			<View style={styles.inputContainer}>
				{/*{image && (*/}
				{/*	<Image source={{ uri: image }} style={styles.image} />*/}
				{/*)}*/}
				<TextInput
					value={message}
					onChangeText={setMessage}
					placeholder='Type a message...'
					style={styles.input}
				/>
				<Button title='Send' onPress={() => sendMessage()} />
				<Button
					title='Choose Photo'
					onPress={() => handleProfilePicture()}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	messages: {
		flex: 1,
		padding: 10
	},
	message: {
		padding: 10,
		marginBottom: 10,
		flexDirection: 'row'
	},
	messageText: {
		flex: 1,
		fontSize: 16
	},
	image: {
		width: 50,
		height: 50
	},
	inputContainer: {
		padding: 10,
		flexDirection: 'row'
	},
	input: {
		flex: 1,
		padding: 5,
		fontSize: 16
	}
});

export default Chat;
