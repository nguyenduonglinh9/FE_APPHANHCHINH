import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";

export default function HistoryScreen({ route, navigation }) {
  const { userID, accessToken } = route.params;
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    fetch(`https://ndl-be-apphanhchinh.onrender.com/user`, {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    fetch("https://ndl-be-apphanhchinh.onrender.com/ticket", {
      headers: {
        access_token: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setTickets(data));
  }, []);
  const renderTicket = () => {
    const filterTicket = tickets.filter((item, index) => {
      return item.staffID == userID && item.status == "finished";
    });

    if (filterTicket.length <= 0) {
      return (
        <View>
          <Text>Bạn chưa hoàn thành phiếu nào</Text>;
        </View>
      );
    } else {
      return filterTicket.map((item, index) => {
        return (
          <Pressable
            onPress={() =>
              navigation.navigate("DetailTicketStaff", { idTicket: item._id })
            }
            style={styles.itemTicket}
            key={index}
          >
            <Text style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
              {item.title}
            </Text>
            <View>{renderUser(item.userID)}</View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ marginRight: 10 }}>
                {moment(item.createdAt).format("DD-MM-YYYY")}
              </Text>
              <Text style={{ marginRight: 10 }}>
                {moment(item.createdAt).format("hh:mm a")}
              </Text>
              <Text>Phòng : {item.room}</Text>
            </View>
            <View
              style={{
                marginTop: 5,
                width: "40%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text
                style={
                  item.star == ""
                    ? {
                        backgroundColor: "red",
                        color: "white",
                        padding: 5,
                        borderRadius: 10,
                        width: "100%",
                        textAlign: "center",
                      }
                    : {
                        backgroundColor: "green",
                        color: "white",
                        padding: 5,
                        borderRadius: 10,
                        width: "100%",
                        textAlign: "center",
                      }
                }
              >
                {item.star == "" ? "chưa đánh giá" : "đã đánh giá"}
              </Text>
            </View>
          </Pressable>
        );
      });
    }
  };

  const renderUser = (id) => {
    return users
      .filter((item, index) => {
        return item.googleID == id;
      })
      .map((item, index) => {
        return (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
            key={index}
          >
            <View
              style={{
                width: "80%",
                fontSize: 14,
                fontWeight: 400,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Text>Người yêu cầu: {item.name}</Text>
            </View>
            <View
              style={{
                width: "20%",
                aspectRatio: "1/1",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Image
                style={{ width: "100%", height: "100%", borderRadius: 50 }}
                source={{ uri: item.imageURL }}
              ></Image>
            </View>
          </View>
        );
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 700,
            lineHeight: 27,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          Lịch Sử
        </Text>

        <ScrollView
          style={{ width: "100%" }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              paddingBottom: 100,
            }}
          >
            {tickets.length != 0 ? renderTicket() : null}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#2d5381",
    justifyContent: "flex-end",
  },
  body: {
    width: "100%",
    height: "90%",
    backgroundColor: "#ffffff",

    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  infor: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    bottom: "100%",
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    lineHeight: 24,
  },
  itemTicket: {
    width: "90%",
    backgroundColor: "#f1f4f5",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
});
