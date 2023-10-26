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
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
var randomColor = require("randomcolor");
import { CommonActions } from "@react-navigation/native";

export default function ListFloorScreen({ route, navigation }) {
  const { accessToken, userID, idBuild } = route.params;
  const [build, setBuild] = useState();
  const [rooms, setRooms] = useState([]);
  const [roomsF, setRoomsF] = useState([]);
  const [roomsP, setRoomsP] = useState([]);
  const [roomsT, setRoomsT] = useState([]);

  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/building/${idBuild}`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setBuild(data));
  }, []);

  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/room", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }, []);

  const renderFloorList = () => {
    if (build.floor.length > 0) {
      return build.floor.map((item, index) => {
        const color = randomColor();
        return (
          <Pressable
            onPress={() =>
              navigation.navigate("ListRoomScreen", {
                key: `${String(build.name).slice(-1)}${item}`,
                floor: `Tầng ${item}`,
              })
            }
            key={index}
            style={{
              backgroundColor: `${color}40`,
              width: "32%",
              height: 100,
              marginTop: 10,
              marginBottom: 10,
              padding: 10,
              display: "flex",
              justifyContent: "space-between",
              borderRadius: 10,
            }}
          >
            <MaterialCommunityIcons
              name="hospital-building"
              size={24}
              color={color}
            />
            <Text style={{ fontWeight: 500, fontSize: 16, opacity: 1 }}>
              Tầng {item}
            </Text>
            <Text style={{ fontWeight: 400, fontSize: 14 }}>
              {renderListRoom(item)} Phòng
            </Text>
          </Pressable>
        );
      });
    } else {
      return (
        <View>
          <Text>Dữ liệu đang cập nhật</Text>
        </View>
      );
    }
  };

  const renderListRoom = (data) => {
    return rooms.filter((item, index) => {
      return item.name.indexOf(`${String(build.name).slice(-1)}${data}`) != -1;
    }).length;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          onPress={() => navigation.dispatch(CommonActions.goBack())}
          name="keyboard-arrow-left"
          size={24}
          color="black"
        />
        <Text style={{ fontSize: 16, fontWeight: 600 }}>
          {build != null ? build.name : ""}
        </Text>
        <Feather name="bell" size={24} color="black" />
      </View>
      <View style={styles.body}>
        {build != null && rooms.length > 0 ? renderFloorList() : null}
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
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // backgroundColor: "red",
    justifyContent: "flex-start",
    columnGap: 5,
    flex: 1,
  },
});
