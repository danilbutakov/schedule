import React, { useState } from 'react';

import styles from './Schedule.module.scss';

const CurrentPair = () => {
	const [showCurrentPair, setShowCurrentPair] = useState();

	const Data = new Date();
	const Hour = Data.getHours();
	const Minutes = Data.getMinutes();

	const currentData = Hour * 60 + Minutes;

	return <div></div>;
};

export default CurrentPair;
