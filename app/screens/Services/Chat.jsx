// @refresh reset
import 'react-native-get-random-values';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
	addDoc,
	collection,
	doc,
	onSnapshot,
	setDoc,
	updateDoc
} from 'firebase/firestore';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageView from 'react-native-image-viewing';

import { fs } from '../../../firebase';
import { pickImage, uploadImage } from '../../utils/Functions';

const Chat = () => {
	// const [roomHash, setRoomHash] = useState('');
	// const [messages, setMessages] = useState([]);
	// const [modalVisible, setModalVisible] = useState(false);
	// const [selectedImageView, setSelectedImageView] = useState('');

	// const currentUser = auth().currentUser;
	// const route = useRoute();
	// const room = route.params.room;
	// const selectedImage = route.params.image;
	// const userB = route.params.user;

	// const senderUser = currentUser.photoURL
	// ? {
	// 			name: currentUser.displayName,
	// 			_id: currentUser.uid,
	// 			avatar: currentUser.photoURL
	// 	  }
	// 	: { name: currentUser.displayName, _id: currentUser, uid };

	// const roomId = room === undefined ? randomId : room.id;

	// const roomRef = doc(fs, 'rooms', roomId);

	// const roomMessagesRef = collection(fs, 'rooms', roomId, 'messages');

	// useEffect(() => {
	// 	(async () => {
	// 		if (room === undefined) {
	// 			const currentUserData = {
	// 				displayName: currentUser.displayName,
	// 				email: currentUser.email
	// 			};
	// 			if (currentUser.photoURL) {
	// 				currentUserData.photoURL = currentUser.photoURL;
	// 			}
	// 			const userBData = {
	// 				displayName: userB.profileName || userB.displayName || '',
	// 				email: userB.email
	// 			};
	// 			if (userB.photoURL) {
	// 				userBData.photoURL = userB.photoURL;
	// 			}
	// 			const roomData = {
	// 				participants: [currentUserData, userBData],
	// 				participantsArray: [currentUser.email, userB.email]
	// 			};
	// 			try {
	// 				await setDoc(roomRef, roomData);
	// 			} catch (error) {
	// 				console.log(error);
	// 			}
	// 		}
	// 		const emailHash = `${currentUser.email}:${userB.email}`;
	// 		setRoomHash(emailHash);
	// 		if (selectedImage && selectedImage.uri) {
	// 			await sendImage(selectedImage.uri, emailHash);
	// 		}
	// 	})();
	// }, []);

	// useEffect(() => {
	// 	const unsubscribe = onSnapshot(roomMessagesRef, querySnapshot => {
	// 		const messagesFirestore = querySnapshot
	// 			.docChanges()
	// 			.filter(({ type }) => type === 'added')
	// 			.map(({ doc }) => {
	// 				const message = doc.data();
	// 				return { ...message, createdAt: message.createdAt.toDate() };
	// 			})
	// 			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
	// 		appendMessages(messagesFirestore);
	// 	});
	// 	return () => unsubscribe();
	// }, []);

	// const appendMessages = useCallback(
	// 	messages => {
	// 		setMessages(previousMessages =>
	// 			GiftedChat.append(previousMessages, messages)
	// 		);
	// 	},
	// 	[messages]
	// );

	// const onSend = async (messages = []) => {
	// 	const writes = messages.map(m => addDoc(roomMessagesRef, m));
	// 	const lastMessage = messages[messages.length - 1];
	// 	writes.push(updateDoc(roomRef, { lastMessage }));
	// 	await Promise.all(writes);
	// };

	// const sendImage = async (uri, roomPath) => {
	// 	const { url, fileName } = await uploadImage(
	// 		uri,
	// 		`image/rooms/${roomPath || roomHash}`
	// 	);
	// 	const message = {
	// 		_id: fileName,
	// 		text: '',
	// 		createdAt: new Date(),
	// 		user: senderUser,
	// 		image: url
	// 	};
	// 	const lastMessage = { ...message, text: 'Image' };
	// 	await Promise.all([
	// 		addDoc(roomMessagesRef, message),
	// 		updateDoc(roomRef, { lastMessage })
	// 	]);
	// };

	// const handlePhotoPicker = async () => {
	// 	const result = await pickImage();
	// 	if (!result.canceled) {
	// 		await sendImage(result.assets[0].uri);
	// 	}
	// };

	return (
		<View style={styles.chat}>
			<Text>123</Text>
		</View>
	);
};

export default Chat;

const styles = StyleSheet.create({
	chat: {
		flex: 2
	}
});
