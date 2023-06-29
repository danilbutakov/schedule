import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
	handleUpdatePassword,
	handleUserInfoPicture
} from '../../utils/Functions';
import * as Animatable from 'react-native-animatable';
import useAuth from '../../hooks/useAuth';
import auth from '@react-native-firebase/auth';
import AppContext from '../../utils/Context';
import { useUserInfoItemImage } from '../../hooks/useUserInfoItemImage';

const UserInfoItem = ({ item }) => {
	const [userProvider, setUserProvider] = useState('');
	// @ts-ignore
	const { user } = useAuth();
	const {
		group,
		setGroup,
		univ,
		setUniv,
		userName,
		setUserName,
		newImage,
		setNewImage,
		setExistsParams
	} = useContext(AppContext);
	const { image, setImage } = useUserInfoItemImage();

	useEffect(() => {
		if (
			(group !== '' && group !== ' ') ||
			(univ !== '' && univ !== ' ') ||
			(userName !== '' && userName !== ' ') ||
			newImage !== null
		) {
			setExistsParams(true);
		} else {
			setExistsParams(false);
		}
	}, [group, univ, userName, newImage]);

	useEffect(() => {
		setUserProvider(user.providerData.map(d => String(d.providerId)));
	}, [user]);
	return (
		<Animatable.View
			style={styles.infoCon}
			animation='fadeIn'
			duration={1000}
			useNativeDriver>
			<View style={styles.infoMain}>
				<View style={styles.infoUser}>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}>
						<Text
							style={{
								fontFamily: 'Montserrat-SemiBold',
								fontSize: 17,
								lineHeight: 23
							}}>
							Группа
						</Text>
					</View>
					<TextInput
						style={styles.input}
						placeholder={item.group}
						value={group}
						onChangeText={text => setGroup(text)}
					/>
					<Text
						style={{
							fontFamily: 'Montserrat-SemiBold',
							fontSize: 17,
							lineHeight: 23
						}}>
						ВУЗ
					</Text>
					<TextInput
						style={styles.input}
						placeholder={item.univ}
						value={univ}
						onChangeText={text => setUniv(text)}
					/>
					<Text
						style={{
							fontFamily: 'Montserrat-SemiBold',
							fontSize: 17,
							lineHeight: 23
						}}>
						Ваше имя
					</Text>
					<TextInput
						style={styles.input}
						placeholder={item.profileName}
						value={userName}
						onChangeText={text => setUserName(text)}
					/>
					{userProvider.includes('password') && (
						<TouchableOpacity
							onPress={() => {
								handleUpdatePassword(auth, user.email);
							}}>
							<View
								style={{
									padding: 17,
									alignItems: 'center',
									borderRadius: 16,
									backgroundColor: '#1E1E1F',
									marginBottom: 30
								}}>
								<Text
									style={{
										fontSize: 17,
										lineHeight: 20,
										color: '#FFFFFF',
										fontFamily: 'Montserrat-SemiBold'
									}}>
									Изменить пароль
								</Text>
							</View>
						</TouchableOpacity>
					)}
					<Text
						style={{
							fontFamily: 'Montserrat-SemiBold',
							fontSize: 17,
							lineHeight: 23
						}}>
						Ваше фото профиля
					</Text>
					<TouchableOpacity
						onPress={() =>
							handleUserInfoPicture(setImage, setNewImage)
						}
						style={{
							alignSelf: 'center',
							marginTop: 10
						}}>
						{image ? (
							<Image
								source={{ uri: image }}
								style={{
									width: 150,
									height: 150,
									borderRadius: 100
								}}
							/>
						) : (
							<Image
								source={{ uri: newImage }}
								style={{
									width: 150,
									height: 150,
									borderRadius: 100
								}}
							/>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</Animatable.View>
	);
};

const styles = StyleSheet.create({
	infoCon: {
		marginTop: 10,
		marginBottom: 130,
		paddingHorizontal: 20
	},
	infoMain: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center'
	},
	infoUser: {
		width: '100%'
	},
	btnCon: {
		paddingBottom: 20
	},
	input: {
		borderWidth: 1,
		borderRadius: 16,
		borderColor: 'rgba(60, 60, 67, 0.13)',
		backgroundColor: '#eeeeee',
		padding: 10,
		fontSize: 14,
		lineHeight: 24,
		color: 'rgba(60, 60, 67, 0.6)',
		fontFamily: 'Montserrat-Medium',
		marginVertical: 10
	},
	change: {
		marginTop: 20
	},
	changeCon: {
		padding: 15,
		alignItems: 'center',
		borderRadius: 16,
		backgroundColor: '#1E1E1F',
		width: '100%'
	},
	changeText: {
		fontSize: 17,
		lineHeight: 20,
		color: '#FFFFFF',
		fontFamily: 'Montserrat-SemiBold'
	}
});

export default UserInfoItem;
