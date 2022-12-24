import { View, Text } from 'react-native';
import React from 'react';

const ChatItem = ({ chat }) => {
	return (
		<View
			style={{
				paddingVertical: 10,
				borderRadius: 20,
				marginBottom: 20,
				flex: 1
			}}>
			<Text>{chat[1]}</Text>
		</View>
	);
};

export default ChatItem;
