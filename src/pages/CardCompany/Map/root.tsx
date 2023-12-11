//@ts-nocheck
import { useEffect, useState } from "react";
import {
  TileLayer,
  MapContainer,
  LayersControl,
} from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";

import RoutingControl from './RoutingControl'
import { LatLngExpression } from "leaflet";
import { Cords } from "../../../types/model";

interface ICompanyMapProps {
  companyCords: Cords;
  siteCords: Cords;
  setDistance: (distance: number) => void;
  changed: boolean;
}

const CompanyMap = ({ companyCords, siteCords, setDistance, changed }: ICompanyMapProps) => {
  const [start, setStart] = useState<LatLngExpression | undefined>(undefined)
  const [end, setEnd] = useState<LatLngExpression | undefined>(undefined)

  useEffect(() => {
    if (companyCords && siteCords) {
      setStart([companyCords.lat, companyCords.lng])
      setEnd([siteCords.lat, siteCords.lng])
    }
  }, [companyCords, siteCords, changed])


  return (
    <>
      {start && end && companyCords && siteCords && companyCords.lat && (
        <MapContainer
          center={[52.25346032951714, 21.035841641609696]}
          zoom={4}
          scrollWheelZoom={true}
          className='wh-full'
        // whenReady={setMap}

        >
          {/* <ResetCenterView centerPosition={routeCords.center} /> */}
          <RoutingControl position={'topleft'} start={start} end={end} color={'#757de8'} setDistance={setDistance} />
          {/* <RoutingControl position={'topleft'} start={start} end={end} color={'#757de8'} setDistance={setDistance} /> */}
          {/* <RoutingControl routeCords={routeCords} position={'topleft'} /> */}
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Map">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
          </LayersControl>
        </MapContainer>
      )}
    </>
  );
};

export default CompanyMap;