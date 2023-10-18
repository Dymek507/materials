import { Cords } from "../types/model";

export const lineDistance = (start: Cords, end: Cords) => {
  const a = end.lat - start.lat;
  const b = end.lng - start.lng;

  const c = Math.sqrt(a * a + b * b);
  return c * 150;
};
