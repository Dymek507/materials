import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
// import createRoutineMachineLayer from "./RoutingControl";


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
    // lineOptions: {
    //   styles: [
    //     {
    //       color,
    //     },
    //   ],
    // },
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