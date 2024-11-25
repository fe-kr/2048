import { nanoid } from "nanoid";

export class Tile {
  id: string;
  value: number;

  constructor({ value, id }: Partial<Tile>) {
    this.id = id ?? nanoid();
    this.value = value!;
  }

  toString() {
    return this.value?.toString();
  }
}
