import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('screen');

const SlideItem = ({ item }) => {
	return (
		<View style={styles.container}>
			<View style={styles.slide}>
				<View style={styles.imgCon}>
					<Image source={item.img} style={styles.img} />
				</View>
				<View style={styles.content}>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.subTitle}>{item.subTitle}</Text>
				</View>
			</View>
		</View>
	);
};

export default SlideItem;

const styles = StyleSheet.create({
	container: {
		width,
		alignItems: 'center',
		display: 'flex'
	},
	imgCon: {
		flex: 0.6,
		alignSelf: 'center'
	},
	img: {
		width: 400,
		height: 400
	},
	content: {
		flex: 0.7,
		paddingHorizontal: 20
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		color: '#1E1E1E',
		marginBottom: 15,
		fontFamily: 'Montserrat-SemiBold'
	},
	subTitle: {
		fontSize: 17,
		lineHeight: 24,
		color: 'rgba(69, 69, 69, 0.6)',
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		fontFamily: 'Montserrat-Regular'
	}
});
