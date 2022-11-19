import {
	View,
	FlatList,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import React, { useState, useRef, useCallback, useMemo } from 'react';
import { slides } from '../../../assets/Slides';
import SlideItem from './SlideItem';
import PaginationSlider from './PaginationSlider';
import BottomSheet from '@gorhom/bottom-sheet';
import SheetAuth from './SheetAuth';

const { width } = Dimensions.get('screen');

const Slider = () => {
	const [currentDot, setCurrentDot] = useState(0);

	const onScroll = event => {
		const totalWidth = event.nativeEvent.layoutMeasurement.width;
		const xPos = event.nativeEvent.contentOffset.x;

		const current = Math.floor(xPos / totalWidth);
		setCurrentDot(current);
	};

	const [isOpen, setIsOpen] = useState(false);

	// ref
	const bottomSheetRef = useRef<BottomSheet>(null);

	// variables
	const snapPoints = useMemo(() => ['20%', '90%'], []);

	// callbacks
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	return (
		<View style={{ backgroundColor: isOpen ? '#00000030' : '#ffffff' }}>
			<FlatList
				data={slides}
				renderItem={({ item }) => <SlideItem item={item} />}
				horizontal
				pagingEnabled
				snapToAlignment='center'
				showsHorizontalScrollIndicator={false}
				onScroll={onScroll}
				style={{ opacity: isOpen ? 0.3 : 1 }}
			/>
			<PaginationSlider data={slides} currentDot={currentDot} />
			<TouchableOpacity
				style={styles.container}
				onPress={() => setIsOpen(true)}>
				<View style={styles.conBtn}>
					<Text style={styles.btn}>Войти</Text>
				</View>
			</TouchableOpacity>
			{isOpen ? (
				<BottomSheet
					ref={bottomSheetRef}
					index={1}
					snapPoints={snapPoints}
					onChange={handleSheetChanges}
					enablePanDownToClose={true}
					onClose={() => setIsOpen(false)}>
					<View>
						<View style={styles.headLine}></View>
						<View style={styles.sheetCon}>
							<SheetAuth />
						</View>
					</View>
				</BottomSheet>
			) : null}
		</View>
	);
};

export default Slider;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 50,
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	conBtn: {
		padding: 16,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 16,
		display: 'flex',
		width: '90%',
		backgroundColor: '#1E1E1F'
	},
	btn: {
		fontSize: 17,
		lineHeight: 24,
		color: '#FFFFFF',
		fontFamily: 'Montserrat-Medium'
	},
	headLine: {
		width,
		backgroundColor: '#E5E5E5E5',
		height: 1,
		marginTop: 20
	},
	sheetCon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width
	}
});
