import {
  Dimensions,
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  Feather,
  FontAwesome,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import ListStaffScreen from "./ListStaffScreen";
import ListRateScreen from "./ListRateScreen";
import Constants from "expo-constants";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function TopTabsScreen({ route, navigation }) {
  const { userID, accessToken } = route.params;
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "rgb(45, 83, 129)",
      background: "#2d5381",
      card: "rgb(244, 245, 242)",
    },
  };

  const toDetailScreen = (id) => {
    navigation.navigate("DetailRateScreen", { id: id });
  };
  const toDetailStaffScreen = (id) => {
    navigation.navigate("DetailStaffScreen", { id: id });
  };
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator style={{ marginTop: Constants.statusBarHeight }}>
        <Tab.Screen
          initialParams={{ userID: userID, accessToken: accessToken }}
          options={{ headerShown: false }}
          name="Nhân sự"
        >
          {(props) => (
            <ListStaffScreen toDetailScreen={toDetailStaffScreen} {...props} />
          )}
        </Tab.Screen>
        <Tab.Screen
          initialParams={{ userID: userID, accessToken: accessToken }}
          options={{ headerShown: false }}
          name="Đánh giá"
        >
          {(props) => (
            <ListRateScreen toDetailScreen={toDetailScreen} {...props} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
});
