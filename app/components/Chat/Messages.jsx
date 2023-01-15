import { SafeAreaView, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Message from './Message';
import { ChatContext } from '../../utils/ChatContext';
import {
	collection,
	doc,
	getDocs,
	onSnapshot,
	query,
	where
} from 'firebase/firestore';
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
