import { FlatList, RefreshControl, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import auth from "@react-native-firebase/auth";

import { fs } from "../../../firebase";
import ContactItem from "../../components/Contacts/ContactItem";
import SearchContacts from "../../components/Contacts/SearchContacts";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ContactsScreen = () => {
  const route = useRoute();
  const image = route.params && route.params.image;
  const [contacts, setContacts] = useState([]);
  const currentUser = auth().currentUser;

  const fetchData = async () => {
    const q = query(
      collection(fs, "users"),
      where("email", "!=", currentUser.email)
    );

    await getDocs(q).then((snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setContacts(newData);
      if (refreshing) {
        setContacts(newData);
      }
    });
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => console.log("good"));
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchData().then(() => console.log("good"));
  }, [refreshing]);

  console.log(contacts);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
        backgroundColor: "#F7F7F7",
        paddingHorizontal: 10,
      }}
    >
      <SearchContacts />
      <FlatList
        style={{ marginTop: 7, marginBottom: 10 }}
        data={contacts}
        keyExtractor={(_, i) => i}
        renderItem={({ item }) => (
          <ContactPreview
            contact={item}
            image={image}
            refreshing={refreshing}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const ContactPreview = ({ contact, image, refreshing }) => {
  const [userPreview, setUserPreview] = useState(contact);

  useEffect(() => {
    setUserPreview(contact);
  }, [refreshing]);
  useEffect(() => {
    const q = query(
      collection(fs, "users"),
      where("email", "==", userPreview.email)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length) {
        const userDoc = snapshot.docs[0].data();
        setUserPreview((prevUser) => ({ ...prevUser, userDoc }));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <ContactItem
      style={{ marginTop: 7, marginBottom: 10 }}
      type="contacts"
      user={userPreview}
      image={image}
    />
  );
};

export default ContactsScreen;
