import { StyleSheet, useWindowDimensions } from "react-native";
import { BOARD_GAP, TILE_PER_ROW } from "src/constants";

export const useBoardStyles = () => {
  const window = useWindowDimensions();

  const windowWidth = Math.min(window.width, window.height);
  const boardWidth = Math.floor(windowWidth / TILE_PER_ROW) * TILE_PER_ROW;
  const cellWidth =
    boardWidth / TILE_PER_ROW - (BOARD_GAP * TILE_PER_ROW) / (TILE_PER_ROW - 1);

  return StyleSheet.create({
    wrapper: {
      backgroundColor: "#b59d87",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    container: {
      position: "relative",
    },
    board: {
      height: boardWidth,
      width: boardWidth,
      gap: BOARD_GAP,
      padding: BOARD_GAP,
      flexWrap: "wrap",
      borderRadius: 4,
    },
    tiles: {
      position: "absolute",
      zIndex: 1,
    },
    cell: {
      height: cellWidth,
      width: cellWidth,
      borderRadius: 4,
      backgroundColor: "#cebda6",
    },
    buttons: {
      right: 0,
      position: "absolute",
      flexDirection: "row",
    },
  });
};
