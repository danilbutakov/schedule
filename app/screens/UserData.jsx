import { View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import VuzInfo from '../components/userInfo/VuzInfo';
import GroupInfo from '../components/userInfo/GroupInfo';

const { height, width } = Dimensions.get('screen');

const UserData = () => {
	const [showUniv, setShowUniv] = useState(true);
	const [showGroup, setShowGroup] = useState(false);

	const [univ, setUniv] = useState('');
	const [group, setGroup] = useState('');

	return (
		<View style={{ width, height }}>
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
		</View>
	);
};

export default UserData;
