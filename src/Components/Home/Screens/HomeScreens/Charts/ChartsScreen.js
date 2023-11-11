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
} from "@expo/vector-icons";
import moment from "moment";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

export default function ChartsScreen({ route, navigation }) {
  const { userID, accessToken, handleBack } = route.params;
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [types, setTypes] = useState([]);
  const currentDate = useRef();

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

  useEffect(() => {
    currentDate.current = moment(new Date()).format("DD-MM-yyyy");
  }, []);

  const FirstRoute = () => {
    const newArr = tickets
      .filter((item, index) => {
        return (
          moment(item.createdAt).format("DD-MM-yyyy") == currentDate.current
        );
      })
      .map((item, index) => {
        return item.staffID;
      });

    const counts = {};
    newArr.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });
    const keysSorted = Object.keys(counts).sort(function (a, b) {
      return counts[a] - counts[b];
    });

    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: "#ff4081",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        {keysSorted.reverse().map((item, index) => {
          return users
            .filter((item2, index2) => {
              return item2.googleID == item;
            })
            .map((item3, index3) => {
              return (
                <Pressable
                  key={item3._id}
                  onPress={() =>
                    navigation.navigate("DetailChartScreen", {
                      idUser: item3.googleID,
                    })
                  }
                  style={{
                    backgroundColor: "#f1f4f5",
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 20,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                  <View>
                    <Image
                      style={{ width: 50, height: 50, borderRadius: 50 }}
                      source={{ uri: item3.imageURL }}
                    ></Image>
                  </View>
                  <View>
                    <Text>{item3.name}</Text>
                    <Text>
                      {types
                        .filter((item, index) => {
                          return item._id == item3.employeeType;
                        })
                        .map((item, index) => {
                          return `Nhân viên ${item.name}`;
                        })}
                    </Text>
                  </View>
                  <View>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </View>
                </Pressable>
              );
            });
        })}
      </View>
    );
  };

  const SecondRoute = () => {
    const newArr = tickets
      .filter((item, index) => {
        return (
          moment(item.createdAt).format("MM-yyyy") ==
          moment(new Date()).format("MM-yyyy")
        );
      })
      .map((item, index) => {
        return item.staffID;
      });

    const counts = {};
    newArr.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });
    const keysSorted = Object.keys(counts).sort(function (a, b) {
      return counts[a] - counts[b];
    });

    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: "#ff4081",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        {keysSorted.reverse().map((item, index) => {
          return users
            .filter((item2, index2) => {
              return item2.googleID == item;
            })
            .map((item3, index3) => {
              return (
                <Pressable
                  key={item3._id}
                  onPress={() =>
                    navigation.navigate("DetailChartScreen", {
                      idUser: item3.googleID,
                    })
                  }
                  style={{
                    backgroundColor: "#f1f4f5",
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 20,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                  <View>
                    <Image
                      style={{ width: 50, height: 50, borderRadius: 50 }}
                      source={{ uri: item3.imageURL }}
                    ></Image>
                  </View>
                  <View>
                    <Text>{item3.name}</Text>
                    <Text>
                      {types
                        .filter((item, index) => {
                          return item._id == item3.employeeType;
                        })
                        .map((item, index) => {
                          return `Nhân viên ${item.name}`;
                        })}
                    </Text>
                  </View>
                  <View>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </View>
                </Pressable>
              );
            });
        })}
      </View>
    );
  };

  const ThirdRoute = () => {
    const newArr = tickets
      .filter((item, index) => {
        return (
          moment(item.createdAt).format("yyyy") ==
          moment(new Date()).format("yyyy")
        );
      })
      .map((item, index) => {
        return item.staffID;
      });

    const counts = {};
    newArr.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });
    const keysSorted = Object.keys(counts).sort(function (a, b) {
      return counts[a] - counts[b];
    });

    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: "#ff4081",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        {keysSorted.reverse().map((item, index) => {
          return users
            .filter((item2, index2) => {
              return item2.googleID == item;
            })
            .map((item3, index3) => {
              return (
                <Pressable
                  key={item3._id}
                  onPress={() =>
                    navigation.navigate("DetailChartScreen", {
                      idUser: item3.googleID,
                    })
                  }
                  style={{
                    backgroundColor: "#f1f4f5",
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 20,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                  <View>
                    <Image
                      style={{ width: 50, height: 50, borderRadius: 50 }}
                      source={{ uri: item3.imageURL }}
                    ></Image>
                  </View>
                  <View>
                    <Text>{item3.name}</Text>
                    <Text>
                      {types
                        .filter((item, index) => {
                          return item._id == item3.employeeType;
                        })
                        .map((item, index) => {
                          return `Nhân viên ${item.name}`;
                        })}
                    </Text>
                  </View>
                  <View>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </View>
                </Pressable>
              );
            });
        })}
      </View>
    );
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Top ngày" },
    { key: "second", title: "Top tháng" },
    { key: "third", title: "Top năm" },
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
            Thành tích cán bộ
          </Text>
          <Text></Text>
        </View>
        <View style={styles.body}>
          {tickets.length > 0 && users.length > 0 && types.length > 0 ? (
            <TabView
              style={{
                // backgroundColor: "red",
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
