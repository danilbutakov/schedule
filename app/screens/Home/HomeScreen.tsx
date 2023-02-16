import {
	View,
	StyleSheet,
	SafeAreaView,
	Text,
	TouchableOpacity
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

import Pairs from '../../components/Pairs/Pairs';
import { pairs } from '../../utils/Pairs';
import useFetchUserData from '../../hooks/useFetchUserData';
import { fs } from '../../../firebase';
import { MemoizedToggleMenu } from '../../components/Home/ToggleMenu';

const HomeScreen = () => {
	const [toggleType, setToggleType] = useState(null);
	const [weekType, setWeekType] = useState('');
	const { fetchData, userData } = useFetchUserData();
	const [userRes, setUserRes] = useState({});
	const user = auth().currentUser;

	useEffect(() => {
		(async () => {
			const userRef = doc(fs, 'users', user?.uid);
			setUserRes(userRef);
		})();
	}, []);

	const saveWeekType = async weekType => {
		try {
			// @ts-ignore
			await updateDoc(userRes, {
				weekType: weekType
			});
		} catch (e) {}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		fetchData();
		saveWeekType(weekType);
	}, [weekType]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.main}>
				<Pairs />
			</View>
			{toggleType && (
				<MemoizedToggleMenu
					weekType={weekType}
					setWeekType={setWeekType}
					setToggleType={setToggleType}
				/>
			)}
			<TouchableOpacity
				style={styles.absolute}
				onPress={() => setToggleType(!toggleType)}>
				<View style={styles.container}>
					<MaterialCommunityIcons
						name='calendar-blank-multiple'
						size={25}
						color={'#A5A5A5'}
						style={{
							padding: 15
						}}
					/>
					<View
						style={{
							width: 1,
							backgroundColor: '#A5A5A5',
							height: '100%'
						}}></View>
					<Text style={styles.text}>
						{userData?.weekType || 'Числитель'} - Текущая
					</Text>
					<Text style={styles.textLength}>{pairs.length}</Text>
				</View>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	main: {
		display: 'flex',
		flexDirection: 'column',
		paddingHorizontal: 12,
		paddingTop: 12,
		backgroundColor: '#F7F7F7',
		flex: 1
	},
	absolute: {
		position: 'absolute',
		top: 590,
		left: 10,
		backgroundColor: '#F7F7F7'
	},
	container: {
		flexDirection: 'row',
		backgroundColor: '#1F1F1E',
		borderRadius: 8,
		alignItems: 'center'
	},
	text: {
		fontFamily: 'Montserrat-Medium',
		color: '#A5A5A5',
		paddingVertical: 15,
		fontSize: 16,
		paddingRight: 5,
		paddingLeft: 15
	},
	textLength: {
		fontFamily: 'Montserrat-Medium',
		color: '#A5A5A5',
		fontSize: 16,
		paddingRight: 15
	}
});
