import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View } from "react-native";

// expo add expo-file-system expo-sharing pptxgenjs
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import pptxgen from "pptxgenjs";

export default function FileSystemTest() {
  const generatePowerpoint = () => {
    let ppt = new pptxgen();
    ppt
      .addSlide()
      .addText("My Bullet Point Example", { x: 0, y: 0, fontSize: 48 })
      .addText(
        [
          {
            text: "My",
            options: {
              fontSize: 32,
              bullet: true,
              color: "FF0000",
              indentLevel: 0,
            },
          },
          {
            text: "Bullet",
            options: {
              fontSize: 32,
              bullet: true,
              color: "FF0000",
              indentLevel: 0,
            },
          },
          {
            text: "Point",
            options: {
              fontSize: 32,
              bullet: true,
              color: "0000FF",
              indentLevel: 1,
            },
          },
          {
            text: "List",
            options: {
              fontSize: 32,
              bullet: true,
              color: "FF0000",
              indentLevel: 0,
            },
          },
        ],
        { x: 0.5, y: 1.0 }
      );

    let slide = ppt.addSlide();
    slide.background = {
      path: "https://cdn.pixabay.com/photo/2022/06/21/21/56/konigssee-7276585_960_720.jpg",
    };
    slide.addText("Welcome", { fontSize: 128, x: 0, y: 0 });

    ppt.addSlide().addMedia({
      type: "online",
      link: "https://www.youtube.com/embed/PG_wMYCaago",
      w: "100%",
      h: "100%",
    });

    ppt.write("base64").then((base64) => {
      const filename = FileSystem.documentDirectory + "MyPowerpoint.pptx";
      FileSystem.writeAsStringAsync(filename, base64, {
        encoding: FileSystem.EncodingType.Base64,
      }).then(() => {
        Sharing.shareAsync(filename);
      });
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Generate Powerpoint" onPress={generatePowerpoint} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
