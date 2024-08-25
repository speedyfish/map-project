import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { setPositions } from '../store/positionSlice';

// Fix for missing default marker icon
const defaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

// Custom icons for start and end markers
const startIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const endIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const LocationMarker = () => {
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.position.positions);

  useMapEvents({
    click(e) {
      dispatch(setPositions(e.latlng));
    },
  });

  return (
    <>
      {positions.map((pos, index) => {
        // Determine which icon to use
        let icon = defaultIcon;
        let label = '';

        if (index === 0) {
          icon = startIcon;
          label = 'Start';
        } else if (index === positions.length - 1) {
          icon = endIcon;
          label = 'End';
        }

        return (
          <Marker key={index} position={pos} icon={icon}>
            <Popup>
              {label ? `${label}: ` : ''}<br/>Latitude: {pos.lat.toFixed(5)}<br/>Longitude: {pos.lng.toFixed(5)}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default LocationMarker;
