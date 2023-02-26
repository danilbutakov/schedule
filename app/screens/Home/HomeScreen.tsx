import {
	View,
	StyleSheet,
	SafeAreaView,
	Text,
	TouchableOpacity,
	FlatList
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Pairs from '../../components/Pairs/Pairs';
import { pairs } from '../../utils/Pairs';
import { MemoizedToggleMenu } from '../../components/Home/ToggleMenu';
import { weekTabs } from '../../utils/WeekDays';

const HomeScreen = () => {
	const [toggleType, setToggleType] = useState(null);
	const [weekType, setWeekType] = useState('');
	const [activeWeekType, setActiveWeekType] = useState('');
	const [active, setActive] = useState(null);
	const [activeDay, setActiveDay] = useState('');
	const [index, setIndex] = useState(0);

	const ref = useRef(null);

	const getWeekDay = () => {
		const d = new Date();
		let day = d.getDay();

		let currentDate = new Date();
		let startDate = new Date(currentDate.getFullYear(), 0, 1);
		let days = Math.floor(
			// @ts-ignore
			(currentDate - startDate) / (24 * 60 * 60 * 1000)
		);
		let weekNumber = Math.ceil(days / 7);

		if (weekNumber % 2) {
			setWeekType('Числитель');
			setActiveWeekType('Числитель');
		} else {
			setWeekType('Знаменатель');
			setActiveWeekType('Знаменатель');
		}

		setActive(day);
		setIndex(day);

		if (index === 1) {
			setActiveDay('Понедельник');
		} else if (index === 2) {
			setActiveDay('Вторник');
		} else if (index === 3) {
			setActiveDay('Среда');
		} else if (index === 4) {
			setActiveDay('Четверг');
		} else if (index === 5) {
			setActiveDay('Пятница');
		} else if (index === 6) {
			setActiveDay('Суббота');
		} else if (index === 0) {
			setActiveDay('Воскресенье');
		}
	};

	const onClickDay = id => {
		setActive(id);
	};

	useEffect(() => {
		getWeekDay();
	}, []);

	useEffect(() => {
		ref.current?.scrollToIndex({
			index: index === 0 ? 6 : index,
			animated: true,
			viewPosition: 1
		});
	}, [index]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ backgroundColor: '#F7F7F7' }}>
				<View
					style={{
						marginHorizontal: 15
					}}>
					<FlatList
						style={{
							flexDirection: 'row',
							marginTop: 10,
							marginBottom: 10,
							height: 50
						}}
						initialScrollIndex={index === 0 ? 6 : index}
						onScrollToIndexFailed={() => {
							return 0;
						}}
						ref={ref}
						horizontal={true}
						data={weekTabs}
						renderItem={({ item }) => (
							<WeekItem
								active={active}
								day={item}
								onClickDay={onClickDay}
								setIndex={setIndex}
								setActiveDay={setActiveDay}
							/>
						)}
					/>
				</View>
			</View>
			<View style={styles.main}>
				<Pairs
					pairs={pairs.filter(
						pair =>
							pair.dayOfWeek === activeDay &&
							weekType === pair.typeWeek
					)}
				/>
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
						{weekType === activeWeekType
							? weekType + '-Текущая'
							: weekType}
					</Text>
					<Text style={styles.textLength}>
						{pairs.filter(day => weekType === day.typeWeek).length}
					</Text>
				</View>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default HomeScreen;

const WeekItem = ({ day, active, onClickDay, setIndex, setActiveDay }) => {
	return (
		<View
			key={day.id}
			style={[
				active === day.id ? styles.chosenWeekDay : styles.weekDay,
				{ marginRight: day.id === 0 ? 0 : 15 }
			]}>
			<TouchableOpacity
				onPress={() => {
					onClickDay(day.id);
					setIndex(day.id);
					setActiveDay(day.weekDay);
				}}>
				<Text
					style={{
						fontFamily: 'Montserrat-Medium',
						fontSize: 15,
						color: active === day.id ? 'white' : 'black'
					}}>
					{day.weekDay}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

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
		alignItems: 'center',
		width: 300
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
