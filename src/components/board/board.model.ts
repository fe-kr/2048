import {
  INITIAL_TILES_COUNT,
  NEW_TILE_VALUE,
  TILE_PER_ROW,
} from "src/constants";
import { Tile } from "../tile";
import { Matrix } from "src/shared/matrix";
import { makeObservable, observable } from "mobx";

class Board {
  private board: Matrix<Tile>;
  score: number = 0;
  isGameOver: boolean = false;

  constructor() {
    this.board = new Matrix(TILE_PER_ROW, TILE_PER_ROW);

    makeObservable(this, { score: observable, isGameOver: observable });
  }

  init() {
    Array.from({ length: INITIAL_TILES_COUNT }).forEach(() => {
      const [x, y] = this.board.randomizeEmptySlot();

      this.board.data[x][y] = new Tile({ value: NEW_TILE_VALUE });
    });
  }

  reset() {
    this.score = 0;
    this.isGameOver = false;
    this.board.data = this.board.fillEmptySlots(TILE_PER_ROW, TILE_PER_ROW);
    this.init();
  }

  get data(): ITile[] {
    return this.board.data.reduce<ITile[]>((acc, row, x) => {
      row.forEach((data, y) => data && acc.push({ ...data, position: [x, y] }));

      return acc;
    }, []);
  }

  shouldOverGame() {
    if (this.board.hasEmptySlot) {
      return false;
    }

    const joinedTiles = this.board.data.join("");

    return ["UP", "DOWN", "LEFT", "RIGHT"]
      .map((dir) => this.mergeAllTiles(dir as Direction))
      .every((tiles) => tiles.join("") === joinedTiles);
  }

  moveTiles(direction: Direction) {
    this.board.data = this.mergeAllTiles(direction);

    if (this.shouldOverGame()) {
      this.isGameOver = true;
      return;
    }

    if (this.board.hasEmptySlot) {
      const [x, y] = this.board.randomizeEmptySlot();

      this.board.data[x][y] = new Tile({ value: NEW_TILE_VALUE });
      this.score += NEW_TILE_VALUE;
    }
  }

  mergeAllTiles(direction: Direction) {
    switch (direction) {
      case "UP": {
        return this.board.data.map((r) => this.mergeTilesInRow(r, true));
      }

      case "DOWN": {
        return this.board.data.map((r) => this.mergeTilesInRow(r));
      }

      case "LEFT": {
        const board = this.board
          .rotateRight(this.board.data)
          .map((r) => this.mergeTilesInRow(r));

        return this.board.rotateLeft(board);
      }

      case "RIGHT": {
        const board = this.board
          .rotateRight(this.board.data)
          .map((r) => this.mergeTilesInRow(r, true));

        return this.board.rotateLeft(board);
      }
    }
  }

  mergeTilesInRow(rowData: (Tile | undefined)[], rightToLeft?: boolean) {
    const acc = rightToLeft ? rowData.toReversed() : [...rowData];

    acc.forEach((_, index) => {
      if (acc[index] && acc[index + 1]) {
        if (acc[index]!.value !== acc[index + 1]!.value) return;

        const newValue = acc[index].value * 2;

        acc[index + 1] = new Tile({ ...acc[index], value: newValue });
        acc[index] = undefined;
      }

      if (acc[index] && !acc[index + 1] && index < acc.length - 1) {
        acc[index + 1] = new Tile(acc[index]);
        acc[index] = undefined;
      }
    });

    return rightToLeft ? acc.reverse() : acc;
  }
}

export const board = new Board();
