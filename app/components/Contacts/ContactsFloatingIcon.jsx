import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ContactsFloatingIcon = () => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate('Contacts')}
			style={{
				position: 'absolute',
				right: 20,
				bottom: 20,
				borderRadius: 60,
				width: 60,
				height: 60,
				backgroundColor: '#81F2DE',
				alignItems: 'center',
				justifyContent: 'center'
			}}>
			<MaterialCommunityIcons
				name='android-messages'
				size={30}
				color='#F7F7F7'
				style={{ transform: [{ scaleX: -1 }] }}
			/>
		</TouchableOpacity>
	);
};

export default ContactsFloatingIcon;
