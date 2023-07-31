import React from 'react';

export const PreferencesContext = React.createContext({
	toggleTheme: (type: string) => {},
	isThemeDark: false
});
