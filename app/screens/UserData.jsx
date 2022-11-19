import { View, Dimensions } from 'react-native';
import React, { useState, useCallback } from 'react';
import VuzInfo from '../components/userInfo/VuzInfo';
import GroupInfo from '../components/userInfo/GroupInfo';

const UserData = () => {
	const [showUniv, setShowUniv] = useState(true);
	const [showGroup, setShowGroup] = useState(false);

	const [univ, setUniv] = useState('');
	const [group, setGroup] = useState('');

	return (
		<>
			{showUniv && (
				<VuzInfo
					univ={univ}
					setUniv={setUniv}
					setShowUniv={setShowUniv}
					setShowGroup={setShowGroup}
				/>
			)}
			{showGroup && (
				<GroupInfo
					group={group}
					setGroup={setGroup}
					univ={univ}
					setUniv={setUniv}
					setShowGroup={setShowGroup}
				/>
			)}
		</>
	);
};

export default UserData;
