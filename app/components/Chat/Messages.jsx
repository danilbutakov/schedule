import { SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Message from "./Message";

const Messages = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{
          backgroundColor: "#ffffff",
          paddingHorizontal: 10,
        }}
      >
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Messages;
