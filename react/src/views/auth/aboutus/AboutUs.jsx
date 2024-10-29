import React from 'react';
import './AboutUs.scss'; // Import the CSS file
import background from "../../../assets/images/background-2.jpg";



const AboutUs = () => (
  <div className="about-us" style={{ backgroundImage: `url(${background})` }}>
    <div className="about-content">
      <h1>About Us</h1>
      <p>
    At TransportIQ, we are dedicated to revolutionizing transport management by harnessing the power of data, AI, and intelligent
    solutions. Our mission is to create a seamless, efficient, and eco-friendly transportation network that not only enhances
    commuter experiences but also optimizes road usage and promotes sustainable development. Our commitment goes beyond technology; it’s
    about building a smarter, safer, and more connected world where transportation infrastructure adapts to the needs of the people.
</p>
<p>
    Our platform leverages data analysis, machine learning, and predictive modeling to address some of the most pressing
    challenges in urban mobility and road safety. By monitoring traffic patterns, detecting potential hazards, and facilitating
    rapid response to incidents, we aim to make roads safer and more efficient for everyone. Whether it’s reducing congestion,
    minimizing environmental impact, or enhancing emergency response times, we believe that technology can transform transportation
    from a source of frustration into a driver of progress.
</p>
<p>
    Our approach is not just about deploying technology but about
    fostering partnerships that create lasting impacts. Together, we aim to set a new standard in transport management, one that
    prioritizes efficiency, sustainability, and user experience.
</p>
<p>
   Join us in building the future of transportation and more sustainable world.
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
