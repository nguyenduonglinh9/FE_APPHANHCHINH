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
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { Rating } from "@kolking/react-native-rating";
import { CommonActions } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

export default function DetailTicket({ route, navigation }) {
  const { accessToken, idTicket } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [inforTicket, setInforTicket] = useState();
  const [users, setUsers] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [refesh, setRefesh] = useState(false);

  const BottomSheetModalRef = useRef(null);
  const snapPoints = ["90%"];

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

  const renderNameStaff = () => {
    return users
      .filter((item, index) => {
        return item.googleID == inforTicket.staffID;
      })
      .map((item, index) => {
        return (
          <>
            <Text
              style={{
                marginLeft: 10,
                width: "50%",
                flexShrink: 1,
              }}
            >
              {item.name}
            </Text>
            <View
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}
                source={{ uri: item.imageURL }}
              ></Image>
            </View>
          </>
        );
      });
  };

  const handleChange = useCallback((value) => setRating(value), [rating]);

  const handleUpdateTicket = () => {
    setModalVisible(true);

    fetch(
      `https://ndl-be-apphanhchinh.onrender.com/ticket/update/${inforTicket._id}`,
      {
        method: "POST",
        headers: {
          access_token: accessToken,
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          star: rating,
          comment: comment,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          setModalVisible(false);
          setRefesh(!refesh);
        }
      });
  };

  const handelPresentModal = () => {
    BottomSheetModalRef.current?.present();
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <AntDesign
            onPress={() => navigation.dispatch(CommonActions.goBack())}
            style={{ position: "absolute", left: 10, top: 10 }}
            name="left"
            size={20}
            color="black"
          />
          <Text style={{ fontSize: 18, fontWeight: 700 }}>
            Yêu Cầu Hỗ Trợ CNTT
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.body}>
            <View style={styles.inforTicket}>
              <Text style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>
                {inforTicket != null && users.length > 0
                  ? inforTicket.title
                  : null}
              </Text>
              <View
                style={{
                  marginBottom: 5,
                  display: "flex",
                  flexDirection: "row",

                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <Text style={{ width: "30%" }}>Người tiếp nhận : </Text>
                {inforTicket != null ? renderNameStaff() : null}
              </View>
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
            </View>
            <View style={styles.ticketStatus}>
              <Text style={{ fontSize: 16, fontWeight: 700 }}>
                Trạng Thái Yêu Cầu
              </Text>
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
                      {inforTicket != null
                        ? moment(inforTicket.createdAt).format("h:mm a")
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
                        : null
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
                      {inforTicket != null
                        ? inforTicket.status == "pending"
                          ? "--:--"
                          : moment(inforTicket.receivedAt).format("hh:mm a")
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
                      inforTicket != null
                        ? inforTicket.status == "pending" ||
                          inforTicket.status == "processing"
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
                    {inforTicket != null ? (
                      inforTicket.status == "pending" ||
                      inforTicket.status == "processing" ? (
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
                      {inforTicket != null
                        ? inforTicket.status == "pending" ||
                          inforTicket.status == "processing"
                          ? "--:--"
                          : moment(inforTicket.completedAt).format("hh:mm a")
                        : ""}
                    </Text>
                  </View>
                </View>
              </View>
              {inforTicket != null ? (
                inforTicket.status == "pending" ||
                inforTicket.status == "processing" ? (
                  <Pressable style={{ ...styles.button, width: "100%" }}>
                    <Text
                      style={{ color: "white", fontSize: 12, fontWeight: 700 }}
                    >
                      Trở Về
                    </Text>
                  </Pressable>
                ) : inforTicket.status == "finished" &&
                  inforTicket.star == "" ? (
                  <Pressable
                    onPress={handelPresentModal}
                    style={{ ...styles.button, width: "100%" }}
                  >
                    <Text
                      style={{ color: "white", fontSize: 12, fontWeight: 700 }}
                    >
                      Đánh giá
                    </Text>
                  </Pressable>
                ) : (
                  <View
                    style={{
                      backgroundColor: "#f1f4f5",
                      marginTop: 20,
                      padding: 20,
                      borderRadius: 10,
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <View style={{ width: "80%" }}>
                      <Text style={{ fontSize: 14, fontWeight: 400 }}>
                        {inforTicket.comment}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",

                        alignItems: "center",
                      }}
                    >
                      <Text>{inforTicket.star}</Text>
                      <AntDesign
                        style={{ marginLeft: 5 }}
                        name="star"
                        size={24}
                        color="#f0d440"
                      />
                    </View>
                  </View>
                )
              ) : null}
            </View>
          </View>
        </ScrollView>
      </View>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={BottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          containerStyle={{ backgroundColor: "#00000090" }}
          style={{ padding: 20 }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Text style={styles.modalText}>Đánh giá phiếu hỗ trợ</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                width: "100%",
                overflow: "hidden",
                alignItems: "flex-start",
              }}
            >
              <Rating
                style={{ height: 60 }}
                size={40}
                rating={rating}
                onChange={handleChange}
              />
            </View>
            <TextInput
              textAlignVertical="top"
              style={styles.input3}
              multiline={true}
              numberOfLines={15}
              placeholder="Lời nhận xét"
              value={comment}
              onChangeText={(text) => setComment(text)}
            ></TextInput>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hủy</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleUpdateTicket()}
              >
                <Text style={styles.textStyle}>Gửi</Text>
              </Pressable>
            </View>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView }}>
            <LottieView
              source={require("../../../../../../assets/lotties/loading.json")}
              autoPlay
              loop
              style={{ width: 100, height: 100 }}
            ></LottieView>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
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
    paddingBottom: 100,
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
