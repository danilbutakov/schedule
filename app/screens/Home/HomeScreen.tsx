import React, { Suspense, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { pairs } from '../../utils/Pairs';

const DaysSlider = React.lazy(() => import('../../components/Home/DaysSlider'));
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

	const daysRef = useRef(null);
	const pairsRef = useRef<FlashList<any>>(null);

	const handleActiveDay = index => {
		if (index === 0) {
			setActiveDay('Понедельник');
		} else if (index === 1) {
			setActiveDay('Вторник');
		} else if (index === 2) {
			setActiveDay('Среда');
		} else if (index === 3) {
			setActiveDay('Четверг');
		} else if (index === 4) {
			setActiveDay('Пятница');
		} else if (index === 5) {
			setActiveDay('Суббота');
		}
	};

	const getWeekDay = async () => {
		try {
			const d = new Date();
			let day = d.getDay();

			let currentDate = new Date();
			let startDate = new Date(currentDate.getFullYear(), 0, 1);
			let days = Math.floor(
				// @ts-ignore
				(currentDate - startDate) / (24 * 60 * 60 * 1000)
			);
			let weekNumber = Math.ceil(days / 7);

			if (weekNumber % 2) {
				setWeekType('Числитель');
				setActiveWeekType('Числитель');
			} else {
				setWeekType('Знаменатель');
				setActiveWeekType('Знаменатель');
			}

			setActive(day - 1);
			setIndex(day - 1);
			handleActiveDay(day);
		} catch (e) {
			console.error(e);
		}
	};

	const onClickDay = id => {
		setActive(id);
	};

	useEffect(() => {
		getWeekDay();
	}, []);

	useEffect(() => {
		if (weekType === 'Числитель') {
			setWeekLength(16);
		} else {
			setWeekLength(17);
		}
	}, [weekType]);

	const pairsOfWeek = pairs.map(pair =>
		pair.filter(p => p.typeWeek === weekType)
	);

	const filteredPairs = pairsOfWeek.filter(fp => fp.length !== 0);

	useEffect(() => {
		daysRef.current?.scrollToIndex({
			index: index,
			animated: true,
			viewPosition: 0.8
		});
	}, [index, activeDay, active]);

	useEffect(() => {
		pairsRef.current?.scrollToIndex({
			index: index,
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
