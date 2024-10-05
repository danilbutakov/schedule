import { View, StyleSheet, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import auth from '@react-native-firebase/auth';
import { FlashList } from '@shopify/flash-list';
import * as Animatable from 'react-native-animatable';

import { fs } from '../../firebase';
import NotesItem from '../components/Notes/NotesItem';

const NotesScreen = () => {
	const currentUser = auth().currentUser;
	const theme = useTheme();
	const [notes, setNotes] = useState([]);

	const getNotes = async () => {
		try {
			let data = [];
			const q = query(
				collection(fs, 'notes'),
				where('userUid', '==', currentUser.uid)
			);

			await getDocs(q).then((snapshot) => {
				data = snapshot.docs.map((doc) => ({
					...doc.data()
				}));
			});

			setNotes(data);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getNotes();
	}, []);

	const onRefreshNotesScreen = () => {
		const [refreshing, setRefreshing] = useState(false);

		const wait = (timeout) => {
			return new Promise((resolve) => setTimeout(resolve, timeout));
		};

		const onRefresh = React.useCallback(() => {
			setRefreshing(true);
			getNotes();
			wait(1000).then(() => setRefreshing(false));
		}, []);

		useEffect(() => {
			getNotes();
		}, [refreshing]);

		return { onRefresh, refreshing };
	};

	const { refreshing, onRefresh } = onRefreshNotesScreen();

	const renderItem = useCallback(
		({ item, index }) => (
			<NotesItem item={item} index={index} getNotes={getNotes} />
		),
		[notes]
	);

	return (
		<Animatable.View animation='fadeIn' duration={1000} useNativeDriver>
			<View
				style={{
					backgroundColor: theme.colors.first,
					height: '100%',
					paddingTop: 10,
					paddingHorizontal: 20
				}}>
				<View style={styles.main}>
					<FlashList
						data={notes}
						renderItem={renderItem}
						estimatedItemSize={200}
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						}
					/>
				</View>
			</View>
		</Animatable.View>
	);
};

export default NotesScreen;

const styles = StyleSheet.create({
	main: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		marginTop: 10
	}
});
