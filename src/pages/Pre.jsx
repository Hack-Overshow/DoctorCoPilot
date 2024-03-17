// Preloader.js

import React from 'react';
import logo from '../assets/logo.png'; // Import your logo image
import './Pre.css'; // You'll need to create this CSS file

const Pre = () => {
  return (
    <div className="preloader-container">
      <img src={logo} alt="Logo" className="logo" />
      <div className="preloader"></div>
    </div>
  );
};

export default Pre;
