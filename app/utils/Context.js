import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
	const [group, setGroup] = useState('');
	const [univ, setUniv] = useState('');
	const [userName, setUserName] = useState('');

	return (
		<AppContext.Provider
			value={{
				group,
				setGroup,
				univ,
				setUniv,
				userName,
				setUserName
			}}>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
