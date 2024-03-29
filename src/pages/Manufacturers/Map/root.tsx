//@ts-nocheck

import {
  TileLayer,
  MapContainer,
  LayersControl,
  Marker,
  Popup,
  Circle,
  WMSTileLayer,
} from "react-leaflet";
import * as ReactDOMServer from 'react-dom/server';

import { GeoJSON, GeoJsonObject } from 'react-leaflet/GeoJSON'
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import placeHolder from "./assets/manufacturer.svg";
import site from "./assets/site.svg"
import L from "leaflet";
import { ICompany } from "../../../types/model";
import { useAppSelector } from "../../../store/app/hooks";
import CustomPopup from "./CustomPopup";

import geoData from '../data/zloza.json'
import kolej from '../data/kolej.json'

import siteContours from '../data/sitesJSON/obrysy.json'

import ReactLeafletRightClick, {
  LeafletRightClickProvider,
  useLeafletRightClick
} from "react-leaflet-rightclick";
import { useEffect, useState } from "react";

interface MapProps {
  list: ICompany[];
  circleRadius: number;
}

const Map = ({ list, circleRadius }: MapProps) => {
  const siteCords = useAppSelector((state) => state.construction.constructionSite.cords);
  const siteInfo = useAppSelector((state) => state.construction.constructionSite)

  const siteKey = siteInfo?.key ?? ""

  const siteContours_json = siteContours as GeoJsonObject
  const geojson = geoData as GeoJsonObject
  const kolej_json = kolej as GeoJsonObject

  const GeoJSONPopup = ({ feature }: { feature: any }) => {
    const id = feature.properties["ID_ZLOZ"]
    return (
      <div>
        <p>{feature.properties["NAZWA"]}</p>
        <p>{feature.properties["RODZAJ_KOP"]}</p>
        <a href={`https://igs.pgi.gov.pl/zloze.asp?ID=${id}&mode=koncesje`}>Więcej</a>
      </div >
    );
  };

  const onPlaceClick = (feature: any, layer: any) => {
    const popupContent = ReactDOMServer.renderToString(
      <GeoJSONPopup feature={feature} />
    );
    layer.bindPopup(popupContent);
  }
  const onLineClick = (feature: any, layer: any) => {
    const popupContent = ReactDOMServer.renderToString(
      < div >
        <p>"PKP": {feature.properties["PKP"]}</p>
        <p>"FPL": {feature.properties["FPL"]}</p>
      </div >
    );
    layer.bindPopup(popupContent);
  }

  function picnicFilter(e: any, type: string) {
    if (type === "") return true
    if (e.properties["RODZAJ_KOP"] === type) return true
  }
  function contourFilter(e: any, key: string) {
    console.log(key)
    if (key === "") return false
    if (e.properties["name"] === key) return true
  }

  const eventContextMenu = useLeafletRightClick();

  return (
    <>
      <MapContainer
        center={
          [51.21867050078357,
            19.039296130748205]
        }
        zoom={7}
        scrollWheelZoom={true}
        className='wh-full'
        zoomControl={false}
      >

        <LayersControl position="topright" >
          <LayersControl.BaseLayer name="Mapa" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satelita">
            <TileLayer
              url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
              maxZoom={20}
              subdomains={['mt1', 'mt2', 'mt3']}
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name="Kolej">
            <TileLayer
              attribution='<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>, Style: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a> <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a> and OpenStreetMap'
              url='https://tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png'
              tileSize={256}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Kruszywo">
            <GeoJSON data={geojson} onEachFeature={(feature, layer) => onPlaceClick(feature, layer)} filter={e => picnicFilter(e, "KAMIENIE ŁAMANE I BLOCZNE")} style={{ color: "red" }} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Piasek">
            <GeoJSON data={geojson} onEachFeature={(feature, layer) => onPlaceClick(feature, layer)} filter={e => picnicFilter(e, "PIASKI I ŻWIRY")} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Inne">
            <GeoJSON data={geojson} onEachFeature={(feature, layer) => onPlaceClick(feature, layer)} filter={e => picnicFilter(e, "")} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Obrys" checked={true}>
            <GeoJSON key={siteKey} data={siteContours_json} onEachFeature={(feature, layer) => onPlaceClick(feature, layer)} filter={e => contourFilter(e, siteKey)} />
          </LayersControl.Overlay>
          <LayersControl.Overlay checked={false} name="Transport">
            <GeoJSON data={kolej_json} onEachFeature={(feature, layer) => onLineClick(feature, layer)} />
          </LayersControl.Overlay>
        </LayersControl>
        <Marker position={[siteCords.lat, siteCords.lng]} icon={L.icon({
          iconUrl: site,
          iconSize: [38, 38],
        })}>
        </Marker>
        {list.length !== 0 && list.map((company) => (
          <Marker key={company.id} position={[company.cords.lat, company.cords.lng]} icon={L.icon({
            iconUrl: placeHolder,
            iconSize: [38, 38],
          })}>
            <Popup>
              <CustomPopup company={company} />
            </Popup>
          </Marker>
        ))}
        <Circle
          center={[siteCords.lat, siteCords.lng]}
          pathOptions={{ color: 'blue' }}
          radius={circleRadius * 1000}>
        </Circle>
        {/* <ReactLeafletRightClick
          customComponent={
            <div
              style={{
                background: "#ffffff",
                padding: "12px",
                borderRadius: "4px",
                width: "120px"
              }}
            >
              <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
                <li>{eventContextMenu && eventContextMenu.latlng.lat}</li>
                <li>{eventContextMenu && eventContextMenu.latlng.lng}</li>
              </ul>
            </div>
          }
          onRightClick={(event) => console.log(event)}
        /> */}
      </MapContainer>
    </>
  );
};

export default Map;