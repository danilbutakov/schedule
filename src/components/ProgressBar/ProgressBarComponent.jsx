import React, { useContext } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import AppContext from '../../Context';

import styles from './ProgressBarComponent.module.scss';

const ProgressBarComponent = () => {
	const { charLeft } = useContext(AppContext);

	return (
		<div className={styles.bar}>
			<ProgressBar completed={charLeft} animateOnRender={true} />
		</div>
	);
};

export default ProgressBarComponent;
