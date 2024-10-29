import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import ImageDetectionComponent from '../../components/ImageDetectionComponent';
import MapDisplayComponent from '../../components/MapDisplayComponent';
import 'chart.js/auto';

const IllegalDumping = () => {
  const [severityData, setSeverityData] = useState([]);
  const [severityCount, setSeverityCount] = useState({ 1: 0, 2: 0, 3: 0 });

  useEffect(() => {
    const fetchSeverityData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/map_data/illegal_dumping/');
        const data = await response.json();

        // Process data to add random months and calculate severity counts
        const processedData = data.slice(0, 500).map((item) => ({
          ...item,
          month: getMonthNumber(getRandomDate(new Date(2024, 0, 1), new Date())),
        }));

        // Calculate severity counts
        const count = { 1: 0, 2: 0, 3: 0 };
        processedData.forEach((item) => {
          if (item.severity === 1 || item.severity === 2 || item.severity === 3) {
            count[item.severity]++;
          }
        });

        setSeverityData(processedData);
        setSeverityCount(count);
      } catch (error) {
        console.error('Error fetching severity data:', error);
      }
    };

    fetchSeverityData();
  }, []);

  // Utility to calculate month number from a date
  const getMonthNumber = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const diff = date - startOfYear;
    return Math.ceil((diff / (1000 * 60 * 60 * 24) + startOfYear.getDay() + 1) / 30);
  };

  // Generate random date within a range
  const getRandomDate = (start, end) => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return isNaN(date.getTime()) ? new Date() : date; // Default to current date if invalid
  };

  // Prepare data for line chart grouped by month
  const monthlySeverityData = {};
  severityData.forEach((entry) => {
    const monthLabel = `Month ${entry.month}`;
    if (!monthlySeverityData[monthLabel]) {
      monthlySeverityData[monthLabel] = { severity1: 0, severity2: 0, severity3: 0 };
    }
    if (entry.severity === 1) monthlySeverityData[monthLabel].severity1++;
    else if (entry.severity === 2) monthlySeverityData[monthLabel].severity2++;
    else if (entry.severity === 3) monthlySeverityData[monthLabel].severity3++;
  });

  const lineChartData = {
    labels: Object.keys(monthlySeverityData),
    datasets: [
      {
        label: 'Severity 1',
        borderColor: 'green',
        fill: false,
        data: Object.values(monthlySeverityData).map((month) => month.severity1),
      },
      {
        label: 'Severity 2',
        borderColor: 'orange',
        fill: false,
        data: Object.values(monthlySeverityData).map((month) => month.severity2),
      },
      {
        label: 'Severity 3',
        borderColor: 'red',
        fill: false,
        data: Object.values(monthlySeverityData).map((month) => month.severity3),
      },
    ],
  };
  
  const chartOptions = {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMin: 0,  // Minimum value for y-axis
        suggestedMax: 30, // Maximum value for y-axis; adjust based on expected range
      },
    },
  };

  const severityStyles = {
    1: { color: 'green', label: 'Low Illegal Dumping' },
    2: { color: 'orange', label: 'Medium Illegal Dumping' },
    3: { color: 'red', label: 'High Illegal Dumping' },
  };

  return (
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
            apiEndpoint="http://127.0.0.1:8000/map_data/illegal_dumping/"
          />
        </Col>
      </Row>

      <Row className="mt-5">
        {/* Line Chart Visualization */}
        <Col md={6}>
          <h5>Severity Levels by Month</h5>
          <Line data={lineChartData} options={chartOptions} />
        </Col>

        {/* Severity Count Visualization */}
        <Col md={6}>
          <h5>Severity Level Counts</h5>
          <Row className="justify-content-center">
            {Object.entries(severityCount).map(([level, count]) => (
              <Col key={level} xs={4} className="text-center">
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: severityStyles[level].color,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    margin: 'auto',
                  }}
                >
                  {count}
                </div>
                <p>{severityStyles[level].label}</p>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default IllegalDumping;
