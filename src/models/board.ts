import { INITIAL_TILES_COUNT, TILE_PER_COL, TILE_PER_ROW } from "../constants";
import { Tile } from "./tile";
import { Matrix } from "./matrix";
import { EventEmitter } from "./event-emitter";

class Board extends EventEmitter {
  private board: Matrix<Tile>;

  constructor() {
    super();
    this.board = new Matrix(TILE_PER_ROW, TILE_PER_COL);
  }

  init() {
    Array.from({ length: INITIAL_TILES_COUNT }).forEach(() => {
      const [x, y] = this.board.randomSlot();

      this.board.data[x][y] = new Tile(2);
    });
  }

  get data() {
    return this.board.flat();
  }

  get shouldOverGame() {
    if (this.board.emptySlots.length < this.board.size) {
      return false;
    }

    // TODO: check for rest options
  }

  moveTiles(direction: Direction) {
    if (direction === "DOWN") {
      this.board.data = this.board.data.map((r) => this.mergeTiles(r));;
    }

    if (direction === "UP") {
      this.board.data = this.board.data.map((r) => this.mergeTiles(r, true));
    }

    if (direction === "RIGHT") {
      const transposedBoard = this.board.rotateRight(this.board.data);

      const mergedBoard = transposedBoard.map((r) => this.mergeTiles(r, true));

      this.board.data = this.board.rotateLeft(mergedBoard);
    }

    if (direction === "LEFT") {
      const transposedBoard = this.board.rotateRight(this.board.data);

      const mergedBoard = transposedBoard.map((r) => this.mergeTiles(r));

      this.board.data = this.board.rotateLeft(mergedBoard);
    }

    if (this.board.emptySlots.length < this.board.size) {
      const [x, y] = this.board.randomSlot();

      this.board.data[x][y] = new Tile(2);
    }

    if (this.shouldOverGame) {
      this.emit("GAME_OVER");
      return;
    }
  }

  mergeTiles(rowData: (Tile | undefined)[], rightToLeft?: boolean) {
    const acc = rightToLeft ? rowData.toReversed() : [...rowData];

    acc.forEach((_, index) => {
      if (acc[index] && !acc[index + 1] && index < acc.length - 1) {
        acc[index + 1] = new Tile(acc[index]!.value);
        acc[index] = undefined;
      }

      if (acc[index] && acc[index + 1]) {
        if (acc[index]!.value !== acc[index + 1]!.value) return;

        acc[index + 1] = new Tile(acc[index]!.value * 2);
        acc[index] = undefined;

        this.emit("TILE_MERGED", acc[index]);
      }
    });

    return rightToLeft ? acc.reverse() : acc;
  }
}

export default new Board();
