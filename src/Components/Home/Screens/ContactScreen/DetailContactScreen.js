import {
  Dimensions,
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  Feather,
  FontAwesome,
  Ionicons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { useSafeArea } from "react-native-safe-area-context";
import { CommonActions } from "@react-navigation/native";

export default function DetailContactScreen({ route, navigation }) {
  const { id, accessToken } = route.params;
  const insets = useSafeArea();

  const [user, setUser] = useState();
  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/user/${id}`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <View style={styles.header}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            onPress={() => navigation.dispatch(CommonActions.goBack())}
            name="keyboard-arrow-left"
            size={24}
            color="white"
          />
          <Text style={{ color: "white" }}>Trở về</Text>
        </View>
        {user == null ? null : (
          <View style={styles.info}>
            <Image
              style={{ width: 70, height: 70, borderRadius: 70 }}
              source={{ uri: user.imageURL }}
            ></Image>
            <Text style={{ fontSize: 16, color: "white", marginTop: 10 }}>
              {user.name}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 20,
          }}
        >
          <View
            style={{ width: "80%", display: "flex", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 18, fontWeight: 400, opacity: 0.6 }}>
              Số điện thoại
            </Text>
            <Text style={{ fontSize: 18, fontWeight: 400 }}>0896459412</Text>
          </View>
          <View
            style={{
              width: "20%",
              aspectRatio: "1/1",

              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 50,
                aspectRatio: "1/1",
                borderRadius: 50,
                backgroundColor: "#e9ecef",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="ios-call" size={24} color="#2245ac" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d5381",
    display: "flex",
  },
  header: {
    padding: 10,
    display: "flex",
    height: "30%",
  },
  info: {
    display: "flex",
    alignItems: "center",
  },
  content: {
    width: "100%",
    height: "70%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
