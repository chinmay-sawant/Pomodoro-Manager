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
    const [pomodorosSets,setPomodorosSets] = useState("1");

    useEffect(() => {
      // Retrieve the value from localStorage
      const storedValue = localStorage.getItem(`pomodoroSets_${props.accordion}`);
      if (storedValue) {
        // If the value exists in localStorage, parse it and set pomodorosSets
        setPomodorosSets(storedValue);
      } else {
        // If the value doesn't exist in localStorage, set it to the default value (1)
        localStorage.setItem(`pomodoroSets_${props.accordion}`, pomodorosSets);
      }
    }, [pomodorosSets,props.accordion]); // Ensure this effect runs when props.accordion changes
  
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
                localStorage.setItem(`pomodoroSets_${props.accordion}`, (parseInt(pomodorosSets)+1).toString());
                setPomodorosSets((prev => parseInt(prev)+1).toString())
                
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
      }, [isRunning, minutes, seconds,props.accordion,pomodorosSets]);

      useEffect(() => {
        localStorage.setItem(`pomodoroMinutes_${props.accordion}`, minutes);
        localStorage.setItem(`pomodoroSeconds_${props.accordion}`, seconds);        
      }, [minutes, seconds,props.accordion]);
      const startTimer = () => {
        setIsRunning(true);
      };
    
      const stopTimer = () => {
        setIsRunning(false);
        localStorage.setItem(`pomodoroMinutes_${props.accordion}`, minutes);
        localStorage.setItem(`pomodoroSeconds_${props.accordion}`, seconds); 
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
        if(minutes>0){
          setMinutes(min => min - 1);
          setSeconds(0);
        }
        else{
          setMinutes(0);
          setSeconds(0);
        }
        
      };
    
      const formatTime = (time) => {
        return time < 10 ? `0${time}` : `${time}`;
      };

  return (
    <>
    <div className="container-sm">
      <br/>
    {/* <div className="card text-bg-dark border-dark "> */}
    <div className={`card ${isRunning ? 'text-bg-success' : 'text-bg-dark  border-light '}`}>
    <h5 className="card-header d-flex justify-content-between align-items-center">
  {props.title}
  <div data-bs-theme="dark">
  <button type="button" className="btn-close" aria-label="Close" onClick={() => props.removeItemByTitle(props.title)}  />
  </div>
  
</h5>
  <div className="card-body">
    <h1 className="card-title" style={{ fontSize: '100px',  textAlign: 'center'}}>{formatTime(minutes)}:{formatTime(seconds)}</h1>
    <p className="card-text" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{props.desc}</p>
    <br/>
    <p className="card-text" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Current Set: {pomodorosSets}</p>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

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
<br/>
<hr style={{ width: '50%', margin: '0 auto', borderColor: 'white' }} />

    </div>
  
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
