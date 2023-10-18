import React, { useEffect, useState, useRef } from "react";
import {
  TileLayer,
  MapContainer,
  LayersControl,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import placeholder from "./placeholder.png"
import cemIcon from "./cem-icon.png"
import site from "./site.png"


import L, { LatLngExpression, map } from "leaflet";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
import { ICompany } from "../../../types/model";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store/app/hooks";


interface MapProps {
  list: ICompany[];
  circleRadius: number;
}

const Map = ({ list, circleRadius }: MapProps) => {

  const siteCords = useAppSelector((state) => state.construction.constructionSite.cords);

  return (
    <>
      <MapContainer
        center={
          [51.21867050078357,
            19.039296130748205]
        }
        zoom={7}
        scrollWheelZoom={true}
        className='h-screen'
      >
        {/* <ResetCenterView centerPosition={routeCords.center} /> */}
        {/* <RoutingControl routeCords={routeCords} position={'topleft'} /> */}
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <Marker position={[siteCords.lat, siteCords.lng]} icon={L.icon({
          iconUrl: site,
          iconSize: [38, 38],
        })}>
        </Marker>
        {list.length !== 0 && list.map((company) => (
          <Marker key={company.id} position={[company.cords.lat, company.cords.lng]} icon={L.icon({
            iconUrl: cemIcon,
            iconSize: [38, 38],
          })}>
            <Popup>
              <Link to={`/company/${company.id}`}>
                <p className="text-xl font-bold">
                  {company.group}
                </p>
              </Link>
              {company.adress}<br />
              {company.phone}<br />
              {company.mail}<br />
            </Popup>
          </Marker>
        ))}
        <Circle
          center={[siteCords.lat, siteCords.lng]}
          pathOptions={{ color: 'blue' }}
          radius={circleRadius * 1000}>
        </Circle>
      </MapContainer>


    </>
  );
};

export default Map;