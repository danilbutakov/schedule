import React from 'react';

const AppContext = React.createContext({
	rooms: [],
	setRooms: () => {},
	unfilteredRooms: [],
	setUnfilteredRooms: () => {}
});

export default AppContext;
