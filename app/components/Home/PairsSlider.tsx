import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

import { MemoizedToggleMenu } from './ToggleMenu';
import Pair from '../Pairs/Pair';
import { images } from '../../../assets/globalImages';
import { Separator } from '../Separator';
import { useTheme } from '@react-navigation/native';

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

	const theme = useTheme();

	return (
		<Animatable.View
			animation='fadeIn'
			duration={1000}
			useNativeDriver
			style={[
				styles.main,
				{
					paddingTop: filteredPairs.length - 1 >= index ? 12 : 0,
					backgroundColor: theme.colors.first
				}
			]}>
			{filteredPairs.length - 1 >= index ? (
				<FlashList
					data={filteredPairs}
					renderItem={renderItem}
					ref={pairsRef}
					estimatedItemSize={200}
					ItemSeparatorComponent={() => Separator('pairs')}
					initialScrollIndex={index}
				/>
			) : (
				<View
					style={{
						alignItems: 'center',
						flex: 1,
						justifyContent: 'center'
					}}>
					<Text
						style={{
							fontFamily: 'Montserrat-SemiBold',
							fontSize: 16,
							marginBottom: 10,
							color: theme.colors.tertiary
						}}>
						Пар нет. Бро, иди поспи
					</Text>
					<Image
						source={images.kizaru}
						style={{
							width: '90%',
							height: '80%'
						}}
					/>
				</View>
			)}
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
							color={'#dedede'}
							style={{
								padding: 15
							}}
						/>
						<View
							style={{
								width: 1,
								backgroundColor: '#dedede',
								height: '100%'
							}}
						/>
						<Text style={styles.text}>
							{weekType === activeWeekType
								? weekType + '-Текущая'
								: weekType}
						</Text>
						<Text style={styles.textLength}>
							(
							<Text
								style={[
									styles.textLength,
									{ color: '#3eb59f' }
								]}>
								{weekLength}
							</Text>{' '}
							пар)
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</Animatable.View>
	);
};

const styles = StyleSheet.create({
	main: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1
	},
	chooseWeekDay: {
		marginBottom: 10
	},
	container: {
		flexDirection: 'row',
		backgroundColor: '#828282',
		borderRadius: 10,
		alignItems: 'center'
	},
	text: {
		fontFamily: 'Montserrat-Medium',
		color: '#dedede',
		paddingVertical: 15,
		fontSize: 16,
		paddingRight: 5,
		paddingLeft: 15
	},
	textLength: {
		fontFamily: 'Montserrat-Medium',
		color: '#dedede',
		fontSize: 16,
		paddingRight: 15
	}
});

export default PairsSlider;
