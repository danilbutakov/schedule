import "react-native-get-random-values";
import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Messages from "../../components/Chat/Messages";
import InputChat from "../../components/Chat/InputChat";
import auth from "@react-native-firebase/auth";
import { DismissKeyboardView } from "../../components/HideKeyBoard";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageView, setSelectedImageView] = useState("");

  const currentUser = auth().currentUser;

  return (
    <DismissKeyboardView style={styles.chat}>
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <Messages />
      </View>
      <InputChat />
    </DismissKeyboardView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  chat: {
    flex: 1,
  },
});
