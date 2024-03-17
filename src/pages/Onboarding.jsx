import React, { useState } from 'react';
import slide from '../assets/slide.gif'; // Import the image
import { Link } from 'react-router-dom';

// Slide components
const Slide1 = ({ onNext }) => (
  <div>
    <h1>Welcome to Doctors Copilot</h1>
    <button onClick={onNext}>Next</button>
  </div>
);

const Slide2 = ({ onNext }) => (
  <div>
    <img src={slide} alt="Slide 2" />
    <button onClick={onNext}>Next</button>
  </div>
);

const Slide3 = ({ onSignup }) => (
  <div>
    <img src="image_path_here" alt="Slide 3" />
    <Link to="/auth">Signup</Link> {/* Use Link component to navigate to /auth */}
  </div>
);

const Onboard = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const nextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const handleSignup = () => {
    // Handle signup action
  };

  return (
    <div>
      {currentSlide === 1 && <Slide1 onNext={nextSlide} />}
      {currentSlide === 2 && <Slide2 onNext={nextSlide} />}
      {currentSlide === 3 && <Slide3 onSignup={handleSignup} />}
    </div>
  );
};

export default Onboard;
