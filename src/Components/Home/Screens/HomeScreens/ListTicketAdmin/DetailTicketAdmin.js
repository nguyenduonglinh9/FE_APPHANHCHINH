import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  Modal,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Feather,
  AntDesign,
  Ionicons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";
import { Rating } from "@kolking/react-native-rating";
import { CommonActions } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DetailTicketAdmin({ route, navigation }) {
  const { userID, accessToken, idTicket } = route.params;
  const [ticket, setTicket] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/ticket/${idTicket}`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setTicket(data));
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

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="keyboard-arrow-left"
            size={24}
            color="black"
          />
          {ticket != null ? (
            <Text style={{ fontSize: 16, fontWeight: 700 }}>
              {ticket.title}
            </Text>
          ) : null}
          <Fontisto name="bell" size={24} color="black" />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ paddingBottom: 100 }}>
            <View
              style={{
                backgroundColor: "#f1f4f5",
                padding: 15,
                borderRadius: 5,
                marginTop: 20,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 0.8 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    // backgroundColor: "red",
                    justifyContent: "space-between",
                  }}
                >
                  {ticket != null ? (
                    <>
                      <Text style={{ fontSize: 14, fontWeight: 600 }}>
                        {ticket.title}
                      </Text>
                      <Text style={{ fontSize: 12, fontWeight: 400 }}>
                        Phòng : {ticket.room}
                      </Text>
                    </>
                  ) : null}
                </View>
                <View style={{ marginTop: 10 }}>
                  {ticket != null && users.length > 0
                    ? users
                        .filter((item, index) => {
                          return item.googleID == ticket.userID;
                        })
                        .map((item, index) => {
                          return (
                            <Text key={item._id}>
                              Người yêu cầu : {item.name}
                            </Text>
                          );
                        })
                    : null}
                </View>
                <View style={{ marginTop: 10 }}>
                  {ticket != null && users.length > 0
                    ? users
                        .filter((item, index) => {
                          return item.googleID == ticket.staffID;
                        })
                        .map((item, index) => {
                          return (
                            <Text key={item._id}>
                              Người tiếp nhận : {item.name}
                            </Text>
                          );
                        })
                    : null}
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 0.1,
                }}
              >
                {ticket != null && users.length > 0
                  ? users
                      .filter((item, index) => {
                        return item.googleID == ticket.userID;
                      })
                      .map((item, index) => {
                        return (
                          <Image
                            style={{ width: 50, height: 50, borderRadius: 50 }}
                            source={{ uri: item.imageURL }}
                          ></Image>
                        );
                      })
                  : null}
              </View>
            </View>
            <Text style={{ fontSize: 14, fontWeight: 700, marginTop: 20 }}>
              Tiến độ làm việc
            </Text>
            <View style={styles.ticketStatus}>
              <View style={styles.groupStatus}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 20,
                  }}
                >
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      backgroundColor: "#2d5381",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 20,
                    }}
                  >
                    <AntDesign name="check" size={24} color="white" />
                  </View>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Text>Đã yêu cầu</Text>
                    <Text>
                      {ticket != null
                        ? moment(ticket.createdAt).format("h:mm a") +
                          " | " +
                          moment(ticket.createdAt).format("DD-MM-yyyy")
                        : ""}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",

                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  <View
                    style={
                      ticket != null
                        ? ticket.status == "pending"
                          ? {
                              width: 50,
                              height: 50,
                              borderRadius: 50,
                              backgroundColor: "white",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: 20,
                              borderColor: "#2d5381",
                              borderWidth: 2,
                            }
                          : {
                              width: 50,
                              height: 50,
                              borderRadius: 50,
                              backgroundColor: "#2d5381",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: 20,
                            }
                        : null
                    }
                  >
                    {ticket != null ? (
                      ticket.status == "pending" ? (
                        <Ionicons
                          name="ios-reload-outline"
                          size={24}
                          color="black"
                        />
                      ) : (
                        <AntDesign name="check" size={24} color="white" />
                      )
                    ) : null}
                  </View>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      // alignItems: "center",
                    }}
                  >
                    <Text>Yêu cầu đã tiếp nhận</Text>
                    <Text>
                      {ticket != null
                        ? ticket.status == "pending"
                          ? "--:--"
                          : moment(ticket.receivedAt).format("hh:mm a") +
                            " | " +
                            moment(ticket.createdAt).format("DD-MM-yyyy")
                        : ""}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 20,
                  }}
                >
                  <View
                    style={
                      ticket != null
                        ? ticket.status == "pending" ||
                          ticket.status == "processing"
                          ? {
                              width: 50,
                              height: 50,
                              borderRadius: 50,
                              backgroundColor: "white",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: 20,
                              borderColor: "#2d5381",
                              borderWidth: 2,
                            }
                          : {
                              width: 50,
                              height: 50,
                              borderRadius: 50,
                              backgroundColor: "#2d5381",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: 20,
                            }
                        : null
                    }
                  >
                    {ticket != null ? (
                      ticket.status == "pending" ||
                      ticket.status == "processing" ? (
                        <Ionicons
                          name="ios-reload-outline"
                          size={24}
                          color="black"
                        />
                      ) : (
                        <AntDesign name="check" size={24} color="white" />
                      )
                    ) : (
                      ""
                    )}
                  </View>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Text>Yêu cầu đã hoàn thành</Text>
                    <Text>
                      {ticket != null
                        ? ticket.status == "pending" ||
                          ticket.status == "processing"
                          ? "--:--"
                          : moment(ticket.completedAt).format("hh:mm a") +
                            " | " +
                            moment(ticket.createdAt).format("DD-MM-yyyy")
                        : ""}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Text style={{ fontSize: 14, fontWeight: 700, marginTop: 20 }}>
              Đánh giá
            </Text>
            <View
              style={{
                backgroundColor: "#f1f4f5",
                padding: 15,
                borderRadius: 5,
                marginTop: 5,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {ticket != null ? (
                <Text>
                  {ticket.comment == "" ? "Chưa có đánh giá" : ticket.comment}
                </Text>
              ) : (
                <Text>Chưa có đánh giá</Text>
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
    backgroundColor: "#2d5381",
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    backgroundColor: "white",
    height: "100%",
    padding: 10,
  },
  header: {
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ticketStatus: {
    width: "100%",
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
  },
  groupStatus: {
    width: "100%",
    marginTop: 20,
    borderRadius: 5,
    shadowColor: "#000",
  },
});
