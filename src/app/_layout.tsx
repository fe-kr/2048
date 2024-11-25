import { Stack } from "expo-router";
import { Header } from "../components/header";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: () => <Header /> }} />
    </Stack>
  );
}
