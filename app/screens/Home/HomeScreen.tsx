import {
	View,
	StyleSheet,
	SafeAreaView,
	Text,
	TouchableOpacity
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlashList } from '@shopify/flash-list';

import { pairs } from '../../utils/Pairs';
import { MemoizedToggleMenu } from '../../components/Home/ToggleMenu';
import Pair from '../../components/Pairs/Pair';
import { Separator } from '../../components/Pairs/Separator';

const HomeScreen = () => {
	const [toggleType, setToggleType] = useState(null);
	const [weekType, setWeekType] = useState('');
	const [activeWeekType, setActiveWeekType] = useState('');
	const [weekLength, setWeekLength] = useState(0);

	const getWeekDay = async () => {
		try {
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
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		getWeekDay();
	}, []);

	useEffect(() => {
		if (weekType === 'Числитель') {
			setWeekLength(16);
		} else {
			setWeekLength(17);
		}
	}, [weekType]);

	const pairsOfWeek = pairs.map(pair =>
		pair.filter(p => p.typeWeek === weekType)
	);

	const filteredPairs = pairsOfWeek.filter(fp => fp.length !== 0);

	const renderItem = useCallback(
		({ item, index }) => (
			<Pair {...item} pairs={filteredPairs} index={index} pair={item} />
		),
		[]
	);

	return (
		<View
			style={{
				flex: 1,
				paddingHorizontal: 15,
				backgroundColor: '#F7F7F7'
			}}>
			<View style={styles.main}>
				<FlashList
					data={filteredPairs}
					renderItem={renderItem}
					estimatedItemSize={200}
					ItemSeparatorComponent={Separator}
				/>
				<View
					style={{
						borderRadius: 10
					}}>
					{toggleType && (
						<MemoizedToggleMenu
							setWeekType={setWeekType}
							setToggleType={setToggleType}
						/>
					)}
					<TouchableOpacity
						style={styles.chooseWeekDay}
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
								({weekLength} пар)
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	main: {
		display: 'flex',
		flexDirection: 'column',
		paddingTop: 12,
		backgroundColor: '#F7F7F7',
		flex: 1
	},
	chooseWeekDay: {
		backgroundColor: '#F7F7F7',
		marginBottom: 10
	},
	container: {
		flexDirection: 'row',
		backgroundColor: '#1F1F1E',
		borderRadius: 10,
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
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderColor: '#81F2DE',
		borderWidth: 1,
		paddingVertical: 15,
		width: 100
	},
	chosenWeekDay: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#81F2DE',
		borderRadius: 4,
		paddingVertical: 15,
		width: 100
	}
});
