import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectList } from "react-native-dropdown-select-list";
import LottieView from "lottie-react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { io } from "socket.io-client";
import { useSafeArea } from "react-native-safe-area-context";

export default function CreateTiket({ route, navigation, sendCreateTicket }) {
  const { type, userID, accessToken } = route.params;
  const [showList, setShowList] = useState(false);
  const [test, setTest] = useState("Sự Cố Đang Gặp Phải");
  const [imagePicker, setImagePicker] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [desciption, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [build, setBuild] = useState([]);
  const [selectedBuild, setSelectedBuild] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedIssues, setSelectedIssues] = useState("");
  const [loading, setLoading] = useState(false);
  const [issuesTypes, setIssuesTypes] = useState([]);
  const [issues, setIssues] = useState([]);

  const socket = useRef();
  const insets = useSafeArea();

  const BottomSheetModalRef = useRef(null);
  const snapPoints = ["90%"];

  //socketIO
  useEffect(() => {
    socket.current = io.connect("https://linhnd-socketoi-udhc.onrender.com");

    // socket.current.on("server-send-data", (data) => {
    //   console.log(data);
    // });
  }, []);

  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/issuestype", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIssuesTypes(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/issues", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/building", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const newData = data.map((item, index) => {
          return { key: item.name, value: item.name };
        });
        setBuild(newData);
      });
  }, []);

  useEffect(() => {
    const newString = removeVietnameseTones(selectedBuild);

    fetch("https://ndl-be-apphanhchinh.onrender.com/room", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const newData = data.filter((item, index) => {
          return item.name.indexOf(newString.toString().slice(4, 5)) != -1;
        });
        const newData2 = newData.map((item, index) => {
          return { key: item.name, value: item.name };
        });
        setRooms(newData2);
      });
  }, [selectedBuild]);

  function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    return str;
  }

  const pickImage = async () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    const response = await launchImageLibrary(options);
    if (response.didCancel) {
      console.log("User cancelled image picker");
    } else if (response.error) {
      console.log("ImagePicker Error: ", response.error);
    } else if (response.customButton) {
      console.log("User tapped custom button: ", response.customButton);
    } else {
      setImagePicker((imagePicker) => [...imagePicker, response.assets[0]]);
    }
  };

  const handleCameraLaunch = async () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    const response = await launchCamera(options);

    if (response.didCancel) {
      console.log("User cancelled image picker");
    } else if (response.error) {
      console.log("ImagePicker Error: ", response.error);
    } else if (response.customButton) {
      console.log("User tapped custom button: ", response.customButton);
    } else {
      setImagePicker((imagePicker) => [...imagePicker, response.assets[0]]);
    }
  };

  function showImages() {
    if (imagePicker.length == 0) {
    } else {
      return imagePicker.map((img, index) => {
        if (index == 0 || index == 1) {
          return (
            <Image
              key={index}
              style={{ width: "48%", aspectRatio: "1/1", borderRadius: 5 }}
              source={{ uri: img.uri || "" }}
              resizeMode="contain"
            ></Image>
          );
        }
      });
    }
  }

  const showAllImage = () => {
    if (imagePicker.length == 0) {
    } else {
      return imagePicker.map((img, index) => {
        return (
          <Image
            key={index}
            style={{
              width: "48%",
              aspectRatio: "1/1",
              borderRadius: 5,
              marginTop: 10,
            }}
            source={{ uri: img.uri }}
            resizeMode="contain"
          ></Image>
        );
      });
    }
  };

  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem("idTicket", data.infor._id);
    } catch (error) {
      console.log("Lỗi :" + error);
    }
    // console.log("Save thành công");
  };

  const validate = () => {
    if (selectedBuild == 0) {
      setError("Vui lòng chọn tòa nhà ");
      setModalVisible2(true);
    } else if (selectedRoom == 0) {
      setError("Vui lòng chọn phòng học ");
      setModalVisible2(true);
    } else if (selectedIssues == 0) {
      setError("Vui lòng chọn loại sự cố đang gặp");
      setModalVisible2(true);
    } else {
      setModalVisible(true);
      var formData = new FormData();
      imagePicker.map((item, index) => {
        formData.append("images", {
          uri: item.uri,
          name: item.fileName,
          type: "image/jpeg",
        });
      });

      fetch("https://ndl-be-apphanhchinh.onrender.com/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code == 200) {
            const images = [];
            for (let i = 0; i < data.message.length; i++) {
              images.push(data.message[i].path);
            }

            const Data = {
              title: test,
              description: desciption,
              room: title,
              images: [...images],
              status: "pending",
              createdAt: new Date().toJSON(),
              receivedAt: "",
              completedAt: "",
              staffID: "",
              userID: userID,
              star: "",
              comment: "",
              type: type,
              typeID: selectedIssues,
              note: "",
              time: "",
              build: selectedBuild,
              room: selectedRoom,
              reason: "",
              isTime: "",
            };
            fetch("https://ndl-be-apphanhchinh.onrender.com/ticket/create", {
              method: "POST",
              headers: {
                access_token: accessToken,
                "Content-type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify(Data),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.code == 200) {
                  setModalVisible(false);
                  navigation.navigate("DetailTicket", {
                    idTicket: data.infor._id,
                  });
                }
              });
          }
        });
    }
  };
  const handelPresentModal = () => {
    BottomSheetModalRef.current?.present();
  };

  const handleList = () => {
    if (type == "baocaosuco") {
      const newwArr = issuesTypes.filter((item, index) => {
        return item.name == "Công Nghệ Thông Tin";
      });

      return issues
        .filter((item, index) => {
          return item.idType != newwArr[0]._id;
        })
        .map((item, index) => {
          return { key: item.idType, value: item.name };
        });
    } else {
      const newwArr = issuesTypes.filter((item, index) => {
        return item.name == "Công Nghệ Thông Tin" || item.name == "Khác";
      });

      return issues
        .filter((item, index) => {
          return item.idType == newwArr[0]._id || item.idType == newwArr[1]._id;
        })
        .reverse()
        .map((item, index) => {
          return { key: item.idType, value: item.name };
        });
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={{ ...styles.content, paddingTop: insets.top }}>
        <View style={styles.header}>
          <AntDesign
            style={{ position: "absolute", left: 10, top: 10 }}
            name="left"
            size={20}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text style={{ fontSize: 18, fontWeight: 700 }}>
            {type == "baocaosuco" ? "Báo Cáo Sự Cố" : "Yêu Cầu Hỗ Trợ CNTT"}
          </Text>
        </View>
        <ScrollView>
          <View style={styles.body}>
            <SelectList
              setSelected={(val) => setSelectedBuild(val)}
              data={build.length != 0 ? build : []}
              maxHeight={150}
              defaultOption={{ key: "0", value: "Chọn tòa nhà" }}
              boxStyles={{
                marginTop: 20,
                maxWidth: "90%",
                minWidth: "90%",
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
            <SelectList
              setSelected={(val) => setSelectedRoom(val)}
              data={selectedBuild != 0 ? rooms : []}
              defaultOption={{ key: "0", value: "Chọn phòng học" }}
              boxStyles={{
                borderWidth: 0,
                marginTop: 20,
                maxWidth: "90%",
                minWidth: "90%",
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
              }}
            />
            {/* <View style={styles.dropdowngroup}>
              <Pressable
                style={styles.input2}
                onPress={() => setShowList(!showList)}
              >
                <Text style={{ width: "90%" }}>{test}</Text>
                {showList == true ? (
                  <AntDesign
                    style={{ width: "10%" }}
                    name="up"
                    size={24}
                    color="black"
                  />
                ) : (
                  <AntDesign
                    style={{ width: "10%" }}
                    name="down"
                    size={24}
                    color="black"
                  />
                )}
              </Pressable>
              <View style={showList == false ? styles.list : styles.listShow}>
                {type == "baocaosuco"
                  ? listProblem.map((item, index) => {
                      return (
                        <Pressable
                          key={index}
                          onPress={() => {
                            setShowList(false);
                            setTest(item);
                          }}
                          style={styles.item}
                        >
                          <Text>{item}</Text>
                        </Pressable>
                      );
                    })
                  : listCNTT.map((item, index) => {
                      return (
                        <Pressable
                          key={index}
                          onPress={() => {
                            setShowList(false);
                            setTest(item);
                          }}
                          style={styles.item}
                        >
                          <Text>{item}</Text>
                        </Pressable>
                      );
                    })}
              </View>
            </View> */}
            <SelectList
              save="value"
              setSelected={(val) => {
                setTest(val);
                issues
                  .filter((item, index) => {
                    return item.name == val;
                  })
                  .map((item, index) => {
                    setSelectedIssues(item.idType);
                  });
              }}
              data={
                issues.length != 0 && issuesTypes.length != 0
                  ? handleList()
                  : []
              }
              maxHeight={150}
              defaultOption={{ key: "0", value: "Chọn sự cố" }}
              boxStyles={{
                marginTop: 20,
                maxWidth: "90%",
                minWidth: "90%",
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
                borderWidth: 0,
              }}
            />
            <TextInput
              style={styles.input3}
              multiline={true}
              numberOfLines={7}
              placeholder="Mô Tả Sự Cố"
              value={desciption}
              onChangeText={(text) => setDescription(text)}
            ></TextInput>
            <View style={styles.imgGroup}>
              <Pressable onPress={handleCameraLaunch} style={styles.btn}>
                <Image
                  source={require("../../../../../../assets/Icons/camera.png")}
                ></Image>
              </Pressable>
              <Pressable onPress={pickImage} style={styles.btn}>
                <Image
                  source={require("../../../../../../assets/Icons/image.png")}
                ></Image>
              </Pressable>
            </View>
            <View style={styles.imgShow}>
              {showImages()}
              <Pressable
                onPress={handelPresentModal}
                style={
                  imagePicker.length != 0
                    ? imagePicker.length >= 3
                      ? styles.countImgShow
                      : styles.countImg
                    : styles.countImg
                }
              >
                {imagePicker.length != 0 ? (
                  <Text style={{ fontSize: 30, fontWeight: 700 }}>
                    + {imagePicker.length - 2}
                  </Text>
                ) : null}
              </Pressable>
            </View>
            <Pressable
              // onPress={() => {
              //   socket.current.emit("createTicket", {
              //     message: "HELLO FROM CREATE TICKET SCREEN",
              //   });
              // }}
              onPress={validate}
              style={styles.button2}
            >
              <Text style={{ fontSize: 12, fontWeight: 700, color: "white" }}>
                Gủi Yêu Cầu
              </Text>
            </Pressable>
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
        </BottomSheetModal>
      </BottomSheetModalProvider>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible2(!modalVisible2);
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
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
    flex: 1,
    backgroundColor: "white",
    // width: "100%",
    // height: "100%",
    // display: "flex",
    // justifyContent: "flex-end",
  },
  content: {
    width: "100%",
    height: "100%",
    // backgroundColor: "yellow",
    // paddingTop: insets.top,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
    // marginTop: Constants.statusBarHeight,
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
    backgroundColor: "#00000070",
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
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
});
