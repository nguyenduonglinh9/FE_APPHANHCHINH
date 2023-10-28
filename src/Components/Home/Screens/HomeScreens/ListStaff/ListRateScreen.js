import {
  Dimensions,
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
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
import moment from "moment/moment";
import { Rating } from "@kolking/react-native-rating";

export default function ListRateScreen({ route, navigation, toDetailScreen }) {
  const { userID, accessToken } = route.params;
  const [staff, setStaff] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [rating, setRating] = useState(0);
  //get all staff
  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/user/staff")
      .then((res) => res.json())
      .then((data) => setStaff(data));
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

  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/user", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const renderUser = (userID) => {
    return users
      .filter((item, index) => {
        return item.googleID == userID;
      })
      .map((item, index) => {
        return (
          <Text key={item.googleID} style={{ marginTop: 5, marginBottom: 5 }}>
            Người yêu cầu :{" "}
            <Text style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</Text>
          </Text>
        );
      });
  };

  const renderStaff = (type) => {
    return tickets
      .filter((item, index) => {
        return item.type == type;
      })
      .map((item, index) => {
        return (
          <Pressable
            onPress={() => toDetailScreen(item._id)}
            key={item._id}
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#f1f4f5",
                width: "70%",
                padding: 5,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            >
              <View>{renderUser(item.userID)}</View>
              <View style={{ marginTop: 5, marginBottom: 5 }}>
                <Text>
                  Phòng:{" "}
                  <Text style={{ fontSize: 14, fontWeight: 600 }}>
                    {item.room} - {item.title}
                  </Text>
                </Text>
              </View>
              <View style={{ marginTop: 5, marginBottom: 5 }}>
                <Text>
                  Thời gian : {moment(item.createdAt).format("hh:mm a")}{" "}
                  {moment(item.createdAt).format("DD-MM-yyyy")}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "30%",
                backgroundColor: "#2d5381",
                padding: 5,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: 600, color: "#ffffff" }}>
                Đánh giá
              </Text>
              {item.star == "" ? (
                <Text style={{ color: "white" }}>Chưa có đánh giá</Text>
              ) : (
                <Rating
                  style={{ height: 60 }}
                  size={10}
                  rating={item.star}
                  // onChange={handleChange}
                />
              )}
            </View>
          </Pressable>
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={{ fontWeight: 700, fontSize: 24 }}>Đánh giá</Text>
        </View>
        <ScrollView>
          <View style={{ paddingBottom: 100 }}>
            <View style={styles.list}>
              <Text
                style={{
                  padding: 10,
                  opacity: 0.5,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Phòng kỹ thuật
              </Text>
              {staff.length == 0 ? (
                <Text>Chưa có nhân viên</Text>
              ) : (
                renderStaff((type = "baocaosuco"))
              )}
            </View>
            <View style={styles.list}>
              <Text
                style={{
                  padding: 10,
                  opacity: 0.5,
                  fontSize: 14,
                  fontWeight: 600,
                }}
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
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#2d5381",
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
