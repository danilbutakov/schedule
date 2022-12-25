import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import auth from "@react-native-firebase/auth";

import { fs } from "../../../firebase";
import Avatar from "./Avatar";
import Feather from "react-native-vector-icons/Feather";

const ContactItem = ({ user, type }) => {
  const navigation = useNavigation();
  const date = new Date();
  const currentUser = auth().currentUser;

  const handleSelect = async () => {
    // создаем комбо id двух юзеров в чате
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(fs, "chats", combinedId));
      const resUserChats = await getDoc(doc(fs, "userChats", combinedId));
      const resCurrentUserChats = await getDoc(
        doc(fs, "userChats", combinedId)
      );
      //создаем чат в коллекции чатов

      if (!res.exists()) {
        await setDoc(doc(fs, "chats", combinedId), {
          messages: [],
        });

        //создаем чаты юзеров
        if (!resUserChats.exists() && !resCurrentUserChats.exists()) {
          await setDoc(doc(fs, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName || user.profileName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
          await setDoc(doc(fs, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName || currentUser.profileName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        } else {
          //для текущего юзера
          await updateDoc(doc(fs, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName || user.profileName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          //для другого юзера
          await updateDoc(doc(fs, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName || currentUser.profileName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
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
          <Feather size={40} name="message-circle" color={"#3eb59f"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactItem;
