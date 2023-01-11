import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState, useContext } from "react";

import { AppContext } from "../utils/Context";

const NotesScreen = () => {
  const { notesDataScreen } = useContext(AppContext);

  const [showNotes, setShowNotes] = useState();

  useEffect(() => {
    if (notesDataScreen !== []) {
      setShowNotes(true);
    } else {
      setShowNotes(false);
    }
  });

  return (
    <View style={{ backgroundColor: "#F7F7F7", height: "100%" }}>
      {showNotes ? (
        <ScrollView>
          {/* {notesDataScreen.map((note1, key) => (
						<View key={key}>
							<Text>{note1.date}</Text>
							<Button title='Press' onPress={() => console.log(note1)} />
						</View>
					))} */}
          <Text
            style={{
              fontFamily: "Montserrat-SemiBold",
              fontSize: 15,
              lineHeight: 20,
              marginTop: 20,
              paddingHorizontal: 20,
            }}
          >
            В скором будущем
          </Text>
        </ScrollView>
      ) : (
        <Text>Заметок нет</Text>
      )}
    </View>
  );
};

export default NotesScreen;
