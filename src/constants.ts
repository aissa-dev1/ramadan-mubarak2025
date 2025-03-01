export const X_DIRECTIONS = ["left", "right"] as const;

export type XDirection = (typeof X_DIRECTIONS)[number];
