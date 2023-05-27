import React, { Suspense, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { getWeekDay } from '../../utils/Functions';
import { useFilterPairs } from '../../hooks/useFilterPairs';
import DaysSlider from '../../components/Home/DaysSlider';

const PairsSlider = React.lazy(
	() => import('../../components/Home/PairsSlider')
);

const HomeScreen = () => {
	const [toggleType, setToggleType] = useState(null);
	const [weekType, setWeekType] = useState('');
	const [activeWeekType, setActiveWeekType] = useState('');
	const [weekLength, setWeekLength] = useState(0);
	const [active, setActive] = useState(0);
	const [activeDay, setActiveDay] = useState('');
	const [index, setIndex] = useState(0);

	const { filteredPairs } = useFilterPairs(weekType);

	const daysRef = useRef(null);
	const pairsRef = useRef<FlashList<any>>(null);

	const onClickDay = id => {
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
		if (weekType === 'Числитель') {
			setWeekLength(16);
		} else {
			setWeekLength(17);
		}
	}, [weekType]);

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
					backgroundColor: '#F7F7F7',
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
					weekLength={weekLength}
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
