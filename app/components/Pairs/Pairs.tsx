import { View, Text, Image } from 'react-native';
import React from 'react';
import { FlashList } from '@shopify/flash-list';

import { images } from '../../../assets/globalImages';

const Pairs = React.memo(({ pairs }) => {
	return (
		<>
			{pairs.length ? (
				<FlashList
					estimatedItemSize={165}
					data={pairs}
					renderItem={renderItem}
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
});

export default Pairs;
