import { X_DIRECTIONS, XDirection } from "../constants";

export function getRandomXDirection(): XDirection {
  return X_DIRECTIONS[Math.floor(Math.random() * X_DIRECTIONS.length)];
}
