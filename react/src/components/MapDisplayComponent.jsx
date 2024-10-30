import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css';
import L from 'leaflet';
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers';

// Custom marker icon based on severity
const severityIcons = {
  1: L.ExtraMarkers.icon({
    icon: 'fa-number',
    number: '1',
    markerColor: 'green',
    shape: 'circle',
    prefix: 'fa',
  }),
  2: L.ExtraMarkers.icon({
    icon: 'fa-number',
    number: '2',
    markerColor: 'orange',
    shape: 'circle',
    prefix: 'fa',
  }),
  3: L.ExtraMarkers.icon({
    icon: 'fa-number',
    number: '3',
    markerColor: 'red',
    shape: 'circle',
    prefix: 'fa',
  }),
};

const MapDisplayComponent = ({ apiEndpoint }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the Flask API
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching map data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Row className="mt-4">
        <MapContainer center={[37.3382, -121.8863]} zoom={12} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {data.slice(0, 500).map((item, index) => (
            <Marker
              key={index}
              position={[item.latitude, item.longitude]}
              icon={severityIcons[item.severity] || severityIcons[1]}
            >
              <Popup>
                <div>
                  <p><strong>Zipcode:</strong> {item.zipcode}</p>
                  <p><strong>Severity:</strong> {item.severity}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Row>
    </React.Fragment>
  );
};

export default MapDisplayComponent;
