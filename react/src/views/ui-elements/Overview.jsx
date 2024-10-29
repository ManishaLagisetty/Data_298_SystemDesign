import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import overviewImg2 from '../../assets/images/overview.img-2.svg';

const DashAnalytics = () => {
  const [illegalDumpingCount, setIllegalDumpingCount] = useState(0);
  const [severityCounts, setSeverityCounts] = useState({ low: 0, medium: 0, high: 0 });

  useEffect(() => {
    const fetchIllegalDumpingCount = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/map_data/illegal_dumping/');
        const data = await response.json();
        const limitedData = data.slice(0, 500);

        const severityCount = limitedData.reduce(
          (acc, item) => {
            if (item.severity === 1) acc.low++;
            if (item.severity === 2) acc.medium++;
            if (item.severity === 3) acc.high++;
            return acc;
          },
          { low: 0, medium: 0, high: 0 }
        );

        const totalIllegalDumping = severityCount.low + severityCount.medium + severityCount.high;
        setIllegalDumpingCount(totalIllegalDumping);
        setSeverityCounts(severityCount);
      } catch (error) {
        console.error('Error fetching illegal dumping count:', error);
      }
    };

    fetchIllegalDumpingCount();
  }, []);

  const barChartData = {
    labels: ['Potholes', 'Illegal Dumping', 'Wildlife', 'Construction', 'Cracks', 'Road Accidents'],
    datasets: [
      {
        label: 'Detected Count',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        borderColor: '#333',
        borderWidth: 1,
        data: [45, illegalDumpingCount, 7, 8, 56, 5],
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 14
          },
          color: '#333',
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
          font: {
            size: 16
          }
        },
        ticks: {
          font: {
            size: 14
          },
          color: '#333'
        }
      }
    }
  };

  const pieChartData = {
    labels: ['Low Severity', 'Medium Severity', 'High Severity'],
    datasets: [
      {
        data: [severityCounts.low, severityCounts.medium, severityCounts.high],
        backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
        hoverBackgroundColor: ['#218838', '#e0a800', '#c82333']
      }
    ]
  };

  return (
    <React.Fragment>
      {/* Zones Detected Container */}
      <Card className="mt-4">
        <Card.Body>
          <Row className="d-flex justify-content-center">
            <Col md={4}>
              <Card className="bg-danger text-white" style={{ minHeight: '140px' }}>
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <h4>Red Zones Detected</h4>
                  <h2>{severityCounts.high}</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="bg-warning text-white" style={{ minHeight: '140px' }}>
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <h4>Orange Zones Detected</h4>
                  <h2>{severityCounts.medium}</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="bg-success text-white" style={{ minHeight: '140px' }}>
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <h4>Green Zones Detected</h4>
                  <h2>{severityCounts.low}</h2>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Overview Images (Pie Chart on Left and Bar Chart on Right) */}
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body style={{ height: '500px' }}>
              <h5>Severity Levels Across Categories</h5>
              <div style={{ height: '400px' }}>
                <Pie data={pieChartData} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body style={{ height: '500px' }}>
              <h5>Detected Counts by Category</h5>
              <div style={{ height: '400px' }}>
                <Bar data={barChartData} options={barChartOptions} />
              </div>
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
              { label: 'Illegal Dumping', count: illegalDumpingCount, url: '/illegal_dumping' },
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
