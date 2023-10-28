import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Pressable, Modal } from "react-native";
import { Dimensions } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { FontAwesome5, MaterialIcons, Octicons } from "@expo/vector-icons";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export default function SettingScreen({ route, navigation, checkLogin }) {
  const { userID, accessToken } = route.params;
  const [user, setUser] = useState();
  const [reload, setReload] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],

    androidClientId:
      "307189795157-ffu87084ubfoge5rvuooedl206hho8qk.apps.googleusercontent.com",
    iosClientId:
      "307189795157-o2k4dt8m0fvfacgv69s9n3ra2i6nm4jt.apps.googleusercontent.com",
  });

  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/user/${userID}`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const SignOut = async () => {
    setModalVisible(false);
    try {
      await GoogleSignin.signOut();
      checkLogin();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.infor}>
          <Image
            style={{ height: 80, aspectRatio: "1/1", borderRadius: 80 }}
            source={
              user == null
                ? require("../../../../../assets/images/user-image.png")
                : { uri: user.imageURL }
            }
          ></Image>
          <Text
            style={{
              fontSize: 16,
              color: "#fff",
              width: "100%",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            {user == null ? "User Full Name" : user.name}
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.item}>
            <View
              style={{
                backgroundColor: "#edf0f0",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <FontAwesome5 name="user" size={24} color="black" />
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 600,
                width: "30%",
                textAlign: "center",
              }}
            >
              Chỉnh sửa tài khoản
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
          <View style={styles.item}>
            <View
              style={{
                backgroundColor: "#edf0f0",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Octicons name="bell" size={24} color="black" />
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 600,
                width: "30%",
                textAlign: "center",
              }}
            >
              Tắt thông báo
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
          <Pressable onPress={() => setModalVisible(true)} style={styles.item}>
            <View
              style={{
                backgroundColor: "#edf0f0",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <MaterialIcons name="logout" size={24} color="black" />
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 600,
                width: "30%",
                textAlign: "center",
              }}
            >
              Đăng xuất
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
              style={{ opacity: 0 }}
            />
          </Pressable>
        </View>
      </View>

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
            <Text style={styles.modalText}>Bạn muốn đăng xuất ?</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Pressable
                style={[styles.button2, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hủy</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={SignOut}
              >
                <Text style={styles.textStyle}>Đăng Xuất</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // backgroundColor: "yellow",
    justifyContent: "flex-end",
  },
  body: {
    width: "100%",
    height: "70%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "relative",
    paddingTop: 10,
    display: "flex",
    alignItems: "center",
  },
  infor: {
    display: "flex",
    // flexDirection: "row",
    position: "absolute",
    bottom: "105%",
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 24,
  },
  itemTicket: {
    width: "90%",
    backgroundColor: "#f1f4f5",
    padding: 10,
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
  },
  content: {
    width: "100%",
    // backgroundColor: "red",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
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
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    width: 100,
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
    fontSize: 16,
    fontWeight: "600",
  },
  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    width: 100,
  },
});
