import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { animated, useTransition } from 'react-spring';

import LoadingPage from './components/LoadingPage/LoadingPage';
import OnBoard from './components/OnBoard/OnBoard';

function App() {
	const location = useLocation();
	const [displayLocation, setDisplayLocation] = useState(location);
	const [transitionStage, setTransistionStage] = useState('fadeIn');

	useEffect(() => {
		if (location !== displayLocation) setTransistionStage('fadeOut');
	}, [location, displayLocation]);

	console.log(location);

	return (
		<div
			className={`${transitionStage}`}
			onAnimationEnd={() => {
				if (transitionStage === 'fadeOut') {
					setTransistionStage('fadeIn');
					setDisplayLocation(location);
				}
			}}>
			<div className='App'>
				<Routes location={displayLocation}>
					<Route path='/' element={<LoadingPage />} />
					<Route path='/onBoard' element={<OnBoard />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
