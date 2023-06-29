import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { fs } from '../firebase';

export const handleSelect = async (
	user: { uid: string | number },
	setIsLoading,
	currentUser,
	navigation
) => {
	// создаем комбо id двух юзеров в чате
	const combinedId =
		currentUser.uid > user.uid
			? currentUser.uid + user.uid
			: user.uid + currentUser.uid;
	try {
		const res = await getDoc(doc(fs, 'chats', combinedId));
		const chat = res.data();

		//создаем чаты юзеров
		if (!res.exists()) {
			setIsLoading(true);
			//создаем чат в коллекции чатов
			await setDoc(doc(fs, 'chats', combinedId), {
				uids: [currentUser.uid, user.uid],
				date: serverTimestamp(),
				combinedId: combinedId
			});
			await setDoc(doc(fs, 'messages', combinedId), {
				combinedId: combinedId,
				uids: [currentUser.uid, user.uid]
			});

			const res = await getDoc(doc(fs, 'chats', combinedId));
			const chat = res.data();

			// @ts-ignore
			navigation.navigate('Chat', { chat, userB: user });
		} else {
			// @ts-ignore
			navigation.navigate('Chat', { chat, userB: user });
		}
	} catch (error) {
		setIsLoading(false);
		console.log(error.message);
	} finally {
		setIsLoading(false);
	}
};
