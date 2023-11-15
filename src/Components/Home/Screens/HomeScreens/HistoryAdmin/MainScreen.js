import { Dimensions, StyleSheet, View, Text, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  Feather,
  FontAwesome,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Constants } from "expo-constants";
import moment from "moment";

export default function MainHistoryAdminScreen({ route, navigation }) {
  const { userID, accessToken } = route.params;
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/histories", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setHistories(data));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.header}>
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="keyboard-arrow-left"
            size={24}
            color="black"
          />
          <Text style={{ fontSize: 16, fontWeight: 700, lineHeight: 24 }}>
            Lịch sử hoạt động
          </Text>
          <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
        </View>
        <View style={{ padding: 10 }}>
          {histories.length <= 0 ? (
            <Text>Chưa có hoạt động nào</Text>
          ) : (
            histories.map((item, index) => {
              return (
                <View
                  style={{
                    backgroundColor: "#f1f4f5",
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: 500 }}>
                    {item.description}
                  </Text>
                  <View
                    style={{
                      marginTop: 10,
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text>
                      Thời gian : {moment(item.createdAt).format("DD/MM/yyyy")}
                    </Text>
                    <Text style={{ marginLeft: 10 }}>
                      {" "}
                      {moment(item.createdAt).format("hh:mm a")}
                    </Text>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d5381",
    paddingTop: StatusBar.currentHeight,
  },
  body: {
    height: "100%",
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
