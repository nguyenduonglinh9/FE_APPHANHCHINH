import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ListBuildScreen from "./ListBuildScreen";
import ListFloorScreen from "./ListFloorScreen";
import ListRoomScreen from "./ListRoomScreen";
import DetailRoomScreen from "./DetailRoomScreen";
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
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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

const Stack = createNativeStackNavigator();

export default function MainListBuildScreen({ route, navigation }) {
  const { accessToken, userID } = route.params;
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
    <NavigationContainer theme={MyTheme} independent={true}>
      <Stack.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "white",
            shadowColor: "none",
          },
        }}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          initialParams={{
            accessToken: accessToken,
            userID: userID,
            // switchScreen: (id) => {
            //   navigation.navigate("DetailTicketStaff", { idTicket: id });
            // },
          }}
          name="ListBuildScreen"
          component={ListBuildScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          initialParams={{
            accessToken: accessToken,
            userID: userID,
            // switchScreen: (id) => {
            //   navigation.navigate("DetailTicketStaff", { idTicket: id });
            // },
          }}
          name="ListFloorScreen"
          component={ListFloorScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          initialParams={{
            accessToken: accessToken,
            userID: userID,
            // switchScreen: (id) => {
            //   navigation.navigate("DetailTicketStaff", { idTicket: id });
            // },
          }}
          name="ListRoomScreen"
          component={ListRoomScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          initialParams={{
            accessToken: accessToken,
            userID: userID,
            // switchScreen: (id) => {
            //   navigation.navigate("DetailTicketStaff", { idTicket: id });
            // },
          }}
          name="DetailRoomScreen"
          component={DetailRoomScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
