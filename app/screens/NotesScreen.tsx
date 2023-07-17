import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

const NotesScreen = () => {
	const [notes, setNotes] = useState([]);

	const [showNotes, setShowNotes] = useState(false);

	useEffect(() => {
		if (notes.length) {
			setShowNotes(true);
		} else {
			setShowNotes(false);
		}
	}, []);

	return (
		<View style={{ backgroundColor: '#1E1E1F', height: '100%' }}>
			{showNotes ? (
				<ScrollView>
					<Text
						style={{
							fontFamily: 'Montserrat-SemiBold',
							fontSize: 15,
							lineHeight: 20,
							marginTop: 20,
							paddingHorizontal: 20,
							color: '#F7F7F7'
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
						color: '#F7F7F7'
					}}>
					Заметок нет
				</Text>
			)}
		</View>
	);
};

export default NotesScreen;
