import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	Keyboard
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('screen');

const VuzScreen = () => {
	const [vuzInput, setVuzInput] = useState('');
	const [changeButton, setChangeButton] = useState(styles.conBtn);
	const [changeBtnText, setChangeBtnText] = useState(styles.btnText);

	const navigation = useNavigation();

	useEffect(() => {
		if (vuzInput !== '') {
			setChangeButton(styles.conBtnActive);
			setChangeBtnText(styles.btnTextActive);
		} else {
			setChangeButton(styles.conBtn);
			setChangeBtnText(styles.btnText);
		}
	}, [vuzInput]);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.containerKeyboard}>
			<View style={styles.con}>
				<View style={styles.conMain}>
					<View style={styles.content}>
						<Text style={styles.title}>Введите название ВУЗа</Text>
						<TextInput
							onChangeText={vuzInput => setVuzInput(vuzInput)}
							placeholder='Например МГУ'
							style={styles.inputVuz}
						/>
					</View>
					<TouchableOpacity
						style={[
							styles.container,
							{ marginBottom: Keyboard.enabled ? 60 : 0 }
						]}
						onPress={() => navigation.navigate('Home')}>
						<View style={changeButton}>
							<Text style={changeBtnText}>Продолжить</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default VuzScreen;

const styles = StyleSheet.create({
	containerKeyboard: {
		flex: 1,
		height
	},
	con: {
		backgroundColor: 'white',
		padding: 20
	},
	conMain: {
		alignSelf: 'center'
	},
	content: {
		flex: 1
	},
	title: {
		color: '#1E1E1E',
		fontWeight: '600',
		fontSize: 27,
		lineHeight: 32
	},
	inputVuz: {
		borderWidth: 1,
		borderColor: 'rgba(60, 60, 67, 0.13)',
		borderRadius: 8,
		backgroundColor: '#ffffff',
		padding: 10,
		marginTop: 50,
		fontWeight: '400',
		fontSize: 17,
		lineHeight: 24,
		color: 'rgba(60, 60, 67, 0.6)'
	},
	container: {
		alignItems: 'center'
	},
	conBtn: {
		backgroundColor: '#F2F2F7',
		borderRadius: 16,
		padding: 20,
		width: '100%',
		alignSelf: 'center',
		alignItems: 'center'
	},
	conBtnActive: {
		backgroundColor: '#0d9488',
		borderRadius: 16,
		padding: 20,
		width: '100%',
		alignSelf: 'center',
		alignItems: 'center'
	},
	btnText: {
		fontWeight: '500',
		fontSize: 17,
		lineHeight: 24,
		color: 'rgba(60, 60, 67, 0.6)'
	},
	btnTextActive: {
		fontWeight: '500',
		fontSize: 17,
		lineHeight: 24,
		color: '#ffffff'
	}
});
