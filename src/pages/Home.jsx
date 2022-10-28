import React from 'react';
import Schedule from '../components/Schedule/Schedule';

import styles from './Home.module.scss';

const Home = ({
	notes,
	setNotes,
	onChangeSearchInput,
	addNote,
	searchValue,
	charLeft,
}) => {
	return (
		<div className={styles.homeContainer}>
			<Schedule
				notes={notes}
				setNotes={setNotes}
				addNote={addNote}
				searchValue={searchValue}
				onChangeSearchInput={onChangeSearchInput}
				charLeft={charLeft}
			/>
		</div>
	);
};

export default Home;
