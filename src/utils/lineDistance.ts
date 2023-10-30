import { Cords } from "../types/model";

// export const getLineDistance = (start: Cords, end: Cords) => {
//   const a = end.lat - start.lat;
//   const b = end.lng - start.lng;

//   const c = Math.sqrt(a * a + b * b);

//   return c * 100;
// };

export const getLineDistance = (start: Cords, end: Cords) => {
  const { lat: lat1, lng: lng1 } = start;
  const { lat: lat2, lng: lng2 } = end;
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lng1 - lng2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515 * 1.609344;
  return dist;
};
