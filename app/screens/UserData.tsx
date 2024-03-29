import React, { useState } from 'react';
import VuzInfo from '../components/UserInfo/VuzInfo';
import GroupInfo from '../components/UserInfo/GroupInfo';
import RoleInfo from '../components/UserInfo/RoleInfo';
import ProfileLogoInfo from '../components/UserInfo/ProfileLogoInfo';
import { useFetchUserData } from '../hooks/useFetchUserData';
import IsLoading from './IsLoading';

const UserData = () => {
	const { isLoading, userData } = useFetchUserData();

	const [showUniv, setShowUniv] = useState(true);
	const [showGroup, setShowGroup] = useState(false);
	const [showRole, setShowRole] = useState(false);
	const [showProfileLogo, setShowProfileLogo] = useState(false);

	const [univ, setUniv] = useState('');
	const [group, setGroup] = useState('');
	const [role, setRole] = useState('');
	const [profileName, setProfileName] = useState('');

	const isVuzInfo = userData === null && isLoading === false && showUniv;

	return (
		<>
			{isLoading && <IsLoading />}
			{isVuzInfo && (
				<VuzInfo
					setShowUniv={setShowUniv}
					univ={univ}
					setUniv={setUniv}
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
					role={role}
					setRole={setRole}
					setShowRole={setShowRole}
					setShowProfileLogo={setShowProfileLogo}
				/>
			)}
			{showProfileLogo && (
				<ProfileLogoInfo
					univ={univ}
					group={group}
					role={role}
					profileName={profileName}
					setProfileName={setProfileName}
				/>
			)}
		</>
	);
};

export default UserData;
