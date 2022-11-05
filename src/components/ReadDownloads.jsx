import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";

const ReadDownloads = () => {
  const getFile = async (params) => {
    try {
      // Requests permissions for external directory
      const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        // // Gets SAF URI from response
        const uri = permissions.directoryUri;

        // // Gets all files inside of selected directory
        // const files = await StorageAccessFramework.readDirectoryAsync(uri);
        // const res = await StorageAccessFramework.readAsStringAsync(files[0]);
        // console.log(res);
        // alert(`Files inside ${uri}:\n\n${JSON.stringify(files)}`);
        // !==========================================================================
        const res = await FileSystem.readAsStringAsync(
          `${uri}/usersDownload.xlsx`
        );
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFile();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        {[0, 1, 2]?.map((content, index) => (
          <Text key={index} style={{ color: "pink", fontSize: 24 }}>
            Okay
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default ReadDownloads;
