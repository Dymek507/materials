import { ILocation } from "../../types/model";

interface IParams {
  q: string;
  format: string;
  addressdetails: number;
  polygon_geojson: number;
}

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const positionFromObj = async (from: ILocation) => {
  // Search
  const params: IParams = {
    q: from.zipCode + " " + from.city,
    format: "json",
    addressdetails: 1,
    polygon_geojson: 0,
  };
  //@ts-ignore
  const queryString = new URLSearchParams(params).toString();
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };
  return await fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result)[0];
    })
    .catch((err) => console.log("err: ", err));
};

export default positionFromObj;
