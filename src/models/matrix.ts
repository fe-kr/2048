import { makeObservable, observable } from "mobx";

export class Matrix<T> {
  data: (T | undefined)[][];
  size: number;

  constructor(rowCount: number, colCount: number) {
    const rows = Array.from({ length: rowCount });

    this.data = rows.map(() => Array.from({ length: colCount }));
    this.size = rowCount * colCount;

    makeObservable(this, { data: observable });
  }

  get emptySlots() {
    return this.data.reduce<number[][]>((acc, row, x) => {
      row.forEach((item, y) => !item && acc.push([x, y]));

      return acc;
    }, []);
  }

  flat() {
    return this.data.reduce<T[]>((acc, row, x) => {
      row.forEach((data, y) => data && acc.push({ ...data, position: [x, y] }));

      return acc;
    }, []);
  }

  rotateLeft<T>(data: T[][]) {
    const newArray = Array.from({ length: data.length });

    return newArray.map((_, i) => data.map((row) => row.at(-i - 1)));
  }

  rotateRight<T>(data: T[][]) {
    const newArray = Array.from({ length: data.length });

    return newArray.map((_, i) => data.map((row) => row[i]).toReversed());
  }

  randomSlot() {
    const emptySlots = this.emptySlots;
    const index = Math.floor(Math.random() * emptySlots.length);

    return emptySlots[index];
  }
}
