import { MapContainer, TileLayer } from "react-leaflet";
import ReactLeafletRightClick, {
  useLeafletRightClick
} from "react-leaflet-rightclick";

const Mapping = () => {
  const eventContextMenu = useLeafletRightClick();

  return (
    <MapContainer
      style={{
        height: "100vh",
        width: "100%"
      }}
      center={[-8.793356, 115.215645]}
      zoom={12}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ReactLeafletRightClick
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
      />
    </MapContainer>
  );
};

export default Mapping;
