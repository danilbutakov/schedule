import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { uid } from 'uid';

import { auth } from './firebase';

import { db } from './firebase';
import { set, ref, onValue, remove } from 'firebase/database';

import AppContext from './utils/Context';

import LoadingPage from './components/LoadingPage/LoadingPage';
import OnBoard from './components/OnBoard/OnBoard';
import './styles/index.scss';
import './index.css';
import Menu from './components/Menu/Menu';
import Home from './pages/Home';
import Search from './components/Search/Search';
import Main from './Main';
import Login from './components/Login/Login';

function App() {
	const AnimatedSwitch = () => {
		const location = useLocation();

		//notes states
		const [note, setNote] = useState('');
		const [notes, setNotes] = useState([]);

		//user data states
		const [univ, setUniv] = useState('');
		const [univs, setUnivs] = useState([]);

		const [group, setGroup] = useState('');
		const [groups, setGroups] = useState([]);

		const [showCalendar, setShowCalendar] = useState(false);
		const [pairActive, setPair] = useState();

		console.log(notes);

		//for Notes
		//read from database
		useEffect(() => {
			auth.onAuthStateChanged((user) => {
				if (user) {
					onValue(ref(db, auth.currentUser.uid), (snapshot) => {
						setNotes([]);
						const data = snapshot.val();
						if (data !== null) {
							Object.values(data).map((note) => {
								setNotes((oldArray) => [...oldArray, note]);
							});
						}
					});
				}
			});
		}, []);
		//write to database
		const writeToDataBase = () => {
			const uuid = uid();
			set(ref(db, `/${auth.currentUser.uid}/${uuid}`), {
				note,
				uuid: uuid,
			});
			//clear the input
			setNote('');
		};

		// delete from note from database
		const handleDelete = (uid) => {
			remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
		};

		const handleNoteChange = (e) => {
			setNote(e.target.value);
		};

		//for Data Users

		//write to database
		const writeToDataBaseUniv = () => {
			set(ref(db, `/${auth.currentUser.email}/${univ}`), {
				univ,
			});
			//clear the input
			setUniv('');
		};

		const writeToDataBaseGroup = () => {
			set(ref(db, `/${auth.currentUser.email}/${group}`), {
				group,
			});
			//clear the input
			setGroup('');
		};

		//read from database
		// useEffect(() => {
		// 	auth.onAuthStateChanged((user) => {
		// 		if (user) {
		// 			onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
		// 				setUnivs([]);
		// 				setGroups([]);
		// 				const data = snapshot.val();
		// 				if (data !== null) {
		// 					Object.values(data).map((univ) => {
		// 						setUnivs((oldArray) => [...oldArray, univ]);
		// 					});
		// 					Object.values(data).map((group) => {
		// 						setGroups((oldArray) => [...oldArray, group]);
		// 					});
		// 				}
		// 			});
		// 		}
		// 	});
		// }, []);

		//character limit
		const charLimit = 100;
		const charLeft = charLimit - note.length;

		return (
			<AppContext.Provider
				value={{
					note,
					notes,
					setNote,
					handleNoteChange,
					writeToDataBase,
					handleDelete,
					charLeft,
					showCalendar,
					setShowCalendar,
					pairActive,
					setPair,
					univ,
					setUniv,
					group,
					setGroup,
					writeToDataBaseUniv,
					writeToDataBaseGroup,
					setUnivs,
					setGroups,
				}}>
				<AnimatePresence mode='wait'>
					<Routes>
						<Route
							path='/'
							key={location.pathname}
							location={location}
							element={<Main />}>
							<Route path='loadingPage' element={<LoadingPage />} />
							<Route path='onBoard' element={<OnBoard />} />
							<Route path='login' element={<Login />} />
							<Route path='home' element={<Home />} />
							<Route path='search' element={<Search />} />
							<Route path='menu' element={<Menu />} />
						</Route>
					</Routes>
				</AnimatePresence>
			</AppContext.Provider>
		);
	};

	return (
		<div className='App'>
			<AnimatedSwitch />
		</div>
	);
}

export default App;
