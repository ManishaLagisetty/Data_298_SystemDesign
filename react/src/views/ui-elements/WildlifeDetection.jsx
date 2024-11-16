import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import ImageDetectionComponent from '../../components/ImageDetectionComponent';
import MapDisplayComponent from '../../components/MapDisplayComponent';
import { chartOptions, monthNames } from '../../config/constant';
import { getMonthNumber, getRandomDate} from '../../store/dateProcessing';
import 'chart.js/auto';

const WildlifeDetection = () => {
  const [severityData, setSeverityData] = useState([]);
  const [severityCount, setSeverityCount] = useState({ 1: 0, 2: 0, 3: 0 });
  const dataURL = "http://127.0.0.1:8000/map_data/wildlife/";

  useEffect(() => {
    const fetchSeverityData = async () => {
      try {
        const response = await fetch(dataURL);
        const data = await response.json();

        // Process data to add random months and calculate severity counts
        const processedData = data.map((item) => ({
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

  const catgeoryName = 'Wildlife Detection';
  const lowSeverityLabel = 'Low ' + catgeoryName;
  const mediumSeverityLabel = 'Medium ' + catgeoryName;
  const highSeverityLabel = 'High ' + catgeoryName;

  // Prepare data for line chart grouped by month
  const monthlySeverityData = Array.from({ length: 12 }, () => ({ severity1: 0, severity2: 0, severity3: 0 }));
  severityData.forEach((entry) => {
    const monthIndex = entry.month - 1; // Convert month (1-12) to array index (0-11)
    if (monthIndex >= 0 && monthIndex < 12) {
      if (entry.severity === 1) monthlySeverityData[monthIndex].severity1++;
      else if (entry.severity === 2) monthlySeverityData[monthIndex].severity2++;
      else if (entry.severity === 3) monthlySeverityData[monthIndex].severity3++;
    }
  });

  const lineChartData = {
    labels: monthNames, // Use month names as x-axis labels
    datasets: [
      {
        label: lowSeverityLabel,
        borderColor: 'green',
        fill: false,
        data: monthlySeverityData.map((month) => month.severity1),
      },
      {
        label: mediumSeverityLabel,
        borderColor: 'orange',
        fill: false,
        data: monthlySeverityData.map((month) => month.severity2),
      },
      {
        label: highSeverityLabel,
        borderColor: 'red',
        fill: false,
        data: monthlySeverityData.map((month) => month.severity3),
      },
    ],
  };

  const severityStyles = {
    1: { color: 'green', label: lowSeverityLabel },
    2: { color: 'orange', label: mediumSeverityLabel },
    3: { color: 'red', label: highSeverityLabel },
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <ImageDetectionComponent
            apiEndpoint="http://127.0.0.1:8000/predict/?target_class=0" 
            placeholderImage="src/assets/images/animal.png"
          />
        </Col>
        <Col md={6}>
          <MapDisplayComponent
            apiEndpoint={dataURL}
          />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={6} style={{ height: '200px' }}> {/* Adjust the height as needed */}
          <h5 className="text-center">{catgeoryName} Severity Levels by Month</h5>
          <Line data={lineChartData} options={chartOptions} />
        </Col>

        {/* Severity Count Visualization */}
        <Col md={6}>
          <h5 className="text-center">{catgeoryName} Severity Level Counts</h5>
          <Row className="justify-content-center">
            {Object.entries(severityCount).map(([level, count], index) => (
              <Col key={`severity-${level}-${index}`} xs={4} className="text-center">
                <div
                  style={{
                    width: '150px',
                    height: '150px',
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

export default WildlifeDetection;
