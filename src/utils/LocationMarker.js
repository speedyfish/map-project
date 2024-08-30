import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { setPositions } from '../store/positionSlice';
import getAreaName from './GetAreaName';

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
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/5188/5188014.png', // Example home icon URL
  iconSize: [40, 40], // Size of the icon
  iconAnchor: [15, 30], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -30], // Point from which the popup should open relative to the iconAnchor
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

  const [startName, setStartName] = useState('');
  const [endName, setEndName] = useState('');

  useEffect(() => {
    const fetchAreaName = async () => {
      try {
        const name = await getAreaName(positions[0].lat.toFixed(5), positions[0].lng.toFixed(5));
        setStartName(name);
        console.log("startName", name, positions[0].lat.toFixed(5), positions[0].lng.toFixed(5))
      } catch (error) {
        console.error('Error fetching area name:', error);
        setStartName('Error fetching location');
      }
    };

    fetchAreaName();
  }, [positions]);

  useEffect(() => {
    const fetchAreaName = async () => {
      try {
        const name = await getAreaName(positions[1].lat.toFixed(5), positions[1].lng.toFixed(5));
        setEndName(name);
        console.log("endName", name, positions[1].lat.toFixed(5), positions[1].lng.toFixed(5))
      } catch (error) {
        console.error('Error fetching area name:', error);
        setEndName('Error fetching location');
      }
    };

    fetchAreaName();
  }, [positions]);


  return (
    <>
      {positions.map((pos, index) => {
        // Determine which icon to use
        let icon = defaultIcon;
        let label = '';

        if (index === 0) {
          icon = startIcon;
          label = startName;
        } else if (index === positions.length - 1) {
          icon = endIcon;
          label = endName;
        }

        return (
          <Marker key={index} position={pos} icon={icon}>
            <Popup>
         
              {label ? `${label} ` : ''}<br/>Latitude: {pos.lat.toFixed(5)}<br/>Longitude: {pos.lng.toFixed(5)}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default LocationMarker;
