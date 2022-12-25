import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

import { pickImage, uploadImage } from "../../utils/Functions";
import useAuth from "../../hooks/useAuth";
import { fs } from "../../../firebase";

const { height } = Dimensions.get("screen");

const UserInfo = () => {
  const { user } = useAuth();
  const [group, setGroup] = useState("");
  const [univ, setUniv] = useState("");
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState(null);

  const [menuItems, setMenuItems] = useState([]);
  const userRef = doc(fs, "users", user.uid);

  const fetchUserData = () => {
    const unsub = onSnapshot(userRef, (doc) => {
      if (doc.data()) {
        const docData = doc.data();
        setMenuItems([docData]);
        setImage(doc.data().photoURL);
      } else {
        setMenuItems(null);
      }
    });
    return unsub;
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdateGroup = async () => {
    await updateDoc(userRef, {
      group: group,
    });
  };
  const handleUpdateUniv = async () => {
    await updateDoc(userRef, {
      univ: univ,
    });
  };
  const handleUpdateName = async () => {
    await updateDoc(userRef, {
      profileName: userName,
    });
  };
  const handleUpdateImage = async () => {
    await updateDoc(userRef, {
      photoURL: image,
    });
  };
  const handleProfilePicture = async () => {
    const result = await pickImage();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      style={{
        paddingHorizontal: 20,
        paddingTop: 12,
        height,
        backgroundColor: "#F7F7F7",
      }}
    >
      {menuItems.map((item, key) => {
        if (item.group || item.univ) {
          return (
            <View style={styles.infoCon} key={key}>
              <View style={styles.infoMain}>
                <View style={styles.infoUser}>
                  <Text
                    style={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: 20,
                      lineHeight: 25,
                    }}
                  >
                    Группа
                  </Text>
                  <TextInput
                    style={styles.group}
                    placeholder={item.group}
                    value={group}
                    onChangeText={(text) => setGroup(text)}
                  />
                  <View style={styles.btnCon}>
                    <TouchableOpacity
                      style={styles.change}
                      onPress={() => {
                        Alert.alert(
                          "Изменение группы",
                          "Вы действительно хотите изменить вашу группу?",
                          [
                            {
                              text: "Отменить",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel",
                            },
                            {
                              text: "Изменить",
                              onPress: () => {
                                if (group !== "") {
                                  handleUpdateGroup(group);
                                  if (handleUpdateGroup) {
                                    Alert.alert("Вы успешно обновили группу");
                                    setGroup("");
                                  } else {
                                    Alert.alert("Не удалось обновить группу");
                                  }
                                } else {
                                  Alert.alert(
                                    "Поле группы пустое.",
                                    "Пожалуйста введите значение чтобы изменить данные"
                                  );
                                }
                              },
                            },
                          ]
                        );
                      }}
                    >
                      <View style={styles.changeCon}>
                        <Text style={styles.changeText}>Изменить группу</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: 20,
                      lineHeight: 25,
                    }}
                  >
                    ВУЗ
                  </Text>
                  <TextInput
                    style={styles.univ}
                    placeholder={item.univ}
                    value={univ}
                    onChangeText={(text) => setUniv(text)}
                  />
                  <View style={styles.btnCon}>
                    <TouchableOpacity
                      style={styles.change}
                      onPress={() => {
                        Alert.alert(
                          "Изменение ВУЗа?",
                          "Вы действительно хотите изменить ваш ВУЗ?",
                          [
                            {
                              text: "Отменить",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel",
                            },
                            {
                              text: "Изменить",
                              onPress: () => {
                                if (univ !== "") {
                                  handleUpdateUniv(univ);
                                  if (handleUpdateUniv) {
                                    Alert.alert("Вы успешно обновили ВУЗ");
                                    setUniv("");
                                  } else {
                                    Alert.alert("Не удалось обновить ВУЗ");
                                  }
                                } else {
                                  Alert.alert(
                                    "Поле ВУЗа пустое.",
                                    "Пожалуйста введите значение чтобы изменить данные"
                                  );
                                }
                              },
                            },
                          ]
                        );
                      }}
                    >
                      <View style={styles.changeCon}>
                        <Text style={styles.changeText}>Изменить ВУЗ</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: 20,
                      lineHeight: 25,
                    }}
                  >
                    Ваше имя
                  </Text>
                  <TextInput
                    style={styles.univ}
                    placeholder={item.profileName}
                    value={userName}
                    onChangeText={(text) => setUserName(text)}
                  />
                  <View style={styles.btnCon}>
                    <TouchableOpacity
                      style={styles.change}
                      onPress={() => {
                        Alert.alert(
                          "Изменение ВУЗа?",
                          "Вы действительно хотите изменить ваше Имя?",
                          [
                            {
                              text: "Отменить",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel",
                            },
                            {
                              text: "Изменить",
                              onPress: () => {
                                if (userName !== "") {
                                  handleUpdateName(userName);
                                  if (handleUpdateName) {
                                    Alert.alert("Вы успешно обновили имя");
                                    setUserName("");
                                  } else {
                                    Alert.alert("Не удалось обновить имя");
                                  }
                                } else {
                                  Alert.alert(
                                    "Поле имени пустое.",
                                    "Пожалуйста введите значение чтобы изменить данные"
                                  );
                                }
                              },
                            },
                          ]
                        );
                      }}
                    >
                      <View style={styles.changeCon}>
                        <Text style={styles.changeText}>Изменить имя</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: 20,
                      lineHeight: 25,
                    }}
                  >
                    Ваше фото профиля
                  </Text>
                  <TouchableOpacity
                    onPress={handleProfilePicture}
                    style={{ alignSelf: "center", marginTop: 30 }}
                  >
                    {image && (
                      <Image
                        source={{ uri: image }}
                        style={{ width: 150, height: 150, borderRadius: 100 }}
                      />
                    )}
                  </TouchableOpacity>
                  <View style={styles.btnCon}>
                    <TouchableOpacity
                      style={styles.change}
                      onPress={async () => {
                        let photoURL;
                        if (image) {
                          const { url } = await uploadImage(
                            image,
                            `images/${user.uid}`,
                            "profilePicture"
                          );
                          photoURL = url;
                        }
                        if (photoURL) {
                          setImage(photoURL);
                        }
                        const userData = { photoURL: photoURL };
                        await Promise.all([
                          user.updateProfile(userData),
                          handleUpdateImage(),
                        ]).then(() => {
                          console.log("good update");
                          Alert.alert("Вы успешно обновили фото");
                        });
                      }}
                    >
                      <View style={styles.changeCon}>
                        <Text style={styles.changeText}>Изменить фото</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        }
      })}
    </ScrollView>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  infoCon: {
    marginTop: 10,
    marginBottom: 40,
  },
  infoMain: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  infoUser: {
    width: "100%",
  },
  btnCon: {
    marginBottom: 20,
  },
  group: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "rgba(60, 60, 67, 0.13)",
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginTop: 20,
    fontSize: 14,
    lineHeight: 24,
    color: "rgba(60, 60, 67, 0.6)",
    fontFamily: "Montserrat-Medium",
  },
  univ: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "rgba(60, 60, 67, 0.13)",
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginTop: 20,
    fontSize: 14,
    lineHeight: 24,
    color: "rgba(60, 60, 67, 0.6)",
    fontFamily: "Montserrat-Medium",
  },
  change: {
    marginTop: 20,
  },
  changeCon: {
    padding: 15,
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#1E1E1F",
    width: "100%",
  },
  changeText: {
    fontSize: 17,
    lineHeight: 20,
    color: "#FFFFFF",
    fontFamily: "Montserrat-SemiBold",
  },
});
