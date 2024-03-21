/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const Pomodoro = (props) => {
  const [minutes, setMinutes] = useState(() => {
    const storedMinutes = localStorage.getItem(`pomodoroMinutes_${props.accordion}`);
    return storedMinutes ? parseInt(storedMinutes) : 25;
  });
  const [seconds, setSeconds] = useState(() => {
    const storedSeconds = localStorage.getItem(`pomodoroSeconds_${props.accordion}`);
    return storedSeconds ? parseInt(storedSeconds) : 0;
  });
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
          intervalId = setInterval(() => {
            if (seconds === 0) {
              if (minutes === 0) {
                setIsRunning(false);
                clearInterval(intervalId);
                setMinutes(25);
                setSeconds(0)
                // Timer ends
              } else {
                
                setMinutes(minutes => minutes - 1);
                setSeconds(59);
              }
            } else {
              setSeconds(seconds => seconds - 1);
            }
          }, 1000);
        }
        return () => clearInterval(intervalId);
      }, [isRunning, minutes, seconds]);

      useEffect(() => {
        localStorage.setItem(`pomodoroMinutes_${props.accordion}`, minutes);
        localStorage.setItem(`pomodoroSeconds_${props.accordion}`, seconds);        
      }, [minutes, seconds]);
      const startTimer = () => {
        setIsRunning(true);
      };
    
      const stopTimer = () => {
        setIsRunning(false);
      };
    
      const resetTimer = () => {
        setIsRunning(false);
        setMinutes(25);
        setSeconds(0);
      };

      const increaseMin = () => {
        setMinutes(min => min + 1);
        setSeconds(0);
      };

      const decreaseMin = () => {
        setMinutes(min => min - 1);
        setSeconds(0);
      };
    
      const formatTime = (time) => {
        return time < 10 ? `0${time}` : `${time}`;
      };

  return (
    <>
    <div className="container-sm">
    <div className="card text-bg-dark border-dark ">
    <h5 className="card-header d-flex justify-content-between align-items-center">
  {props.title}
  <div data-bs-theme="dark">
  <button type="button" className="btn-close" aria-label="Close" onClick={() => props.removeItemByTitle(props.title)}  />
  </div>
  
</h5>
  <div className="card-body">
    <h5 className="card-title">{formatTime(minutes)}:{formatTime(seconds)}</h5>
    <p className="card-text">{props.desc}</p>
       
    {!isRunning ? (
          <button onClick={startTimer} type="button" className="btn btn-success">Start</button>
        ) : (
          <button onClick={stopTimer} type="button" className="btn btn-danger">Stop</button>
        )}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={resetTimer} type="button" className="btn btn-primary">Reset</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={increaseMin} type="button" className="btn btn-dark">+</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={decreaseMin} type="button" className="btn btn-danger">-</button>
   
  </div>
</div>
  
    </div>
    <hr/>
    </>
  )
  
}

Pomodoro.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  accordion: PropTypes.string 
};

Pomodoro.defaultProps = {
  title: "Default Title",
  desc: "Default Description",
  accordion: "" 
};
