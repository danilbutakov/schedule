// Позволяет TypeScript импортировать SVG как React-компоненты
// и как путь к файлу (если нужно)
declare module '*.svg' {
	import * as React from 'react';
	import { SvgProps } from 'react-native-svg';
	const content: React.FC<SvgProps>;
	export default content;
}
