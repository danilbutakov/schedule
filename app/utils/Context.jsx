import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [handleClickPair, setHandleClickPair] = useState({});
  const [notes, setNotes] = useState([]);
  const [notesDataScreen, setNotesDataScreen] = useState([]);
  const [contactUser, setContactUser] = useState([]);

  return (
    <AppContext.Provider
      value={{
        handleClickPair,
        setHandleClickPair,
        notes,
        setNotes,
        notesDataScreen,
        setNotesDataScreen,
        contactUser,
        setContactUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
