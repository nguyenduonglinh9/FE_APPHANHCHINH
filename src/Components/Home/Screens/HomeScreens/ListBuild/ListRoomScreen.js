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

export default function ListRoomScreen({ route, navigation }) {
  const { accessToken, userID, key, floor } = route.params;
  const [rooms, setRooms] = useState([]);

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

  const renderListRoom = () => {
    return rooms
      .filter((item, index) => {
        return item.name.indexOf(key) != -1;
      })
      .map((item, index) => {
        return (
          <Pressable
            onPress={() =>
              navigation.navigate("DetailRoomScreen", { idRoom: item._id })
            }
            style={
              item.isReady == true
                ? {
                    padding: 10,
                    margin: 10,
                    backgroundColor: "#e9ecef",
                    borderColor: "#d2d4d7",
                    borderWidth: 1,
                    borderRadius: 3,
                  }
                : {
                    padding: 10,
                    margin: 10,
                    backgroundColor: "#00ffab",
                    borderColor: "#00e59a",
                    borderWidth: 1,
                    borderRadius: 3,
                  }
            }
            key={item._id}
          >
            <Text>{item.name}</Text>
          </Pressable>
        );
      });
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
        <Text style={{ fontSize: 16, fontWeight: 600 }}>{floor}</Text>
        <Feather name="bell" size={24} color="black" />
      </View>
      <View style={styles.body}>
        {rooms.length > 0 ? renderListRoom() : null}
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
    justifyContent: "center",
    columnGap: 5,
    flex: 1,
  },
});
