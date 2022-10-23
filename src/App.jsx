import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import LoadingPage from './components/LoadingPage/LoadingPage';
import OnBoard from './components/OnBoard/OnBoard';
import Schedule from './components/Schedule/Schedule';
import ScheduleInfo from './components/ScheduleInfo/ScheduleInfo';
import './index.css';

function App() {
	const location = useLocation();
	const [displayLocation, setDisplayLocation] = useState(location.pathname);
	const [transitionStage, setTransistionStage] = useState('fadeIn');

	const transition = async () => {
		if (location.pathname !== displayLocation.pathname) {
			setTransistionStage('fadeOut');
		}

		console.log(location.pathname);
	};

	useEffect(() => {
		transition();
	}, [location.pathname, displayLocation.pathname]);

	return (
		<div className='App'>
			<div
				className={`${transitionStage}`}
				onAnimationEnd={() => {
					if (transitionStage === 'fadeOut') {
						setTransistionStage('fadeIn');
						setDisplayLocation(location.pathname);
					}
				}}>
				<Routes location={displayLocation.pathname}>
					<Route path='/' element={<LoadingPage />} />
					<Route path='/onBoard' element={<OnBoard />} />
					<Route path='/schedule' element={<Schedule />} />
					<Route path='/scheduleInfo:id' element={<ScheduleInfo />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
