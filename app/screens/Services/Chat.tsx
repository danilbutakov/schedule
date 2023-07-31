import 'react-native-get-random-values';
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';
import React, { useContext, useState } from 'react';
import { useRoute, useTheme } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Feather from 'react-native-vector-icons/Feather';

import { fs } from '../../../firebase';
import { pickImage, uploadImage } from '../../utils/Functions';
import useAuth from '../../hooks/useAuth';
import { PreferencesContext } from '../../utils/PreferencesContext';

const Chat = () => {
	const route = useRoute();
	// @ts-ignore
	const chat = route.params.chat;
	// @ts-ignore
	const { user } = useAuth();
	const [message, setMessage] = useState('');
	const [image, setImage] = useState(null);
	const [isEdit, setIsEdit] = useState(false);

	const theme = useTheme();
	const { isThemeDark } = useContext(PreferencesContext);

	const combinedId = chat.combinedId;

	const query = collection(fs, `messages/${combinedId}/children`);
	const [docs, loading, error] = useCollectionData(query);

	const sendMessage = async () => {
		try {
			setMessage('');
			const time = new Date()
				.toLocaleTimeString()
				.replace(/(.*)\D\d+/, '$1');
			const date = new Date().toLocaleDateString('en-GB');
			const timeId = new Date().getTime();

			const docRef = doc(fs, `messages/${combinedId}/children/${timeId}`);

			await setDoc(docRef, {
				message: message,
				date: date,
				time: time,
				senderId: user.uid,
				messageId: timeId
			});
			if (image !== null) {
				let photoUrl;
				const { url } = await uploadImage(
					image,
					`images/${combinedId}`,
					`picture.${user.uid}`
				);
				photoUrl = url;
				if (photoUrl) {
					setImage(photoUrl);
				}
			}
			setImage(null);
		} catch (e) {
			console.log(e.message);
		}
	};

	const handleEditMessage = async (text, fullTime) => {
		const docRef = doc(fs, `messages/${combinedId}/children/${fullTime}`);
		await updateDoc(docRef, {
			message: message
		});
	};

	const handleProfilePicture = async () => {
		const result = await pickImage();
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const renderItem = ({ item }) => {
		return (
			<Pressable
				style={[
					styles.message,
					{
						backgroundColor:
							item.senderId === user.uid
								? theme.colors.green
								: theme.colors.gray800,
						alignSelf:
							item.senderId === user.uid
								? 'flex-end'
								: 'flex-start'
					}
				]}>
				{item.images && (
					<Image source={{ uri: item.image }} style={styles.image} />
				)}

				<Text style={[styles.messageText]}>{item.message}</Text>
				<Text style={styles.messageTime}>{item.time}</Text>
			</Pressable>
		);
	};

	return (
		<View
			style={[styles.container, { backgroundColor: theme.colors.first }]}>
			<View style={styles.messages}>
				<FlashList
					renderItem={renderItem}
					data={docs}
					estimatedItemSize={100}
				/>
			</View>
			<View
				style={[
					styles.downLine,
					{ borderBottomColor: theme.colors.gray500 }
				]}
			/>
			<View
				style={[
					styles.inputContainer,
					{ backgroundColor: theme.colors.first }
				]}>
				{image && (
					<Image source={{ uri: image }} style={styles.image} />
				)}
				<Feather
					name='paperclip'
					size={25}
					style={{ color: theme.colors.gray600 }}
					onPress={() => handleProfilePicture()}
				/>
				<TextInput
					value={message}
					onChangeText={setMessage}
					placeholder={'Сообщение'}
					style={[styles.input, { color: theme.colors.tertiary }]}
					placeholderTextColor={theme.colors.gray600}
					multiline={true}
					numberOfLines={1}
				/>
				{message.length >= 1 && (
					<Feather
						name='send'
						size={25}
						style={{ color: theme.colors.gray600 }}
						onPress={() => sendMessage()}
					/>
				)}
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
		padding: 10,
		flexDirection: 'column'
	},
	message: {
		marginBottom: 10,
		borderRadius: 16,
		paddingHorizontal: 10,
		paddingTop: 10,
		maxWidth: '90%'
	},
	messageText: {
		fontSize: 17,
		fontFamily: 'Montserrat-Medium',
		color: 'white'
	},
	messageTime: {
		fontSize: 11,
		fontFamily: 'Montserrat-Medium',
		color: '#d9d9d9',
		alignSelf: 'flex-end',
		paddingTop: 5
	},
	image: {
		width: 50,
		height: 50
	},
	inputContainer: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		flex: 1,
		padding: 5,
		fontSize: 16,
		marginLeft: 10,
		fontFamily: 'Montserrat-Medium'
	},
	downLine: {
		borderBottomWidth: 1
	}
});

export default Chat;
