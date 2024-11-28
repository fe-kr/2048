import { Board } from "../src/components/board";
import { Matrix } from "../src/shared/matrix";
import { TILE_PER_ROW, MAX_GAME_SCORE } from "../src/constants";
import { Tile } from "../src/components/tile";

let matrix: Matrix<Tile>, board: Board;

beforeEach(() => {
  matrix = new Matrix(TILE_PER_ROW, TILE_PER_ROW);
  board = new Board(matrix);
});

describe("Game 2048", () => {
  describe("Early Game", () => {
    test("should start game with filled cells", () => {
      const tilesCount = 3;
      const tilesValue = 2;

      board.init(tilesCount, tilesValue);

      expect(board.data.filter(Boolean)).toHaveLength(tilesCount);
    });

    test("should start game with zero score", () => {
      const tilesCount = 3;
      const tilesValue = 2;

      board.init(tilesCount, tilesValue);

      expect(board.score).toBe(0);
    });
  });

  describe("Mid Game", () => {
    test("should merge matched tiles on move right", () => {
      const tilesCount = 16;
      const tilesValue = 2;
      const mergedTilesValue = tilesValue ** (TILE_PER_ROW - 1);
      const mergedTilesCount = tilesCount / TILE_PER_ROW;

      board.init(tilesCount, tilesValue);
      board.moveTiles("RIGHT");

      const filledTiles = board.data.filter(Boolean);
      const mergedTiles = board.data.filter(({ value, position: [x] }) => {
        return value === mergedTilesValue && x === TILE_PER_ROW - 1;
      });

      expect(filledTiles).toHaveLength(mergedTilesCount + 1);
      expect(mergedTiles).toHaveLength(mergedTilesCount);
    });

    test("should merge matched tiles on move left", () => {
      const tilesCount = 16;
      const tilesValue = 2;
      const mergedTilesValue = tilesValue ** (TILE_PER_ROW - 1);
      const mergedTilesCount = tilesCount / TILE_PER_ROW;

      board.init(tilesCount, tilesValue);
      board.moveTiles("LEFT");

      const filledTiles = board.data.filter(Boolean);
      const mergedTiles = board.data.filter(({ value, position: [x] }) => {
        return value === mergedTilesValue && !x;
      });

      expect(filledTiles).toHaveLength(mergedTilesCount + 1);
      expect(mergedTiles).toHaveLength(mergedTilesCount);
    });

    test("should merge matched tiles on move down", () => {
      const tilesCount = 16;
      const tilesValue = 2;
      const mergedTilesValue = tilesValue ** (TILE_PER_ROW - 1);
      const mergedTilesCount = tilesCount / TILE_PER_ROW;

      board.init(tilesCount, tilesValue);
      board.moveTiles("DOWN");

      const filledTiles = board.data.filter(Boolean);
      const mergedTiles = filledTiles.filter(({ value, position: [_, y] }) => {
        return value === mergedTilesValue && y === TILE_PER_ROW - 1;
      });

      expect(filledTiles).toHaveLength(mergedTilesCount + 1);
      expect(mergedTiles).toHaveLength(mergedTilesCount);
    });

    test("should merge matched tiles on move up", () => {
      const tilesCount = 16;
      const tilesValue = 2;
      const mergedTilesValue = tilesValue ** (TILE_PER_ROW - 1);
      const mergedTilesCount = tilesCount / TILE_PER_ROW;

      board.init(tilesCount, tilesValue);
      board.moveTiles("UP");

      const filledTiles = board.data.filter(Boolean);
      const mergedTiles = filledTiles.filter(({ value, position: [_, y] }) => {
        return value === mergedTilesValue && !y;
      });

      expect(filledTiles).toHaveLength(mergedTilesCount + 1);
      expect(mergedTiles).toHaveLength(mergedTilesCount);
    });

    test("should reset game", () => {
      const tilesCount = 16;
      const tilesValue = 2;

      board.init(tilesCount, tilesValue);
      board.moveTiles("UP");
      board.status = "WON";

      expect(board.score).not.toBe(0);
      expect(board.data.filter(Boolean)).not.toHaveLength(tilesCount);
      expect(board.status).not.toBe("PENDING");

      board.reset();

      expect(board.score).toBe(0);
      expect(board.status).toBe("PENDING");
      expect(board.data.filter(Boolean)).toHaveLength(0);
    });
  });

  describe("End Game", () => {
    test("should end game in case of moves lack", () => {
      const stub = Array.from({ length: TILE_PER_ROW }).map((_, x) =>
        Array.from({ length: TILE_PER_ROW }).map((_, y) => (x + 1) * (y + 1)),
      );

      expect(board.status).toBe("PENDING");

      matrix.data = stub.map((row) => row.map((value) => new Tile({ value })));
      board.moveTiles("DOWN");

      expect(board.status).toBe("LOST");
    });

    test("should end game in case of score achievement", () => {
      const stub = Array.from({ length: TILE_PER_ROW }).map(() =>
        Array.from({ length: TILE_PER_ROW }).map(() => MAX_GAME_SCORE / 2),
      );

      expect(board.status).toBe("PENDING");

      matrix.data = stub.map((row) => row.map((value) => new Tile({ value })));
      board.moveTiles("DOWN");

      expect(board.status).toBe("WON");
    });
  });
});
