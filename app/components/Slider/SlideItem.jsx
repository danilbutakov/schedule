import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('screen');

const SlideItem = ({ item }) => {
	return (
		<View style={styles.container}>
			<View style={styles.slide}>
				<Image style={styles.img} resizeMode='contain' source={item.img} />
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
	img: {
		flex: 0.6
	},
	content: {
		flex: 0.7,
		paddingHorizontal: 20
	},
	title: {
		fontWeight: '400',
		fontSize: 27,
		lineHeight: 32,
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		color: '#1E1E1E',
		marginBottom: 15
	},
	subTitle: {
		fontWeight: '300',
		fontSize: 17,
		lineHeight: 24,
		color: 'rgba(69, 69, 69, 0.6)',
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center'
	}
});
