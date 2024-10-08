import React, { Suspense, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { getWeekDay } from '../../utils/Functions';
import { useFilterPairs } from '../../hooks/useFilterPairs';
import DaysSlider from '../../components/Home/DaysSlider';
import { useTheme } from '@react-navigation/native';

const PairsSlider = React.lazy(
	() => import('../../components/Home/PairsSlider')
);

const HomeScreen = () => {
	const [toggleType, setToggleType] = useState(null);
	const [weekType, setWeekType] = useState('');
	const [activeWeekType, setActiveWeekType] = useState('');
	const [active, setActive] = useState(0);
	const [activeDay, setActiveDay] = useState('');
	const [index, setIndex] = useState(0);

	const { filteredPairs } = useFilterPairs(weekType);

	const theme = useTheme();

	const daysRef = useRef(null);
	const pairsRef = useRef<FlashList<any>>(null);

	const onClickDay = (id: number) => {
		setActive(id);
	};

	useEffect(() => {
		getWeekDay(
			setWeekType,
			setActiveWeekType,
			setActive,
			setIndex,
			setActiveDay
		);
	}, []);

	useEffect(() => {
		daysRef?.current?.scrollToIndex({
			index: index === -1 ? 0 : index,
			animated: true,
			viewPosition: 0.8
		});
	}, [index, activeDay, active]);

	useEffect(() => {
		pairsRef?.current?.scrollToIndex({
			index: index === -1 ? 0 : index,
			animated: true,
			viewPosition: 0
		});
	}, [index, activeDay, active]);

	return (
		<Suspense fallback={null}>
			<View
				style={{
					paddingHorizontal: 15,
					backgroundColor: theme.colors.first,
					height: '100%'
				}}>
				<DaysSlider
					setActiveDay={setActiveDay}
					daysRef={daysRef}
					active={active}
					onClickDay={onClickDay}
					index={index}
					setIndex={setIndex}
				/>
				<PairsSlider
					pairsRef={pairsRef}
					index={index}
					filteredPairs={filteredPairs}
					weekLength={13}
					setWeekType={setWeekType}
					setToggleType={setToggleType}
					weekType={weekType}
					toggleType={toggleType}
					activeWeekType={activeWeekType}
				/>
			</View>
		</Suspense>
	);
};

export default HomeScreen;
