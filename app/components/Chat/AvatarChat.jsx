import { Image, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const AvatarChat = ({ size, image }) => {
	return (
		<View style={{ marginRight: 10 }}>
			{image ? (
				<Image
					style={{
						borderRadius: size,
						width: size,
						height: size
					}}
					source={{ uri: String(image) }}
					resizeMode='cover'
				/>
			) : (
				<View
					style={{
						backgroundColor: '#1E1E1F',
						borderRadius: size,
						width: size,
						height: size,
						alignItems: 'center',
						justifyContent: 'center'
					}}>
					<Feather
						size={size - 20}
						name='user'
						color={'#81F2DE'}
						borderRadius={size}
					/>
				</View>
			)}
		</View>
	);
};

export default AvatarChat;
