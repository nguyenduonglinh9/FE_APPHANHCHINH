import {
  Dimensions,
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  FlatList,
  StatusBar,
  TextInput,
  ActivityIndicator,
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
// import { BlurView } from "@react-native-community/blur";

export default function DetailRoomScreen({ route, navigation }) {
  const { accessToken, userID, key, floor, idRoom } = route.params;
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState();

  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/room/${idRoom}`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setRoom(data));
  }, []);

  const handleChangeValue = (key) => {
    const newAssets = room.assets.map((item, index) => {
      if (index == key) {
        item.isExist = !item.isExist;
        return item;
      } else {
        return item;
      }
    });
    const newRoom = Object.assign({}, room, { assets: newAssets });

    setRoom(newRoom);
  };

  const handleChangeValueDesc = (key, val) => {
    console.log(val);
    const newAssets = room.assets.map((item, index) => {
      if (index == key) {
        item.desc = val;
        return item;
      } else {
        return item;
      }
    });
    const newRoom = Object.assign({}, room, { assets: newAssets });
    setRoom(newRoom);
  };

  const renderRoom = () => {
    return room.assets.map((item, index) => {
      return (
        <View
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "95%",
            justifyContent: "space-between",
            marginTop: 5,
            marginBottom: 5,
            columnGap: 5,
          }}
        >
          <View
            style={{
              backgroundColor: "#ebebeb",
              borderColor: "#d3d3d3",
              borderWidth: 1,
              padding: 5,
              width: "35%",
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 400 }} f>
              {item.name}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#ebebeb",
              borderColor: "#d3d3d3",
              borderWidth: 1,
              padding: 5,
              width: "25%",
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 400 }}>
              số lương: {item.quantity}
            </Text>
          </View>
          <View
            style={{
              ...styles.section,
              backgroundColor: "#ebebeb",
              borderColor: "#d3d3d3",
              borderWidth: 1,
              padding: 5,
              width: "10%",
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable onPress={() => handleChangeValue(index)}>
              <Feather
                style={!item.isExist ? { opacity: 0 } : { opacity: 1 }}
                name="check"
                size={24}
                color="black"
              />
            </Pressable>
          </View>
          <View
            style={{
              backgroundColor: "#ebebeb",
              borderColor: "#d3d3d3",
              borderWidth: 1,
              padding: 5,
              width: "30%",
              borderRadius: 10,
            }}
          >
            <TextInput
              defaultValue={item.desc}
              onChangeText={(val) => handleChangeValueDesc(index, val)}
            ></TextInput>
          </View>
        </View>
      );
    });
  };

  const handleUpdateRoom = () => {
    setLoading(true);
    const data = {
      name: room.name,
      isReady: room.isReady,
      assets: [...room.assets],
    };

    fetch(`https://ndl-be-apphanhchinh.onrender.com/room/update/${idRoom}`, {
      headers: {
        access_token: accessToken,
        "Content-type": "application/json; charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          setLoading(false);
        }
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
        <Text style={{ fontSize: 16, fontWeight: 600 }}>
          {room != null ? room.name : ""}
        </Text>
        <Feather name="bell" size={24} color="black" />
      </View>
      <View style={styles.body}>
        <Text style={{ fontSize: 16, fontWeight: 700 }}>Danh mục tài sản</Text>
        <View style={{ width: "100%", marginTop: 20 }}>
          {room != null ? renderRoom() : null}
        </View>
        <View>
          <Pressable
            onPress={handleUpdateRoom}
            style={{
              backgroundColor: "#2245ac",
              padding: 10,
              marginTop: 50,
              borderRadius: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#ffffff" }}>Hoàn thành</Text>
          </Pressable>
        </View>
      </View>
      {/* <BlurView
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
        style={
          loading
            ? {
                width: "100%",
                height: "100%",
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }
            : {
                width: "100%",
                height: "100%",
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                display: "none",
                flexDirection: "row",
              }
        }
      >
        <ActivityIndicator size="medium" color="#00ff00" />
      </BlurView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    paddingTop: 40,
    display: "flex",
    alignItems: "center",
    paddingBottom: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  body: {
    marginTop: 20,
    display: "flex",
    flexWrap: "wrap",
    columnGap: 5,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
});
