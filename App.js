import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./src/Components/Login/LoginScreen";
import { Dimensions } from "react-native";
import MainScreen from "./src/Components/Home/MainScreen";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogLevel, OneSignal } from "react-native-onesignal";

const Stack = createNativeStackNavigator();

export default function App() {
  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize("998ad8ad-1f27-49ae-b2cf-f72ce7f7ebe2");
  console.log("hello");
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener("click", (event) => {
    console.log("OneSignal: notification clicked:", event);
  });

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Main"
            component={MainScreen}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
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
