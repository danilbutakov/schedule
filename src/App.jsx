import React, { useState } from 'react';
import { Route, useLocation, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import LoadingPage from './components/LoadingPage/LoadingPage';
import OnBoard from './components/OnBoard/OnBoard';
import Schedule from './components/Schedule/Schedule';
import ScheduleInfo from './components/ScheduleInfo/ScheduleInfo';
import './styles/index.scss';
import './index.css';
import Menu from './components/Menu/Menu';
import { LoginContainer } from './components/Login/LoginContainer';
import Home from './pages/Home';
import Search from './components/Search/Search';

function App() {
	const AnimatedSwitch = () => {
		const location = useLocation();
		console.log('location', location.pathname);
		const [searchValue, setSearchValue] = React.useState({ text: '' });
		const [notes, setNotes] = useState([]);

		const onChangeSearchInput = (event) => {
			const value = event.target.value;
			setSearchValue({ ...searchValue, value });
		};

		const addNote = () => {
			setNotes((prev) => [...prev, searchValue]);
			setSearchValue({ text: '' });
		};

		console.log(searchValue);
		console.log(notes);

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
									notes={notes}
									setNotes={setNotes}
									addNote={addNote}
									onChangeSearchInput={onChangeSearchInput}
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
