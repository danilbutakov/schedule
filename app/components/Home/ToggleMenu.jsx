import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ToggleMenu = ({ setWeekType, setToggleType }) => {
	return (
		<Animated.View entering={FadeInLeft} exiting={FadeOutLeft}>
			<View style={styles.toggleAbsolute}>
				<TouchableOpacity
					onPress={async () => {
						await setWeekType('Числитель');
						setToggleType(false);
					}}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: 15,
						paddingVertical: 15
					}}>
					<AntDesign name='caretup' size={20} color={'#3eb59f'} />
					<Text
						style={{
							fontFamily: 'Montserrat-Medium',
							color: '#dedede',
							fontSize: 16,
							marginLeft: 10
						}}>
						Числитель
					</Text>
				</TouchableOpacity>
				<View
					style={{
						backgroundColor: '#A5A5A5',
						height: 1
					}}
				/>
				<TouchableOpacity
					onPress={async () => {
						await setWeekType('Знаменатель');
						setToggleType(false);
					}}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: 15,
						paddingVertical: 15
					}}>
					<AntDesign name='caretdown' size={20} color={'#3eb59f'} />
					<Text
						style={{
							fontFamily: 'Montserrat-Medium',
							color: '#dedede',
							fontSize: 16,
							marginLeft: 10
						}}>
						Знаменатель
					</Text>
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
};

export const MemoizedToggleMenu = React.memo(ToggleMenu);

const styles = StyleSheet.create({
	toggleAbsolute: {
		backgroundColor: '#858585',
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'column',
		marginBottom: 10
	}
});
