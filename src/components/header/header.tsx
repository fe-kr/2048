import { observer } from "mobx-react-lite";
import { View, Text, TouchableOpacity } from "react-native";
import { useHeaderStyles } from "./header.styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { board } from "../board";

const Header = () => {
  const styles = useHeaderStyles();

  const onGameRestart = () => {
    board.reset();
    board.init();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onGameRestart}>
        <MaterialIcons name="restart-alt" size={30} color="#f9f6f2" />
      </TouchableOpacity>

      <View style={styles.scoreWrapper}>
        <Text style={styles.score}>Score: </Text>
        <Text style={styles.score}>{board.score}</Text>
      </View>
    </View>
  );
};

export default observer(Header);
