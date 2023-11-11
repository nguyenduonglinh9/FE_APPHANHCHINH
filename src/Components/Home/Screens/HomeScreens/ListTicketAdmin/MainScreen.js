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
import {
  Feather,
  FontAwesome,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSafeArea } from "react-native-safe-area-context";
import ListTicketAdmin from "./ListTicketScreen";
import DetailTicketAdmin from "./DetailTicketAdmin";

const Stack = createNativeStackNavigator();

export default function MainListTicketAdmin({ route, navigation }) {
  const { userID, accessToken, idType, nameType } = route.params;

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          initialParams={{
            userID: userID,
            accessToken: accessToken,
            idType: idType,
            nameType: nameType,
            handleBack: () => {
              navigation.goBack();
            },
          }}
          options={{ headerShown: false }}
          name="ListTicketAdmin"
          component={ListTicketAdmin}
        />
        <Stack.Screen
          initialParams={{
            userID: userID,
            accessToken: accessToken,
          }}
          options={{ headerShown: false }}
          name="DetailTicketAdmin"
          component={DetailTicketAdmin}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
