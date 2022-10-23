import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import LoadingPage from './components/LoadingPage/LoadingPage';
import OnBoard from './components/OnBoard/OnBoard';
import Login from './components/Login/Login';
import Schedule from './components/Schedule/Schedule';
import ScheduleInfo from './components/ScheduleInfo/ScheduleInfo';
import './index.css';
import styles from './index.scss';

function App() {
	const location = useLocation();
	const [displayLocation, setDisplayLocation] = useState(location);
	const [showComponent, setShowComponent] = useState();
	const [transitionStage, setTransistionStage] = useState('fadeIn');

	useEffect(() => {
		if (location.pathname !== displayLocation.pathname)
			setTransistionStage('fadeOut');
		console.log(location);
	}, [location.pathname, displayLocation.pathname]);

	return (
		<div className='App'>
			<div
				className={`${transitionStage}`}
				onAnimationEnd={() => {
					if (transitionStage === 'fadeOut') {
						setTransistionStage('fadeIn');
						setDisplayLocation(location);
					}
				}}>
				<Routes>
					<Route path='/' element={<LoadingPage />} />
					<Route path='/onBoard' element={<OnBoard />} />
					<Route path='/onBoardLogin' element={<Login />} />
					<Route path='/schedule' element={<Schedule />} />
					<Route path='/scheduleInfo:id' element={<ScheduleInfo />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
