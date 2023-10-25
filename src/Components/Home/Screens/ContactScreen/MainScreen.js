import {
  Dimensions,
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
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
import ContactScreen from "./ContactScreen";

const Stack = createNativeStackNavigator();

export default function MainContactScreen() {
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
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Contact"
            component={ContactScreen}
          />
          {/* <Stack.Screen
              options={{ headerShown: false }}
              name="Main"
              component={MainScreen}
            /> */}
        </Stack.Navigator>
      </View>
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
