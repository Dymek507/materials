import {
  TileLayer,
  MapContainer,
  LayersControl,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import * as ReactDOMServer from 'react-dom/server';
// @ts-ignore
import { GeoJSON, GeoJsonObject } from 'react-leaflet/GeoJSON'
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import cemIcon from "./assets/cem-icon.png";
import site from "./assets/site.png"
import L from "leaflet";
import { ICompany } from "../../../types/model";
import { useAppSelector } from "../../../store/app/hooks";
import CustomPopup from "./CustomPopup";

import geoData from '../data/zloza.json'
import { useNavigate } from "react-router-dom";

interface MapProps {
  list: ICompany[];
  circleRadius: number;
}

const Map = ({ list, circleRadius }: MapProps) => {

  const navigate = useNavigate()

  const siteCords = useAppSelector((state) => state.construction.constructionSite.cords);

  const geojson = geoData as GeoJsonObject

  const GeoJSONPopup = ({ feature }: { feature: any }) => {
    const id = feature.properties["ID_ZLOZ"]
    console.log(feature)
    return (
      <div>
        <p>{feature.properties["NAZWA"]}</p>
        <p>{feature.properties["RODZAJ_KOP"]}</p>
        <a href={`https://igs.pgi.gov.pl/zloze.asp?ID=${id}&mode=koncesje`}>Więcej</a>
      </div >
    );
  };

  const onPlaceClick = (feature: any, layer: any) => {
    // layer.bindPopup(e.properties["NAZWA"] + " typ: " + e.properties["RODZAJ_KOP"] + " id: " + e.properties["ID"]);
    const popupContent = ReactDOMServer.renderToString(
      <GeoJSONPopup feature={feature} />
    );
    layer.bindPopup(popupContent);
    // navigate(`https://igs.pgi.gov.pl/zloze.asp?ID=${e.properties.id}&mode=koncesje`)
    // layer.on('click', function (e: any) {
    //   window.location.replace(`https://igs.pgi.gov.pl/zloze.asp?ID=${e.target.feature.properties.ID}&mode=koncesje`);

    // });
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
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name="Satelita">
            <TileLayer
              url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
              maxZoom={20}
              subdomains={['mt1', 'mt2', 'mt3']}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Kolej">
            <TileLayer
              attribution='<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>, Style: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a> <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a> and OpenStreetMap'
              url='https://tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png'
              tileSize={256}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Kruszywo">
            <GeoJSON data={geojson} onEachFeature={(feature, layer) => onPlaceClick(feature, layer)} filter={e => picnicFilter(e, "KAMIENIE ŁAMANE I BLOCZNE")} />
            {/* <GeoJSON data={geojson.every((e: any) => e.properties["RODZAJ_KOP"] === "Węgiel")} onEachFeature={(e, layer) => onPlaceClick(e, layer)} /> */}
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Piasek">
            <GeoJSON data={geojson} onEachFeature={(feature, layer) => onPlaceClick(feature, layer)} filter={e => picnicFilter(e, "PIASKI I ŻWIRY")} />
            {/* <GeoJSON data={geojson.every((e: any) => e.properties["RODZAJ_KOP"] === "Węgiel")} onEachFeature={(e, layer) => onPlaceClick(e, layer)} /> */}
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Inne">
            <GeoJSON data={geojson} onEachFeature={(feature, layer) => onPlaceClick(feature, layer)} filter={e => picnicFilter(e, "")} />
            {/* <GeoJSON data={geojson.every((e: any) => e.properties["RODZAJ_KOP"] === "Węgiel")} onEachFeature={(e, layer) => onPlaceClick(e, layer)} /> */}
          </LayersControl.Overlay>
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