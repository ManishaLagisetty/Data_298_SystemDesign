import React from 'react';


// react-bootstrap
import { Row, Col, Card } from 'react-bootstrap';


// assets
import imgGrid1 from '../../assets/images/gallery-grid/img-grd-gal-1.jpg';
import imgGrid2 from '../../assets/images/gallery-grid/drone_image2.gif';
import imgGrid3 from '../../assets/images/gallery-grid/drone_image.gif';
import imgGrid4 from '../../assets/images/gallery-grid/img-grd-gal-2.jpg';
import imgGrid5 from '../../assets/images/gallery-grid/car.jpg';
import imgGrid6 from '../../assets/images/gallery-grid/chart.gif';
// ==============================|| TYPOGRAPHY ||============================== //

const HomePage = () => {
  return (
    <React.Fragment>
      <Row> 
        <Col sm={12}>
          <Card>
              <img src={imgGrid1} alt="img" className="img-fluid wid-500" style={{ width: "100%", height: "100%", objectFit: "cover" }}/> 
          </Card>
          <Card>
              {/* Row with image on the left and text on the right */}
              <Row className="align-items-start"> {/* Add align-items-center to center align both vertically */}
                <Col md={6}>
                  <img src={imgGrid2} alt="img" className="img-fluid wid-500" />
                </Col>
                <Col md={6}>
                  <div className="align-items-start h-100 mt-4" style={{ textAlign: 'center',  marginRight: '20px' }}>
                    <h2>Advanced Data Collection with UAV Technology</h2> <br />
                    <Card.Text className="text-dark mb-1"><strong>Our cutting-edge drone solutions enable continuous and precise monitoring 
                      of road conditions. By detecting obstacles, identifying congestion, 
                      and recognizing traffic hotspots, our UAV systems help improve traffic management
                       and safety across California's highways and freeways.</strong>
                      </Card.Text> <br />
                    <Card.Text className="text-dark mb-1"><strong>Maximize operational efficiency, reduce travel time, and enhance
                       road safety with real-time data collection and advanced analytics.
                      Our UAV services are designed to revolutionize transportation monitoring.</strong>
                    </Card.Text>
                  </div>
                </Col>
              </Row>
          </Card>
        </Col>


        <Col sm={12}>
          <Card style={{ backgroundColor: '#EFD02C', padding: '20px' }}> {/* Adding padding to the Card for better layout */}
            {/* Top Row: Heading and Map */}
            <Row className="align-items-center">
              <Col md={5}>
                <div className="align-items-start h-100" style={{ textAlign: 'left', marginLeft: '20px' }}>
                  <h2>Join Us in Shaping Effortless Commutes</h2>
                  <Card.Text className="lead m-t-0">
                    Partner with us to create a seamless and stress-free transportation experience for all travelers.
                  </Card.Text>
                </div>
              </Col>
              <Col md={7}>
                <img src={imgGrid4} alt="Map" className="img-fluid wid-500" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
              </Col>
            </Row>

            {/* Bottom Row: Two Smaller Images Side by Side */}
            <Row className="mt-4" style={{ marginLeft: '00px', marginRight: '0px' }}> {/* Add left and right margins */}
              <Col xs={6}>
                <img src={imgGrid5} alt="Car Image" className="img-fluid" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              </Col>
              <Col xs={6}>
                <img src={imgGrid6} alt="Chart Image" className="img-fluid" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              </Col>
            </Row>
          </Card>
        </Col>






        <Col sm={12}>
  <Card style={{ backgroundColor: '#000000'}}> {/* Outer Card */}
    <Card.Header className="text-center">
      <h1 style={{ fontWeight: 'bold', color: 'white'}}>Unlocking Transportation Excellence</h1>
    </Card.Header>
    <Card.Body>
      <Row>
        {/* Ordered List Card */}
        <Col md={6} lg={3} xl={3}>
        <Card style={{ backgroundColor: 'black', borderColor: 'white' }}>
          <Card.Body>
          <h4 style={{ color: 'white' }}>Cutting-Edge Hazard Detection</h4><br />
            <p style={{ fontWeight: 'bold', color: 'white'}}>· Equipped with AI powered drones, our app captures real time images and data of road conditions.</p>
            <p style={{ fontWeight: 'bold', color: 'white'}}>· Utilizing deep learning models like YOLO, it swiftly identifies congestion types and categorizes their severity.
            From potholes to accidents, we've got you covered.</p>
            
          </Card.Body>
        </Card>
        </Col>
        <Col md={6} lg={3} xl={3}>
        <Card style={{ backgroundColor: 'black', borderColor: 'white' }}>
          <Card.Body>
          <h4 style={{ color: 'white' }}>Integration and Accessibility</h4><br />
            <p style={{ fontWeight: 'bold', color: 'white'}}>· Easily integrate our app into your daily routines with our user-friendly interface and robust API.</p>
            <p style={{ fontWeight: 'bold', color: 'white'}}>· Whether you are a commuter, city planner, or transportation authority, accessing critical congestion data has never been simpler.</p>
            
          </Card.Body>
        </Card>
        </Col>
        <Col md={6} lg={3} xl={3}>
        <Card style={{ backgroundColor: 'black', borderColor: 'white' }}>
          <Card.Body>
          <h4 style={{ color: 'white' }}>Enhanced Productivity</h4><br />
            <p style={{ fontWeight: 'bold', color: 'white'}}>· Streamline scheduling, task assignments, and maintenance requests with our intuitive companion app.
            Stay on top of compliance standards and regulations while efficiently managing road maintenance tasks with ease.</p>
          </Card.Body>
        </Card>
        </Col>
        <Col md={6} lg={3} xl={3}>
        <Card style={{ backgroundColor: 'black', borderColor: 'white' }}>
          <Card.Body>
            <h4 style={{ color: 'white' }}>Empowering Insights</h4><br />
            <p style={{ fontWeight: 'bold', color: 'white'}}>· Access your congestion data anytime, anywhere, through our powerful dashboards.</p>
            <p style={{ fontWeight: 'bold', color: 'white'}}>· Customize your view, analyze key metrics, and generate comprehensive reports.
            Decision-making for municipal councils and stakeholders.</p> 
          </Card.Body>
        </Card>
        </Col>
      </Row>
    </Card.Body>
  </Card>
</Col>



     
      </Row>
    </React.Fragment>
  );
};

export default HomePage;
