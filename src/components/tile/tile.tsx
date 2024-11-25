import { Text } from "react-native";
import {
  useTileStyles,
  useTileMoveStyle,
  useTileZoomStyle,
} from "./tile.styles";
import Animated from "react-native-reanimated";

const Tile = ({ position, value }: ITile) => {
  const styles = useTileStyles({ position, value });

  const tileZoomStyle = useTileZoomStyle();

  const tileMoveStyle = useTileMoveStyle({
    top: styles.tile.top,
    left: styles.tile.left,
  });

  return (
    <Animated.View style={[styles.tile, tileMoveStyle, tileZoomStyle]}>
      <Text style={styles.text}>{value}</Text>
    </Animated.View>
  );
};

export default Tile;
