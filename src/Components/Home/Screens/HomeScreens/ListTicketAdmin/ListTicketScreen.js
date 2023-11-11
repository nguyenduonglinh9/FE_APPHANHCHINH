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
import {
  Feather,
  FontAwesome,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

export default function ListTicketAdmin({ route, navigation }) {
  const { userID, accessToken, idType, nameType, handleBack } = route.params;
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const currentDate = useRef();

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
    currentDate.current = moment(new Date()).format("DD-MM-yyyy");
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

  const FirstRoute = () => (
    <View
      style={{
        height: "100%",
        backgroundColor: "white",
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      {tickets
        .filter((item, index) => {
          return (
            item.typeID == idType &&
            moment(item.createdAt).format("DD-MM-yyyy") == currentDate.current
          );
        })
        .map((item, index) => {
          return (
            <Pressable
              key={item._id}
              onPress={() =>
                navigation.navigate("DetailTicketAdmin", { idTicket: item._id })
              }
              style={{
                backgroundColor: "#f1f4f5",
                marginTop: 10,
                marginBottom: 10,
                padding: 20,
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
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: 600 }}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: 400 }}>
                  Phòng {item.room}
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                {users
                  .filter((item2, index2) => {
                    return item2.googleID == item.userID;
                  })
                  .map((item, index) => {
                    return <Text>Người yêu cầu : {item.name}</Text>;
                  })}
              </View>
              <View style={{ marginTop: 10 }}>
                {users.filter((item2, index2) => {
                  return item2.googleID == item.staffID;
                }).length > 0 ? (
                  users
                    .filter((item2, index2) => {
                      return item2.googleID == item.staffID;
                    })
                    .map((item, index) => {
                      return <Text>Người tiếp nhận : {item.name}</Text>;
                    })
                ) : (
                  <Text>Người tiếp nhận : Chưa tiếp nhận</Text>
                )}
                {item.isTime == "true" ? (
                  <Text
                    style={{
                      marginTop: 5,
                      color: "green",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    Đúng giờ
                  </Text>
                ) : item.isTime == "false" ? (
                  <Text
                    style={{
                      marginTop: 5,
                      color: "red",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    Trễ giờ
                  </Text>
                ) : (
                  <View>
                    <Text
                      style={{ marginTop: 5, fontSize: 12, fontWeight: 500 }}
                    >
                      Chưa tiếp nhận
                    </Text>
                  </View>
                )}
              </View>
            </Pressable>
          );
        })}
    </View>
  );

  const SecondRoute = () => (
    <View
      style={{
        height: "100%",
        backgroundColor: "white",
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      {tickets
        .filter((item, index) => {
          return (
            item.typeID == idType &&
            item.status == "processing" &&
            moment(item.createdAt).format("DD-MM-yyyy") == currentDate.current
          );
        })
        .map((item, index) => {
          return (
            <Pressable
              key={item._id}
              onPress={() =>
                navigation.navigate("DetailTicketAdmin", { idTicket: item._id })
              }
              style={{
                backgroundColor: "#f1f4f5",
                marginTop: 10,
                marginBottom: 10,
                padding: 20,
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
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: 600 }}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: 400 }}>
                  Phòng {item.room}
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                {users
                  .filter((item2, index2) => {
                    return item2.googleID == item.userID;
                  })
                  .map((item, index) => {
                    return <Text>Người yêu cầu : {item.name}</Text>;
                  })}
              </View>
              <View style={{ marginTop: 10 }}>
                {users.filter((item2, index2) => {
                  return item2.googleID == item.staffID;
                }).length > 0 ? (
                  users
                    .filter((item2, index2) => {
                      return item2.googleID == item.staffID;
                    })
                    .map((item, index) => {
                      return <Text>Người tiếp nhận : {item.name}</Text>;
                    })
                ) : (
                  <Text>Người tiếp nhận : Chưa tiếp nhận</Text>
                )}
                {item.isTime == "true" ? (
                  <Text
                    style={{
                      marginTop: 5,
                      color: "green",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    Đúng giờ
                  </Text>
                ) : item.isTime == "false" ? (
                  <Text
                    style={{
                      marginTop: 5,
                      color: "red",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    Trễ giờ
                  </Text>
                ) : (
                  <Text style={{ marginTop: 5, fontSize: 12, fontWeight: 500 }}>
                    Chưa tiếp nhận
                  </Text>
                )}
              </View>
            </Pressable>
          );
        })}
    </View>
  );
  const ThirdRoute = () => (
    <View
      style={{
        height: "100%",
        backgroundColor: "white",
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      {tickets
        .filter((item, index) => {
          return (
            item.typeID == idType &&
            item.status == "notdone" &&
            moment(item.createdAt).format("DD-MM-yyyy") == currentDate.current
          );
        })
        .map((item, index) => {
          return (
            <Pressable
              key={item._id}
              onPress={() =>
                navigation.navigate("DetailTicketAdmin", { idTicket: item._id })
              }
              style={{
                backgroundColor: "#f1f4f5",
                marginTop: 10,
                marginBottom: 10,
                padding: 20,
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
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: 600 }}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: 400 }}>
                  Phòng {item.room}
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                {users
                  .filter((item2, index2) => {
                    return item2.googleID == item.userID;
                  })
                  .map((item, index) => {
                    return <Text>Người yêu cầu : {item.name}</Text>;
                  })}
              </View>
              <View style={{ marginTop: 10 }}>
                {users.filter((item2, index2) => {
                  return item2.googleID == item.staffID;
                }).length > 0 ? (
                  users
                    .filter((item2, index2) => {
                      return item2.googleID == item.staffID;
                    })
                    .map((item, index) => {
                      return <Text>Người tiếp nhận : {item.name}</Text>;
                    })
                ) : (
                  <Text>Người tiếp nhận : Chưa tiếp nhận</Text>
                )}
                {item.isTime == "true" ? (
                  <Text
                    style={{
                      marginTop: 5,
                      color: "green",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    Đúng giờ
                  </Text>
                ) : item.isTime == "false" ? (
                  <Text
                    style={{
                      marginTop: 5,
                      color: "red",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    Trễ giờ
                  </Text>
                ) : (
                  <Text style={{ marginTop: 5, fontSize: 12, fontWeight: 500 }}>
                    Chưa tiếp nhận
                  </Text>
                )}
              </View>
            </Pressable>
          );
        })}
    </View>
  );
  const FourthRoute = () => (
    <View
      style={{
        height: "100%",
        backgroundColor: "white",
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      {tickets
        .filter((item, index) => {
          return (
            item.typeID == idType &&
            item.status == "finished" &&
            moment(item.createdAt).format("DD-MM-yyyy") == currentDate.current
          );
        })
        .map((item, index) => {
          return (
            <Pressable
              key={item._id}
              onPress={() =>
                navigation.navigate("DetailTicketAdmin", { idTicket: item._id })
              }
              style={{
                backgroundColor: "#f1f4f5",
                marginTop: 10,
                marginBottom: 10,
                padding: 20,
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
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: 600 }}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: 400 }}>
                  Phòng {item.room}
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                {users
                  .filter((item2, index2) => {
                    return item2.googleID == item.userID;
                  })
                  .map((item, index) => {
                    return <Text>Người yêu cầu : {item.name}</Text>;
                  })}
              </View>
              <View style={{ marginTop: 10 }}>
                {users.filter((item2, index2) => {
                  return item2.googleID == item.staffID;
                }).length > 0 ? (
                  users
                    .filter((item2, index2) => {
                      return item2.googleID == item.staffID;
                    })
                    .map((item, index) => {
                      return <Text>Người tiếp nhận : {item.name}</Text>;
                    })
                ) : (
                  <Text>Người tiếp nhận : Chưa tiếp nhận</Text>
                )}
                {item.isTime == "true" ? (
                  <Text
                    style={{
                      marginTop: 5,
                      color: "green",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    Đúng giờ
                  </Text>
                ) : item.isTime == "false" ? (
                  <Text
                    style={{
                      marginTop: 5,
                      color: "red",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    Trễ giờ
                  </Text>
                ) : (
                  <Text style={{ marginTop: 5, fontSize: 12, fontWeight: 500 }}>
                    Chưa tiếp nhận
                  </Text>
                )}
              </View>
            </Pressable>
          );
        })}
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Sự cố" },
    { key: "second", title: "Đã tiếp nhận" },
    { key: "third", title: "Chưa hoàn thành" },
    { key: "fourth", title: "Đã hoàn thành" },
  ]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <MaterialIcons
            onPress={() => handleBack()}
            name="keyboard-arrow-left"
            size={24}
            color="white"
          />
          <Text style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
            Lỗi {nameType}
          </Text>
          <Text></Text>
        </View>
        <View style={styles.body}>
          {tickets.length > 0 ? (
            <TabView
              style={{
                backgroundColor: "red",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
              }}
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  style={{ backgroundColor: "white", color: "black" }}
                  indicatorStyle={{ backgroundColor: "#4169e1" }}
                  labelStyle={{
                    color: "#4169e1",
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                />
              )}
            />
          ) : null}
        </View>
      </SafeAreaView>
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
  body: {
    height: "90%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
