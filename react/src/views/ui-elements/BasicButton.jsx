import React from 'react';

// react-bootstrap
import { Row, Col, Card, Table, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// third party
import Chart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';

// project import
import OrderCard from '../../components/Widgets/Statistic/OrderCard';
import SocialCard from '../../components/Widgets/Statistic/SocialCard';

import uniqueVisitorChart from '../dashboard/chart/analytics-unique-visitor-chart';
import customerChart from '../dashboard/chart/analytics-cuatomer-chart';
import customerChart1 from '../dashboard/chart/analytics-cuatomer-chart-1';

// assets
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import imgGrid1 from '../../assets/images/gallery-grid/img-grd-gal-1.jpg';
import imgGrid2 from '../../assets/images/gallery-grid/img-grd-gal-2.jpg';
import imgGrid3 from '../../assets/images/gallery-grid/img-grd-gal-3.jpg';

// ==============================|| DASHBOARD ANALYTICS ||============================== //


// Importing images from the assets folder
import mapPlaceholder from '../../assets/images/mapPlaceholder.jpeg';
import zoneMapPlaceholder from '../../assets/images/zoneMapPlaceholder.mp4';

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
        {/* Left Map Section */}
        <Col md={6}>
          <Card>
            <Card.Body>
              {/* Display the zone map */}
              <img src={mapPlaceholder} alt="Zone Map" style={{ width: '100%', height: '680px', objectFit: 'cover' }} />

            </Card.Body>
          </Card>
        </Col>

        {/* Right Map with Search */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <input
                type="text"
                placeholder="Find Your Location"
                style={{
                  width: '80%',
                  padding: '10px',
                  borderRadius: '5px',
                  marginBottom: '10px'
                }}
              />
              <button style={{ padding: '10px 20px', borderRadius: '5px', background: '#3498db', color: '#fff' }}>Request Service</button>
              <video controls style={{ width: '100%' }} onError={(e) => (e.target.style.display = 'none')}>
                <source src={zoneMapPlaceholder} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* Total Obstacles Card */}
        <Col md={12}>
          <Card className="bg-info text-white">
            <Card.Body>
              <h4>Total Obstacles Detected</h4>
              <h2>35</h2>
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
          <span className="detected-text">Detected</span> {/* Added span for "Detected" */}
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
          <span className="detected-text">Detected</span> {/* Added span for "Detected" */}
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
          <span className="detected-text">Detected</span> {/* Added span for "Detected" */}
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
          <span className="detected-text">Detected</span> {/* Added span for "Detected" */}
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
          <span className="detected-text">Detected</span> {/* Added span for "Detected" */}
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
          <span className="detected-text">Detected</span> {/* Added span for "Detected" */}
        </Card.Body>
      </Card>
    </Link>
  </Col>
</Row>

    </React.Fragment>
  );
};

export default DashAnalytics;
