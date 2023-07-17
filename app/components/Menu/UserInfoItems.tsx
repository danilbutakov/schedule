import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { handleUpdateProfile } from '../../utils/Functions';
import { useFetchUserDataItems } from '../../hooks/useFetchDataItems';
import useAuth from '../../hooks/useAuth';
import { useUserInfoItemImage } from '../../hooks/useUserInfoItemImage';
import AppContext from '../../utils/Context';

const UserInfoItems = () => {
	const { profileItems } = useFetchUserDataItems();
	// @ts-ignore
	const { user } = useAuth();

	const {
		group,
		univ,
		userName,
		setGroup,
		setUniv,
		setUserName,
		setIsLoading,
		newImage,
		setNewImage,
		existsParams
	} = useContext(AppContext);
	const { setImage } = useUserInfoItemImage();

	return (
		<Animatable.View animation='fadeIn' duration={1000} useNativeDriver>
			{profileItems?.map((item, key) => {
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
											maxWidth: 200,
											color: '#F7F7F7'
										}}>
										{item.profileName}
									</Text>
									<Text
										style={{
											fontSize: 14,
											lineHeight: 20,
											color: '#979797',
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
									onPress={() =>
										handleUpdateProfile(
											group,
											univ,
											userName,
											user,
											setUserName,
											setUniv,
											setGroup,
											newImage,
											setNewImage,
											setImage,
											setIsLoading
										)
									}>
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

export default React.memo(UserInfoItems);
