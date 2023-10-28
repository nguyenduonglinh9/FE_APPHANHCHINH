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

export default function ListStaffScreen({ toDetailScreen, route, navigation }) {
  const [staff, setStaff] = useState([]);
  const { userID, accessToken } = route.params;
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

  const renderStaff = (type) => {
    return staff
      .filter((item, index) => {
        return item.employeeType == type;
      })
      .map((item, index) => {
        return (
          <Pressable
            onPress={() => toDetailScreen(item.googleID)}
            key={index}
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
          <Text style={{ fontWeight: 700, fontSize: 24 }}>
            Danh sách nhân sự
          </Text>
        </View>
        <View style={styles.list}>
          <Text
            style={{ padding: 10, opacity: 0.5, fontSize: 14, fontWeight: 600 }}
          >
            Phòng sự cố
          </Text>
          {staff.length == 0 ? (
            <Text>Chưa có nhân viên</Text>
          ) : (
            renderStaff((type = "baocaosuco"))
          )}
        </View>
        <View style={styles.list}>
          <Text
            style={{ padding: 10, opacity: 0.5, fontSize: 14, fontWeight: 600 }}
          >
            Phòng công nghệ thông tin
          </Text>
          {staff.length == 0 ? (
            <Text>Chưa có nhân viên</Text>
          ) : (
            renderStaff((type = "cntt"))
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  content: {
    height: "100%",
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
});
