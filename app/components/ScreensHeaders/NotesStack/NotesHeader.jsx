import { Text, View } from 'react-native';
import React from 'react';

const NotesHeader = ({ width }) => {
	return (
		<View
			style={{
				backgroundColor: '#1E1E1F'
			}}>
			<Text
				style={{
					fontFamily: 'Montserrat-SemiBold',
					fontSize: 20,
					lineHeight: 25,
					alignSelf: 'center',
					color: '#F7F7F7',
					borderBottomColor: 'rgba(60, 60, 67, 0.13)',
					borderBottomWidth: 1,
					width,
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'center',
					textAlign: 'left',
					marginTop: 10,
					marginBottom: 5,
					paddingBottom: 10,
					paddingLeft: 20
				}}>
				Заметки
			</Text>
		</View>
	);
};

export default NotesHeader;
