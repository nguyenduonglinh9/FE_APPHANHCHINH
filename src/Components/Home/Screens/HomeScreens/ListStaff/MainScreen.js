import { Dimensions, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  Feather,
  FontAwesome,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TopTabsScreen from "./TopTabScreen";
import DetailRateScreen from "./DetailRateScreen";
import DetailStaffScreen from "./DetailStaffScreen";
import Constants from "expo-constants";

const Stack = createNativeStackNavigator();

export default function MainListStaffScreen({ route, navigaion }) {
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
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          initialParams={{ userID: userID, accessToken: accessToken }}
          options={{ headerShown: false }}
          name="TopTabsScreen"
          component={TopTabsScreen}
        />
        <Stack.Screen
          initialParams={{ userID: userID, accessToken: accessToken }}
          options={{
            headerShown: false,
          }}
          name="DetailRateScreen"
          component={DetailRateScreen}
        ></Stack.Screen>
        <Stack.Screen
          initialParams={{ userID: userID, accessToken: accessToken }}
          options={{
            headerShown: false,
          }}
          name="DetailStaffScreen"
          component={DetailStaffScreen}
        ></Stack.Screen>
      </Stack.Navigator>
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
