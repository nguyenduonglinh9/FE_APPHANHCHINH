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
import moment from "moment";

export default function TicketPending({ route, navigation }) {
  const { accessToken, switchScreen, userID } = route.params;
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/ticket", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setTickets(data));
  }, []);

  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/user", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const renderUser = (id) => {
    if (users != null) {
      return users
        .filter((item, index) => {
          return item.googleID == id;
        })
        .map((item, index) => {
          return (
            <>
              <View
                key={item.googleID}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: 50,
                    aspectRatio: "1/1",
                    borderRadius: 50,
                  }}
                  source={{
                    uri: item.imageURL || null,
                  }}
                ></Image>
                <Text style={{ fontSize: 12, fontWeight: 500 }}>
                  {item.name}
                </Text>
              </View>
            </>
          );
        });
    }
  };
  const RenderTicket = () => {
    return tickets
      .filter((item, index) => {
        return item.status == "pending";
      })
      .map((item, index) => {
        return (
          <Pressable
            onPress={() => switchScreen(item._id)}
            key={index}
            style={styles.item}
          >
            <Text style={{ fontWeight: 500, fontSize: 16 }}>{item.title}</Text>
            <View>{renderUser(item.userID)}</View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text>{item.build}</Text>
              <Text style={{ marginLeft: 20 }}>Phòng : {item.room}</Text>
              <Text style={{ marginLeft: 20 }}>
                {moment(item.createdAt).format("hh:mm a")}
              </Text>
              <Text style={{ marginLeft: 20 }}>
                {moment(item.createdAt).format("DD/MM/YYYY")}
              </Text>
            </View>
          </Pressable>
        );
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {tickets.length == 0 ? (
          <Text>Chưa có phiếu hỗ trọ yêu cầu</Text>
        ) : (
          RenderTicket()
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  list: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  item: {
    backgroundColor: "#ffffff",
    padding: 20,
    shadowColor: "#000",
    marginTop: 10,
    borderRadius: 10,
    width: "90%",
    marginBottom: 10,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
});
