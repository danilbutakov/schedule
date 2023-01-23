import 'react-native-get-random-values';
import { View } from 'react-native';
import React, { useState } from 'react';
import Messages from '../../components/Chat/Messages';
import InputChat from '../../components/Chat/InputChat';
import { DismissKeyboardView } from '../../hooks/HideKeyBoard';
import { useRoute } from '@react-navigation/native';

const Chat = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedImageView, setSelectedImageView] = useState('');

	const route = useRoute();
	const chat = route.params.chat;
	return (
		<DismissKeyboardView style={{ flex: 1 }}>
			<View style={{ flex: 1, backgroundColor: '#ffffff' }}>
				<Messages chat={chat} />
			</View>
			<InputChat />
		</DismissKeyboardView>
	);
};

export default Chat;
