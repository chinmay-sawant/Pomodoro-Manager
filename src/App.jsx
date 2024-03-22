
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Routes, Route} from 'react-router-dom'
import { Root } from './Component/Root/Root';
import { Navbar } from './Component/Navbar/Navbar';
import { Pomodoro } from './Component/Pomodoro/Pomodoro';
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    document.title = "Pomodoro Manager"; // Set your desired title here
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Root/>}/>
        <Route path='/Pomodoro-Manager' element={<Root/>}/>
        <Route path='/pom' element={<Pomodoro/>}/>
      </Routes>
    </>
  )
}

export default App
