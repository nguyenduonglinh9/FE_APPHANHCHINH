import {
  Dimensions,
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  FlatList,
  Modal,
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
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { LogBox } from "react-native";
import LottieView from "lottie-react-native";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

export default function DetailStaffScreen({ route, navigation }) {
  const { id, accessToken } = route.params;
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [role, setRole] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [refresh, setFresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const BottomSheetModalRef = useRef(null);
  const BottomSheetModalRef2 = useRef(null);

  const snapPoints = ["90%"];
  const snapPoints2 = ["60%"];

  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/user/${id}`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [refresh]);

  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/ticket`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setTickets(data));
  }, [refresh]);

  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/user`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [refresh]);

  const renderUser = (id) => {
    return users
      .filter((item, index) => {
        return item.googleID == id;
      })
      .map((item, index) => {
        return (
          <Text
            index={item._id}
            style={{ width: "60%", fontWeight: 400, fontSize: 14 }}
          >
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
              key={item._id}
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
            key={item._id}
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
  const handelPresentModal = () => {
    BottomSheetModalRef.current?.present();
  };
  const handelPresentModal2 = () => {
    BottomSheetModalRef2.current?.present();
  };
  const handleOpenModal = (role, employeeType) => {
    setModalVisible(true);
    setRole(role);
    setEmployeeType(employeeType);
  };

  const handleUpdate = () => {
    setLoading(true);
    const data = {
      role: role,
      employeeType: employeeType,
    };
    fetch(
      `https://ndl-be-apphanhchinh.onrender.com/user/update/${user.googleID}`,
      {
        headers: {
          access_token: accessToken,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          setLoading(false);
          setModalVisible(false);
          setFresh(!refresh);
        }
      });
  };
  return (
    <>
      <GestureHandlerRootView style={styles.container}>
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
            <Pressable
              onPress={handelPresentModal2}
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
            </Pressable>
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
              onPress={() => handelPresentModal()}
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

        <BottomSheetModalProvider>
          <ScrollView>
            <BottomSheetModal
              ref={BottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              style={{ padding: 10 }}
            >
              <View>
                {user != null && tickets.length > 0 && users.length > 0
                  ? renderRateFull()
                  : null}
              </View>
            </BottomSheetModal>
          </ScrollView>
        </BottomSheetModalProvider>

        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={BottomSheetModalRef2}
            index={0}
            snapPoints={snapPoints2}
            containerStyle={{ backgroundColor: "#00000090" }}
            style={{ padding: 20 }}
          >
            <View>
              <Text style={{ fontWeight: 500, fontSize: 18 }}>Cấp quyền</Text>
              <View>
                <Pressable
                  onPress={() => handleOpenModal("user", "")}
                  style={
                    user != null
                      ? user.role == "user"
                        ? {
                            backgroundColor: "#4169e1",
                            marginTop: 10,
                            marginBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 20,
                            paddingBottom: 20,
                            borderColor: "#d9dcdd",
                            borderWidth: 0.7,
                            borderRadius: 10,
                          }
                        : {
                            backgroundColor: "#f1f4f5",
                            marginTop: 10,
                            marginBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 20,
                            paddingBottom: 20,
                            borderColor: "#d9dcdd",
                            borderWidth: 0.7,
                            borderRadius: 10,
                          }
                      : null
                  }
                >
                  <Text
                    style={
                      user != null
                        ? user.role == "user"
                          ? { fontWeight: 400, fontSize: 16, color: "white" }
                          : { fontWeight: 400, fontSize: 16 }
                        : null
                    }
                  >
                    Quyền Truy cập vào người dùng
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => handleOpenModal("staff", "baocaosuco")}
                  style={
                    user != null
                      ? user.role == "staff" &&
                        user.employeeType == "baocaosuco"
                        ? {
                            backgroundColor: "#4169e1",
                            marginTop: 10,
                            marginBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 20,
                            paddingBottom: 20,
                            borderColor: "#d9dcdd",
                            borderWidth: 0.7,
                            borderRadius: 10,
                          }
                        : {
                            backgroundColor: "#f1f4f5",
                            marginTop: 10,
                            marginBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 20,
                            paddingBottom: 20,
                            borderColor: "#d9dcdd",
                            borderWidth: 0.7,
                            borderRadius: 10,
                          }
                      : null
                  }
                >
                  <Text
                    style={
                      user != null
                        ? user.role == "staff" &&
                          user.employeeType == "baocaosuco"
                          ? { fontWeight: 400, fontSize: 16, color: "white" }
                          : { fontWeight: 400, fontSize: 16 }
                        : null
                    }
                  >
                    Quyền Truy cập vào nhân viên sự cố
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => handleOpenModal("staff", "cntt")}
                  style={
                    user != null
                      ? user.role == "staff" && user.employeeType == "cntt"
                        ? {
                            backgroundColor: "#4169e1",
                            marginTop: 10,
                            marginBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 20,
                            paddingBottom: 20,
                            borderColor: "#d9dcdd",
                            borderWidth: 0.7,
                            borderRadius: 10,
                            color: "white",
                          }
                        : {
                            backgroundColor: "#f1f4f5",
                            marginTop: 10,
                            marginBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 20,
                            paddingBottom: 20,
                            borderColor: "#d9dcdd",
                            borderWidth: 0.7,
                            borderRadius: 10,
                          }
                      : null
                  }
                >
                  <Text
                    style={
                      user != null
                        ? user.role == "staff" && user.employeeType == "cntt"
                          ? { fontWeight: 400, fontSize: 16, color: "white" }
                          : { fontWeight: 400, fontSize: 16 }
                        : null
                    }
                  >
                    Quyền Truy cập vào nhân viên CNTT
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => handleOpenModal(null, "")}
                  style={
                    user != null
                      ? user.role == "user"
                        ? {
                            backgroundColor: "#4169e1",
                            marginTop: 10,
                            marginBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 20,
                            paddingBottom: 20,
                            borderColor: "#d9dcdd",
                            borderWidth: 0.7,
                            borderRadius: 10,
                          }
                        : {
                            backgroundColor: "#f1f4f5",
                            marginTop: 10,
                            marginBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 20,
                            paddingBottom: 20,
                            borderColor: "#d9dcdd",
                            borderWidth: 0.7,
                            borderRadius: 10,
                          }
                      : null
                  }
                >
                  <Text
                    style={
                      user != null
                        ? user.role == "user"
                          ? { fontWeight: 400, fontSize: 16, color: "white" }
                          : { fontWeight: 400, fontSize: 16 }
                        : null
                    }
                  >
                    Khóa quyền truy cập
                  </Text>
                </Pressable>
              </View>
            </View>
          </BottomSheetModal>
        </BottomSheetModalProvider>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {loading ? (
                <LottieView
                  source={require("../../../../../../assets/lotties/loading.json")}
                  autoPlay
                  loop
                  style={{ width: 100, height: 100 }}
                ></LottieView>
              ) : (
                <>
                  <Text style={styles.modalText}>
                    {role == null
                      ? "Bạn muốn hủy quyền truy cập của tài khoản này ?"
                      : role == "user"
                      ? "Bạn muốn cấp quyền người dùng cho tài khoản này ?"
                      : role == "staff" && employeeType == "baocaosuco"
                      ? "Bạn muốn cấp quyền nhân viên sự cố cho tài khoản này ?"
                      : role == "staff" && employeeType == "cntt"
                      ? "Bạn muốn cấp quyền nhân viên CNTT cho tài khoản này ?"
                      : null}
                  </Text>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Pressable
                      style={[styles.button, styles.buttonClose2]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Hủy</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => handleUpdate()}
                    >
                      <Text style={styles.textStyle}>Xác nhận</Text>
                    </Pressable>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d5381",
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
  },
  lottie: {
    width: 100,
    height: 100,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "40%",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonClose2: {
    backgroundColor: "grey",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "400",
    fontSize: 16,
    width: "90%",
  },
});
