import { makeObservable, observable } from "mobx";

export class Matrix<T> {
  data: (T | undefined)[][];

  constructor(rowCount: number, colCount: number) {
    this.data = this.fillAllEmptySlots<T>(rowCount, colCount);

    makeObservable(this, { data: observable });
  }

  rotateLeft<T>(data: T[][]) {
    const newArray = Array.from({ length: data.length });

    return newArray.map((_, i) => data.map((row) => row.at(-i - 1)));
  }

  rotateRight<T>(data: T[][]) {
    const newArray = Array.from({ length: data.length });

    return newArray.map((_, i) => data.map((row) => row[i]).toReversed());
  }

  checkIsEqual<T>(data: T[][]) {
    return this.data.join("") === data.join("");
  }

  get hasEmptySlot() {
    return !this.data.flat().every(Boolean);
  }

  findEmptySlots() {
    return this.data.reduce<number[][]>((acc, row, x) => {
      row.forEach((item, y) => !item && acc.push([x, y]));

      return acc;
    }, []);
  }

  fillAllEmptySlots<T>(rowCount: number, colCount: number) {
    const rows = Array.from({ length: rowCount });

    return rows.map<T[]>(() => Array.from({ length: colCount }));
  }

  randomizeEmptySlot() {
    const emptySlots = this.findEmptySlots();
    const index = Math.floor(Math.random() * emptySlots.length);

    return emptySlots[index];
  }
}
