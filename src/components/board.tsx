import { useWindowDimensions, View, Text } from "react-native";
import { useEffect, useMemo } from "react";
import { MAX_TILES_COUNT } from "../constants";
import board from "../models/board";
import { observer } from "mobx-react-lite";

const Board = () => {
  const styles = useBoardStyles();

  useEffect(() => {
    board.init();
  }, []);

  return (
    <View className="relative bg-amber-400">
      <View className="absolute z-10 inset-0">
        {board.data.map(({ id, position, value }) => (
          <View
            key={id}
            className="bg-green-600 rounded justify-center items-center absolute"
            style={styles.tile(position)}
          >
            <Text>{value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.board} className="flex-1 flex-wrap rounded">
        {Array.from({ length: MAX_TILES_COUNT }).map((_, i) => (
          <View style={styles.cell} key={i} className="rounded bg-slate-400" />
        ))}
      </View>
    </View>
  );
}

function useBoardStyles() {
  const window = useWindowDimensions();

  return useMemo(() => {
    const VIEW_GAP_WIDTH = 12;
    const boardSize = Math.min(window.width, window.height);
    const cellWidth = boardSize / 4 - (VIEW_GAP_WIDTH * 4) / 3;

    return {
      board: {
        height: boardSize,
        width: boardSize,
        gap: VIEW_GAP_WIDTH,
        padding: VIEW_GAP_WIDTH,
      },
      cell: {
        height: cellWidth,
        width: cellWidth,
      },
      tile: ([x, y]: number[]) => ({
        height: cellWidth,
        width: cellWidth,
        top: (y / 4) * boardSize,
        left: (x / 4) * boardSize,
      }),
    };
  }, [window.width, window.height]);
}

export default observer(Board);
