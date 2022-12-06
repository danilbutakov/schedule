import { View, Image } from 'react-native';
import React from 'react';

import StudentAvatar from '../../../assets/images/studentAvatarBlack.svg';

const Avatar = ({ size, user }) => {
	return (
		<View style={{ marginRight: 10 }}>
			{user.photoURL ? (
				<Image
					style={{
						borderRadius: size,
						width: size,
						height: size
					}}
					source={{ uri: user.photoURL }}
					resizeMode='cover'
				/>
			) : (
				<StudentAvatar width={size} height={size} />
			)}
		</View>
	);
};

export default Avatar;
