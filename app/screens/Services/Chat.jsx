// @refresh reset
import "react-native-get-random-values";
import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Messages from "../../components/Chat/Messages";
import InputChat from "../../components/Chat/InputChat";
import auth from "@react-native-firebase/auth";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageView, setSelectedImageView] = useState("");

  const currentUser = auth().currentUser;

  return (
    <View style={styles.chat}>
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <Messages />
        <Messages />
        <Messages />
        <Messages />
        <Messages />
        <Messages />
      </View>
      <InputChat />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  chat: {
    flex: 1,
  },
});
