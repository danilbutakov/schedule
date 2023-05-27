import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useFetchUserDataItems } from '../../hooks/useFetchDataItems';

const ProfileItems = () => {
	const navigation = useNavigation();
	const { profileItems } = useFetchUserDataItems();
	return (
		<>
			{profileItems.map((item, key) => {
				if (item.role || item.group || item.univ) {
					return (
						<TouchableOpacity
							key={key}
							style={styles.infoCon}
							onPress={() => {
								// @ts-ignore
								navigation.navigate('UserInfo');
							}}>
							<View style={styles.infoMain}>
								<View>
									<Text style={styles.role}>
										{item.role}, {''}
										{item.profileName}
									</Text>
									<Text style={styles.group}>
										{item.group}
									</Text>
									<Text style={styles.univ}>{item.univ}</Text>
								</View>
								<Image
									source={{
										uri: item?.photoURL
									}}
									style={{
										width: 80,
										height: 80,
										borderRadius: 80
									}}
								/>
							</View>
						</TouchableOpacity>
					);
				}
			})}
		</>
	);
};

const styles = StyleSheet.create({
	infoCon: {
		marginTop: 10,
		marginBottom: 20,
		backgroundColor: '#FFFFFF',
		width: '100%',
		padding: 20
	},
	infoMain: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center'
	},
	role: {
		fontFamily: 'Montserrat-Bold',
		color: '#1E1E1F',
		fontSize: 15,
		marginBottom: 9,
		width: 200
	},
	group: {
		fontFamily: 'Montserrat-SemiBold',
		color: '#1E1E1F',
		fontSize: 15,
		lineHeight: 18,
		marginBottom: 4
	},
	univ: {
		fontFamily: 'Montserrat-SemiBold',
		color: '#8E8E93',
		fontSize: 15,
		lineHeight: 18
	}
});

export default ProfileItems;
