import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { fs } from "../../../firebase";
import Avatar from "./Avatar";

const ContactItem = ({ user, type }) => {
  const navigation = useNavigation();
  const date = new Date();
  const currentUser = auth().currentUser;
  const [curUser, setCurUser] = useState(null);

  const fetchCurrentUser = async () => {
    const q = query(
      collection(fs, "users"),
      where("email", "==", currentUser.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCurUser(doc.data());
    });
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [currentUser]);

  const handleSelect = async () => {
    // создаем комбо id двух юзеров в чате
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(fs, "chats", combinedId));
      // const resUserChats = await getDoc(doc(fs, "userChats", combinedId));

      //создаем чаты юзеров
      if (!res.exists()) {
        //создаем чат в коллекции чатов
        await setDoc(doc(fs, "chats", combinedId), {
          messages: [],
          uids: [currentUser.uid, user.uid],
          names: [user.displayName || user.profileName, curUser.profileName],
          photos: [user.photoURL, currentUser.photoURL],
          date: serverTimestamp(),
          combinedId: combinedId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 20,
        flex: 1,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("ContactInfo", { user })}
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Avatar user={user} size={type === "contacts" ? 50 : 50} />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "Montserrat-Bold",
                fontSize: 14,
                marginBottom: 5,
              }}
            >
              {user.profileName || user.displayName}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  fontFamily: "Montserrat-Regular",
                  color: "#8E8E93",
                  fontSize: 14,
                  flex: 3.5,
                  paddingRight: 10,
                }}
              >
                {user.univ}, {user.group}
              </Text>
              <Text
                style={{
                  fontFamily: "Montserrat-Regular",
                  color: "#b3b3b3",
                  fontSize: 13,
                  marginBottom: 5,
                  flex: 1,
                }}
              >
                {/* {user.time} */}
                {date.getHours()}:{date.getMinutes()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSelect}>
          <Ionicons size={35} name="md-chatbubbles-sharp" color={"#3eb59f"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactItem;