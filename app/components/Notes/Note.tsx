import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import Delete from '../../../assets/images/delete.svg';
import { deleteFromDatabase, deleteNote } from '../../store/slices/notesSlice';
import { useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';

import Alert from '../AlertDialog';

// @ts-ignore
const Note = React.memo(({ note, noteId, index }) => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const [isOpen, setIsOpen] = useState(false);

	const handleDelete = async noteId => {
		try {
			dispatch(deleteNote(noteId));
			// @ts-ignore
			dispatch(deleteFromDatabase(noteId));
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<View style={{ backgroundColor: theme.colors.first }} key={index}>
			<View style={styles.main}>
				<Text style={[styles.text, { color: theme.colors.tertiary }]}>
					{note}
				</Text>
				<TouchableOpacity
					onPress={() => {
						setIsOpen(!isOpen);
					}}>
					<Delete width={20} height={20} />
				</TouchableOpacity>
				{isOpen && (
					<Alert
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						btnText={'Удалить'}
						header={'Удалить заметку?'}
						anotherFunc={() => handleDelete(noteId)}
					/>
				)}
			</View>
			<View
				style={[
					styles.downLine,
					{ borderBottomColor: theme.colors.secondary }
				]}
			/>
		</View>
	);
});

export default Note;

const styles = StyleSheet.create({
	main: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20
	},
	text: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 14,
		lineHeight: 18,
		paddingVertical: 12,
		flex: 1
	},
	downLine: {
		borderBottomWidth: 1
	}
});
