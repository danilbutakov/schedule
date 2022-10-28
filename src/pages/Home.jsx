import React from 'react';
import Schedule from '../components/Schedule/Schedule';

import styles from './Home.module.scss';

const Home = () => {
	return (
		<div className={styles.homeContainer}>
			<Schedule />
		</div>
	);
};

export default Home;
