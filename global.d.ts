declare global {
  interface ITile {
    id: string;
    value: number;
    position: number[];
  }

  type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

  type GameStatus = "PENDING" | "WON" | "LOST";
}

export {};
