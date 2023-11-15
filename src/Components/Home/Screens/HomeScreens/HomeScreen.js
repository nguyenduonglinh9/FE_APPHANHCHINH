import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  BackHandler,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import messaging from "@react-native-firebase/messaging";
import {
  requestUserPermission,
  NotificationListener,
} from "../../../../utils/pushnotification_helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Drawer } from "react-native-drawer-layout";
import moment from "moment/moment";

export default function HomeScreen({ route, navigation }) {
  const { userID, accessToken } = route.params;
  const [options, setOptions] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [user, setUser] = useState();
  const [types, setTypes] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [reload, setReload] = useState(false);
  const [open, setOpen] = React.useState(false);

  //notification
  useEffect(() => {
    requestUserPermission();
    // NotificationListener();
  }, []);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log(JSON.stringify(remoteMessage));
    });
  }, []);

  useEffect(() => {
    const test = async () => {
      try {
        let settings = await AsyncStorage.getItem(`${userID}`);
        if (!settings) {
          await AsyncStorage.setItem(
            `${userID}`,
            JSON.stringify({ isNotification: "true" })
          );
        } else {
          if (JSON.parse(settings).isNotification == "false") {
            if (user != null) {
              messaging()
                .subscribeToTopic(
                  user.role == "user"
                    ? `${user.googleID}`
                    : user.role == "staff"
                    ? `${user.employeeType}`
                    : ""
                )
                .then((response) => {
                  console.log("Subscribed to topic!", response);
                })
                .catch((error) => console.log("ERROR : ", error));
            }
          } else if (JSON.parse(settings).isNotification == "true") {
            if (user != null) {
              messaging()
                .unsubscribeFromTopic(
                  user.role == "user"
                    ? `${user.googleID}`
                    : user.role == "staff"
                    ? `${user.employeeType}`
                    : ""
                )
                .then((response) => {
                  console.log("UNSubscribed to topic!", response);
                })
                .catch((error) => console.log("ERROR : ", error));
            }
          }
        }
      } catch (error) {
        console.log("LỖI", error);
      }
    };
    test();
  }, [user]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  //
  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/notifications", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setNotifications(data));
  }, [reload]);

  //
  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/issuestype", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setTypes(data));
  }, []);

  //
  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/user/${userID}`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const viewUser = (user) => {
    if (user.role == "user") {
      return (
        <>
          <Pressable
            onPress={() =>
              navigation.navigate("CreateTicket", { type: "baocaosuco" })
            }
            style={styles.button}
          >
            <View style={{ width: "30%" }}>
              <Image
                style={{ height: 32, width: 32 }}
                source={{ uri: "https://i.ibb.co/vzHVD6Q/Edit-Square-1.png" }}
              ></Image>
            </View>
            <Text style={{ width: "70%", fontSize: 16, fontWeight: 500 }}>
              Báo Cáo Sự Cố
            </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate("CreateTicket", { type: "cntt" })
            }
            style={styles.button}
          >
            <View style={{ width: "30%" }}>
              <Image
                style={{ height: 32, width: 32 }}
                source={{ uri: "https://i.ibb.co/Fhf5v5J/Edit-Square.png" }}
              ></Image>
            </View>
            <Text style={{ width: "70%", fontSize: 16, fontWeight: 500 }}>
              Yêu Cầu Hỗ Trợ CNTT
            </Text>
          </Pressable>
        </>
      );
    } else if (user.role == "staff") {
      return (
        <>
          <Pressable
            onPress={() => navigation.navigate("MainListTicketScreen")}
            style={styles.button}
          >
            <View style={{ width: "30%" }}>
              <Image
                style={{ height: 32, width: 32 }}
                source={{ uri: "https://i.ibb.co/vzHVD6Q/Edit-Square-1.png" }}
              ></Image>
            </View>
            <Text style={{ width: "70%", fontSize: 16, fontWeight: 500 }}>
              Sự Cố Cần Hỗ Trợ
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("MainListBuildScreen")}
            style={styles.button}
          >
            <View style={{ width: "30%" }}>
              <Image
                style={{ height: 32, width: 32 }}
                source={{ uri: "https://i.ibb.co/Fhf5v5J/Edit-Square.png" }}
              ></Image>
            </View>
            <Text style={{ width: "70%", fontSize: 16, fontWeight: 500 }}>
              Tính Sẵn Sàng Phòng Học
            </Text>
          </Pressable>
        </>
      );
    } else if (user.role == "admin") {
      return (
        <>
          <Pressable
            onPress={() => navigation.navigate("MainListStaffScreen")}
            style={styles.button}
          >
            <View style={{ width: "30%" }}>
              <Image
                style={{ height: 32, width: 32 }}
                source={require("../../../../../assets/Icons/nhansu.png")}
              ></Image>
            </View>
            <Text style={{ width: "70%", fontSize: 16, fontWeight: 500 }}>
              Nhân Sự
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setIsActiveMenu(true)}
            style={styles.button}
          >
            <View style={{ width: "30%" }}>
              <Image
                style={{ height: 32, width: 32 }}
                source={require("../../../../../assets/Icons/thongke.png")}
              ></Image>
            </View>
            <Text style={{ width: "70%", fontSize: 16, fontWeight: 500 }}>
              Thống Kê Sự Cố Trong Ngày
            </Text>
          </Pressable>
          <View style={styles.button}>
            <View style={{ width: "30%" }}>
              <Image
                style={{ height: 32, width: 32 }}
                source={require("../../../../../assets/Icons/chuahoanthanh.png")}
              ></Image>
            </View>
            <Text style={{ width: "70%", fontSize: 16, fontWeight: 500 }}>
              Sự Cố Chưa Hoàn Thành
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("MainChartScreen")}
            style={styles.button}
          >
            <View style={{ width: "30%" }}>
              <Image
                style={{ height: 32, width: 32 }}
                source={require("../../../../../assets/Icons/thanhtich.png")}
              ></Image>
            </View>
            <Text style={{ width: "70%", fontSize: 16, fontWeight: 500 }}>
              Thành Tích Cán Bộ
            </Text>
          </Pressable>
          <View style={styles.button}>
            <View style={{ width: "30%" }}>
              <Image
                style={{ height: 32, width: 32 }}
                source={require("../../../../../assets/Icons/sukien.png")}
              ></Image>
            </View>
            <Text style={{ width: "70%", fontSize: 16, fontWeight: 500 }}>
              Sự Kiện Bộ Môn
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("MainListBuildScreen")}
            style={styles.button}
          >
            <View style={{ width: "30%" }}>
              <Image
                style={{ height: 32, width: 32 }}
                source={require("../../../../../assets/Icons/sansang.png")}
              ></Image>
            </View>
            <Text style={{ width: "70%", fontSize: 16, fontWeight: 500 }}>
              Tính Sắn Sàng Phòng
            </Text>
          </Pressable>
        </>
      );
    }
  };

  const renderMenu = () => {
    return types
      .filter((item, index) => {
        return item.name != "Công Nghệ Thông Tin";
      })
      .map((item, index) => {
        return (
          <Pressable
            onPress={() =>
              navigation.navigate("MainListTicketAdmin", {
                idType: item._id,
                nameType: item.name,
              })
            }
            style={{
              backgroundColor: "#e9ecef",
              padding: 10,
              borderColor: "#d2d4d7",
              borderWidth: 1,
              width: 120,
              height: 120,
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{item.name}</Text>
          </Pressable>
        );
      });
  };
  const renderMenuCntt = () => {
    return types
      .filter((item, index) => {
        return item.name == "Công Nghệ Thông Tin";
      })
      .map((item, index) => {
        return (
          <Pressable
            onPress={() =>
              navigation.navigate("MainListTicketAdmin", {
                idType: item._id,
                nameType: item.name,
              })
            }
            style={{
              backgroundColor: "#e9ecef",
              padding: 10,
              borderColor: "#d2d4d7",
              borderWidth: 1,
              width: 120,
              height: 120,
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{item.name}</Text>
          </Pressable>
        );
      });
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.infor}>
            <Image
              style={{ height: 50, aspectRatio: "1/1", borderRadius: 10 }}
              source={
                user == null
                  ? require("../../../../../assets/images/user-image.png")
                  : { uri: user.imageURL }
              }
            ></Image>
            <Text style={{ fontSize: 16, color: "#fff", width: "60%" }}>
              {user == null ? "User Full Name" : user.name}
            </Text>
            <Pressable
              onPress={() => setOpen(true)}
              style={{
                position: "relative",
              }}
            >
              <Image
                source={require("../../../../../assets/Icons/bell.png")}
              ></Image>
              {notifications.length > 0 && user != null ? (
                notifications.filter((item, index) => {
                  if (user.role == "staff") {
                    return (
                      item.isCheck == false &&
                      item.infor.typeID == user.employeeType &&
                      item.title == "Phiếu hỗ trợ mới"
                    );
                  } else if (user.role == "user") {
                    return (
                      item.isCheck == false &&
                      item.infor.userID == user.googleID &&
                      item.title == "Cập nhật phiếu hỗ trợ"
                    );
                  }
                }).length > 0 ? (
                  <Pressable
                    onPress={() => setOpen(true)}
                    style={{
                      width: 20,
                      aspectRatio: "1/1",
                      backgroundColor: "red",
                      position: "absolute",
                      borderRadius: 20,
                      top: -10,
                      right: -10,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{ fontSize: 10, fontWeight: 400, color: "white" }}
                    >{`${
                      notifications.filter((item, index) => {
                        if (user.role == "staff") {
                          return (
                            item.isCheck == false &&
                            item.infor.typeID == user.employeeType &&
                            item.title == "Phiếu hỗ trợ mới"
                          );
                        } else if (user.role == "user") {
                          return (
                            item.isCheck == false &&
                            item.infor.userID == user.googleID &&
                            item.title == "Cập nhật phiếu hỗ trợ"
                          );
                        }
                      }).length
                    }`}</Text>
                  </Pressable>
                ) : null
              ) : null}
            </Pressable>
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
            Dịch Vụ Trực Tuyến
          </Text>
          <ScrollView style={{ width: "100%" }}>
            <View
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                paddingBottom: 100,
              }}
            >
              {user != null ? viewUser(user) : null}
            </View>
          </ScrollView>
        </View>
        <View
          style={
            isActiveMenu
              ? { ...styles.menuThongke }
              : { ...styles.menuThongke, display: "none" }
          }
        >
          <View
            style={{
              // backgroundColor: "red",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <MaterialIcons
              onPress={() => setIsActiveMenu(false)}
              name="keyboard-arrow-left"
              size={24}
              color="black"
            />
            <Text style={{ fontWeight: 700, fontSize: 16 }}>
              Sự cố trong ngày
            </Text>
            <Text></Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ paddingBottom: 100 }}>
              <View
                style={{
                  // backgroundColor: "red",
                  width: "100%",
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <Text style={{ fontWeight: 600, fontSize: 14 }}>Chung</Text>
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    rowGap: 10,
                    columnGap: 10,
                    flexWrap: "wrap",
                    // backgroundColor: "yellow",
                    marginTop: 10,
                  }}
                >
                  {types.length > 0 ? renderMenu() : null}
                </View>
              </View>
              <View
                style={{
                  // backgroundColor: "red",
                  width: "100%",
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <Text style={{ fontWeight: 600, fontSize: 14 }}>
                  Công nghệ thông tin
                </Text>
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    rowGap: 10,
                    columnGap: 10,
                    flexWrap: "wrap",
                    // backgroundColor: "yellow",
                    marginTop: 10,
                  }}
                >
                  {types.length > 0 ? renderMenuCntt() : null}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <Drawer
          style={
            open
              ? {
                  width: "100%",
                  height: "100%",
                  // backgroundColor: "red",
                  zIndex: 2,
                  position: "absolute",
                  paddingTop: StatusBar.currentHeight,
                }
              : {
                  width: "100%",
                  height: "100%",
                  // backgroundColor: "red",
                  zIndex: 2,
                  display: "none",
                  position: "absolute",
                  paddingTop: StatusBar.currentHeight,
                }
          }
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          renderDrawerContent={() => {
            if (notifications.length > 0) {
              return notifications.map((item, index) => {
                if (item.isCheck == false) {
                  return (
                    <Pressable
                      onPress={() => {
                        navigation.navigate("DetailTicketStaff", {
                          idTicket: item.infor._id,
                        });
                        setOpen(false);
                      }}
                      style={{
                        backgroundColor: "#bec1c2",
                        padding: 10,
                        margin: 10,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          lineHeight: 21,
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 400,
                          lineHeight: 21,
                        }}
                      >
                        {item.description}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 400,
                          lineHeight: 21,
                        }}
                      >
                        Thời gian :{" "}
                        {moment(item.infor.createdAt).format(
                          "DD-MM-yyyy hh:mm a"
                        )}
                      </Text>
                    </Pressable>
                  );
                } else {
                  return (
                    <View
                      style={{
                        backgroundColor: "#e3e7e8",
                        padding: 10,
                        margin: 10,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          lineHeight: 21,
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 400,
                          lineHeight: 21,
                        }}
                      >
                        {item.description}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 400,
                          lineHeight: 21,
                        }}
                      >
                        Thời gian :{" "}
                        {moment(item.infor.createdAt).format(
                          "DD-MM-yyyy hh:mm a"
                        )}
                      </Text>
                    </View>
                  );
                }
              });
            } else {
              return (
                <View
                  style={{
                    // backgroundColor: "red",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: 500 }}>
                    Không có thông báo nào
                  </Text>
                </View>
              );
            }
          }}
        >
          {/* <Button
          onPress={() => setOpen((prevOpen) => !prevOpen)}
          title={`${open ? "Close" : "Open"} drawer`}
        /> */}
        </Drawer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // backgroundColor: "yellow",
    justifyContent: "flex-end",
    position: "relative",
  },
  body: {
    width: "100%",
    height: "80%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "relative",
    // paddingTop: 10,
    display: "flex",
    alignItems: "center",
  },
  menuThongke: {
    width: "100%",
    height: "80%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "relative",
    // paddingTop: 10,
    display: "flex",
    alignItems: "center",
    position: "absolute",
    padding: 10,
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
  button: {
    backgroundColor: "#f1f4f5",
    width: "80%",
    height: 86,
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
