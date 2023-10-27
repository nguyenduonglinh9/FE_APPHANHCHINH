import {
  Dimensions,
  Text,
  View,
  Pressable,
  Image,
  BackHandler,
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
import MainHomeScreen from "./Screens/HomeScreens/MainScreen";
import MainHistoryScreen from "../Home/Screens/HistoryScreen/MainScreen";
import MainSettingScreen from "../Home/Screens/SettingScreen/MainScreen";
import MainContactScreen from "./Screens/ContactScreen/MainScreen";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function MainScreen({ route, navigation }) {
  const { userID, accessToken } = route.params;
  const [user, setUser] = useState();

  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],

    androidClientId:
      "307189795157-ffu87084ubfoge5rvuooedl206hho8qk.apps.googleusercontent.com",
    iosClientId:
      "307189795157-o2k4dt8m0fvfacgv69s9n3ra2i6nm4jt.apps.googleusercontent.com",
  });

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "rgb(45, 83, 129)",
      background: "#2d5381",
      card: "rgb(244, 245, 242)",
    },
  };

  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],

    androidClientId:
      "307189795157-ffu87084ubfoge5rvuooedl206hho8qk.apps.googleusercontent.com",
    iosClientId:
      "307189795157-o2k4dt8m0fvfacgv69s9n3ra2i6nm4jt.apps.googleusercontent.com",
  });

  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/user/${userID}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  };

  const checkLogin = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn == true) {
      // navigation.navigate("Home");
      console.log("Đã đăng nhập");
    } else {
      console.log("Đã đăng xuất");
      navigation.navigate("Home");
    }
  };

  if (user != null) {
    if (user.role == null) {
      return (
        <View
          style={{
            backgroundColor: "#2d5381",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "60%",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.17,
              shadowRadius: 3.05,
              elevation: 4,
            }}
          >
            <MaterialIcons name="error" size={24} color="red" />
            <Text style={{ fontSize: 16, fontWeight: 600 }}>
              Tài khoản của bạn chưa được cấp quyền truy cập hệ thống vui lòng
              liên hệ quản trị viên để được cấp quyền
            </Text>
            <Pressable
              style={{
                backgroundColor: "#2d5381",
                padding: 10,
                margin: 10,
                width: "50%",
                display: "flex",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Text
                onPress={signOut}
                style={{ color: "white", fontSize: 14, fontWeight: 400 }}
              >
                Thoát
              </Text>
            </Pressable>
          </View>
        </View>
      );
    } else {
      return (
        <NavigationContainer independent={true} theme={MyTheme}>
          <Tab.Navigator
            shifting={true}
            activeColor="black"
            barStyle={{
              height: 80,

              backgroundColor: "#f4f0f7",
              overflow: "hidden",
              position: "absolute",
            }}
          >
            <Tab.Screen
              initialParams={{ userID: userID, accessToken: accessToken }}
              name="HomeScreen"
              component={MainHomeScreen}
              options={{
                headerShown: false,
                tabBarLabel: "Trang chủ",
                tabBarIcon: ({ color, size }) => (
                  <Feather name="home" size={24} color={color} />
                ),
              }}
            />
            <Tab.Screen
              initialParams={{ userID: userID, accessToken: accessToken }}
              name="HistoryScreen"
              component={MainHistoryScreen}
              options={{
                headerShown: false,
                tabBarLabel: "Lịch Sử",
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome name="history" size={24} color={color} />
                ),
              }}
            />
            <Tab.Screen
              initialParams={{
                userID: userID,
                accessToken: accessToken,
              }}
              name="SettingScreen"
              options={{
                headerShown: false,
                tabBarLabel: "Cài Đặt",
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="setting" size={24} color={color} />
                ),
              }}
            >
              {(props) => (
                <MainSettingScreen
                  {...props}
                  checkLogin={checkLogin}
                ></MainSettingScreen>
              )}
            </Tab.Screen>
            {user != null ? (
              user.role == "user" ? (
                <Tab.Screen
                  name="ContactScreen"
                  component={MainContactScreen}
                  options={{
                    headerShown: false,
                    tabBarLabel: "Liên Hệ",
                    tabBarIcon: ({ color, size }) => (
                      <Feather name="phone" size={24} color={color} />
                    ),
                  }}
                />
              ) : null
            ) : null}
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
  }
}
