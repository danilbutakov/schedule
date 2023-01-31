import {
	Alert,
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { pickImage, uploadImage } from '../../utils/Functions';
import useAuth from '../../hooks/useAuth';
import { fs } from '../../../firebase';

const { height } = Dimensions.get('screen');

const UserInfo = () => {
	const { user } = useAuth();
	const [group, setGroup] = useState('');
	const [univ, setUniv] = useState('');
	const [userName, setUserName] = useState('');
	const [image, setImage] = useState(null);
	const [newImage, setNewImage] = useState(null);
	const [existsParams, setExistsParams] = useState(false);

	const [menuItems, setMenuItems] = useState([]);
	const userRef = doc(fs, 'users', user.uid);

	const fetchUserDataItems = () => {
		return onSnapshot(userRef, doc => {
			if (doc.data()) {
				const docData = doc.data();
				setMenuItems([docData]);
				setImage(doc.data().photoURL);
			} else {
				setMenuItems(null);
			}
		});
	};

	useEffect(() => {
		fetchUserDataItems();
	}, []);

	const handleUpdateGroup = async () => {
		await updateDoc(userRef, {
			group: group
		});
	};
	const handleUpdateUniv = async () => {
		await updateDoc(userRef, {
			univ: univ
		});
	};
	const handleUpdateName = async () => {
		await updateDoc(userRef, {
			profileName: userName
		});
	};
	const handleUpdateImage = async () => {
		await updateDoc(userRef, {
			photoURL: newImage
		});
	};
	const handleProfilePicture = async () => {
		const result = await pickImage();
		if (!result.canceled) {
			setNewImage(result.assets[0].uri);
			setImage(null);
		}
	};

	const handleUpdateProfile = async () => {
		if (group !== '' && group !== ' ') {
			handleUpdateGroup(group).then(() => setGroup(''));
		}

		if (univ !== '' && univ !== ' ') {
			handleUpdateUniv(univ).then(() => setUniv(''));
		}

		if (userName !== '' && userName !== ' ') {
			handleUpdateName(userName).then(() => setUserName(''));
		}

		let photoURL;
		if (image) {
			const { url } = await uploadImage(
				newImage,
				`images/${user.uid}`,
				'profilePicture'
			);
			photoURL = url;
		}
		if (photoURL) {
			setImage(photoURL);
		}
		const userData = {
			photoURL: photoURL
		};
		await Promise.all([
			user.updateProfile(userData),
			handleUpdateImage()
		]).then(() => {
			console.log('good update');
			setNewImage(null);
		});
	};

	useEffect(() => {
		if (
			(group !== '') |
			(univ !== '') |
			(userName !== '') |
			(newImage !== null)
		) {
			setExistsParams(true);
		} else {
			setExistsParams(false);
		}
	}, [group, univ, userName, newImage]);

	return (
		<View
			style={{
				height,
				backgroundColor: '#F7F7F7',
				display: 'flex',
				flexDirection: 'column'
			}}>
			<View
				style={{
					paddingHorizontal: 20,
					display: 'flex',
					backgroundColor: '#ffffff',
					borderBottomLeftRadius: 20,
					borderBottomRightRadius: 20,
					paddingVertical: 20
				}}
				elevation={2}>
				{menuItems.map((item, key) => {
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
												lineHeight: 20
											}}>
											{item.profileName}
										</Text>
										<Text
											ellipsizeMode='tail'
											numberOfLines={1}
											style={{
												fontSize: 14,
												lineHeight: 20,
												color: 'rgba(60, 60, 67, 0.6)',
												fontFamily: 'Montserrat-Medium'
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
											handleUpdateProfile()
												.then(() =>
													Alert.alert(
														'Вы успешно обновили профиль'
													)
												)
												.catch(e =>
													console.log(e.message)
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
			</View>
			<View
				style={{
					display: 'flex',
					flex: 1,
					backgroundColor: '#ffffff',
					marginTop: 30,
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20
				}}
				elevation={3}>
				<FlatList
					style={{ marginBottom: 10 }}
					data={menuItems}
					keyExtractor={(_, i) => i}
					renderItem={({ item }) => (
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
												fontFamily:
													'Montserrat-SemiBold',
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
									<Text
										style={{
											fontFamily: 'Montserrat-SemiBold',
											fontSize: 17,
											lineHeight: 23
										}}>
										Ваше фото профиля
									</Text>
									<TouchableOpacity
										onPress={handleProfilePicture}
										style={{
											alignSelf: 'center',
											marginTop: 30
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
					)}
				/>
			</View>
		</View>
	);
};

export default UserInfo;

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
		marginVertical: 15
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
