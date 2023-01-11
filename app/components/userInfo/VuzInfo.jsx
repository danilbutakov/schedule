import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { DismissKeyboardView } from "../../hooks/HideKeyBoard";

const { height } = Dimensions.get("screen");

const VuzInfo = ({ univ, setUniv, setShowUniv, setShowGroup }) => {
  const [changeButton, setChangeButton] = useState(styles.conBtn);
  const [changeBtnText, setChangeBtnText] = useState(styles.btnText);

  useEffect(() => {
    if (univ !== "") {
      setChangeButton(styles.conBtnActive);
      setChangeBtnText(styles.btnTextActive);
    } else {
      setChangeButton(styles.conBtn);
      setChangeBtnText(styles.btnText);
    }
  }, [univ]);

  return (
    <DismissKeyboardView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.containerKeyboard}
    >
      <View style={styles.con}>
        <View style={styles.content}>
          <Text style={styles.title}>Введите название ВУЗа</Text>
          <TextInput
            value={univ}
            onChangeText={(univ) => setUniv(univ)}
            placeholder="Например МГУ"
            style={styles.inputVuz}
          />
        </View>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            if (univ !== "") {
              setShowUniv(false);
              setShowGroup(true);
            }
          }}
        >
          <View style={changeButton}>
            <Text style={changeBtnText}>Продолжить</Text>
          </View>
        </TouchableOpacity>
      </View>
    </DismissKeyboardView>
  );
};

export default VuzInfo;

const styles = StyleSheet.create({
  containerKeyboard: {
    flex: 1,
    height,
  },
  con: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  conMain: {
    alignSelf: "center",
  },
  content: {
    flex: 1,
  },
  title: {
    color: "#1E1E1F",
    fontSize: 24,
    lineHeight: 32,
    fontFamily: "Montserrat-SemiBold",
  },
  inputVuz: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "rgba(60, 60, 67, 0.13)",
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginTop: 50,
    fontSize: 14,
    lineHeight: 24,
    color: "rgba(60, 60, 67, 0.6)",
    fontFamily: "Montserrat-Medium",
  },
  container: {
    alignItems: "center",
  },
  conBtn: {
    backgroundColor: "#F2F2F7",
    padding: 17,
    alignItems: "center",
    borderRadius: 16,
    width: "100%",
  },
  conBtnActive: {
    padding: 17,
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#1E1E1F",
    width: "100%",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 20,
    color: "rgba(60, 60, 67, 0.6)",
    fontFamily: "Montserrat-SemiBold",
  },
  btnTextActive: {
    fontSize: 17,
    lineHeight: 20,
    color: "#FFFFFF",
    fontFamily: "Montserrat-SemiBold",
  },
});
