import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { RadialGauge } from 'react-canvas-gauges';

const socket = io('http://localhost:3001');

const Speedometer = () => {
  const [speed, setSpeed] = useState(0);
  const [isGeneratingData, setIsGeneratingData] = useState(false);

  useEffect(() => {
    let intervalId;
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/speed-data');
        const latestSpeed = response.data[response.data.length - 1]?.speed || 0;
        setSpeed(latestSpeed);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    if (isGeneratingData) {
      intervalId = setInterval(fetchData, 1000);
    } else {
      clearInterval(intervalId);
      setSpeed(0);
    }
  
    socket.on('newData', (newData) => {
      if (isGeneratingData) {
        setSpeed(newData.speed);
      }
    });
  
    return () => {
      clearInterval(intervalId);
      socket.off('newData');
    };
  }, [isGeneratingData ? isGeneratingData : null]); 
  const handleToggle = () => {
    setIsGeneratingData((isGeneratingData) => !isGeneratingData);
  };

  return (
    <div>
      <h1>Speedometer</h1>
      <RadialGauge
        width={400}
        height={400}
        units="km/h"
        title="Speed"
        value={speed}
        minValue={0}
        maxValue={100}
        animate={true}
      />

      <div>
        <button onClick={handleToggle}>{isGeneratingData ? 'Stop' : 'Start'}</button>
      </div>
    </div>
  );
};

export default Speedometer;

