import React, { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
// Import Models
import User from "../models/User";
import UpdateLocation from "../models/UpdateLocation";

const CreateTables = () => {
  const [users, setUsers] = useState([]);

  const createTables = useCallback(async () => {
    // TODO: for INSERTING DATA FROM FILE : delete tables and recreate them
    // TODO: for ERROR HANDLING : check tables if they exist
    try {
      await User.createTable();
      await UpdateLocation.createUpdateLocation();

      Alert.alert("Table created successfully");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createUser = useCallback(async () => {
    try {
      const props = {
        first_name: "Kidus",
        last_name: "Taye",
        gender: "Male",
        country: "Ethiopian",
        age: 30,
      };

      const user = new User(props);
      await user.save();

      setUsers(await User.query());
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getUsers = useCallback(async () => {
    try {
      const options = {
        where: {
          completed_eq: false,
        },
        order: "id ASC",
      };
      setUsers(await User.query(options));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const rawSQl = useCallback(async () => {
    try {
      await UpdateLocation.executeRaw();
    } catch (error) {
      console.log(error);
    }
  });

  const getUpdateLocations = useCallback(async () => {
    try {
      //   const options = {
      //     where: {
      //       completed_eq: false,
      //     },
      //     order: "id ASC",
      //   };
      const locations = await UpdateLocation.query();
      console.log(locations);
      //   setUsers(await UpdateLocation.query());
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateUser = useCallback(async (id) => {
    // ? update location record is created when the user table is updated
    try {
      const props = {
        id: id, // required
        // TODO add the other column that is going to be updated
        completed: true,
      };

      User.update(props);

      // TODO create updated location with lat, long for updated user
      const updateLocationProps = {
        user_id: id,
        lat: 8.9895634,
        long: 11.78654,
      };

      const updateLocation = new UpdateLocation(updateLocationProps);
      await updateLocation.save();

      setUsers(await User.query());
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ padding: 12, backgroundColor: "green", margin: 4 }}
        onPress={getUsers}
      >
        <Text style={{ color: "white", fontSize: 24 }}>Get Users</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 12, backgroundColor: "green", margin: 4 }}
        onPress={getUpdateLocations}
      >
        <Text style={{ color: "white", fontSize: 24 }}>Get Locations</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 12, backgroundColor: "green", margin: 4 }}
        onPress={createTables}
      >
        <Text style={{ color: "white", fontSize: 24 }}>Create tables</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 12, backgroundColor: "green", margin: 4 }}
        onPress={createUser}
      >
        <Text style={{ color: "white", fontSize: 24 }}>Create User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 12, backgroundColor: "green", margin: 4 }}
        onPress={() => updateUser(7)}
      >
        <Text style={{ color: "white", fontSize: 24 }}>Update User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 12, backgroundColor: "green", margin: 4 }}
        onPress={rawSQl}
      >
        <Text style={{ color: "white", fontSize: 24 }}>Raw Sql</Text>
      </TouchableOpacity>

      <ScrollView style={{ flex: 1 }}>
        {users.map((user) => (
          <Text key={user.id}>{JSON.stringify(user)}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default CreateTables;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
});
