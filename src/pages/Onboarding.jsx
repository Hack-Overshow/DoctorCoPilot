import React, { useState } from 'react';
import slide from '../assets/slide.gif'; // Import the image
import chat from '../assets/chatbot.png'; // Import the image
import bot from '../assets/bot.png'; // Import the image

import { Link } from 'react-router-dom';
import doct from '../assets/doct.gif'; // Import the image

import "./main.css";

// Slide components
const Slide1 = ({ onNext }) => ( 
      <div className="flex flex-col justify-between items-center h-screen   text-white">
     
        <div className="grid grid-cols-2 gap-4">
            
        <div className=" main-container">
    
    <div className="greet-doc">
                          <p>
                              <span>Hello , Doctor </span>
                          </p>
                          <p>Get an AI assistant?</p> 
      </div></div>
          <img src={chat} alt="Placeholder Image" className="rounded-lg h-[600px]" />
        </div>
      
      
      <button onClick={onNext}  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full mb-8">
       Next      </button>
    </div>
  
);

const Slide2 = ({ onNext }) => (
    <div className="flex justify-center items-center h-screen  text-white">
    <div className="text-center">
      <img
 src={slide}        alt="Placeholder Image"
        className="mb-4  "
      />
      <button onClick={onNext} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
Next      </button>
    </div>
  </div>
);

const Slide3 = ({ onSignup }) => (

    <div className="flex justify-center items-center h-screen  text-white">
    <div className="text-center">
      <img
 src={doct}        alt="Placeholder Image"
        className="mb-4  "
      />
       <Link to="/auth" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
SignUp      </Link>
    </div>
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
