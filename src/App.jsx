
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Routes, Route} from 'react-router-dom'
import { Root } from './Component/Root/Root';
import { Navbar } from './Component/Navbar/Navbar';
import { Pomodoro } from './Component/Pomodoro/Pomodoro';
import { useEffect, useState } from 'react';
import BarChart from './Component/Chart/BarChart';
function App() {
  useEffect(() => {
    document.title = "Pomodoro Manager"; // Set your desired title here
    document.body.style.backgroundColor = 'rgb(33, 37, 41)';
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts
  
    // State to hold the JSON object
    const [jsonObject, setJsonObject] = useState();
  
  // Function to update the JSON object
  const updateJsonObject = (key, value) => {
    setJsonObject(prevState => {
      const newState = {
        ...prevState,
        [key]: value,
      };
      // Store the updated JSON object in localStorage
      localStorage.setItem('pomodoroData', JSON.stringify(newState));
      return newState;
    });
  };


  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Root updateJsonObject={updateJsonObject}/>} />
        <Route path='/Pomodoro-Manager' element={<Root updateJsonObject={updateJsonObject}/>}/>
        <Route path='/pom' element={<Pomodoro updateJsonObject={updateJsonObject}/>}/>
        {/* <Route path='/bar' element={<BarChart data={data}/>}/> */}
        <Route path='/stats' element={<BarChart jsonObject={jsonObject}/>}/>
      </Routes>
    </>
  )
}

export default App
