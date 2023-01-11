import { Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

import { fs } from "../../../firebase";
import AvatarChat from "../../components/Chat/AvatarChat";

const Chats = () => {
  const currentUser = auth().currentUser;
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();
  const [curUser, setCurUser] = useState(null);

  useEffect(() => {
    const getChats = async () => {
      const qU = query(
        collection(fs, "users"),
        where("email", "==", currentUser.email)
      );

      const querySnapshot = await getDocs(qU);
      querySnapshot.forEach((doc) => {
        setCurUser(doc.data());
      });

      const q = query(collection(fs, "chats"));

      const unsub = onSnapshot(q, (snapshot) => {
        if (snapshot.docs.length) {
          const chatDoc = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setChats(chatDoc);
        }
      });
      return () => unsub();
    };
    currentUser.uid && getChats();
  }, [currentUser]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
        backgroundColor: "#F7F7F7",
        paddingHorizontal: 10,
      }}
    >
      {chats !== undefined &&
        chats
          .filter((c) => c.uids.includes(currentUser.uid))
          .map((chat, key) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Chat", { chat });
                }}
                key={key}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 150,
                  padding: 5,
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AvatarChat
                      image={chat.photos.filter(
                        (photo) => photo !== currentUser.photoURL
                      )}
                      size={50}
                    />
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View style={{ flexDirection: "column" }}>
                        <Text
                          style={{
                            fontFamily: "Montserrat-SemiBold",
                            fontSize: 16,
                          }}
                        >
                          {chat.names.filter(
                            (name) => name !== curUser.profileName
                          )}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          {chat?.lastMessage && (
                            <View
                              style={{
                                flexDirection: "row",
                                marginTop: 7,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: "#81F2DF",
                                  fontFamily: "Montserrat-Regular",
                                }}
                              >
                                Вы: {""}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: "Montserrat-Regular",
                                  fontSize: 14,
                                  maxWidth: 160,
                                }}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                              >
                                {/* {description} */}
                              </Text>
                            </View>
                          )}
                          {chat?.date && (
                            <View style={{ marginTop: 7, marginLeft: 10 }}>
                              <Text
                                style={{
                                  fontFamily: "Montserrat-Medium",
                                  color: "#A5A5A5",
                                }}
                              >
                                {new Date()
                                  .toLocaleTimeString()
                                  .replace(/(.*)\D\d+/, "$1")}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
    </View>
  );
};

export default Chats;
