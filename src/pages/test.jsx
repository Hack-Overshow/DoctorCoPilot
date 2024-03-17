import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Test() {
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://8000-hackoversho-doctorcopil-bl0n7lgytuh.ws-us110.gitpod.io/answer/', {
          question: 'Hi, I have a slight body pain after gym',
          keywords: 'gym, pain, body',
          num_results: 30
        });
        setResponseText(JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
        setResponseText('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Test">
      <h1>Response:</h1>
      <pre>{responseText}</pre>
    </div>
  );
}

export default Test;
