import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { uid } from 'uid';

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
import Auth from './pages/Auth/Auth';

function App() {
	const AnimatedSwitch = () => {
		const location = useLocation();

		const [note, setNote] = useState('');
		const [notes, setNotes] = useState([]);
		const [showCalendar, setShowCalendar] = useState(false);
		const [pairActive, setPair] = useState();

		//read from database
		useEffect(() => {
			onValue(ref(db), (snapshot) => {
				setNotes([]);
				const data = snapshot.val();
				if (data !== null) {
					Object.values(data).map((noteOne) => {
						setNotes((oldArray) => [...oldArray, noteOne]);
					});
				}
			});
		}, []);

		//write to database
		const writeToDataBase = () => {
			const uuid = uid();
			set(ref(db, `/${note}`), {
				note,
				uuid,
			});
			//clear the input
			setNote('');
		};

		// delete from note from database
		const handleDelete = (note) => {
			remove(ref(db, `/${note.note}`));
		};

		const handleNoteChange = (e) => {
			setNote(e.target.value);
		};

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
							{/* <Route path='auth' element={<Auth />} /> */}
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
