import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapDisplayComponent = ({ apiEndpoint }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    // Fetch data from the Flask API
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const result = await response.json();

        // For each point, fetch street geometry from Overpass API
        const streetSegments = await Promise.all(
          result.slice(0, 100).map(async (point) => {
            const streetSegment = await fetchStreetSegment(point.latitude, point.longitude);
            if (streetSegment) {
              return {
                type: 'Feature',
                properties: {
                  severity: point.severity,
                },
                geometry: streetSegment,
              };
            }
            return null;
          })
        );

        // Filter out null results
        const geoJson = {
          type: 'FeatureCollection',
          features: streetSegments.filter((segment) => segment !== null),
        };

        setGeoJsonData(geoJson);
      } catch (error) {
        console.error('Error fetching map data:', error);
      }
    };

    fetchData();
  }, []);

  // Fetch small street segment using Overpass API
  const fetchStreetSegment = async (lat, lon) => {
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];way(around:20,${lat},${lon})["highway"];(._;>;);out body;`;
    try {
      const response = await fetch(overpassUrl);
      const data = await response.json();

      // Extract LineString geometry from Overpass response
      const nodes = data.elements.filter((el) => el.type === 'node');
      const ways = data.elements.filter((el) => el.type === 'way');

      if (ways.length > 0) {
        const way = ways[0]; // Use the first way as the street segment
        const coordinates = way.nodes
          .map((nodeId) => {
            const node = nodes.find((n) => n.id === nodeId);
            return node ? [node.lon, node.lat] : null;
          })
          .filter((coord) => coord !== null);

        return {
          type: 'LineString',
          coordinates,
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching street segment:', error);
      return null;
    }
  };

  // Style function to dynamically apply colors based on severity
  const getStreetStyle = (feature) => {
    const severity = feature.properties.severity;
    let color = 'green'; // Default to green for severity 1

    if (severity === 2) {
      color = 'orange';
    } else if (severity === 3) {
      color = 'red';
    }

    return {
      color: color,
      weight: 5, // Line thickness
      opacity: 0.8,
    };
  };

  return (
    <React.Fragment>
      <Row className="mt-4">
        <MapContainer center={[37.3382, -121.8863]} zoom={12} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {geoJsonData && (
            <GeoJSON
              data={geoJsonData} // Transformed GeoJSON data
              style={getStreetStyle} // Apply styles dynamically
            />
          )}
        </MapContainer>
      </Row>
    </React.Fragment>
  );
};

export default MapDisplayComponent;
