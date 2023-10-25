import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export default function DetailTicket({ route, navigation }) {
  const { accessToken, idTicket } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [inforTicket, setInforTicket] = useState();

  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/ticket/${idTicket}`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setInforTicket(data));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <AntDesign
            style={{ position: "absolute", left: 10, top: 10 }}
            name="left"
            size={20}
            color="black"
          />
          <Text style={{ fontSize: 18, fontWeight: 700 }}>
            Yêu Cầu Hỗ Trợ CNTT
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.inforTicket}>
            <Text style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>
              {inforTicket != null ? inforTicket.title : null}
            </Text>
            <Text style={{ marginBottom: 5 }}>
              Người Tiếp Nhận :
              {inforTicket != null
                ? inforTicket.status == "pending"
                  ? " chưa tiếp nhận"
                  : null
                : null}
            </Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ marginBottom: 5, marginRight: 10 }}>
                {inforTicket != null
                  ? moment(inforTicket.createdAt).format("DD-MM-YYYY")
                  : null}
              </Text>
              <Text style={{ marginBottom: 5 }}>
                {inforTicket != null
                  ? moment(inforTicket.createdAt).format("h:mm a")
                  : null}
              </Text>
            </View>
            <Image
              source={{
                uri:
                  inforTicket != null
                    ? inforTicket.staffID == ""
                      ? undefined
                      : undefined
                    : undefined,
              }}
            ></Image>
          </View>
          <View style={styles.ticketStatus}>
            <Text style={{ fontSize: 16, fontWeight: 700 }}>
              Trạng Thái Yêu Cầu
            </Text>
            <View style={styles.groupStatus}>
              <View
                style={{ display: "flex", flexDirection: "row", margin: 20 }}
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
                    // alignItems: "center",
                  }}
                >
                  <Text>Đã yêu cầu</Text>
                  <Text>
                    {inforTicket != null
                      ? moment(inforTicket.createdAt).format("h:mm a")
                      : ""}
                  </Text>
                </View>
              </View>
              <View
                style={{ display: "flex", flexDirection: "row", margin: 20 }}
              >
                <View
                  style={
                    inforTicket != null
                      ? inforTicket.status == "pending"
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
                  }
                >
                  {inforTicket != null ? (
                    inforTicket.status == "pending" ? (
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
                    // alignItems: "center",
                  }}
                >
                  <Text>Yêu cầu đã tiếp nhận</Text>
                  <Text>
                    {inforTicket != null ? inforTicket.receivedAt : ""}
                  </Text>
                </View>
              </View>
              <View
                style={{ display: "flex", flexDirection: "row", margin: 20 }}
              >
                <View
                  style={
                    inforTicket != null
                      ? inforTicket.status == "pending"
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
                  }
                >
                  {inforTicket != null ? (
                    inforTicket.status == "pending" ? (
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
                    // alignItems: "center",
                  }}
                >
                  <Text>Yêu cầu đã hoàn thành</Text>
                  <Text>
                    {inforTicket != null ? inforTicket.finishedAt : ""}
                  </Text>
                </View>
              </View>
            </View>
            <Pressable style={styles.button}>
              <Text style={{ color: "white", fontSize: 12, fontWeight: 700 }}>
                Trở Về
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* <Modal
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
            <Text style={styles.modalText}>Danh Sách Hình Ảnh</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
                width: "100%",
                overflow: "hidden",
                alignItems: "flex-start",
              }}
            >
              {imagePicker.length != 0 ? showAllImage() : null}
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible2);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{error}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible2(!modalVisible2)}
            >
              <Text style={styles.textStyle}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  content: {
    width: "100%",
    height: "95%",
    backgroundColor: "white",
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    position: "relative",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  body: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },

  input: {
    marginTop: 20,
    width: "90%",
    backgroundColor: "#f1f4f5",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  dropdowngroup: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  input2: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#f1f4f5",
    padding: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  list: {
    width: "100%",
    backgroundColor: "#f1f4f5",
    // padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    top: "110%",
    display: "none",
  },
  item: {
    width: "100%",
    padding: 10,
  },
  listShow: {
    width: "100%",
    backgroundColor: "#f1f4f5",
    // padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    top: "110%",
    zIndex: 2,
  },
  input3: {
    marginTop: 20,
    width: "90%",
    backgroundColor: "#f1f4f5",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    textAlign: "auto",
  },
  imgGroup: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    marginTop: 20,
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: "#f1f4f5",
    width: "48%",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  imgShow: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    marginTop: 20,
    justifyContent: "space-between",
    position: "relative",
  },
  countImg: {
    backgroundColor: "grey",
    width: "48%",
    aspectRatio: "1/1",
    borderRadius: 5,
    position: "absolute",
    right: 0,
    opacity: 0.5,
    display: "none",
  },
  countImgShow: {
    backgroundColor: "grey",
    width: "48%",
    aspectRatio: "1/1",
    borderRadius: 5,
    position: "absolute",
    right: 0,
    opacity: 0.7,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    // elevation: 2,
    backgroundColor: "#2245ac",
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button2: {
    width: "90%",
    borderRadius: 5,
    backgroundColor: "#3257c6",
    padding: 10,
    elevation: 2,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  inforTicket: {
    width: "90%",
    backgroundColor: "#f1f4f5",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  ticketStatus: {
    width: "100%",
    // backgroundColor: "#f1f4f5",
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
  groupStatus: {
    width: "100%",
    // backgroundColor: "#f1f4f5",
    marginTop: 20,
    padding: 5,
    borderRadius: 5,
    shadowColor: "#000",
  },
});
