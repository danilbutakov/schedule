import { View, Image } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

const Avatar = ({ size, user }) => {
	console.log(user.photoURL);
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
				<View
					style={{
						backgroundColor: '#1E1E1F',
						borderRadius: size,
						width: size,
						height: size,
						alignItems: 'center',
						justifyContent: 'center'
					}}>
					<Feather
						size={size - 20}
						name='user'
						color={'#81F2DE'}
						borderRadius={size}
					/>
				</View>
			)}
		</View>
	);
};

export default Avatar;
