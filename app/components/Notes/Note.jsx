import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Delete from '../../../assets/images/delete.svg';
import { deleteFromDatabase, deleteNote } from '../../store/slices/notesSlice';
import { useDispatch } from 'react-redux';

const Note = React.memo(({ note, noteId, index }) => {
	const dispatch = useDispatch();

	const handleDelete = async noteId => {
		try {
			dispatch(deleteNote(noteId));
			dispatch(deleteFromDatabase(noteId));
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<View style={styles.container} key={index}>
			<View style={styles.main}>
				<Text style={styles.text}>{note}</Text>
				<TouchableOpacity
					onPress={() => {
						Alert.alert('Удаление заметки', 'Удалить заметку?', [
							{
								text: 'Отменить',
								style: 'cancel'
							},
							{
								text: 'Удалить',
								onPress: () => {
									handleDelete(noteId);
								}
							}
						]);
					}}>
					<Delete width={20} height={20} />
				</TouchableOpacity>
			</View>
			<View style={styles.downLine}></View>
		</View>
	);
});

export default Note;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1E1E1F'
	},
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
		color: '#F7F7F7',
		paddingVertical: 12,
		flex: 1
	},
	downLine: {
		borderBottomColor: '#F7F7F7',
		borderBottomWidth: 1
	}
});
