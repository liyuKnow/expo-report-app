import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
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
        console.log(res[0]);
        setUsersData(res);
      } catch (error) {
        console.log(error);
      }
    };
    getUsersData();
  }, []);

  console.log(usersData);
  return (
    <View style={styles.container}>
      {usersData !== null && (
        <FlatList
          data={usersData}
          renderItem={({ first_name, last_name }) => (
            <Text style={styles.item}>
              {first_name}
              {last_name}
              Item
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default BasicFlatList;

// FLAT LIST
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    paddingLeft: 4,
    paddingEnd: 4,
  },
  item: {
    backgroundColor: "pink",
    margin: 2,
    padding: 10,
    fontSize: 18,
    height: 44,
    borderRadius: 3,
    shadowColor: "red",
  },
});
