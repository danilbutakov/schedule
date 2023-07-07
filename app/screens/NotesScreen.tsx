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
		<View style={{ backgroundColor: '#F7F7F7', height: '100%' }}>
			{showNotes ? (
				<ScrollView>
					<Text
						style={{
							fontFamily: 'Montserrat-SemiBold',
							fontSize: 15,
							lineHeight: 20,
							marginTop: 20,
							paddingHorizontal: 20
						}}>
						В разработке
					</Text>
				</ScrollView>
			) : (
				<Text>Заметок нет</Text>
			)}
		</View>
	);
};

export default NotesScreen;
