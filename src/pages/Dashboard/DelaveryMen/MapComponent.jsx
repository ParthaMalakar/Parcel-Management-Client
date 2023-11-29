
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useLoaderData } from 'react-router-dom';

const MapComponent = () => {
    const parcel =useLoaderData()
    console.log(parcel)
    const latitude = 40.7128; 
  const longitude = -74.0060;
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ width: '100%', height: '400px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]}>
        <Popup>Your Parcel Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
