import {
  Dimensions,
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  Feather,
  FontAwesome,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
var randomColor = require("randomcolor");

export default function ListBuildScreen({ route, navigation }) {
  const { accessToken, userID } = route.params;
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/building", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setBuilds(data));
  }, []);

  const renderBuildList = () => {
    return builds.map((build, index) => {
      let color = "";
      if (build.name == "TÒA F") {
        color = "#0d51a1";
      } else if (build.name == "TÒA P") {
        color = "#f27125";
      } else {
        color = "#4eb849";
      }
      return (
        <Pressable
          onPress={() =>
            navigation.navigate("ListFloorScreen", { idBuild: build._id })
          }
          key={index}
          style={{
            backgroundColor: color,
            paddingTop: 40,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 40,
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 10,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 0.8 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 600, color: "#ffffff" }}>
                {build.name}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: 500, color: "#ffffff" }}>
                {build.floor.length} Tầng
              </Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontSize: 12, fontWeight: 400, color: "#ffffff" }}>
                {build.description}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.2,

              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="#ffffff"
            />
          </View>
        </Pressable>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
        <Text style={{ fontSize: 16, fontWeight: 600 }}>
          Kiểm tra tính sẵn phòng học
        </Text>
        <Feather name="bell" size={24} color="black" />
      </View>
      <View style={styles.body}>
        {builds.length > 0 ? renderBuildList() : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  body: {
    marginTop: 20,
  },
});
