import { View, Text, ScrollView, Button } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';

import useAuth from '../hooks/useAuth';
import AppContext from '../utils/Context';

const NotesScreen = () => {
	const { user } = useAuth();
	const { notesDataScreen } = useContext(AppContext);

	const [showNotes, setShowNotes] = useState();

	useEffect(() => {
		if (notesDataScreen !== []) {
			setShowNotes(true);
		} else {
			setShowNotes(false);
		}
	});

	console.log(notesDataScreen);

	return (
		<View style={{ backgroundColor: '#F7F7F7', height: '100%' }}>
			{showNotes ? (
				<ScrollView>
					{/* {notesDataScreen.map((note1, key) => (
						<View key={key}>
							<Text>{note1.date}</Text>
							<Button title='Press' onPress={() => console.log(note1)} />
						</View>
					))} */}
				</ScrollView>
			) : (
				<Text>Заметок нет</Text>
			)}
		</View>
	);
};

export default NotesScreen;