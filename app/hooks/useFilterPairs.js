import { pairs } from '../utils/Pairs';

export const useFilterPairs = weekType => {
	const pairsOfWeek = pairs.map(pair =>
		pair.filter(p => p.typeWeek === weekType)
	);

	const filteredPairs = pairsOfWeek.filter(fp => fp.length !== 0);

	return { filteredPairs };
};
