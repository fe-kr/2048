import { View } from "react-native";
import { useEffect } from "react";
import { MAX_TILES_COUNT } from "src/constants";
import { board } from "./board.model";
import { observer } from "mobx-react-lite";
import { useBoardStyles } from "./board.styles";
import { TileComponent } from "../tile";
import GameOverModal from "../game-over-modal";
import {
  GestureEvent,
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from "react-native-gesture-handler";

const Board = () => {
  const styles = useBoardStyles();

  useEffect(() => {
    board.init(16);
  }, []);

  const onPanGestureEvent = ({
    nativeEvent,
  }: GestureEvent<PanGestureHandlerEventPayload>) => {
    const { translationX, translationY, state } = nativeEvent;

    if (state !== State.END) {
      return;
    }

    if (Math.abs(translationX) > Math.abs(translationY)) {
      return board.moveTiles(translationX > 0 ? "RIGHT" : "LEFT");
    }

    if (Math.abs(translationY) > Math.abs(translationX)) {
      return board.moveTiles(translationY > 0 ? "DOWN" : "UP");
    }
  };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler
        onGestureEvent={onPanGestureEvent}
        onHandlerStateChange={onPanGestureEvent}
      >
        <View style={styles.wrapper}>
          <View style={styles.container}>
            {board.isGameOver && (
              <GameOverModal onClose={() => board.reset()} />
            )}

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
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default observer(Board);
