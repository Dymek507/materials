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
  // cargo: ICargo
}


const createRoutineMachineLayer = ({ position, start, end, color, setDistance }: IRoutingMachineProps) => {
  const instance = L.Routing.control({
    position,
    waypoints: [
      start,
      end
    ],
    show: false,
    lineOptions: {
      styles: [
        {
          color,
        },
      ],
    },
  });
  console.log('instance', instance)
  instance.on('routesfound', function (e) {
    const routes = e.routes;
    const summary = routes[0].summary;
    console.log('summary', summary)
    setDistance(summary.totalDistance)
    // sendDistanceToFirebase(cargo, summary)
  });
  return instance;
};

// Pass our createRoutingMachineLayer to the createControlHook:
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// Export
export default RoutingMachine;