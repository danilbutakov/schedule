import styles from './SearchCard.module.scss';
import { groups } from '../../utils/Groups';

const SearchCard = () => {
	return (
		<div className='card'>
			<div className='cardInfo'>
				<h2>{groups.name}</h2>
				<span>
					{groups.qualification}, {groups.course}, {groups.typeOfEducation}
				</span>
			</div>
			<div>
				<img src='/assets/Arrow.svg' alt='Arrow' />
			</div>
		</div>
	);
};

export default SearchCard;
