//@ts-nocheck

import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
// import createRoutineMachineLayer from "./RoutingControl";
import placeHolder from "./assets/placeholder.svg"


interface IRoutingMachineProps {
  position: string
  start: L.LatLng
  end: L.LatLng
  color: string
  setDistance: (distance: number) => void
}


const createRoutineMachineLayer = ({ position, start, end, setDistance }: IRoutingMachineProps) => {
  const instance = L.Routing.control({
    // position,
    waypoints: [
      start,
      end
    ],
    show: false,
    lineOptions: {
      styles: [
        {
          color: "blue",
        },
      ],
    },
    createMarker: function (i: number, waypoint: any, n: number) {
      const marker = L.marker(waypoint.latLng, {
        draggable: true,
        bounceOnAdd: false,
        bounceOnAddOptions: {
          duration: 1000,
          height: 800,
          function() {
            (bindPopup(myPopup).openOn(map))
          }
        },
        icon: L.icon({
          iconUrl: placeHolder,
          iconSize: [40, 40],
        })
      });
      return marker;
    }
  });

  instance.on('routesfound', function (e) {
    const routes = e.routes;
    const summary = routes[0].summary;
    setDistance(summary.totalDistance)
  });
  return instance;
};

// Pass our createRoutingMachineLayer to the createControlHook:
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// Export
export default RoutingMachine;