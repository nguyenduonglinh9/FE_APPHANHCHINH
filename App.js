import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./src/Components/Login/LoginScreen";
import { Dimensions } from "react-native";
import MainScreen from "./src/Components/Home/MainScreen";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingScreen from "./src/Components/Home/Screens/SettingScreen/SettingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
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
    <NavigationContainer>
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
