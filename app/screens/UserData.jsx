import React, { useState } from 'react';
import VuzInfo from '../components/UserInfo/VuzInfo';
import GroupInfo from '../components/UserInfo/GroupInfo';
import RoleInfo from '../components/UserInfo/RoleInfo';
import ProfileLogoInfo from '../components/UserInfo/ProfileLogoInfo';

const UserData = () => {
	const [showUniv, setShowUniv] = useState(true);
	const [showGroup, setShowGroup] = useState(false);
	const [showRole, setShowRole] = useState(false);
	const [showProfileLogo, setShowProfileLogo] = useState(false);

	const [univ, setUniv] = useState('');
	const [group, setGroup] = useState('');
	const [role, setRole] = useState('');
	const [profileName, setProfileName] = useState('');
	const [image, setImage] = useState(null);

	return (
		<>
			{showUniv && (
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
