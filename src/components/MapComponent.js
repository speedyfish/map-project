import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import LocationMarker from '../utils/LocationMarker';

// Fix for missing default marker icon
const defaultIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const MapComponent = ({ routeData }) => {
  const [centerCoordinates, setCenterCoordinates] = useState([1.3521, 103.8198]); // Default to a location in case geolocation fails
  const [geoJsonLayer, setGeoJsonLayer] = useState(null);
  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenterCoordinates([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting current location: ", error);
        // Keep default center coordinates if geolocation fails
      }
    );
  }, []);

  useEffect(() => {
    if (routeData && geoJsonLayer) {
      // Update the GeoJSON layer with new data
      geoJsonLayer.clearLayers();
      geoJsonLayer.addData(routeData);
    }
  }, [routeData]);

  return (
    <MapContainer center={centerCoordinates} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={centerCoordinates} icon={defaultIcon}>
        <Popup>
          You are here!
        </Popup>
      </Marker>
      <LocationMarker />
      {routeData && <GeoJSON
        data={routeData}
        ref={(layer) => setGeoJsonLayer(layer)}
        pointToLayer={(feature, latlng) => {
          // Return null to avoid adding a marker for Point features
          return null;
        }}
      />}
    </MapContainer>
  );
};

export default MapComponent;
