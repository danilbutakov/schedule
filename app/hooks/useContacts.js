import React, { useState, useEffect, useContext } from 'react';
import { query, collection, where, getDocs } from 'firebase/firestore';

import { fs } from '../../firebase';
import AppContext from '../utils/Context';

// export const useContacts = () => {
// 	const { contactUser, setContactUser } = useContext(AppContext);
// 	useEffect(() => {
// 		(async () => {
// 			const q = query(
// 				collection(fs, 'users'),
// 				where('email', '!=', contactUser.email)
// 			);
// 			const unsubscribe = onSnapshot(q, snapshot => {
// 				if (snapshot.docs.length) {
// 					const userDoc = snapshot.docs[0].data();
// 					setContactUser(prevUser => [{ ...prevUser, userDoc }]);
// 				}
// 			});
// 			return () => unsubscribe();
// 		})();
// 	}, []);
// 	return contactUser;
// };
