import React from "react";
import { Text, View } from "react-native";
import { Dirs, FileSystem } from "react-native-file-access";

const CreateTables = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text style={{ color: "pink", fontSize: 24 }}>Read From Downloads!</Text>
    </View>
  );
};

export default CreateTables;
