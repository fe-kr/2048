import {
  INITIAL_TILES_COUNT,
  MAX_GAME_SCORE,
  NEW_TILE_VALUE,
  TILE_PER_ROW,
} from "src/constants";
import { Tile } from "../tile";
import { Matrix } from "src/shared/matrix";
import { makeObservable, observable } from "mobx";

export class Board {
  private board: Matrix<Tile>;
  score: number = 0;
  status: GameStatus = "PENDING";

  constructor(board: Matrix<Tile>) {
    this.board = board;

    makeObservable(this, { score: observable, status: observable });
  }

  init(
    tilesCount: number = INITIAL_TILES_COUNT,
    tileValue: number = NEW_TILE_VALUE,
  ) {
    Array.from({ length: tilesCount }).forEach(() => {
      const [x, y] = this.board.randomizeEmptySlot();

      this.board.data[x][y] = new Tile({ value: tileValue });
    });
  }

  reset() {
    this.score = 0;
    this.status = "PENDING";
    this.board.data = this.board.fillAllEmptySlots(TILE_PER_ROW, TILE_PER_ROW);
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
    const prevData = [...this.board.data];

    this.board.data = this.mergeAllTiles(direction);

    const maxValue = Math.max(...this.data.map(({ value }) => value));

    if (maxValue >= MAX_GAME_SCORE) {
      this.status = "WON";
      return;
    }

    if (this.shouldOverGame()) {
      this.status = "LOST";
      return;
    }

    if (this.board.hasEmptySlot && !this.board.checkIsEqual(prevData)) {
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

    for (let i = 0; i < acc.length - 1; i++) {
      if (!acc[i]) {
        continue;
      }

      if (acc[i] && !acc[i + 1]) {
        acc[i + 1] = new Tile(acc[i]!);
        acc[i] = undefined;

        continue;
      }

      if (acc[i] && acc[i + 1]) {
        if (acc[i]!.value !== acc[i + 1]!.value) continue;

        acc[i + 1] = new Tile({ ...acc[i], value: acc[i]!.value * 2 });
        acc[i] = undefined;

        i = 0; // reset index for prevent unmerged tiles
      }
    }

    return rightToLeft ? acc.reverse() : acc;
  }
}

const matrix = new Matrix<Tile>(TILE_PER_ROW, TILE_PER_ROW);

export const board = new Board(matrix);
