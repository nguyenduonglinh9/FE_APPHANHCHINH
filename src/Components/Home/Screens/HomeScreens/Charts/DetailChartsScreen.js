import {
  Dimensions,
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import {
  Feather,
  FontAwesome,
  AntDesign,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import moment from "moment";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Constants from "expo-constants";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

export default function DetailChartScreen({ route, navigation }) {
  const { userID, accessToken, handleBack, idUser } = route.params;
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [types, setTypes] = useState([]);

  const BottomSheetModalRef = useRef(null);
  const snapPoints = ["90%"];

  const handelPresentModal = () => {
    BottomSheetModalRef.current?.present();
  };

  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/user", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/user/${idUser}`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/issuestype", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setTypes(data));
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

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          onPress={() => navigation.goBack()}
          name="keyboard-arrow-left"
          size={24}
          color="white"
        />
        <Octicons name="bell" size={20} color="white" />
      </View>
      {user != null && types.length > 0 ? (
        <View style={styles.infor}>
          <Image
            style={{ width: 70, height: 70, borderRadius: 70 }}
            source={{ uri: user.imageURL }}
          ></Image>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "white",
              lineHeight: 27,
            }}
          >
            {user.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: "white",
              lineHeight: 24,
            }}
          >
            {types
              .filter((item, index) => {
                return item._id == user.employeeType;
              })
              .map((item, index) => {
                return `Nhân viên ${item.name}`;
              })}
          </Text>
        </View>
      ) : null}

      <View style={styles.body}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: 500, lineHeight: 24 }}>
            {user != null && tickets.length > 0
              ? `Số lượng công việc đã thưc hiện : ${
                  tickets.filter((item, index) => {
                    return item.staffID == user.googleID;
                  }).length
                }`
              : null}
          </Text>
        </View>
        <View>
          <View
            style={{
              //   backgroundColor: "red",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Đánh giá</Text>
            <Pressable
              onPress={handelPresentModal}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: 500 }}>
                Toàn bộ đánh giá
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </Pressable>
          </View>
          <View>
            {tickets.length > 0 && user != null && users.length > 0
              ? tickets
                  .filter((item, index) => {
                    return item.staffID == user.googleID;
                  })
                  .map((item, index) => {
                    if (index == 0 || index == 1) {
                      return (
                        <View
                          style={{
                            backgroundColor: "#f1f4f5",
                            padding: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            borderRadius: 5,
                            shadowColor: "#000",
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginTop: 5,
                              marginBottom: 5,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                lineHeight: 21,
                              }}
                            >
                              {item.room}
                            </Text>
                            <View
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <Text>{item.star}</Text>
                              <Octicons
                                name="star-fill"
                                size={24}
                                color="yellow"
                              />
                            </View>
                          </View>
                          <View style={{ marginTop: 5, marginBottom: 5 }}>
                            {tickets.length > 0 &&
                            user != null &&
                            users.length > 0
                              ? users
                                  .filter((item2, index2) => {
                                    return item2.googleID == item.userID;
                                  })
                                  .map((item, index) => {
                                    return (
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 600,
                                          lineHeight: 18,
                                        }}
                                      >
                                        Người đánh giá :{" "}
                                        <Text
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 500,
                                            lineHeight: 18,
                                          }}
                                        >
                                          {item.name}
                                        </Text>
                                      </Text>
                                    );
                                  })
                              : null}
                          </View>
                          <View style={{ marginTop: 5, marginBottom: 5 }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: 400,
                                lineHeight: 18,
                              }}
                            >
                              {item.comment != ""
                                ? item.comment
                                : "Chưa có đánh giá cho thẻ này"}
                            </Text>
                          </View>
                        </View>
                      );
                    }
                  })
              : null}
          </View>
        </View>
      </View>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={BottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          containerStyle={{ backgroundColor: "#00000090" }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                display: "flex",
                // justifyContent: "space-between",
                // width: "100%",
                padding: 20,
                // backgroundColor: "red",
                paddingBottom: 100,
              }}
            >
              {tickets.length > 0 && user != null && users.length > 0
                ? tickets
                    .filter((item, index) => {
                      return item.staffID == user.googleID;
                    })
                    .map((item, index) => {
                      return (
                        <View
                          style={{
                            backgroundColor: "#f1f4f5",
                            padding: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            borderRadius: 5,
                            shadowColor: "#000",
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                            width: "100%",
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginTop: 5,
                              marginBottom: 5,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                lineHeight: 21,
                              }}
                            >
                              {item.room}
                            </Text>
                            <View
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <Text>{item.star}</Text>
                              <Octicons
                                name="star-fill"
                                size={24}
                                color="yellow"
                              />
                            </View>
                          </View>
                          <View style={{ marginTop: 5, marginBottom: 5 }}>
                            {tickets.length > 0 &&
                            user != null &&
                            users.length > 0
                              ? users
                                  .filter((item2, index2) => {
                                    return item2.googleID == item.userID;
                                  })
                                  .map((item, index) => {
                                    return (
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 600,
                                          lineHeight: 18,
                                        }}
                                      >
                                        Người đánh giá :{" "}
                                        <Text
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 500,
                                            lineHeight: 18,
                                          }}
                                        >
                                          {item.name}
                                        </Text>
                                      </Text>
                                    );
                                  })
                              : null}
                          </View>
                          <View style={{ marginTop: 5, marginBottom: 5 }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: 400,
                                lineHeight: 18,
                              }}
                            >
                              {item.comment != ""
                                ? item.comment
                                : "Chưa có đánh giá cho thẻ này"}
                            </Text>
                          </View>
                        </View>
                      );
                    })
                : null}
            </View>
          </ScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d5381",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: Constants.statusBarHeight,
  },
  body: {
    height: "70%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  header: {
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  infor: {
    // backgroundColor: "red",
    display: "flex",
    alignItems: "center",
  },
});
