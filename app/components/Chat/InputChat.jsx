import { TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";

const InputChat = () => {
  // const sendImage = async (uri, roomPath) => {
  //     const { url, fileName } = await uploadImage(
  //         uri,
  //         `image/rooms/${roomPath}`
  //     );
  // };
  //
  // const handlePhotoPicker = async () => {
  //     const result = await pickImage();
  //     if (!result.canceled) {
  //         await sendImage(result.assets[0].uri);
  //     }
  // };

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#1E1E1F",
        alignSelf: "center",
        width: "100%",
        flex: 0,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <TextInput
        placeholder="Введите сообщение..."
        style={{
          fontSize: 14,
          fontFamily: "Montserrat-Medium",
          lineHeight: 20,
          flex: 2,
          paddingRight: 10,
        }}
        placeholderTextColor={"#e5e5ea"}
        multiline={true}
      />
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity style={{ marginRight: 15 }}>
          <Feather name="camera" size={25} color={"#e5e5ea"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="attachment" size={25} color={"#e5e5ea"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputChat;
