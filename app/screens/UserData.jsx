import React, { useEffect, useState } from 'react';
import VuzInfo from '../components/userInfo/VuzInfo';
import GroupInfo from '../components/userInfo/GroupInfo';
import RoleInfo from '../components/userInfo/RoleInfo';
import ProfileLogoInfo from '../components/userInfo/ProfileLogoInfo';
import useFetchUserData from '../hooks/useFetchUserData';

const UserData = () => {
	const [showGroup, setShowGroup] = useState(false);
	const [showRole, setShowRole] = useState(false);
	const [showProfileLogo, setShowProfileLogo] = useState(false);

	const [univ, setUniv] = useState('');
	const [group, setGroup] = useState('');
	const [role, setRole] = useState('');
	const [profileName, setProfileName] = useState('');
	const [image, setImage] = useState(null);

	const { userData } = useFetchUserData();

	return (
		<>
			{userData === null && (
				<VuzInfo
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
					setShowGroup={setShowGroup}
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
					image={image}
					setImage={setImage}
					setShowRole={setShowRole}
					setShowProfileLogo={setShowProfileLogo}
				/>
			)}
		</>
	);
};

export default UserData;
