import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const Message = ({ messages }) => {
	return (
		<>
			{messages?.length > 0 &&
				messages.map((message, key) => (
					<TouchableOpacity key={key} style={styles.messageOwner}>
						<View style={styles.message}>
							<View style={styles.messageInfo}>
								<Text style={styles.infoText}>{message}</Text>
							</View>
							{/*<View style={styles.messageContent}>*/}
							{/*  <Image*/}
							{/*    source={{*/}
							{/*      uri: "https://wegotthiscovered.com/wp-content/uploads/2022/10/makima-chainsaw-man-1.jpg",*/}
							{/*    }}*/}
							{/*    style={styles.contentImg}*/}
							{/*  />*/}
							{/*</View>*/}
							<View style={styles.time}>
								<Text style={styles.timeText}>just now</Text>
							</View>
						</View>
					</TouchableOpacity>
				))}
		</>
	);
};

export default Message;

const styles = StyleSheet.create({
	message: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#e5e5ea',
		marginVertical: 10,
		borderRadius: 10,
		maxWidth: '80%',
		paddingVertical: 10,
		paddingHorizontal: 10
	},
	messageOwner: {
		flexDirection: 'row-reverse'
	},
	messageInfo: {
		display: 'flex',
		flexDirection: 'column',
		marginBottom: 10
	},
	infoText: {
		fontFamily: 'Montserrat-SemiBold',
		color: '#1E1E1F',
		fontSize: 15
	},
	contentImg: {
		borderRadius: 10,
		width: 250,
		height: 250,
		maxWidth: 250,
		maxHeight: 250
	},
	messageContent: {
		display: 'flex',
		flexDirection: 'column'
	},
	time: {
		display: 'flex',
		alignItems: 'flex-end',
		marginTop: 5
	},
	timeText: {
		fontFamily: 'Montserrat-Regular',
		color: '#8E8E93'
	},
	owner: {
		display: 'flex',
		flexDirection: 'row-reverse'
	}
});
