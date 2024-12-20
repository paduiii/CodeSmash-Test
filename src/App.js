import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
      {currentPage === 'timer' && <TimerPage onNavigate={handleNavigate} />}
    </div>
  );
}

function LandingPage({ onNavigate }) {
  return (
    <div className="landing-page">
      <h1>Welcome to the Timer App</h1>
      <button onClick={() => onNavigate('timer')}>Start</button>
    </div>
  );
}

function TimerPage({ onNavigate }) {
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem('timer');
    return savedTime ? parseInt(savedTime, 10) : 0;
  });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime >= 30) {
            console.log('Time limit reached');
            clearInterval(interval);
            setIsRunning(false);
            return prevTime;
          }
          const newTime = prevTime + 1;
          localStorage.setItem('timer', newTime);
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    console.log('Timer started');
    setIsRunning(true);
  };

  const handlePause = () => {
    console.log('Timer paused');
    setIsRunning(false);
  };

  const handleReset = () => {
    console.log('Timer reset');
    setIsRunning(false);
    setTime(0);
    localStorage.setItem('timer', 0);
  };

  const handleClose = () => {
    console.log('Timer stopped');
    setIsRunning(false);
    onNavigate('landing');
  };

  return (
    <div className="timer-page">
      <h1>Timer : {time} seconds</h1>
      <div>
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={handlePause} disabled={!isRunning}>Pause</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default App;
