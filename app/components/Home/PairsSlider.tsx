import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Separator } from '../Pairs/Separator';
import { MemoizedToggleMenu } from './ToggleMenu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Pair from '../Pairs/Pair';

const PairsSlider = ({
	filteredPairs,
	index,
	pairsRef,
	toggleType,
	setToggleType,
	setWeekType,
	weekType,
	activeWeekType,
	weekLength
}) => {
	const renderItem = useCallback(
		({ item, index }) => (
			<Pair {...item} pairs={filteredPairs} index={index} pair={item} />
		),
		[]
	);

	return (
		<View style={styles.main}>
			<FlashList
				data={filteredPairs}
				renderItem={renderItem}
				ref={pairsRef}
				estimatedItemSize={200}
				ItemSeparatorComponent={Separator}
				initialScrollIndex={index}
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
	);
};

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
	}
});

export default PairsSlider;
