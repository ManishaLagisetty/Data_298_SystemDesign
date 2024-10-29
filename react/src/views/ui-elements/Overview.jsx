import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Importing images from assets
import overviewImg1 from '../../assets/images/overview.img-1.png';
import overviewImg2 from '../../assets/images/overview.img-2.svg';

const DashAnalytics = () => {
  return (
    <React.Fragment>
      <Row className="mt-4">
        {/* Top Red, Orange, Green Zone Cards */}
        <Col md={4}>
          <Card className="bg-danger text-white">
            <Card.Body>
              <h4>Red Zones Detected</h4>
              <h2>2</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-warning text-white">
            <Card.Body>
              <h4>Orange Zones Detected</h4>
              <h2>30</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-success text-white">
            <Card.Body>
              <h4>Green Zones Detected</h4>
              <h2>104</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* Left Overview Image */}
        <Col md={6}>
          <Card>
            <Card.Body style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={overviewImg1} alt="Overview Image 1" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Card.Body>
          </Card>
        </Col>

        {/* Right Overview Image */}
        <Col md={6}>
          <Card>
            <Card.Body style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={overviewImg2} alt="Overview Image 2" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4 detection-cards">
        <Col md={2}>
          <Link to="/pothole-detection">
            <Card className="detection-card">
              <Card.Body>
                <h6>Potholes</h6>
                <h3>45</h3>
                <span className="detected-text">Detected</span>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={2}>
          <Link to="/garbage-detection">
            <Card className="detection-card">
              <Card.Body>
                <h6>Garbage</h6>
                <h3>4</h3>
                <span className="detected-text">Detected</span>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={2}>
          <Link to="/wildlife-detection">
            <Card className="detection-card">
              <Card.Body>
                <h6>Wildlife</h6>
                <h3>7</h3>
                <span className="detected-text">Detected</span>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={2}>
          <Link to="/construction-detection">
            <Card className="detection-card">
              <Card.Body>
                <h6>Construction</h6>
                <h3>8</h3>
                <span className="detected-text">Detected</span>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={2}>
          <Link to="/cracks-detection">
            <Card className="detection-card">
              <Card.Body>
                <h6>Cracks</h6>
                <h3>56</h3>
                <span className="detected-text">Detected</span>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={2}>
          <Link to="/accident-detection">
            <Card className="detection-card">
              <Card.Body>
                <h6>Road Accidents</h6>
                <h3>5</h3>
                <span className="detected-text">Detected</span>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashAnalytics;
