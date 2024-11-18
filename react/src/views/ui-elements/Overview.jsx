import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';

const DashAnalytics = () => {
  const [totalCounts, setTotalCounts] = useState({
    potholes: 0,
    illegalDumping: 0,
    wildlife: 0,
    construction: 0,
    cracks: 0,
    roadAccidents: 0
  });

  const [severityCounts, setSeverityCounts] = useState({ low: 0, medium: 0, high: 0 });

  useEffect(() => {
    const fetchCategoryData = async (endpoint, key) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/map_data/${endpoint}/`);
        const data = await response.json();

        // Calculate severity counts for this category
        const categorySeverityCount = { low: 0, medium: 0, high: 0 };
        data.forEach(item => {
          if (item.severity === 1) categorySeverityCount.low++;
          if (item.severity === 2) categorySeverityCount.medium++;
          if (item.severity === 3) categorySeverityCount.high++;
        });

        // Update total counts for severity
        setSeverityCounts(prevCounts => ({
          low: prevCounts.low + categorySeverityCount.low,
          medium: prevCounts.medium + categorySeverityCount.medium,
          high: prevCounts.high + categorySeverityCount.high
        }));

        // Update count for each category
        setTotalCounts(prevCounts => ({ ...prevCounts, [key]: data.length }));
      } catch (error) {
        console.error(`Error fetching data for ${endpoint}:`, error);
      }
    };

    // Fetch data for each category
    fetchCategoryData('pothole', 'potholes');
    fetchCategoryData('illegal_dumping', 'illegalDumping');
    fetchCategoryData('wildlife', 'wildlife');
    fetchCategoryData('construction', 'construction');
    fetchCategoryData('crack', 'cracks');
    fetchCategoryData('car_accident', 'roadAccidents');
  }, []);

  const barChartData = {
    labels: ['Potholes', 'Illegal Dumping', 'Wildlife', 'Construction', 'Cracks', 'Road Accidents'],
    datasets: [
      {
        label: 'Detected Count',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        borderColor: '#333',
        borderWidth: 1,
        data: [
          totalCounts.potholes,
          totalCounts.illegalDumping,
          totalCounts.wildlife,
          totalCounts.construction,
          totalCounts.cracks,
          totalCounts.roadAccidents
        ]
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
        ticks: { font: { size: 14 }, color: '#333', maxRotation: 45, minRotation: 45 }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Count', font: { size: 16 } },
        ticks: { font: { size: 14 }, color: '#333' }
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
            <Card.Body style={{ height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <h5>Severity Levels Across Categories</h5>
              <div style={{ height: '400px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
              { label: 'Potholes', count: totalCounts.potholes, url: '/pothole_detection' },
              { label: 'Illegal Dumping', count: totalCounts.illegalDumping, url: '/illegal_dumping' },
              { label: 'Wildlife', count: totalCounts.wildlife, url: '/wildlife_detection' },
              { label: 'Construction', count: totalCounts.construction, url: '/construction' },
              { label: 'Cracks', count: totalCounts.cracks, url: '/crack_detection' },
              { label: 'Road Accidents', count: totalCounts.roadAccidents, url: '/car_accidents' },
            ].map((item, index) => (
              <Col key={index} md={2} xs={6} className="my-2">
                <Card className="detection-card" style={{ width: '100%', minHeight: '180px' }}>
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <h6>{item.label}</h6>
                    <h3>{item.count}</h3>
                    <span className="detected-text">Detected</span>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default DashAnalytics;

