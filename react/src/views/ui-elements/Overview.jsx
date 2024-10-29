import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Importing images from assets
import overviewImg1 from '../../assets/images/overview.img-1.png';
import overviewImg2 from '../../assets/images/overview.img-2.svg';

const DashAnalytics = () => {
  return (
    <React.Fragment>
      {/* Zones Detected Container */}
      <Card className="mt-4">
        <Card.Body>
          <Row className="d-flex justify-content-center">
            <Col md={4}>
              <Card className="bg-danger text-white style={{ minHeight: '140px' }}">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <h4>Red Zones Detected</h4>
                  <h2>2</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="bg-warning text-white style={{ minHeight: '140px' }}">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <h4>Orange Zones Detected</h4>
                  <h2>30</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="bg-success text-white style={{ minHeight: '140px' }}">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <h4>Green Zones Detected</h4>
                  <h2>104</h2>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Overview Images */}
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={overviewImg1} alt="Overview Image 1" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={overviewImg2} alt="Overview Image 2" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Detection Cards Container */}
      <Card className="mt-4">
        <Card.Body>
          <Row className="d-flex justify-content-center">
            {[
              { label: 'Potholes', count: 45, url: '/pothole_detection' },
              { label: 'Illegal Dumping', count: 4, url: '/illegal_dumping' },
              { label: 'Wildlife', count: 7, url: '/wildlife_detection' },
              { label: 'Construction', count: 8, url: '/construction' },
              { label: 'Cracks', count: 56, url: '/crack_detection' },
              { label: 'Road Accidents', count: 5, url: '/car_accidents' },
            ].map((item, index) => (
              <Col key={index} md={2} xs={6} className="my-2">
                <Link to={item.url}>
                  <Card className="detection-card" style={{ width: '100%', minHeight: '180px' }}>
                    <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                      <h6>{item.label}</h6>
                      <h3>{item.count}</h3>
                      <span className="detected-text">Detected</span>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default DashAnalytics;
