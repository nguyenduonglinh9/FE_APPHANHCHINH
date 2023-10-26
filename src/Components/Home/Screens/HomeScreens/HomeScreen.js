import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Linking,
  TouchableHighlight,
  Dimensions,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function HomeScreen({ route, navigation }) {
  const [options, setOptions] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState();

  const { userID, accessToken } = route.params;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/features", {
      headers: { access_token: accessToken },
    })
      .then((res) => res.json())
      .then((data) => setOptions(data));
  }, []);

  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/user/${userID}`)
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
          <View style={styles.button}>
            <View style={{ width: "30%" }}>
              <Image
                style={{ height: 32, width: 32 }}
                source={require("../../../../../assets/Icons/nhansu.png")}
              ></Image>
            </View>
            <Text style={{ width: "70%", fontSize: 16, fontWeight: 500 }}>
              Nhân Sự
            </Text>
          </View>
          <View style={styles.button}>
            <View style={{ width: "30%" }}>
              <Image
                style={{ height: 32, width: 32 }}
                source={require("../../../../../assets/Icons/thongke.png")}
              ></Image>
            </View>
            <Text style={{ width: "70%", fontSize: 16, fontWeight: 500 }}>
              Thống Kê Sự Cố Trong Ngày
            </Text>
          </View>
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
          <View style={styles.button}>
            <View style={{ width: "30%" }}>
              <Image
                style={{ height: 32, width: 32 }}
                source={require("../../../../../assets/Icons/thanhtich.png")}
              ></Image>
            </View>
            <Text style={{ width: "70%", fontSize: 16, fontWeight: 500 }}>
              Thành Tích Cán Bộ
            </Text>
          </View>
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
          <View style={styles.button}>
            <View style={{ width: "30%" }}>
              <Image
                style={{ height: 32, width: 32 }}
                source={require("../../../../../assets/Icons/sansang.png")}
              ></Image>
            </View>
            <Text style={{ width: "70%", fontSize: 16, fontWeight: 500 }}>
              Tính Sắn Sàng Phòng
            </Text>
          </View>
        </>
      );
    }
  };

  return (
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
          <Image
            source={require("../../../../../assets/Icons/bell.png")}
          ></Image>
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
        {user != null ? viewUser(user) : null}
      </View>
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
    height: "80%",
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
