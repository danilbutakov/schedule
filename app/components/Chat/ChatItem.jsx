import { Text, View } from "react-native";
import React from "react";

const ChatItem = ({ chat }) => {
  return (
    <View>
      <Text>{chat[1]}</Text>
    </View>
  );
};

export default ChatItem;
