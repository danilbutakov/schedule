import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

import useAuth from '../hooks/useAuth';

const NotesScreen = () => {
	const [notes, setNotes] = useState([]);
	const { user } = useAuth();

	const [showNotes, setShowNotes] = useState(false);

	useEffect(() => {
		if (notes !== []) {
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
