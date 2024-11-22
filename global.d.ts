/// <reference types="nativewind/types" />

declare global {
  interface ITile {
    id: string;
    value: number;
    position: number[];
  }

  type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
}

export {};
