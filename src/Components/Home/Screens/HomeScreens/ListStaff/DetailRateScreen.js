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
import {
  Feather,
  FontAwesome,
  AntDesign,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";
import Constants from "expo-constants";
import { CommonActions } from "@react-navigation/native";
import { Rating } from "@kolking/react-native-rating";

export default function DetailRateScreen({ route, navigation }) {
  const { id, accessToken } = route.params;
  const [ticket, setTicket] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/ticket/${id}`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setTicket(data));
  }, []);

  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/user`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const renderUser = () => {
    return users
      .filter((item, index) => {
        return item.googleID == ticket.userID;
      })
      .map((item, index) => {
        return (
          <>
            <View>
              <Image
                style={{ width: 50, height: 50, borderRadius: 50 }}
                source={{ uri: item.imageURL }}
              ></Image>
            </View>
            <View>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>{item.name}</Text>
            </View>
            <View>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  backgroundColor: "#2e548170",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome name="phone" size={24} color="#2e5481" />
              </View>
            </View>
          </>
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          onPress={() => navigation.dispatch(CommonActions.goBack())}
          name="keyboard-arrow-left"
          size={24}
          color="white"
        />
        <Fontisto name="bell" size={24} color="white" />
      </View>
      <View style={styles.content}>
        <View style={styles.headerContent}>
          <Text style={{ fontSize: 16, fontWeight: 700 }}>
            Chi tiết đánh giá
          </Text>
          {ticket != null ? (
            <Text style={{ fontSize: 16, fontWeight: 400 }}>
              {parseFloat(ticket.star)}
            </Text>
          ) : null}
          {ticket != null ? (
            <Rating
              style={{ height: 60 }}
              size={20}
              rating={ticket.star}
              // onChange={handleChange}
            />
          ) : null}
        </View>
        <View style={styles.bodyContent}>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text>Người đánh giá : </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            {ticket != null && users.length > 0 ? renderUser() : null}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 15,
              marginBottom: 15,
              flexWrap: "wrap",
            }}
          >
            <Text>Phòng : </Text>
            <Text style={{ fontSize: 14, fontWeight: 600 }}>
              {ticket != null ? ticket.room + "-" : null}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 60,
              }}
            >
              {ticket != null ? ticket.title : null}
            </Text>
          </View>
          <View
            style={{
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            <Text>Mô tả đánh giá : </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {ticket != null ? ticket.comment : null}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d5381",
    display: "flex",
    justifyContent: "space-between",
  },
  content: {
    backgroundColor: "#ffffff",
    height: "85%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    marginTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  headerContent: {
    padding: 10,
    display: "flex",
    alignItems: "center",
  },
  bodyContent: {
    padding: 20,
  },
});
