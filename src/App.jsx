
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import {Routes, Route} from 'react-router-dom'
import { Root } from './Component/Root/Root';
import { Navbar } from './Component/Navbar/Navbar';
import { Pomodoro } from './Component/Pomodoro/Pomodoro';
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/Pomodoro-Manager' element={<Root/>}/>
        <Route path='/pom' element={<Pomodoro/>}/>
      </Routes>
    </>
  )
}

export default App
