import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

const ContactProfileHeader = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const user = route.params.user;
	const currentUser = auth().currentUser;
	const [selectEdit, setSelectEdit] = useState(false);

	const theme = useTheme();

	return (
		<View
			style={{
				backgroundColor: theme.colors.first,
				borderBottomColor: theme.colors.tertiary,
				borderBottomWidth: 1,
				paddingHorizontal: 15,
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between'
			}}>
			<TouchableOpacity
				style={{
					backgroundColor: theme.colors.first,
					marginTop: 10,
					paddingBottom: 10,
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
				onPress={() => navigation.goBack()}>
				<View
					style={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'row'
					}}>
					<Feather name={'chevron-left'} size={25} color={'white'} />
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							marginLeft: 20,
							alignItems: 'center'
						}}>
						<Text
							style={{
								fontFamily: 'Montserrat-SemiBold',
								fontSize: 19,
								lineHeight: 25,
								color: theme.colors.tertiary
							}}>
							{user.profileName || user.displayName}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
			<View
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-end',
					position: 'relative'
				}}>
				{user.uid === currentUser.uid && (
					<TouchableOpacity
						style={{
							backgroundColor: '#d1d1d1b2',
							padding: 7,
							borderRadius: 50
						}}
						onPress={() => setSelectEdit(!selectEdit)}>
						<Entypo name='dots-three-vertical' size={20} />
					</TouchableOpacity>
				)}
				{selectEdit && (
					<Animatable.View
						animation='fadeIn'
						duration={400}
						useNativeDriver
						style={{ minWidth: 40 }}>
						<TouchableOpacity
							style={{
								position: 'absolute',
								right: 0,
								left: -250,
								top: 10,
								backgroundColor: '#d1d1d1',
								minWidth: 100,
								borderRadius: 10,
								paddingHorizontal: 10,
								paddingVertical: 10,
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center'
							}}
							onPress={() => {
								navigation.navigate('MenuStack', {
									screen: 'UserInfo',
									initial: false
								});
								setSelectEdit(false);
							}}>
							<FontAwesome5
								size={30}
								name='user-circle'
								style={{ marginRight: 10 }}
								color={'#3eb59f'}
							/>
							<Text
								style={{
									fontFamily: 'Montserrat-Medium',
									color: '#1E1E1F',
									fontSize: 16
								}}>
								Редактировать профиль
							</Text>
						</TouchableOpacity>
					</Animatable.View>
				)}
			</View>
		</View>
	);
};

export default ContactProfileHeader;
