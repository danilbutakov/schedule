import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
	const [group, setGroup] = useState('');
	const [univ, setUniv] = useState('');
	const [userName, setUserName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [newImage, setNewImage] = useState(null);
	const [existsParams, setExistsParams] = useState(false);

	return (
		<AppContext.Provider
			value={{
				group,
				setGroup,
				univ,
				setUniv,
				userName,
				setUserName,
				isLoading,
				setIsLoading,
				newImage,
				setNewImage,
				existsParams,
				setExistsParams
			}}>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
