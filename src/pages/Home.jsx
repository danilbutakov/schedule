import React, { useState } from 'react';
import Schedule from '../components/Schedule/Schedule';
import AnimationLayout from '../animations/AnimationLayout';

import styles from './Home.module.scss';
import Menu from '../components/Menu/Menu';
import ScheduleNavBar from '../components/NavBar/ScheduleNavBar';
import { AnimatePresence } from 'framer-motion';

const Home = () => {
	const [showHome, setShowHome] = useState(true);
	const [showSchedule, setShowSchedule] = useState(true);
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className={styles.homeContainer}>
			{showHome && (
				<AnimationLayout>
					{showSchedule && <Schedule />}
					{showMenu && <Menu />}
				</AnimationLayout>
			)}
			<ScheduleNavBar
				setShowSchedule={setShowSchedule}
				setShowMenu={setShowMenu}
				showMenu={showMenu}
				showSchedule={showSchedule}
			/>
		</div>
	);
};

export default Home;
