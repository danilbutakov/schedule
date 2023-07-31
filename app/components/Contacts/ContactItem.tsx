import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import Avatar from './Avatar';
import { handleSelect } from '../../../assets/Functions';

const ContactItem = ({ user }) => {
	const navigation = useNavigation();
	const date = new Date();
	const currentUser = auth().currentUser;
	const [isLoading, setIsLoading] = useState(false);

	const theme = useTheme();

	return (
		<>
			<Animatable.View
				style={{
					paddingVertical: 10,
					borderRadius: 20,
					marginBottom: 20,
					flex: 1
				}}
				animation='fadeIn'
				duration={1000}
				useNativeDriver>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						flex: 1
					}}>
					<TouchableOpacity
						onPress={() =>
							// @ts-ignore
							navigation.navigate('ContactInfo', { user })
						}
						style={{
							display: 'flex',
							flexDirection: 'row',
							flex: 1
						}}>
						<Avatar user={user} size={50} />
						<View style={{ flex: 1 }}>
							<Text
								style={{
									fontFamily: 'Montserrat-Bold',
									fontSize: 14,
									marginBottom: 5,
									color: theme.colors.tertiary
								}}>
								{user.profileName || user.displayName}
							</Text>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									flex: 1
								}}>
								<Text
									ellipsizeMode='tail'
									numberOfLines={1}
									style={{
										fontFamily: 'Montserrat-Regular',
										color: '#8E8E93',
										fontSize: 14,
										flex: 3.5,
										paddingRight: 10
									}}>
									{user.univ}, {user.group}
								</Text>
								<Text
									style={{
										fontFamily: 'Montserrat-Regular',
										color: '#b3b3b3',
										fontSize: 13,
										marginBottom: 5,
										flex: 1
									}}>
									{date.getHours()}:{date.getMinutes()}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							handleSelect(
								user,
								setIsLoading,
								currentUser,
								navigation
							)
						}>
						<Ionicons
							size={35}
							name='md-chatbubbles-sharp'
							color={'#3eb59f'}
						/>
					</TouchableOpacity>
				</View>
			</Animatable.View>
			{isLoading ? (
				<>
					<ActivityIndicator
						size='large'
						color={theme.colors.gray800}
						style={{ backgroundColor: theme.colors.first }}
					/>
				</>
			) : null}
		</>
	);
};

const styles = StyleSheet.create({
	absolute: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	}
});

export default ContactItem;
