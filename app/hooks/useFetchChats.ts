import React, { useEffect, useState } from 'react';
import {
	collection,
	getDocs,
	onSnapshot,
	query,
	where
} from 'firebase/firestore';
import { fs } from '../../firebase';
import auth from '@react-native-firebase/auth';

export const useFetchChats = userData => {
	const [chats, setChats] = useState([]);
	const [usersB, setUsersB] = useState([]);
	const [chatsFiltered, setChatsFiltered] = useState([]);
	const [usersBPhotos, setUsersBPhotos] = useState([]);
	const [usersBNames, setUsersBNames] = useState([]);

	const currentUser = auth().currentUser;

	const fetchChats = async () => {
		try {
			const q1 = query(
				collection(fs, 'users'),
				where('email', '!=', currentUser.email)
			);
			await getDocs(q1).then(snapshot => {
				const newData = snapshot.docs.map(doc => ({
					...doc.data()
				}));
				setUsersB(newData);
			});

			const q = query(collection(fs, 'chats'));

			const unsub = onSnapshot(q, snapshot => {
				const chatDoc = snapshot.docs.map(doc => ({
					...doc.data()
				}));
				setChats(chatDoc);
			});

			return () => unsub();
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		fetchChats();

		return () => setChats([]);
	}, [currentUser, userData?.profileName]);

	useEffect(() => {
		let fChats = chats.filter(c => c.uids.includes(currentUser.uid));
		if (fChats.length) {
			setChatsFiltered(fChats);
			const usersBUids = fChats.map(c =>
				c.uids.filter(d => d !== currentUser.uid)
			);

			const str2 = usersBUids.map(r => r.join(''));
			const str = usersB.filter(b => str2.includes(b.uid));
			const photos = str.map(s => s.photoURL);
			setUsersBPhotos(photos);
			const names = str.map(s => s.profileName);
			setUsersBNames(names);
		} else {
			setChatsFiltered([]);
		}

		return () => setChatsFiltered([]);
	}, [chats]);

	return {
		chats,
		setChats,
		usersB,
		chatsFiltered,
		usersBPhotos,
		usersBNames
	};
};
