import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox, StatusBar, View } from "react-native";
import "expo-dev-client";
import * as SplashScreen from "expo-splash-screen";

import StackNavigator from "./StackNavigator";
import { AuthProvider } from "./app/hooks/useAuth";
import AppContext from "./app/utils/Context";
import { useFonts } from "./app/hooks/useFonts";
import { ChatContextProvider } from "./app/utils/ChatContext";

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [handleClickPair, setHandleClickPair] = useState({});
  const [notes, setNotes] = useState([]);
  const [notesDataScreen, setNotesDataScreen] = useState([]);
  const [contactUser, setContactUser] = useState([]);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await useFonts();
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
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
        <AuthProvider>
          <ChatContextProvider>
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
          </ChatContextProvider>
        </AuthProvider>
      </AppContext.Provider>
      <StatusBar />
    </View>
  );
};

export default App;
