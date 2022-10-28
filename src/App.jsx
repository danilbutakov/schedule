import React, { useState, useEffect } from 'react';
import { Route, useLocation, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { v4 as uuid } from 'uuid';

import LoadingPage from './components/LoadingPage/LoadingPage';
import OnBoard from './components/OnBoard/OnBoard';
import './styles/index.scss';
import './index.css';
import Menu from './components/Menu/Menu';
import { LoginContainer } from './components/Login/LoginContainer';
import Home from './pages/Home';
import Search from './components/Search/Search';

function App() {
	const AnimatedSwitch = () => {
		const location = useLocation();
		const [searchValue, setSearchValue] = React.useState('');
		const [notes, setNotes] = useState([]);

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
			//clear the textarea
			setSearchValue('');
		};

		//delete note function
		const deleteNote = (id) => {
			const filteredNotes = notes.filter((note) => note.id !== id);
			setNotes(filteredNotes);
		};

		//character limit
		const charLimit = 100;
		const charLeft = charLimit - searchValue.length;

		return (
			<TransitionGroup>
				<CSSTransition
					key={location.pathname}
					classNames='page'
					timeout={500}>
					<Routes>
						<Route path='/' element={<LoadingPage />} />
						<Route path='/onBoard' element={<OnBoard />} />
						<Route
							path='/home'
							element={
								<Home
									addNote={addNote}
									notes={notes}
									setNotes={setNotes}
									searchValue={searchValue}
									onChangeSearchInput={onChangeSearchInput}
									charLeft={charLeft}
								/>
							}
						/>
						<Route path={'/login'} element={<LoginContainer />} />
						<Route path={'/search'} element={<Search />} />
						<Route path='/menu' element={<Menu />} />
					</Routes>
				</CSSTransition>
			</TransitionGroup>
		);
	};

	return (
		<div className='App'>
			<AnimatedSwitch />
		</div>
	);
}

export default App;
