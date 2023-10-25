import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScrollViewIndicator } from "@fanchenbao/react-native-scroll-indicator";
import moment from "moment";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function HistoryScreen({ route, navigation }) {
  const { userID, accessToken } = route.params;
  const [user, setUser] = useState();
  const [tickets, setTickets] = useState([]);
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "rgb(45, 83, 129)",
      background: "#2d5381",
      card: "rgb(244, 245, 242)",
    },
  };
  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/user/${userID}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/ticket", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setTickets(data));
  }, []);

  const renderTicket = () => {
    const filterTicket = tickets.filter((item, index) => {
      return item.userID == userID;
    });

    if (filterTicket.length <= 0) {
      return <Text>Bạn Chưa Tạo Bất Kì Phiếu Hỗ Trợ Nào !</Text>;
    } else {
      return filterTicket.map((item, index) => {
        return (
          <Pressable
            onPress={() =>
              navigation.navigate("DetailTicket", { idTicket: item._id })
            }
            style={styles.itemTicket}
            key={index}
          >
            <Text style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
              {item.title}
            </Text>
            <Text>
              {item.status == "pending"
                ? `Người tiếp nhận : Chưa tiếp nhận`
                : null}
            </Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ marginRight: 10 }}>
                {moment(item.createdAt).format("DD-MM-YYYY")}
              </Text>
              <Text style={{ marginRight: 10 }}>
                {moment(item.createdAt).format("hh:mm a")}
              </Text>
              <Text>Phòng : {item.room}</Text>
            </View>
          </Pressable>
        );
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.infor}>
          <Image
            style={{ height: "100%", aspectRatio: "1/1", borderRadius: 10 }}
            source={
              user == null
                ? require("../../../../../assets/images/user-image.png")
                : { uri: user.imageURL }
            }
          ></Image>
          <Text style={{ fontSize: 16, color: "#fff", width: "60%" }}>
            {user == null ? "User Full Name" : user.name}
          </Text>
          <Image
            source={require("../../../../../assets/Icons/bell.png")}
          ></Image>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 700,
            lineHeight: 27,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          Lịch Sử
        </Text>

        <ScrollView style={{ width: "90%" }}>
          {tickets.length != 0 ? renderTicket() : null}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // backgroundColor: "yellow",
    justifyContent: "flex-end",
  },
  body: {
    width: "100%",
    height: "80%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "relative",
    paddingTop: 10,
    display: "flex",
    alignItems: "center",
  },
  infor: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    bottom: "100%",
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    lineHeight: 24,
  },
  itemTicket: {
    width: "90%",
    backgroundColor: "#f1f4f5",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
});
