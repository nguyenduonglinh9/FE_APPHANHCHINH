import {
  Dimensions,
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Feather,
  FontAwesome,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export default function ContactScreen() {
  const [staff, setStaff] = useState([]);
  //get all staff
  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/user/staff")
      .then((res) => res.json())
      .then((data) => setStaff(data));
  }, []);

  const ItemStaff = ({ data }) => (
    <View style={styles.item}>
      <Image
        style={{ width: 50, aspectRatio: "1/1", borderRadius: 50 }}
        source={{ uri: data.imageURL }}
      ></Image>
      <Text style={{ fontSize: 14, fontWeight: 500 }}>{data.name}</Text>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          {/* <MaterialIcons
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
            }}
            name="keyboard-arrow-left"
            size={24}
            color="black"
          /> */}
          <Text style={{ fontWeight: 700, fontSize: 24 }}>Liên hệ</Text>
        </View>
        <View style={styles.list}>
          <Text
            style={{ padding: 10, opacity: 0.5, fontSize: 14, fontWeight: 600 }}
          >
            Phòng kỹ thuật
          </Text>
          {staff.length == 0 ? (
            <Text>Chưa có nhân viên</Text>
          ) : (
            <FlatList
              initialNumToRender={1}
              data={staff}
              renderItem={({ item }) => <ItemStaff data={item} />}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d5381",
    display: "flex",
    justifyContent: "flex-end",
  },
  content: {
    height: "95%",
    backgroundColor: "#fff",
    width: "100%",
  },
  header: {
    padding: 10,
    display: "flex",
    position: "relative",
    alignItems: "center",
  },
  list: {
    // backgroundColor: "red",
    width: "100%",
    display: "flex",
  },
  item: {
    width: "90%",
    backgroundColor: "#f1f4f5",
    display: "flex",
    flexDirection: "row",
    padding: 15,
    alignSelf: "center",
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  //   title: {
  //     fontSize: 14,
  //     fontWeight: 500,
  //   },
});
