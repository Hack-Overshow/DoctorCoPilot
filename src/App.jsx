import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Onboard, NotFound, Authentication, Talk } from './pages'; // Assuming your pages are in a folder named 'pages'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/talk" element={<Talk />} />
          <Route path="/onboarding" element={<Onboard />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
