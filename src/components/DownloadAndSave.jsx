import React, { useEffect } from "react";
import * as Sharing from "expo-sharing";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { Text, View } from "react-native";

const DownloadAndSave = () => {
  useEffect(() => {
    const downloadFile = async () => {
      try {
        const imageFileExts = ["jpg", "png", "gif", "heic", "webp", "bmp"];

        if (
          isIos &&
          imageFileExts.every((x) => !downloadedFile.uri.endsWith(x))
        ) {
          const UTI = "public.item";
          const shareResult = await Sharing.shareAsync(downloadedFile.uri, {
            UTI,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    // ! DEPRECATED
    const mediaPermission = async () => {
      try {
        const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (perm.status != "granted") {
          return false;
        } else if (perm.status === "granted") {
          return true;
        }
      } catch (error) {}
    };

    const moveFile = async () => {
      try {
        const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
        const album = await MediaLibrary.getAlbumAsync("Download");
        if (album == null) {
          await MediaLibrary.createAlbumAsync("Download", asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // ! Test
    console.log(mediaPermission());
  }, []);

  return (
    <View>
      <Text>Hello hello</Text>
    </View>
  );
};

export default DownloadAndSave;
