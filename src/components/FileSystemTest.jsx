import React, { useEffect } from "react";
import { View, Text } from "react-native";
import * as FileSystem from "expo-file-system";

// import { StorageAccessFramework } from "expo-file-system";

const FileSystemTest = () => {
  useEffect(() => {
    const tester = async () => {
      // Requests permissions for external directory
      const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        // Gets SAF URI from response
        const uri = permissions.directoryUri;

        // Gets all files inside of selected directory
        const files = await StorageAccessFramework.readDirectoryAsync(uri);
        alert(`Files inside ${uri}:\n\n${JSON.stringify(files)}`);
      }
    };

    // tester();
  }, []);

  console.log(FileSystem.documentDirectory);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "hotpink", fontSize: 24 }}>
        Files Files Files !!!
      </Text>
    </View>
  );
};

export default FileSystemTest;
