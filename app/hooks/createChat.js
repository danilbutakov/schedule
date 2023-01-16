import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	where
} from 'firebase/firestore';
import auth from '@react-native-firebase/auth';

import { fs } from '../../firebase';

async function createChat() {
	const navigation = useNavigation();
	const currentUser = auth().currentUser;

	const [curUser, setCurUser] = useState(null);
	const [usersB, setUsersB] = useState([]);

	const fetchCurrentUser = async () => {
		const q = query(
			collection(fs, 'users'),
			where('email', '==', currentUser.email)
		);

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(doc => {
			setCurUser(doc.data());
		});
	};

	useEffect(() => {
		fetchCurrentUser();
	}, [currentUser]);

	// создаем комбо id двух юзеров в чате
	const combinedId =
		currentUser.uid > user.uid
			? currentUser.uid + user.uid
			: user.uid + currentUser.uid;
	try {
		const res = await getDoc(doc(fs, 'chats', combinedId));

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

		const chat = res.data();
		const chatUserUid = await chat?.uids.filter(
			uid => uid !== currentUser?.uid
		);

		const filteredUser = await usersB?.find(
			user => user.uid === `${chatUserUid}`
		);

		//создаем чаты юзеров
		if (!res.exists()) {
			//создаем чат в коллекции чатов
			await setDoc(doc(fs, 'chats', combinedId), {
				messages: [],
				uids: [currentUser.uid, user.uid],
				names: [user.displayName || user.profileName, curUser.profileName],
				photos: [user.photoURL, currentUser.photoURL],
				date: serverTimestamp(),
				combinedId: combinedId
			}).then(async () => {
				const res = await getDoc(doc(fs, 'chats', combinedId));

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

				const chat = res.data();
				const chatUserUid = await chat.uids.filter(
					uid => uid !== currentUser?.uid
				);

				const filteredUser = await usersB.find(
					user => user.uid === `${chatUserUid}`
				);
				navigation.navigate('Chat', { chat, userB: filteredUser });
			});
		} else {
			navigation.navigate('Chat', { chat, userB: filteredUser });
		}
	} catch (error) {
		console.log(error);
	}
}

export default createChat;
