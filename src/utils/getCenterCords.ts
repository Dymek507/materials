import { Cords } from "../types/model";

export const getCenterCords = (start: Cords, end: Cords) => {
  const a = end.lat - start.lat;
  const b = end.lng - start.lng;

  return {
    lat: start.lat + a / 2,
    lng: start.lng + b / 2,
  };
};
