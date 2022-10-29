import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AnimationLayout from './animations/AnimationLayout';

const Main = () => {
	const location = useLocation();

	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === '/') {
			navigate('loadingPage');
		}
	}, []);

	return (
		<AnimationLayout>
			<div>
				<Outlet />
			</div>
		</AnimationLayout>
	);
};

export default Main;
