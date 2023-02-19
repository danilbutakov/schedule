import {
	View,
	StyleSheet,
	SafeAreaView,
	Text,
	TouchableOpacity,
	ScrollView
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

import Pairs from '../../components/Pairs/Pairs';
import { pairs } from '../../utils/Pairs';
import useFetchUserData from '../../hooks/useFetchUserData';
import { fs } from '../../../firebase';
import { MemoizedToggleMenu } from '../../components/Home/ToggleMenu';
import {
	SpecialScrollView,
	SpecialView
} from 'react-native-scroll-to-element/lib';

const HomeScreen = () => {
	const [toggleType, setToggleType] = useState(null);
	const [weekType, setWeekType] = useState('');
	const [active, setActive] = useState(null);
	const [weekTabs, setWeekTabs] = useState([
		{
			weekDay: 'Понедельник',
			id: 0
		},
		{
			weekDay: 'Вторник',
			id: 1
		},
		{
			weekDay: 'Среда',
			id: 2
		},
		{
			weekDay: 'Четверг',
			id: 3
		},
		{
			weekDay: 'Пятница',
			id: 4
		},
		{
			weekDay: 'Суббота',
			id: 5
		}
	]);

	const { fetchData, userData } = useFetchUserData();
	const [userRes, setUserRes] = useState({});
	const user = auth().currentUser;
	const viewRef = useRef(null);

	const onClick = id => {
		setActive(id);
	};

	const getWeekDay = () => {
		const d = new Date();
		let day = d.getDay();

		setActive(day - 1);
	};

	useEffect(() => {
		getWeekDay();
	}, []);

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
			<View style={{ backgroundColor: '#F7F7F7' }}>
				<View
					style={{
						marginHorizontal: 15
					}}>
					<SpecialScrollView
						horizontal={true}
						style={{
							flexDirection: 'row',
							marginTop: 10,
							marginBottom: 10,
							height: 50
						}}>
						{weekTabs.map(day => (
							<SpecialView
								key={day.id}
								ref={viewRef}
								style={[
									active === day.id
										? styles.chosenWeekDay
										: styles.weekDay,
									{ marginRight: day.id === 5 ? 0 : 15 }
								]}>
								<TouchableOpacity
									onPress={() => {
										onClick(day.id);
									}}>
									<Text
										style={{
											fontFamily: 'Montserrat-Medium',
											fontSize: 15,
											color:
												active === day.id
													? 'white'
													: 'black'
										}}>
										{day.weekDay}
									</Text>
								</TouchableOpacity>
							</SpecialView>
						))}
					</SpecialScrollView>
				</View>
			</View>
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
	},
	weekDay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		flexDirection: 'row',
		paddingHorizontal: 15,
		borderRadius: 4,
		borderColor: '#81F2DE',
		borderWidth: 1
	},
	chosenWeekDay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		flexDirection: 'row',
		paddingHorizontal: 15,
		backgroundColor: '#81F2DE',
		borderRadius: 4
	}
});
