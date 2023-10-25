import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  Modal,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  Feather,
  AntDesign,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import moment from "moment";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { SelectList } from "react-native-dropdown-select-list";
import ImageView from "react-native-image-viewing";

export default function DetailTicketStaff({ route, navigation }) {
  const { accessToken, idTicket, userID } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [inforTicket, setInforTicket] = useState();
  const [users, setUsers] = useState([]);
  const [widthBody, setWidthBody] = useState(0);
  const [selectedReason, setSelectedReason] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [note, setNote] = useState("");
  const [visibleImages, setIsVisibleImages] = useState(false);
  const [refesh, setRefesh] = useState([]);

  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/ticket/${idTicket}`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setInforTicket(data));
  }, [refesh]);

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
            <View
              key={index}
              style={{
                // backgroundColor: "red",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image
                style={{
                  width: 40,
                  aspectRatio: "1/1",
                  borderRadius: 40,
                }}
                source={{
                  uri: item.imageURL || null,
                }}
              ></Image>
              <Text style={{ fontSize: 16, fontWeight: 500, marginLeft: 10 }}>
                {item.name}
              </Text>
              <View
                style={{
                  width: 40,
                  aspectRatio: "1/1",
                  borderRadius: 40,
                  backgroundColor: "#e9ecef",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome name="phone" size={24} color="#2245ac" />
              </View>
            </View>
          );
        });
    }
  };

  const reason = [
    { key: "Lỗi từ phía giảng viên", value: "Lỗi từ phía giảng viên" },
    { key: "Lỗi từ phía hệ thống", value: "Lỗi từ phía hệ thống" },
    { key: "Khác", value: "Khác" },
  ];
  const time = [
    { key: "15 Phút", value: "15 Phút" },
    { key: "30 Phút", value: "30 Phút" },
    { key: "1 Tiếng", value: "1 Tiếng" },
    { key: "2 Tiếng", value: "2 Tiếng" },
    { key: "1 Ngày", value: "1 Ngày" },
  ];
  const receiveTicket = () => {
    fetch(
      `https://ndl-be-apphanhchinh.onrender.com/ticket/update/${inforTicket._id}`,
      {
        method: "POST",
        headers: {
          access_token: accessToken,
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          status: "processing",
          receivedAt: new Date().toJSON(),
          staffID: userID,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          setRefesh(["refesh"]);
        }
      });
  };

  const handleShowImage = () => {
    const arr = [];

    for (let i = 0; i < inforTicket.images.length; i++) {
      arr.push({ uri: inforTicket.images[i] });
    }

    return (
      <ImageView
        images={arr}
        imageIndex={0}
        visible={visibleImages}
        onRequestClose={() => setIsVisibleImages(false)}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <AntDesign
            style={{ left: 10, top: 10, flex: 0.2 }}
            name="left"
            size={20}
            color="black"
          />
          <Text
            style={{ fontSize: 18, fontWeight: 700, width: "80%", flex: 0.8 }}
          >
            {inforTicket != null ? inforTicket.title : null}
          </Text>
        </View>

        <View style={styles.body}>
          <View style={styles.inforTicket}>
            <Text>Người yêu cầu : </Text>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              {inforTicket != null ? (
                renderUser(inforTicket.userID)
              ) : (
                <Text></Text>
              )}
            </View>

            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  lineHeight: 21,
                  fontFamily: "Poppins_500Medium_Italic",
                  width: "35%",
                }}
              >
                Thời gian :
              </Text>
              {inforTicket != null ? (
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 20,
                    marginLeft: 10,
                    width: "65%",
                    lineHeight: 21,
                  }}
                >
                  {moment(inforTicket.createdAt).format("hh:mm a")}
                </Text>
              ) : null}
            </View>

            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
                marginBottom: 10,
                alignItems: "center",
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  lineHeight: 21,
                  width: "35%",
                }}
              >
                Phòng :
              </Text>
              {inforTicket != null ? (
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 20,
                    marginLeft: 10,
                    flexShrink: 1,
                    lineHeight: 21,
                    width: "65%",
                  }}
                >
                  {inforTicket.room}
                </Text>
              ) : null}
            </View>
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                padding: 10,
              }}
            >
              <Text style={{ fontSize: 20, lineHeight: 21, width: "35%" }}>
                Mô tả sự cố :
              </Text>
              {inforTicket != null ? (
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 20,
                    marginLeft: 10,
                    flexShrink: 1,
                    lineHeight: 21,
                    width: "65%",
                  }}
                >
                  {inforTicket.description}
                </Text>
              ) : null}
            </View>
          </View>

          <Pressable
            onPress={() => setIsVisibleImages(true)}
            style={{
              backgroundColor: "grey",
              padding: 10,
              borderRadius: 5,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="folder-multiple-image"
              size={24}
              color="white"
            />
            <Text style={{ marginLeft: 10, color: "white" }}>Xem ảnh</Text>
          </Pressable>

          {inforTicket != null ? (
            inforTicket.status == "processing" ? (
              <>
                <View
                  style={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "58%" }}>
                    <SelectList
                      setSelected={(val) => setSelectedReason(val)}
                      data={reason}
                      maxHeight={150}
                      defaultOption={{ key: "0", value: "Nguyên nhân lỗi" }}
                      boxStyles={{
                        marginTop: 20,
                        maxWidth: "100%",
                        minWidth: "100%",
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
                        borderWidth: 0,
                      }}
                    />
                  </View>
                  <View style={{ width: "38%" }}>
                    <SelectList
                      setSelected={(val) => setSelectedTime(val)}
                      data={time}
                      maxHeight={150}
                      defaultOption={{ key: "0", value: "Thời gian" }}
                      boxStyles={{
                        marginTop: 20,
                        maxWidth: "100%",
                        minWidth: "100%",
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
                        borderWidth: 0,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: "90%",
                    display: "flex",
                  }}
                >
                  <TextInput
                    textAlignVertical="top"
                    style={styles.input3}
                    multiline={true}
                    numberOfLines={7}
                    placeholder="Ghi chú"
                    value={note}
                    onChangeText={(text) => setNote(text)}
                  ></TextInput>
                </View>
              </>
            ) : null
          ) : null}
          {inforTicket != null ? (
            inforTicket.status == "pending" ? (
              <Pressable
                onPress={receiveTicket}
                style={{ ...styles.button, width: "90%" }}
              >
                <Text style={{ color: "white", fontSize: 12, fontWeight: 700 }}>
                  Tiếp Nhận
                </Text>
              </Pressable>
            ) : (
              <View
                style={{
                  display: "flex",
                  width: "90%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  onPress={receiveTicket}
                  style={{ ...styles.button, backgroundColor: "#29d13a" }}
                >
                  <Text
                    style={{ color: "white", fontSize: 12, fontWeight: 700 }}
                  >
                    Hoàn thành
                  </Text>
                </Pressable>
                <Pressable
                  onPress={receiveTicket}
                  style={{ ...styles.button, backgroundColor: "#ff2d2d" }}
                >
                  <Text
                    style={{ color: "white", fontSize: 12, fontWeight: 700 }}
                  >
                    Chưa xử lý được
                  </Text>
                </Pressable>
              </View>
            )
          ) : null}
          {inforTicket != null ? handleShowImage() : null}
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
    width: "100%",
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
    backgroundColor: "#2245ac",
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
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
    padding: 10,
    borderRadius: 5,
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
    padding: 5,
    borderRadius: 5,
    shadowColor: "#000",
  },
});
