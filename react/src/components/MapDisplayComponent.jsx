import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Custom marker icon to avoid missing icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapDisplayComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the Flask API
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/map_data');
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
        <MapContainer center={[37.3382, -121.8863]} zoom={12} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {data.map((item, index) => (
            <Marker
              key={index}
              position={[item.latitude, item.longitude]}
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
