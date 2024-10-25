import React from 'react';
import ImageDetectionComponent from '../../components/ImageDetectionComponent';

const CrackDetection = () => (
  <ImageDetectionComponent 
    apiEndpoint="http://127.0.0.1:8000/predict/" 
    placeholderImage="src/assets/images/cars4.jpg"
  />
);

export default CrackDetection;
