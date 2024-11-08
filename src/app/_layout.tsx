import { Stack } from "expo-router";

import Header from "../components/header";

import "./global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "2048", headerRight: Header }}
      />
    </Stack>
  );
}
