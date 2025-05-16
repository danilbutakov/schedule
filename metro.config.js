const { getDefaultConfig } = require('@expo/metro-config');

/** @type {import('metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Добавьте кастомные настройки, если нужно
config.resolver.assetExts.push('ttf'); // Пример: поддержка шрифтов
config.transformer.babelTransformerPath = require.resolve(
	'react-native-svg-transformer'
);

module.exports = config;
