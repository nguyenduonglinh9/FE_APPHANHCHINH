import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Alert,
  Modal,
} from "react-native";
import { Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import "expo-dev-client";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [bgPress, setBgPress] = useState(false);

  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],

    androidClientId:
      "307189795157-ffu87084ubfoge5rvuooedl206hho8qk.apps.googleusercontent.com",
    iosClientId:
      "307189795157-o2k4dt8m0fvfacgv69s9n3ra2i6nm4jt.apps.googleusercontent.com",
  });

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("Thông tin : " + userInfo);
      if (userInfo != null) {
        if (userInfo.user.email.indexOf("fpt.edu.vn") == -1) {
          setModalVisible(true);
          setMessage("Vui lòng sử dụng email của FPT POLYTECHNIC !");
          try {
            await GoogleSignin.signOut();
            // setState({ user: null }); // Remember to remove the user from your app's state as well
          } catch (error) {
            console.error("LỖI :" + error);
          }
        } else {
          const user = {
            googleID: userInfo.user.id,
            email: userInfo.user.email,
            name: userInfo.user.name,
            imageURL:
              userInfo.user.photo != null
                ? userInfo.user.photo
                : "https://i.ibb.co/pJfVYnj/logo-fpt-inkythuatso-1-01-01-14-33-35.jpg",
          };
          fetch("https://ndl-be-apphanhchinh.onrender.com/authentication", {
            method: "POST",
            headers: {
              Accept: "application.json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.code == 200) {
                navigation.navigate("Main", {
                  userID: data.infor.googleID,
                  accessToken: data.accessToken,
                });
              }
            })
            .catch((err) => console.log(err));
        }
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("Hủy Đăng Nhập");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log("Hủy Đăng Nhập 1");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("play services not available or outdated");
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
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
            <Text style={styles.modalText}>{message}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>ĐÓNG</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.body}>
        <Image
          style={styles.logo}
          source={{ uri: "https://i.ibb.co/LQ0mhhR/logo.png" }}
        ></Image>
        <Pressable style={styles.button}>
          <Text>Lựa chọn cơ sở</Text>
        </Pressable>
        <Pressable
          onPress={signIn}
          style={bgPress == false ? styles.buttonLogin : styles.buttonPress}
        >
          <Image
            style={{ width: 20, height: 20 }}
            source={require("../../../assets/Icons/google.png")}
          ></Image>
          <Text style={styles.buttonText}>Google</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#f0f0f0",
    position: "relative",
  },
  header: {
    backgroundColor: "#2d5381",
    width: "100%",
    height: "40%",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    position: "absolute",
    top: 0,
  },
  body: {
    backgroundColor: "#ffffff",
    width: "80%",
    height: "70%",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 40,
    alignSelf: "center",
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "cover",
  },
  button: {
    backgroundColor: "red",
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonLogin: {
    flexDirection: "row",
    backgroundColor: "#3257c6",
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPress: {
    flexDirection: "row",
    backgroundColor: "grey",
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    marginLeft: 10,
  },
  webview: {
    position: "absolute",
    height: parseFloat(Dimensions.get("window").height) * (100 / 100),
    width: parseFloat(Dimensions.get("window").width) * (100 / 100),
    backgroundColor: "red",
    top: 0,
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
});
