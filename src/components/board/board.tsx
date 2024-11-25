import { View } from "react-native";
import { useEffect } from "react";
import { MAX_TILES_COUNT } from "src/constants";
import { board } from "./board.model";
import { observer } from "mobx-react-lite";
import { useBoardStyles } from "./board.styles";
import { TileComponent } from "../tile";
import GameOverModal from "../game-over-modal";

const Board = () => {
  const styles = useBoardStyles();

  useEffect(() => {
    board.init();
  }, []);

  return (
    <View style={styles.container}>
      {board.isGameOver && <GameOverModal onClose={() => board.reset()} />}

      <View style={styles.tiles}>
        {board.data.map((data) => (
          <TileComponent key={data.id} {...data} />
        ))}
      </View>

      <View style={styles.board}>
        {Array.from({ length: MAX_TILES_COUNT }).map((_, i) => (
          <View key={i} style={styles.cell} />
        ))}
      </View>
    </View>
  );
};

export default observer(Board);
