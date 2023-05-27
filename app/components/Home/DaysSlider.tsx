import React from 'react';
import {
	FlatList,
	Text,
	TouchableOpacity,
	View,
	StyleSheet
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { weekTabs } from '../../utils/WeekDays';

const WeekItem = ({ day, onClickDay, setIndex, setActiveDay, active }) => {
	return (
		<TouchableOpacity
			onPress={() => {
				onClickDay(day.id);
				setIndex(day.id);
				setActiveDay(day.weekDay);
			}}
			key={day.id}
			style={[
				active === day.id ? styles.chosenWeekDay : styles.weekDay,
				{ marginRight: day.id === 5 ? 0 : 15 }
			]}>
			<Text
				style={{
					fontFamily: 'Montserrat-Medium',
					fontSize: 15,
					color: active === day.id ? 'white' : 'black'
				}}>
				{day.weekDay}
			</Text>
		</TouchableOpacity>
	);
};

const DaysSlider = ({
	index,
	daysRef,
	setIndex,
	setActiveDay,
	onClickDay,
	active
}) => {
	return (
		<Animatable.View
			animation='fadeIn'
			duration={1000}
			useNativeDriver
			style={{ backgroundColor: '#F7F7F7' }}>
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<FlatList
					style={{
						paddingTop: 5,
						paddingBottom: 5
					}}
					initialScrollIndex={
						index === 1 ? 0 : index === 5 ? 4 : index
					}
					onScrollToIndexFailed={() => {
						setIndex(0);
					}}
					ref={daysRef}
					horizontal={true}
					data={weekTabs}
					renderItem={({ item }) => (
						<WeekItem
							day={item}
							setActiveDay={setActiveDay}
							active={active}
							onClickDay={onClickDay}
							setIndex={setIndex}
						/>
					)}
				/>
			</View>
		</Animatable.View>
	);
};

const styles = StyleSheet.create({
	weekDay: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 10
	},
	chosenWeekDay: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1E1E1F',
		borderRadius: 50,
		paddingVertical: 10,
		paddingHorizontal: 10
	}
});
export default DaysSlider;
