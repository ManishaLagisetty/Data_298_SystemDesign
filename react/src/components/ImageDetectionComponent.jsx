// ImageDetectionComponent.js
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import useImageProcessor from '../hooks/useImageProcessor';

const ImageDetectionComponent = ({ apiEndpoint, placeholderImage }) => {
  const {
    imagePreview,
    handleImageUpload,
    handleProcessImage,
    canvasRef,
  } = useImageProcessor(apiEndpoint);

  return (
    <React.Fragment>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                <img
                  src={imagePreview || placeholderImage}
                  alt="Uploaded Preview"
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                  }}
                />
                <canvas
                  ref={canvasRef}
                  width={512}
                  height={512}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                  }}
                />
              </div>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              <button
                onClick={handleProcessImage}
                style={{
                  padding: '10px 20px',
                  borderRadius: '5px',
                  background: '#2ecc71',
                  color: '#fff',
                }}
              >
                Process Image
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ImageDetectionComponent;
