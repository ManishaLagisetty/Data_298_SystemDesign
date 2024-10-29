import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ImageDetectionComponent from '../../components/ImageDetectionComponent';
import MapDisplayComponent from '../../components/MapDisplayComponent';

const WildlifeDetection = () => (
  <React.Fragment>
    <Row>
      <Col md={6}>
        <ImageDetectionComponent
          apiEndpoint="http://127.0.0.1:8000/predict/" 
          placeholderImage="src/assets/images/cars4.jpg"
        />
      </Col>
      <Col md={6}>
        <MapDisplayComponent
        apiEndpoint="http://127.0.0.1:8000/map_data/wildlife/"
        />
      </Col>
    </Row>
  </React.Fragment>
);

export default WildlifeDetection;
