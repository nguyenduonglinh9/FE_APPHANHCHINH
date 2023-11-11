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
import HistoryScreen from "./HistoryScreen";
import DetailTicketStaff from "../DetailTicketStaff/MainScreen";

const Stack = createNativeStackNavigator();

export default function MainHistoryStaffScreen({ route, navigaion }) {
  const { userID, accessToken } = route.params;
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          initialParams={{ userID: userID, accessToken: accessToken }}
          options={{ headerShown: false }}
          name="HistoryScreen"
          component={HistoryScreen}
        />
        <Stack.Screen
          initialParams={{ userID: userID, accessToken: accessToken }}
          options={{ headerShown: false }}
          name="DetailTicketStaff"
          component={DetailTicketStaff}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
