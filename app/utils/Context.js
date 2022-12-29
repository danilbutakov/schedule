import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
	const { user } = useAuth();
	const [handleClickPair, setHandleClickPair] = useState({});
	const [notes, setNotes] = useState([]);
	const [notesDataScreen, setNotesDataScreen] = useState([]);
	const [contactUser, setContactUser] = useState([]);

	const [userData, setUserData] = useState(null);

	const fetchUserData = () => {
		if (user) {
			const userRef = doc(fs, 'users', user.uid);
			const unsub = onSnapshot(userRef, doc => {
				if (doc.data()) {
					const docData = doc.data().userInfo;
					setUserData(docData);
				} else {
					setUserData(null);
				}
			});
			return unsub;
		}
	};

	useEffect(() => {
		fetchUserData();
	}, [user]);

	return (
		<AppContextProvider.Provider
			value={{
				userData,
				handleClickPair,
				setHandleClickPair,
				notes,
				setNotes,
				notesDataScreen,
				setNotesDataScreen,
				contactUser,
				setContactUser
			}}>
			{children}
		</AppContextProvider.Provider>
	);
};

export default AppContext;
