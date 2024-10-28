// src/AboutUs.jsx
import React from 'react';
import './AboutUs.scss'; // Import the CSS file
import background from "../assets/images/background.jpg";


const AboutUs = () => (
  <div className="about-us">
    <div className="about-content">
      <h1>About Us</h1>
      <p>
        At TransportIQ, we are dedicated to revolutionizing transport management by utilizing innovative technologies and intelligent
        solutions. Our mission is to create a seamless, efficient, and eco-friendly transportation network that enhances
        commuter experiences and optimizes road usage.
      </p>
      <p>
        Whether it's reducing congestion, improving safety, or ensuring sustainable mobility, TransportIQ strives to set the standard
        for next-generation transport systems.
      </p>
    </div>
    <div className="team-section">
      <h4>Meet Our Team</h4>
      <ul>
        <li>Damini Prashant Vichare</li>
        <li>Manisha Lagisetty</li>
        <li>Sweekruthi Balivada</li>
        <li>Yuting Sha</li>
      </ul>
    </div>
  </div>
);

export default AboutUs;
