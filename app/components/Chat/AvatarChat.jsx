import { Image, View } from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import auth from "@react-native-firebase/auth";

const AvatarChat = ({ size, image }) => {
  const currentUser = auth().currentUser;
  const [filteredImage, setFilteredImage] = useState(null);

  useEffect(() => {
    if (image.length >= 1) {
      image.filter((i) =>
        i !== currentUser.photoURL ? setFilteredImage(i) : null
      );
    }
  }, [image]);

  return (
    <View style={{ marginRight: 10 }}>
      {image ? (
        <Image
          style={{
            borderRadius: size,
            width: size,
            height: size,
          }}
          source={{ uri: filteredImage }}
          resizeMode="cover"
        />
      ) : (
        <View
          style={{
            backgroundColor: "#1E1E1F",
            borderRadius: size,
            width: size,
            height: size,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather
            size={size - 20}
            name="user"
            color={"#81F2DE"}
            borderRadius={size}
          />
        </View>
      )}
    </View>
  );
};

export default AvatarChat;
