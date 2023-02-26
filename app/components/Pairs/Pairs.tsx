import { FlatList, View, Text, Image } from 'react-native';

import Pair from './Pair';
import { images } from '../../../assets/globalImages';

const Pairs = ({ pairs }) => {
	return (
		<>
			{pairs.length ? (
				<FlatList
					data={pairs}
					renderItem={({ item, index }) => (
						<Pair pair={item} index={index} pairs={pairs} />
					)}
				/>
			) : (
				<View
					style={{
						alignItems: 'center',
						height: '80%',
						justifyContent: 'center'
					}}>
					<Text
						style={{
							fontFamily: 'Montserrat-SemiBold',
							fontSize: 16,
							marginBottom: 10
						}}>
						Пар нет. Бро, иди поспи
					</Text>
					<Image
						source={images.kizaru}
						style={{
							width: 200,
							height: 300
						}}
					/>
				</View>
			)}
		</>
	);
};

export default Pairs;
