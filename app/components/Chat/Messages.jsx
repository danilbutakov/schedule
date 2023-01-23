import { SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Message from './Message';
import { doc, onSnapshot } from 'firebase/firestore';
import { fs } from '../../../firebase';

const Messages = ({ chat }) => {
	const [messages, setMessages] = useState(chat.messages);
	const chatCombinedId = chat.combinedId;

	useEffect(() => {
		onSnapshot(doc(fs, 'chats', chatCombinedId), doc => {
			doc.exists() && setMessages(doc.data());
		});
	}, [chatCombinedId]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				style={{
					backgroundColor: '#ffffff',
					paddingHorizontal: 10
				}}>
				<Message messages={messages?.messages} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Messages;
