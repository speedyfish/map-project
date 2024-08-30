import React, { useEffect, useState } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import MapComponent from './components/MapComponent';
import { useSelector } from 'react-redux';

function App() {
  const [routeData, setRouteData] = useState(null);
  const positions = useSelector((state) => state.position.positions);
  const [axisType, setAxisType] = useState('primary');

  const callApiWithAxisType = async () => {
    try {
      const response = await fetch(`https://routing-web-service-ityenzhnyq-an.a.run.app/axisType/${axisType}`);
      if (response.ok) {
        const data = await response.json();
        console.log("vishnu",data)
        setRouteData(data); // Assuming the API returns GeoJSON data or something similar
      } else {
        console.error('Failed to fetch route data');
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  // Function to call the POST API
  const callPostApi = async () => {
    try {
      const response = await fetch('https://routing-web-service-ityenzhnyq-an.a.run.app/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startPt: {
            long: positions[0].lng,
            lat: positions[0].lat,
            description: 'Start Point',
          },
          endPt: {
            long: positions[1].lng,
            lat: positions[1].lat,
            description: 'End Point',
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setRouteData(data);
        console.log('Route API Response:', data);
      } else {
        console.error('Failed to fetch route API:', response.statusText);
      }
    } catch (error) {
      console.error('Error calling route API:', error);
    }
  };

  // Function to call the API
  const callApi = async () => {
    try {
      callPostApi()
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  const callReadyApi = async () => {
    try {
      const response = await fetch('https://routing-web-service-ityenzhnyq-an.a.run.app/ready');
      
      // Check if the response is successful
      if (response.ok) {
        // If successful, show an alert
        console.log('API call was successful!');
      } else {
        // If not successful, you can optionally handle different status codes
        console.error('API call failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  useEffect(() => {
    callReadyApi();
  }, []);

  
  return (
    <div className="App">
      <MapComponent routeData={routeData}/>
      <div className="overlay"> 
        <button onClick={callApi}>Get route</button>
        <select value={axisType} onChange={(e) => setAxisType(e.target.value)}>
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="tertiary">Tertiary</option>
          <option value="motorway">Motorway</option>
        </select>
        <button onClick={callApiWithAxisType}>Get route type</button>
        <button onClick={() => setRouteData(null)}>Clear Map</button>

      </div>
    </div>
  );
}

export default App;
