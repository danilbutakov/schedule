import { FlatList } from 'react-native';

import { pairs } from '../../utils/Pairs';
import Pair from './Pair';

const Pairs = () => {
	return (
		<FlatList
			data={pairs}
			renderItem={({ item, index }) => (
				<Pair pair={item} index={index} pairs={pairs} />
			)}
		/>
	);
};

export default Pairs;
