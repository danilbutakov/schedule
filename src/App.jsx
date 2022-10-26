import React, { useState, useEffect } from 'react';
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

function App() {
	const AnimatedSwitch = () => {
		const location = useLocation();
		console.log('location', location.pathname);
		return (
			<TransitionGroup>
				<CSSTransition
					key={location.pathname}
					classNames='page'
					timeout={500}>
					<Routes>
						<Route path='/' element={<LoadingPage />} />
						<Route path='/onBoard' element={<OnBoard />} />
						<Route path={'/login'} element={<LoginContainer />} />
						<Route path='/schedule' element={<Schedule />} />
						<Route path='/scheduleInfo:id' element={<ScheduleInfo />} />
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
