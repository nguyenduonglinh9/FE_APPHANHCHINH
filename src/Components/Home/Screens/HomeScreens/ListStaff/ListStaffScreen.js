import {
  Dimensions,
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  FlatList,
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
import { SelectList } from "react-native-dropdown-select-list";

export default function ListStaffScreen({ toDetailScreen, route, navigation }) {
  const { userID, accessToken } = route.params;
  const [staff, setStaff] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  //get all staff
  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/user", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setStaff(data));
  }, []);

  //
  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/issuestype", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setTypes(data));
  }, []);

  const renderStaff = (type) => {
    return staff
      .filter((item, index) => {
        return item.role == type;
      })
      .map((item, index) => {
        return (
          <Pressable
            onPress={() => toDetailScreen(item.googleID)}
            key={index}
            style={styles.item}
          >
            <Image
              style={{ width: 50, aspectRatio: "1/1", borderRadius: 50 }}
              source={{ uri: item.imageURL }}
            ></Image>
            <View>
              <Text style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</Text>
              {renderType(item.employeeType)}
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </Pressable>
        );
      });
  };

  const renderType = (id) => {
    return types
      .filter((item, index) => {
        return item._id == id;
      })
      .map((item, index) => {
        return (
          <Text style={{ fontSize: 14, fontWeight: 300 }}>
            Nhân viên {item.name}
          </Text>
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={{ fontWeight: 700, fontSize: 24 }}>
            Danh sách nhân sự
          </Text>
          <SelectList
            save="key"
            setSelected={(val) => setSelectedType(val)}
            data={types.length != 0 ? types : []}
            maxHeight={150}
            defaultOption={{ key: "0", value: "Phân loại" }}
            boxStyles={{
              marginTop: 20,
              maxWidth: "90%",
              minWidth: "90%",
              backgroundColor: "#f1f4f5",
              // padding: 10,
              borderRadius: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              borderWidth: 0,
            }}
          />
        </View>

        <View style={styles.list}>
          <Text
            style={{ padding: 10, opacity: 0.5, fontSize: 14, fontWeight: 600 }}
          >
            Phòng kỹ thuật
          </Text>
          {staff.length == 0 ? (
            <Text>Chưa có nhân viên</Text>
          ) : (
            renderStaff((type = "staff"))
          )}
        </View>
        <View style={styles.list}>
          <Text
            style={{ padding: 10, opacity: 0.5, fontSize: 14, fontWeight: 600 }}
          >
            Phòng hành chính
          </Text>
          {staff.length == 0 ? (
            <Text>Chưa có nhân viên</Text>
          ) : (
            renderStaff((type = "admin"))
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  content: {
    height: "100%",
    backgroundColor: "#fff",
    width: "100%",
  },
  header: {
    padding: 10,
    display: "flex",
    position: "relative",
    alignItems: "center",
  },
  list: {
    width: "100%",
    display: "flex",
  },
  item: {
    width: "90%",
    backgroundColor: "#f1f4f5",
    display: "flex",
    flexDirection: "row",
    padding: 15,
    alignSelf: "center",
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});
