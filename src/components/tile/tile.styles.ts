import { StyleSheet, useWindowDimensions } from "react-native";
import { BOARD_GAP, TILE_COLORS, TILE_PER_ROW } from "src/constants";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

const useTileDimensions = ([x, y]: number[]) => {
  const window = useWindowDimensions();

  const windowWidth = Math.min(window.width, window.height);
  const boardWidth = Math.floor(windowWidth / TILE_PER_ROW) * TILE_PER_ROW;
  const width =
    boardWidth / TILE_PER_ROW - (BOARD_GAP * TILE_PER_ROW) / (TILE_PER_ROW - 1);

  return {
    width,
    height: width,
    left: BOARD_GAP + x * (width + BOARD_GAP),
    top: BOARD_GAP + y * (width + BOARD_GAP),
  };
};

export const useTileMoveStyle = ({ top, left }: Record<string, number>) => {
  const sharedTop = useSharedValue(top);
  const sharedLeft = useSharedValue(left);

  useEffect(() => {
    sharedTop.value = withTiming(top, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });
    sharedLeft.value = withTiming(left, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });
  }, [sharedTop, sharedLeft, top, left]);

  return useAnimatedStyle(() => ({
    left: sharedLeft.value,
    top: sharedTop.value,
  }));
};

export const useTileZoomStyle = () => {
  const sharedScale = useSharedValue(0);

  useEffect(() => {
    sharedScale.value = withDelay(
      100,
      withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      }),
    );
  }, [sharedScale]);

  return useAnimatedStyle(() => ({
    transform: [{ scale: sharedScale.value }],
  }));
};

export const useTileStyles = ({
  position,
  value,
}: Pick<ITile, "position" | "value">) => {
  const powerOfTwo = Math.log2(value);
  const dimensions = useTileDimensions(position);

  return StyleSheet.create({
    tile: {
      ...dimensions,
      backgroundColor: TILE_COLORS[powerOfTwo - 1],
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
    },
    text: {
      fontWeight: "bold",
      fontSize: dimensions.width / 4,
      color: powerOfTwo > 2 ? "#f9f6f2" : "#776e65",
    },
  });
};
