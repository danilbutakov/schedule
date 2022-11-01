import React, { useState } from 'react';
import Schedule from '../components/Schedule/Schedule';
import AnimationLayout from '../animations/AnimationLayout';

import styles from './Home.module.scss';
import Menu from '../components/Menu/Menu';
import ScheduleNavBar from '../components/NavBar/ScheduleNavBar';
import { AnimatePresence } from 'framer-motion';
import Search from '../components/Search/Search';

const Home = () => {
	const [showHome, setShowHome] = useState(true);
	const [showSchedule, setShowSchedule] = useState(true);
	const [showMenu, setShowMenu] = useState(false);
	const [showSearch, setShowSearch] = useState(false);

	return (
		<AnimatePresence>
			<div className={styles.homeContainer}>
				{showHome && (
					<AnimationLayout>
						{showSchedule && <Schedule />}
						{showMenu && <Menu />}
						{showSearch && <Search />}
					</AnimationLayout>
				)}
				<ScheduleNavBar
					setShowSchedule={setShowSchedule}
					setShowMenu={setShowMenu}
					showMenu={showMenu}
					showSchedule={showSchedule}
					showSearch={showSearch}
					setShowSearch={setShowSearch}
				/>
			</div>
		</AnimatePresence>
	);
};

export default Home;
