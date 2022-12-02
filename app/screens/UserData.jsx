import React, { useState } from 'react';
import VuzInfo from '../components/userInfo/VuzInfo';
import GroupInfo from '../components/userInfo/GroupInfo';
import RoleInfo from '../components/userInfo/RoleInfo';

const UserData = () => {
	const [showUniv, setShowUniv] = useState(true);
	const [showGroup, setShowGroup] = useState(false);
	const [showRole, setShowRole] = useState(false);

	const [univ, setUniv] = useState('');
	const [group, setGroup] = useState('');
	const [role, setRole] = useState('');

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
					setShowGroup={setShowGroup}
					setShowRole={setShowRole}
				/>
			)}
			{showRole && (
				<RoleInfo
					univ={univ}
					group={group}
					setShowGroup={setShowGroup}
					setShowRole={setShowRole}
					role={role}
					setRole={setRole}
				/>
			)}
		</>
	);
};

export default UserData;
