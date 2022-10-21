import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { animated, useTransition } from 'react-spring';

import LoadingPage from './components/LoadingPage/LoadingPage';
import OnBoard from './components/OnBoard/OnBoard';
import Schedule from './components/Schedule/Schedule';

function App() {
	const location = useLocation();
	const [displayLocation, setDisplayLocation] = useState(location);
	const [transitionStage, setTransistionStage] = useState('fadeIn');

	useEffect(() => {
		if (location.pathname !== displayLocation.pathname)
			setTransistionStage('fadeOut');
		console.log(location);
	}, [location, displayLocation]);

	return (
		<div
			className={`${transitionStage}`}
			onAnimationEnd={() => {
				if (transitionStage === 'fadeOut') {
					setTransistionStage('fadeIn');
					setDisplayLocation(location);
				}
			}}>
			<Routes location={displayLocation}>
				<Route path='/' element={<LoadingPage />} />
				<Route path='/onBoard' element={<OnBoard />} />
				<Route path='/schedule' element={<Schedule />} />
			</Routes>
		</div>
	);
}

export default App;
