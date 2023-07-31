import { ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';

const NotesScreen = () => {
	const [notes, setNotes] = useState([]);

	const [showNotes, setShowNotes] = useState(false);

	const theme = useTheme();

	useEffect(() => {
		if (notes.length) {
			setShowNotes(true);
		} else {
			setShowNotes(false);
		}
	}, []);

	return (
		<View
			style={{
				backgroundColor: theme.colors.first,
				height: '100%',
				paddingTop: 10
			}}>
			{showNotes ? (
				<ScrollView>
					<Text
						style={{
							fontFamily: 'Montserrat-SemiBold',
							fontSize: 15,
							lineHeight: 20,
							marginTop: 20,
							paddingHorizontal: 20,
							color: theme.colors.tertiary
						}}>
						В разработке
					</Text>
				</ScrollView>
			) : (
				<Text
					style={{
						fontFamily: 'Montserrat-SemiBold',
						fontSize: 15,
						lineHeight: 20,
						paddingHorizontal: 20,
						color: theme.colors.tertiary
					}}>
					Заметок нет
				</Text>
			)}
		</View>
	);
};

export default NotesScreen;
