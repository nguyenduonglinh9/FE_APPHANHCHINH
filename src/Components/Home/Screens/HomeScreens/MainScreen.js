import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import CreateTiket from "./CreateTicket/MainScreen";
import DetailTicket from "./DetailTicket/MainScreen";
import MainListTicketScreen from "./ListTicket/MainScreen";
import DetailTicketStaff from "./DetailTicketStaff/MainScreen";
import MainListBuildScreen from "./ListBuild/MainScreen";
import MainListStaffScreen from "./ListStaff/MainScreen";
import MainListTicketAdmin from "./ListTicketAdmin/MainScreen";
import MainChartScreen from "./Charts/MainScreen";
import { io } from "socket.io-client";
import messaging from "@react-native-firebase/messaging";
import {
  requestUserPermission,
  // NotificationListener,
} from "../../../../utils/pushnotification_helper";
import { useIsFocused } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function MainHomeScreen({ route, navigation }) {
  const { userID, accessToken } = route.params;
  const [initialRoute, setInitialRoute] = useState("Home");
  const [reload, setReload] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    requestUserPermission();
    // NotificationListener();
  }, []);

  useEffect(() => {
    setReload(isFocused);
  }, [isFocused]);

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
      {isFocused ? (
        <View style={styles.container}>
          <View style={styles.header}></View>
          <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen
              initialParams={{ userID: userID, accessToken: accessToken }}
              options={{ headerShown: false }}
              name="Home"
              component={HomeScreen}
            />

            <Stack.Screen
              initialParams={{ userID: userID, accessToken: accessToken }}
              options={{ headerShown: false }}
              name="CreateTicket"
            >
              {(props) => <CreateTiket {...props} />}
            </Stack.Screen>
            <Stack.Screen
              initialParams={{ userID: userID, accessToken: accessToken }}
              options={{ headerShown: false }}
              name="DetailTicket"
              component={DetailTicket}
            />
            <Stack.Screen
              initialParams={{ userID: userID, accessToken: accessToken }}
              options={{ headerShown: false }}
              name="DetailTicketStaff"
              component={DetailTicketStaff}
            />
            <Stack.Screen
              initialParams={{ userID: userID, accessToken: accessToken }}
              options={{ headerShown: false }}
              name="MainListTicketScreen"
              component={MainListTicketScreen}
            />
            <Stack.Screen
              initialParams={{ userID: userID, accessToken: accessToken }}
              options={{ headerShown: false }}
              name="MainListBuildScreen"
              component={MainListBuildScreen}
            />
            <Stack.Screen
              initialParams={{ userID: userID, accessToken: accessToken }}
              options={{ headerShown: false }}
              name="MainListStaffScreen"
              component={MainListStaffScreen}
            />
            <Stack.Screen
              initialParams={{ userID: userID, accessToken: accessToken }}
              options={{ headerShown: false }}
              name="MainListTicketAdmin"
              component={MainListTicketAdmin}
            />
            <Stack.Screen
              initialParams={{ userID: userID, accessToken: accessToken }}
              options={{ headerShown: false }}
              name="MainChartScreen"
              component={MainChartScreen}
            />
          </Stack.Navigator>
        </View>
      ) : null}
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
