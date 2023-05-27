import React, { useContext, useState } from 'react';
import { View, Text, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { handleUpdateProfile } from '../../utils/Functions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppContext from '../../utils/Context';
import { doc } from 'firebase/firestore';
import { fs } from '../../../firebase';
import { useFetchUserDataItems } from '../../hooks/useFetchDataItems';

const UserInfoItems = ({ user, existsParams, setIsLoading }) => {
	const [newImage, setNewImage] = useState(null);

	const userRef = doc(fs, 'users', user.uid);
	const { profileItems, setImage } = useFetchUserDataItems();

	const { group, univ, userName, setGroup, setUniv, setUserName } =
		useContext(AppContext);
	return (
		<Animatable.View animation='fadeIn' duration={1000} useNativeDriver>
			{profileItems.map((item, key) => {
				if (item.role || item.group || item.univ) {
					return (
						<View
							key={key}
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between'
							}}>
							<View
								style={{
									display: 'flex',
									alignItems: 'center',
									flexDirection: 'row'
								}}>
								<Image
									source={{
										uri: item.photoURL || user.photoURL
									}}
									style={{
										width: 80,
										height: 80,
										borderRadius: 80
									}}
								/>
								<View
									style={{
										display: 'flex',
										flexDirection: 'column',
										marginLeft: 15
									}}>
									<Text
										style={{
											fontFamily: 'Montserrat-Bold',
											fontSize: 15,
											lineHeight: 20,
											maxWidth: 200
										}}>
										{item.profileName}
									</Text>
									<Text
										style={{
											fontSize: 14,
											lineHeight: 20,
											color: 'rgba(60, 60, 67, 0.6)',
											fontFamily: 'Montserrat-Medium',
											maxWidth: 200
										}}>
										{item.email}
									</Text>
								</View>
							</View>
							{existsParams ? (
								<TouchableOpacity
									style={{
										display: 'flex',
										paddingLeft: 10
									}}
									onPress={() => {
										handleUpdateProfile(
											group,
											univ,
											userName,
											newImage,
											setNewImage,
											setIsLoading,
											userRef,
											user,
											setImage,
											setUserName,
											setUniv,
											setGroup
										);
									}}>
									<AntDesign
										name='checkcircle'
										size={30}
										color={'#3eb59f'}
									/>
								</TouchableOpacity>
							) : (
								<View
									style={{
										display: 'flex',
										paddingLeft: 10
									}}>
									<AntDesign
										name='checkcircle'
										size={30}
										color={'rgba(62, 181, 159, 0.56)'}
									/>
								</View>
							)}
						</View>
					);
				}
			})}
		</Animatable.View>
	);
};

export default UserInfoItems;
