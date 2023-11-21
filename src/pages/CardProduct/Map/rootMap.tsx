// @ts-nocheck
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
import { getCenterCords } from "../../../utils/getCenterCords";

interface ICompanyMapProps {
  companyCords: Cords;
  siteCords: Cords;
  setDistance: (distance: number) => void
}

const ProductMap = ({ companyCords, siteCords, setDistance }: ICompanyMapProps) => {
  // const [map, setMap] = useState(null);

  const [start, setStart] = useState<LatLngExpression | undefined>(undefined)
  const [end, setEnd] = useState<LatLngExpression | undefined>(undefined)
  const [center, setCenter] = useState<LatLngExpression | undefined>(undefined)

  useEffect(() => {
    if (companyCords && siteCords) {
      setStart([companyCords.lat, companyCords.lng])
      setEnd([siteCords.lat, siteCords.lng])
      setCenter(getCenterCords(companyCords, siteCords))
    }
  }, [companyCords, siteCords])



  return (
    <>
      {start && end && companyCords && siteCords && (
        <MapContainer
          center={center}
          zoom={7}
          scrollWheelZoom={true}
          className='wh-full'
        // whenReady={setMap}
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

export default ProductMap;