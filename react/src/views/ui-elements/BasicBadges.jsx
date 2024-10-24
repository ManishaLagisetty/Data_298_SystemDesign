import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const BasicBadges = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const canvasRef = useRef(null);
  const IMG_WIDTH = 512;
  const IMG_HEIGHT = 512;

  // Handle image upload with resizing to 512x512
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Clear the result state to remove previous bounding boxes
      setResult(null);

      const image = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        image.src = e.target.result;

        image.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = IMG_WIDTH;
          canvas.height = IMG_HEIGHT;

          // Draw the resized image on the canvas
          ctx.drawImage(image, 0, 0, IMG_WIDTH, IMG_HEIGHT);

          // Convert the resized canvas back to a blob
          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            setUploadedImage(resizedFile);
            setImagePreview(URL.createObjectURL(blob));
          }, file.type);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Send image to the Flask API for processing
  const handleProcessImage = async () => {
    if (!uploadedImage) {
      alert('Please upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadedImage);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data.predictions);
    } catch (error) {
      console.error('Error during image processing:', error);
      alert('An error occurred during image processing. Please try again.');
    }
  };

  // Function to draw bounding boxes on the canvas
  const drawBoundingBoxes = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (result && imagePreview) {
      // Set drawing style
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#00FF00'; // Green for bounding boxes
      ctx.font = '16px Arial';
      ctx.fillStyle = '#00FF00';

      // Draw each bounding box from the result
      result.forEach((prediction) => {
        const { xmin, ymin, xmax, ymax, confidence, name } = prediction;
        const boxWidth = xmax - xmin;
        const boxHeight = ymax - ymin;

        // Draw the bounding box
        ctx.strokeRect(xmin, ymin, boxWidth, boxHeight);

        // Draw the label and confidence
        const label = `${name} (${(confidence * 100).toFixed(1)}%)`;
        ctx.fillText(label, xmin, ymin > 10 ? ymin - 5 : 10);
      });
    }
  };

  // Call drawBoundingBoxes whenever the result changes
  useEffect(() => {
    drawBoundingBoxes();
  }, [result]);

  return (
    <React.Fragment>
      <Row className="mt-4">
        {/* Left Section for Image Upload */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                <img
                  src={imagePreview || 'path/to/placeholder.jpg'}
                  alt="Uploaded Preview"
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                  }}
                />
                {/* Canvas overlay for drawing bounding boxes */}
                <canvas
                  ref={canvasRef}
                  width={IMG_WIDTH}
                  height={IMG_HEIGHT}
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
            </Card.Body>
          </Card>
        </Col>

        {/* Right Section for Processing and Results */}
        <Col md={6}>
          <Card>
            <Card.Body>
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

              {result && (
                <div style={{ marginTop: '20px', background: '#f1f1f1', padding: '10px', borderRadius: '5px' }}>
                  <h5>Processing Result:</h5>
                  <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BasicBadges;
