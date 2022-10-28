import React, { useState, useEffect } from 'react';
import { Route, useLocation, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { v4 as uuid } from 'uuid';

import AppContext from './Context';

import LoadingPage from './components/LoadingPage/LoadingPage';
import OnBoard from './components/OnBoard/OnBoard';
import './styles/index.scss';
import './index.css';
import Menu from './components/Menu/Menu';
import { LoginContainer } from './components/Login/LoginContainer';
import Home from './pages/Home';
import Search from './components/Search/Search';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDxldqcf9v0t7MVSZDkSkU-YidtRaYojPI',
	authDomain: 'schedule-dc1ed.firebaseapp.com',
	databaseURL:
		'https://schedule-dc1ed-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'schedule-dc1ed',
	storageBucket: 'schedule-dc1ed.appspot.com',
	messagingSenderId: '189433836505',
	appId: '1:189433836505:web:04d0b9865200bdc2619fc8',
	measurementId: 'G-4RHMTFPCDR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
	const AnimatedSwitch = () => {
		const location = useLocation();
		const [searchValue, setSearchValue] = React.useState('');
		const [notes, setNotes] = useState([]);
		const [showInfo, setShowInfo] = useState(false);
		const [showSchedule, setShowSchedule] = useState(true);
		const [showError, setShowError] = useState(true);
		const [showCalendar, setShowCalendar] = useState(false);
		const [pairActive, setPair] = useState();

		const onChangeSearchInput = (event) => {
			setSearchValue(event.target.value);
		};

		// add new note to the state array
		const addNote = () => {
			setNotes((prevState) => [
				...prevState,
				{
					id: uuid(),
					text: searchValue,
				},
			]);
			//clear the input
			setSearchValue('');
		};

		//delete note function
		const deleteNote = (id) => {
			const filteredNotes = notes.filter((note) => note.id !== id);
			setNotes(filteredNotes);
			console.log(notes);
		};

		//character limit
		const charLimit = 50;
		const charLeft = charLimit - searchValue.length;

		return (
			<AppContext.Provider
				value={{
					addNote,
					notes,
					setNotes,
					deleteNote,
					searchValue,
					onChangeSearchInput,
					charLeft,
					showInfo,
					setShowInfo,
					showSchedule,
					setShowSchedule,
					showError,
					setShowError,
					showCalendar,
					setShowCalendar,
					pairActive,
					setPair,
				}}>
				<TransitionGroup>
					<CSSTransition
						key={location.pathname}
						classNames='page'
						timeout={500}>
						<Routes>
							<Route path='/' element={<LoadingPage />} />
							<Route path='/onBoard' element={<OnBoard />} />
							<Route path='/home' element={<Home />} />
							<Route path={'/login'} element={<LoginContainer />} />
							<Route path={'/search'} element={<Search />} />
							<Route path='/menu' element={<Menu />} />
						</Routes>
					</CSSTransition>
				</TransitionGroup>
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
