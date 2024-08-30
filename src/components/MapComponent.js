import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import LocationMarker from '../utils/LocationMarker';

// Define a custom home icon for the marker
const homeIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/5988/5988246.png', // Replace with the actual URL of your home icon
  iconSize: [40, 40], // Adjust the size of the icon as needed
  iconAnchor: [15, 30], // Adjust the anchor point as needed
  popupAnchor: [0, -30], // Adjust the popup anchor as needed
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
  }, [routeData, geoJsonLayer]);

  return (
    <MapContainer center={centerCoordinates} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={centerCoordinates} icon={homeIcon}>
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
