import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchImg from "../../../assets/svgUtils/search.svg";
import Delete from "../../../assets/svgUtils/delete.svg";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { fs } from "../../../firebase";
import auth from "@react-native-firebase/auth";
import Avatar from "./Avatar";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const SearchContacts = () => {
  const currentUser = auth().currentUser;
  const navigation = useNavigation();

  const [searchValue, setSearchValue] = useState<string>("");
  const newSearchValue = searchValue.toLowerCase();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [userPhoto, setUserPhoto] = useState([]);
  const [err, setErr] = useState<boolean>(false);

  const handleSelect = async (user) => {
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
              displayName: currentUser.displayName,
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
              displayName: currentUser.displayName,
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

  const handleSearch = async () => {
    const q = query(
      collection(fs, "users"),
      where("uid", "!=", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data() };
        })
      );
      return () => unsubscribe();
    });

    if (searchValue.length > 2) {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.profileName.toLowerCase().includes(newSearchValue) ||
            user.email.toLowerCase().includes(newSearchValue)
        )
      );
    } else {
      setFilteredUsers([]);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  return (
    <View style={styles.searchCont}>
      <View style={styles.searchBlock}>
        <View style={styles.inputBlock}>
          <View style={styles.leftBlock}>
            <SearchImg width={12} height={12} style={{ marginRight: 13 }} />
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => {
                setSearchValue(text);
              }}
              value={searchValue}
              placeholder="Поиск по имени или e-mail"
            />
          </View>
          {searchValue && (
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setSearchValue("")}
            >
              <Delete width={20} height={20} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {filteredUsers.length > 0 && (
        <ScrollView
          style={{
            backgroundColor: "#e5e5ea",
            borderRadius: 16,
            paddingTop: 20,
            paddingHorizontal: 10,
          }}
        >
          {filteredUsers.map((user, key) => (
            <View
              style={{
                borderRadius: 20,
                marginBottom: 20,
                flex: 1,
              }}
              key={key}
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
                  <Avatar user={user} size={50} />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "Montserrat-Bold",
                        fontSize: 14,
                        marginBottom: 5,
                      }}
                    >
                      {user.profileName}
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
                        {user.email}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleSelect(user).then((r) => console.log(r));
                  }}
                >
                  <Feather size={40} name="message-circle" color={"#3eb59f"} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#7c7772",
                  paddingTop: 10,
                }}
              ></View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SearchContacts;

const styles = StyleSheet.create({
  searchCont: {
    width: "100%",
    paddingHorizontal: 5,
    marginVertical: 5,
    borderRadius: 16,
  },
  searchBlock: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#e5e5ea",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 5,
  },
  inputBlock: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 16,
    flex: 1,
  },
  leftBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 14,
  },
  inputText: {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    lineHeight: 20,
    flex: 14,
  },
});
