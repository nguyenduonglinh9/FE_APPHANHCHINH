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
import {
  Feather,
  FontAwesome,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";

export default function ContactScreen({ route, navigation }) {
  const { userID, accessToken } = route.params;
  const [staff, setStaff] = useState([]);
  const [users, setUsers] = useState([]);
  //get all staff
  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/user/staff", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setStaff(data));
  }, []);

  //get all user
  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/user", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
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

  const renderItem = (type) => {
    return users
      .filter((item, index) => {
        return item.role == type;
      })
      .map((item, index) => {
        return (
          <Pressable
            onPress={() =>
              navigation.navigate("DetailContactScreen", { id: item.googleID })
            }
            key={item.googleID}
            style={styles.item}
          >
            <Image
              style={{ width: 50, aspectRatio: "1/1", borderRadius: 50 }}
              source={{ uri: item.imageURL }}
            ></Image>
            <Text style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </Pressable>
        );
      });
  };

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
            <View>{users.length > 0 ? renderItem("staff") : null}</View>
          )}
        </View>
        <View style={styles.list}>
          <Text
            style={{ padding: 10, opacity: 0.5, fontSize: 14, fontWeight: 600 }}
          >
            Phòng hành chính
          </Text>
          {staff.length == 0 ? (
            <Text>Chưa có nhân viên</Text>
          ) : (
            <View>{users.length > 0 ? renderItem("admin") : null}</View>
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
