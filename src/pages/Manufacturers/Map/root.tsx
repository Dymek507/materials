//@ts-nocheck
import {
  TileLayer,
  MapContainer,
  LayersControl,
  Marker,
  Popup,
  Circle,
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
import s_11 from '../data/g3.json'

interface MapProps {
  list: ICompany[];
  circleRadius: number;
}

const Map = ({ list, circleRadius }: MapProps) => {

  const siteCords = useAppSelector((state) => state.construction.constructionSite.cords);

  const geojson = geoData as GeoJsonObject
  const s11_json = s_11 as GeoJsonObject

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

  function picnicFilter(e: any, type: string) {
    if (type === "") return true
    if (e.properties["RODZAJ_KOP"] === type) return true
  }

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
      >

        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Mapa">
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
          <LayersControl.Overlay checked={false} name="S11">
            <GeoJSON data={s11_json} onEachFeature={(feature, layer) => onPlaceClick(feature, layer)} />
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
      </MapContainer>
    </>
  );
};

export default Map;