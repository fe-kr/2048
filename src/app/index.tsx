import { View } from "react-native";
import Board from "../components/board";

import { observer } from "mobx-react-lite";

function Root() {
  return (
    <View>
      <Board />
    </View>
  );
}

export default observer(Root);
