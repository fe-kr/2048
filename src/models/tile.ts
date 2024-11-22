export class Tile {
  id: string;
  value: number;

  constructor(value: number) {
    this.id = Math.random().toString();
    this.value = value;
  }
}
