import React, { useEffect, useState, useRef } from "react";
import {
  TileLayer,
  MapContainer,
  LayersControl,
} from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import placeholder from "./placeholder.png"

import RoutingControl from './RoutingControl'
import L, { LatLngExpression } from "leaflet";
import { Cords, IRouteCords } from "../../types/model";

const icon = L.icon({
  iconUrl: placeholder,
  iconSize: [38, 38],
});

interface ICompanyMapProps {
  companyCords: Cords;
  siteCords: Cords;
  setDistance: (distance: number) => void
}

const CompanyMap = ({ companyCords, siteCords, setDistance }: ICompanyMapProps) => {
  const [map, setMap] = useState(null);

  const [start, setStart] = useState<LatLngExpression | undefined>(undefined)
  const [end, setEnd] = useState<LatLngExpression | undefined>(undefined)

  useEffect(() => {
    if (companyCords && siteCords) {
      setStart([companyCords.lat, companyCords.lng])
      setEnd([siteCords.lat, siteCords.lng])
    }
  }, [companyCords, siteCords])



  return (
    <>
      {start && end && companyCords && siteCords && (
        <MapContainer
          center={[52.25346032951714, 21.035841641609696]}
          zoom={4}
          scrollWheelZoom={true}
          className='h-[400px]'
          whenReady={setMap}
        >
          {/* <ResetCenterView centerPosition={routeCords.center} /> */}
          <RoutingControl position={'topleft'} start={start} end={end} color={'#757de8'} setDistance={setDistance} />
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