import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from "react-native";
import User from "../models/User";

const BasicFlatList = () => {
  const [usersData, setUsersData] = useState({});

  useEffect(() => {
    getUsersData = async () => {
      try {
        const options = {
          where: {
            completed_eq: false,
          },
          order: "id ASC",
        };
        const res = await User.query(options);
        setUsersData(res);
      } catch (error) {
        console.log(error);
      }
    };
    getUsersData();
  }, []);

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={usersData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default BasicFlatList;

// TODO : Touchable area to allow updates
const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>
      {item.first_name} {item.last_name}
    </Text>
    <Text style={styles.subTitle}>{item.country}</Text>
  </View>
);

// FLAT LIST
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  subTitle: {
    fontSize: 24,
  },
});
