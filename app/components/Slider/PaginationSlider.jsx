import { View, StyleSheet } from 'react-native';
import React from 'react';

const PaginationSlider = ({ data, currentDot }) => {
	return (
		<View style={styles.container}>
			{data.map((_, idx) => {
				return (
					<View
						key={idx.toString()}
						style={[
							styles.dotsInactive,
							currentDot === idx ? styles.dotsActive : {}
						]}
					/>
				);
			})}
		</View>
	);
};

export default PaginationSlider;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 190,
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	dotsInactive: {
		width: 12,
		height: 12,
		borderRadius: 6,
		marginHorizontal: 3,
		backgroundColor: '#ccc'
	},
	dotsActive: {
		width: 12,
		height: 12,
		borderRadius: 6,
		marginHorizontal: 3,
		backgroundColor: '#0d9488'
	}
});
