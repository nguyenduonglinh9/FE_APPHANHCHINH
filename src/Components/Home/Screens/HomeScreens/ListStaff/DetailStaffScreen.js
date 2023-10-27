import {
  Dimensions,
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  Feather,
  FontAwesome,
  AntDesign,
  MaterialIcons,
  Fontisto,
  Octicons,
} from "@expo/vector-icons";
import Constants from "expo-constants";
import { CommonActions } from "@react-navigation/native";
import { Rating } from "@kolking/react-native-rating";
import Modal from "react-native-modal";

export default function DetailStaffScreen({ route, navigation }) {
  const { id, accessToken } = route.params;
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/user/${id}`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/ticket`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setTickets(data));
  }, []);

  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/user`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const renderUser = (id) => {
    return users
      .filter((item, index) => {
        return item.googleID == id;
      })
      .map((item, index) => {
        return (
          <Text style={{ width: "60%", fontWeight: 400, fontSize: 14 }}>
            Người đánh giá :{" "}
            <Text style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</Text>
          </Text>
        );
      });
  };

  const renderRate = () => {
    return tickets
      .filter((item, index) => {
        return item.staffID == user.googleID;
      })
      .map((item, index) => {
        if (index == 0 || index == 1) {
          return (
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                backgroundColor: "#f1f4f5",
                padding: 20,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <Text style={{ width: "20%", fontWeight: 600, fontSize: 14 }}>
                  {item.room}
                </Text>
                {renderUser(item.userID)}
                <View
                  style={{
                    width: "20%",
                    display: "flex",
                    flexDirection: "row",

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item.star == "" ? (
                    <Text>Chưa có đánh giá</Text>
                  ) : (
                    <>
                      <Octicons name="star-fill" size={24} color="#ffe144" />
                      <Text style={{ marginLeft: 5 }}>{item.star}</Text>
                    </>
                  )}
                </View>
              </View>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text>{item.comment}</Text>
              </View>
            </View>
          );
        }
      });
  };
  const renderRateFull = () => {
    return tickets
      .filter((item, index) => {
        return item.staffID == user.googleID;
      })
      .map((item, index) => {
        return (
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              backgroundColor: "#f1f4f5",
              padding: 20,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,

              elevation: 4,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ width: "20%", fontWeight: 600, fontSize: 14 }}>
                {item.room}
              </Text>
              {renderUser(item.userID)}
              <View
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.star == "" ? (
                  <Text>Chưa có đánh giá</Text>
                ) : (
                  <>
                    <Octicons name="star-fill" size={24} color="#ffe144" />
                    <Text style={{ marginLeft: 5 }}>{item.star}</Text>
                  </>
                )}
              </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text>{item.comment}</Text>
            </View>
          </View>
        );
      });
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <MaterialIcons
            onPress={() => navigation.dispatch(CommonActions.goBack())}
            name="keyboard-arrow-left"
            size={24}
            color="white"
          />
          <Fontisto name="bell" size={24} color="white" />
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {user != null ? (
            <>
              <Image
                style={{ width: 70, height: 70, borderRadius: 70 }}
                source={{ uri: user.imageURL }}
              ></Image>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  lineHeight: 27,
                  color: "white",
                }}
              >
                {user.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: 27,
                  color: "white",
                }}
              >
                {user.email}
              </Text>
            </>
          ) : null}
        </View>
        <View style={styles.content}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <View>
              <Text style={{ fontWeight: 400, fontSize: 14 }}>
                Số điện thoại
              </Text>
              <Text style={{ fontWeight: 500, fontSize: 16 }}>0896459412</Text>
            </View>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 30,
                backgroundColor: "#2e548170",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="phone" size={24} color="#2e5481" />
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <View>
              <Text style={{ fontWeight: 400, fontSize: 14 }}>Quyền</Text>
              <Text style={{ fontWeight: 500, fontSize: 16 }}>
                {user != null
                  ? user.employeeType == "baocaosuco"
                    ? "Nhân viên sự cố"
                    : user.employeeType == "cntt"
                    ? "Nhân viên công nghệ thông tin"
                    : null
                  : null}
              </Text>
            </View>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 30,
                backgroundColor: "#2e548170",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="edit" size={24} color="#2e5481" />
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            <Text>Đánh giá</Text>
            <Pressable
              //   onPress={() => onOpen()}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Text>Toàn bộ đánh giá</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </Pressable>
          </View>
          <View>
            {user != null && tickets.length > 0 && users.length > 0
              ? renderRate()
              : null}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d5381",
    display: "flex",
    justifyContent: "space-between",
  },
  content: {
    backgroundColor: "#ffffff",
    height: "70%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    marginTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  headerContent: {
    padding: 10,
    display: "flex",
    alignItems: "center",
  },
  bodyContent: {
    padding: 20,
  },
});
