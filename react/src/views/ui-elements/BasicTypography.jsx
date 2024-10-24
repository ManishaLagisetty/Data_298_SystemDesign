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

const BasicTypography = () => {
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





<Col md={12}>
          <Card style={{ backgroundColor: '#EFD02C'}}>
            <Card.Header>
              <Card.Title as="h5">Inline Text Elements</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text className="lead m-t-0">Your title goes here</Card.Text>
              You can use the mark tag to
              <mark>highlight</mark> text.
              <br />
              <del>This line of text is meant to be treated as deleted text.</del>
              <br />
              <ins>This line of text is meant to be treated as an addition to the document.</ins>
              <br />
              <strong>rendered as bold text</strong>
              <br />
              <em>rendered as italicized text</em>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Contextual Text Colors</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text className="text-muted mb-1">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</Card.Text>
              <Card.Text className="text-primary mb-1">Nullam id dolor id nibh ultricies vehicula ut id elit.</Card.Text>
              <Card.Text className="text-success mb-1">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</Card.Text>
              <Card.Text className="text-info mb-1">Maecenas sed diam eget risus varius blandit sit amet non magna.</Card.Text>
              <Card.Text className="text-warning mb-1">Etiam porta sem malesuada magna mollis euismod.</Card.Text>
              <Card.Text className="text-danger mb-1">Donec ullamcorper nulla non metus auctor fringilla.</Card.Text>
              <Card.Text className="text-dark mb-1">Nullam id dolor id nibh ultricies vehicula ut id elit.</Card.Text>
            </Card.Body>
          </Card>
        </Col>





        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Blockquotes</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text className="text-muted m-b-30">Your awesome text goes here.</Card.Text>
              <blockquote className="blockquote">
                <Card.Text className="mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                </Card.Text>
                <footer className="blockquote-footer mt-1">
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
              <Card.Text className="text-muted m-b-15 m-t-20">
                Add <code>.text-end</code> for a blockquote with right-aligned content.
              </Card.Text>
              <blockquote className="blockquote text-end">
                <Card.Text className="mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                </Card.Text>
                <footer className="blockquote-footer mt-1">
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Horizontal Description</Card.Title>
            </Card.Header>
            <Card.Body>
              <dl className="dl-horizontal row">
                <dt className="col-sm-3">Description lists</dt>
                <dd className="col-sm-9">A description list is perfect for defining terms.</dd>

                <dt className="col-sm-3">Euismod</dt>
                <dd className="col-sm-9">Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
                <dd className="col-sm-9">Donec id elit non mi porta gravida at eget metus.</dd>

                <dt className="col-sm-3">Malesuada porta</dt>
                <dd className="col-sm-9">Etiam porta sem malesuada magna mollis euismod.</dd>

                <dt className="col-sm-3 text-truncate">Truncated term is truncated</dt>
                <dd className="col-sm-9">
                  Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                </dd>
              </dl>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BasicTypography;
