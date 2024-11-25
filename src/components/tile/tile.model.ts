import uuid from "react-native-uuid";

export class Tile {
  id: string;
  value: number;

  constructor({ value, id }: Partial<Tile>) {
    this.id = id ?? uuid.v4();
    this.value = value!;
  }

  toString() {
    return this.value?.toString();
  }
}
