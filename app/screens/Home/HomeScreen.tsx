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

import { pairs } from '../../utils/Pairs';
import { MemoizedToggleMenu } from '../../components/Home/ToggleMenu';
import { weekTabs } from '../../utils/WeekDays';
import Pairs from '../../components/Pairs/Pairs';

const HomeScreen = () => {
	const [toggleType, setToggleType] = useState(null);
	const [weekType, setWeekType] = useState('');
	const [activeWeekType, setActiveWeekType] = useState('');
	const [active, setActive] = useState(null);
	const [activeDay, setActiveDay] = useState('');
	const [index, setIndex] = useState(null);
	const [filteredPairs, setFilteredPairs] = useState([]);

	const ref = useRef(null);

	const handleActiveDay = (index: number) => {
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
		} else if (index === 7) {
			setActiveDay('Воскресенье');
		}
	};

	const getWeekDay = async () => {
		try {
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
			handleActiveDay(day);
			setFilteredPairs(
				pairs.map(arr => arr.filter(pair => pair.typeWeek === weekType))
			);
		} catch (e) {
			console.error(e);
		}
	};

	const onClickDay = (id: number) => {
		setActive(id);
	};

	useEffect(() => {
		(async () => {
			setFilteredPairs(
				pairs.map(arr => arr.filter(pair => pair.typeWeek === weekType))
			);
		})();
	}, [weekType]);

	useEffect(() => {
		getWeekDay();
	}, []);

	useEffect(() => {
		ref.current?.scrollToIndex({
			index: index === 7 ? 6 : index,
			animated: true,
			viewPosition: 1
		});
	}, [index, activeDay, active]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ backgroundColor: '#F7F7F7' }}>
				<FlatList
					style={{
						flexDirection: 'row',
						marginTop: 5
					}}
					initialScrollIndex={index}
					onScrollToIndexFailed={() => {
						return 0;
					}}
					ref={ref}
					horizontal
					data={weekTabs}
					renderItem={({ item }) => (
						<View
							style={[
								active === item.id
									? styles.chosenWeekDay
									: styles.weekDay,
								{
									marginRight: item.id === 0 ? 15 : 15,
									marginLeft: item.id === 1 ? 15 : 0
								}
							]}
							key={index}>
							<TouchableOpacity
								onPress={() => {
									onClickDay(item.id);
									setIndex(item.id);
									setActiveDay(item.weekDay);
									console.log(item.id);
								}}
								style={{
									paddingHorizontal: 30,
									paddingVertical: 15
								}}>
								<Text
									style={{
										fontFamily: 'Montserrat-Medium',
										fontSize: 15,
										color:
											active === item.id
												? 'white'
												: 'black'
									}}>
									{item.weekDay}
								</Text>
							</TouchableOpacity>
						</View>
					)}
				/>
			</View>
			<View style={styles.main}>
				<FlatList
					data={filteredPairs.filter(pairs => pairs.length !== 0)}
					initialScrollIndex={index}
					onScrollToIndexFailed={() => {
						return 0;
					}}
					horizontal
					pagingEnabled
					snapToAlignment={'center'}
					decelerationRate={'fast'}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => (
						<Pairs
							activeDay={activeDay}
							item={item}
							index={index}
							setIndex={setIndex}
							setActive={setActive}
							handleActiveDay={handleActiveDay}
						/>
					)}
				/>
			</View>
			{toggleType && (
				<MemoizedToggleMenu
					weekType={weekType}
					setWeekType={setWeekType}
					setToggleType={setToggleType}
					setFilteredPairs={setFilteredPairs}
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
					{/*<Text style={styles.textLength}>*/}
					{/*	(*/}
					{/*	{*/}
					{/*		filteredPairs*/}
					{/*			.filter(pairs => pairs.length !== 0)*/}
					{/*			.filter(p => p.typeWeek === weekType).length*/}
					{/*	}{' '}*/}
					{/*	пар)*/}
					{/*</Text>*/}
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
		paddingTop: 12,
		backgroundColor: '#F7F7F7'
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
		borderRadius: 4,
		borderColor: '#81F2DE',
		borderWidth: 1
	},
	chosenWeekDay: {
		backgroundColor: '#81F2DE',
		borderRadius: 4
	}
});
