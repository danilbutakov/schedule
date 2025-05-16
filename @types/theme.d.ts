// Расширяем типы темы для поддержки всех пользовательских цветов
import 'react-native';
import '@react-navigation/native';

// Описываем все цвета, которые есть в Theme.ts
export type CustomColors = {
	first: string;
	gray500: string;
	gray600: string;
	gray700: string;
	gray800: string;
	tertiary: string;
	secondary: string;
	green: string;
	fullWhite: string;
	bg: string;
};

declare module '@react-navigation/native' {
	export interface Theme {
		colors: CustomColors &
			typeof import('@react-navigation/native').DefaultTheme['colors'];
	}
}
