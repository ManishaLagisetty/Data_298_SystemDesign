// useImageProcessor.js
import { useState, useEffect, useRef } from 'react';

const IMG_WIDTH = 512;
const IMG_HEIGHT = 512;

const useImageProcessor = (apiEndpoint) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const canvasRef = useRef(null);

  // Handle image upload with resizing
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResult(null);
      const image = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        image.src = e.target.result;

        image.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = IMG_WIDTH;
          canvas.height = IMG_HEIGHT;
          ctx.drawImage(image, 0, 0, IMG_WIDTH, IMG_HEIGHT);

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
      const response = await fetch(apiEndpoint, {
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

  // Draw bounding boxes on the canvas
  const drawBoundingBoxes = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (result && imagePreview) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#00FF00';
      ctx.font = '16px Arial';
      ctx.fillStyle = '#00FF00';

      result.forEach(({ xmin, ymin, xmax, ymax, confidence, name }) => {
        const boxWidth = xmax - xmin;
        const boxHeight = ymax - ymin;
        ctx.strokeRect(xmin, ymin, boxWidth, boxHeight);
        const label = `${name} (${(confidence * 100).toFixed(1)}%)`;
        ctx.fillText(label, xmin, ymin > 10 ? ymin - 5 : 10);
      });
    }
  };

  useEffect(() => {
    drawBoundingBoxes();
  }, [result]);

  return {
    imagePreview,
    handleImageUpload,
    handleProcessImage,
    canvasRef,
    setResult,
  };
};

export default useImageProcessor;
