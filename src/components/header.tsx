import { View, Text } from "react-native";

export default function Header() {
  return (
    <View className="ml-auto">
      <View className="bg-amber-500 max-w-24 px-2 py-1 rounded flex-auto flex-col items-center">
        <Text className="text-white font-bold uppercase">Score:</Text>
        <Text className="text-xl font-bold text-white uppercase">8</Text>
      </View>
    </View>
  );
}
