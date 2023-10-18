import { ICargo, IRouteCords } from "../../types/model";
import positionFromObj from "./positionFromObj";

export const DEFAULT_ROUTE_CORDS = {
  from: { lat: 54.60839, lng: 18.8006 },
  destination: { lat: 54.60839, lng: 18.8006 },
  center: { lat: 54.60839, lng: 18.8006 },
};

export const getRouteCords = async (
  cargo: ICargo
): Promise<IRouteCords | undefined> => {
  if (cargo.from && cargo.destination === undefined) return undefined;

  const fromCords = await positionFromObj(cargo.from);
  const destinationCords = await positionFromObj(cargo.destination);

  const center = {
    lat: (Number(fromCords.lat) + Number(destinationCords.lat)) / 2,
    lng: (Number(fromCords.lon) + Number(destinationCords.lon)) / 2,
  };

  return {
    from: { lat: Number(fromCords.lat), lng: Number(fromCords.lon) },
    destination: {
      lat: Number(destinationCords.lat),
      lng: Number(destinationCords.lon),
    },
    center,
  };
};
