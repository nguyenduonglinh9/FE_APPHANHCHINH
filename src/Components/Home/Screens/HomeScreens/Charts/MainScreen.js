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
import ChartsScreen from "./ChartsScreen";
import DetailChartScreen from "./DetailChartsScreen";

const Stack = createNativeStackNavigator();

export default function MainChartScreen({ route, navigation }) {
  const { userID, accessToken } = route.params;
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          initialParams={{
            userID: userID,
            accessToken: accessToken,
            handleBack: () => {
              navigation.goBack();
            },
          }}
          options={{ headerShown: false }}
          name="ChartsScreen"
          component={ChartsScreen}
        />
        <Stack.Screen
          initialParams={{
            userID: userID,
            accessToken: accessToken,
            handleBack: () => {
              navigation.goBack();
            },
          }}
          options={{ headerShown: false }}
          name="DetailChartScreen"
          component={DetailChartScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
