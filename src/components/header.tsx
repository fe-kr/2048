import { observer } from "mobx-react-lite";
import { View, Text, Button } from "react-native";
import board from "../models/board";

const Header = () => {
  return (
    <>
      <View className="flex-row justify-evenly">
        <Button title="UP" onPress={() => board.moveTiles("UP")} />
        <Button title="DOWN" onPress={() => board.moveTiles("DOWN")} />
        <Button title="RIGHT" onPress={() => board.moveTiles("RIGHT")} />
        <Button title="LEFT" onPress={() => board.moveTiles("LEFT")} />
      </View>

      <View className="ml-auto">
        <View className="bg-amber-500 max-w-24 px-2 py-1 rounded flex-auto flex-col items-center">
          <Text className="text-white font-bold uppercase">Score:</Text>
          <Text className="text-xl font-bold text-white uppercase">8</Text>
        </View>
      </View>
    </>
  );
}

export default observer(Header);
