import React from "react";
import { Text, View } from "react-native";
import axios from "axios";
import { Buffer } from "buffer";

const api = axios.create({
  baseURL: "https://your-super-awesome.website.com",
});

export const headers = {
  "Content-Type": "text/html",
  Accept: "*/*",
  "Accept-Encoding": "gzip, deflate, br",
};

export const options = {
  headers,
  responseType: "arraybuffer",
};

export const endpoint = "/something/amazing";

export async function grabPdf(data) {
  const response = await api.post(endpoint, data, options);
  const buff = Buffer.from(response.data, "base64");
  return buff.toString("base64");
}

const JiffyCV = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24 }}>Hello</Text>
    </View>
  );
};

export default JiffyCV;
