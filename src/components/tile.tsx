import { StyleProp, Text, View, ViewStyle } from "react-native";

interface TileProps {
  position: number[];
  value: number;
  style: StyleProp<ViewStyle>;
}

export default function Tile({ value, style }: TileProps) {
  return (
    <View
      className="bg-green-600 rounded justify-center items-center absolute"
      style={style}
    >
      <Text>{value}</Text>
    </View>
  );
}
