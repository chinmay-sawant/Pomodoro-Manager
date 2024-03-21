// Not In USE

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

  const [bodyCollapse, setBodyCollapse] = useState(() => {
    const storedBodyCollapse = localStorage.getItem(`pomodoroBodyCollapse_${props.accordion}`);
    return storedBodyCollapse ? storedBodyCollapse : "";
  });

  const changeBodyCollapse = () => {
    bodyCollapse=="show"?setBodyCollapse(""):setBodyCollapse("show");
  };
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
        localStorage.setItem(`pomodoroBodyCollapse_${props.accordion}`, bodyCollapse);
      }, [minutes, seconds,bodyCollapse]);
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
    <div className="accordion" id="accordionPanelsStayOpenExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-${props.accordion}`} aria-expanded="true" aria-controls={`panelsStayOpen-${props.accordion}`} onClick={changeBodyCollapse}>
      {props.title}
      </button>
    </h2>
    <div id={`panelsStayOpen-${props.accordion}`} className={`accordion-collapse collapse ${bodyCollapse}`}>
      <div className="accordion-body">
      <div className="container">
  <div className="row">
  <div className="col-4"> <p className="fs-5">{props.desc}</p></div>
  <div className="col-6"> <p className="fs-1">
         <span> {formatTime(minutes)}:{formatTime(seconds)}</span>
        </p> <br/>
          
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
      </div>
    </div>
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
