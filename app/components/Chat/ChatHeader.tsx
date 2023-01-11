import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { images } from "../../../assets/globalImages";
import Avatar from "./AvatarChat";
import auth from "@react-native-firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { fs } from "../../../firebase";

const ChatHeader = () => {
  const navigation = useNavigation();
  const currentUser = auth().currentUser;
  const route = useRoute();
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [userUid, setUserUid] = useState<number>();
  const [userB, setUserB] = useState([]);
  const [curUser, setCurUser] = useState<any>();
  const [isLoadingCurUser, setIsLoadingCurUser] = useState(false);

  const handleUser = async () => {
    const q = await query(
      collection(fs, "users"),
      where("email", "==", currentUser.email)
    );

    const querySnapshot = await getDocs(q);
    await querySnapshot.forEach((doc) => {
      setCurUser({ ...doc.data() });
    });
  };

  const handleUserB = async () => {
    handleUser().then(() => setIsLoadingCurUser(true));
    const getUserName = async () => {
      const chatUserName = await route.params.chat.names.filter(
        (name) => name !== curUser?.profileName
      );
      setUserName(chatUserName);
    };

    const getUserInfo = async () => {
      const chatUserUid = route.params.chat.uids.filter(
        (uid) => uid !== curUser?.uid
      );
      await setUserUid(chatUserUid);

      const q = query(collection(fs, "users"), where("uid", "==", userUid));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setUserB(
          querySnapshot.docs.map((doc) => {
            return { ...doc.data() };
          })
        );
        return () => unsubscribe();
      });
    };
    isLoadingCurUser && getUserName() && getUserInfo();
  };

  console.log(userB.map((b) => b.uid));

  useEffect(() => {
    handleUserB();
  }, [isLoadingCurUser]);

  return (
    <View
      style={{
        backgroundColor: "#F7F7F7",
        borderBottomColor: "rgba(60, 60, 67, 0.13)",
        borderBottomWidth: 1,
        marginTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("chats")}>
        <Image
          source={images.arrowLeft}
          style={{
            width: 10,
            height: 20,
            marginRight: 5,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("ContactInfo", { user: userB })}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 20,
            alignItems: "center",
          }}
        >
          <Avatar
            size={40}
            image={route.params.chat.photos.filter(
              (photo) => photo !== currentUser.photoURL
            )}
          />
          <Text
            style={{
              fontFamily: "Montserrat-SemiBold",
              fontSize: 19,
              lineHeight: 25,
              color: "1E1E1F",
            }}
          >
            {userName}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeader;
