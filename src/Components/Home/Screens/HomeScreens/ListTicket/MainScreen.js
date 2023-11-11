import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TicketPending from "./TicketPending";
import TicketProcessing from "./TicketProcessing";
import DetailTicketStaff from "../DetailTicketStaff/MainScreen";
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
import { useSafeArea } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();
const { Navigator, Screen } = createMaterialTopTabNavigator();

export default function MainListTicketScreen({ route, navigation }) {
  const { accessToken, userID } = route.params;
  const insets = useSafeArea();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "rgb(45, 83, 129)",
      background: "#2d5381",
      card: "rgb(244, 245, 242)",
    },
  };
  // StatusBar.setHidden(true);

  return (
    <NavigationContainer theme={MyTheme} independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "white",
            shadowColor: "none",
            paddingTop: insets.top,
          },
        }}
      >
        <Tab.Screen
          initialParams={{
            accessToken: accessToken,
            userID: userID,
            switchScreen: (id) => {
              navigation.navigate("DetailTicketStaff", { idTicket: id });
            },
          }}
          name="Sự cố hiện có"
          component={TicketPending}
        />
        <Tab.Screen
          initialParams={{
            accessToken: accessToken,
            userID: userID,
            switchScreen: (id) => {
              navigation.navigate("DetailTicketStaff", { idTicket: id });
            },
          }}
          name="Đang tiếp nhận"
          component={TicketProcessing}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
