import { useWindowDimensions, View, Text } from "react-native";
import { useMemo } from "react";

const grid = Array.from({ length: 16 });
const tiles = [
  { position: [0, 0], value: 2, id: 2 },
  { position: [0, 1], value: 2, id: 3 },
  { position: [1, 1], value: 4, id: 1 },
  { position: [2, 2], value: 4, id: 11 },
  { position: [0, 3], value: 2, id: 23 },
  { position: [3, 3], value: 4, id: 31 },
];

export default function Board() {
  const styles = useBoardStyles();

  return (
    <View className="relative bg-amber-400">
      <View className="absolute z-10 inset-0">
        {tiles.map(({ id, position, value }) => (
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
        {grid.map((_, i) => (
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
