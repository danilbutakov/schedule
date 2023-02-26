import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';

const ToggleMenu = ({ weekType, setWeekType, setToggleType }) => {
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
					<AntDesign name='caretup' size={25} color={'#3eb59f'} />
					<Text
						style={{
							fontFamily: 'Montserrat-Medium',
							color: '#1E1E1F',
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
					}}></View>
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
					<AntDesign name='caretdown' size={25} color={'#3eb59f'} />
					<Text
						style={{
							fontFamily: 'Montserrat-Medium',
							color: '#1E1E1F',
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
		position: 'absolute',
		right: 0,
		left: 11,
		top: -190,
		backgroundColor: '#d1d1d1',
		width: 320,
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'column'
	}
});
