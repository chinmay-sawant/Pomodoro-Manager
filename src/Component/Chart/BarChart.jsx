/* eslint-disable no-unused-vars */

import {Chart as ChartJS, defaults} from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import {Bar, Doughnut, Line} from 'react-chartjs-2'
import PropTypes from 'prop-types'
defaults.maintainAspectRatio = false;
defaults.responsive = true;

const BarChart = (props) => {
    const [labels, setLabels] = useState([]);
    const [datamin, setDataMin] = useState([]);

   useEffect(() => {
  const storedJsonObject = localStorage.getItem('pomodoroData');
  const initialJsonObject = storedJsonObject ? JSON.parse(storedJsonObject) : { key1: 'value1', key2: 'value2' };

  // console.log("BAR PROPS LOCAL STORAGE - ", initialJsonObject);
  // Alternatively, you can use Object.keys() to get an array of keys
  const keys = Object.keys(initialJsonObject);
  keys.forEach(key => {
    // console.log(initialJsonObject[key]);
    const extractedLabels = initialJsonObject[key].map(item => item.title);
    const extractedMins = initialJsonObject[key].map(item => item.totalTimeSpend);
    // console.log(extractedLabels, extractedMins);
    setLabels(extractedLabels);
    setDataMin(extractedMins);
  });
}, []); // Empty dependency array since this effect doesn't depend on any props or state
  const [barChart,setBarChart] = useState(true);
  const [doughnutChart,setDoughnutChart] = useState(false);

  const showBarGraph = () => {
    setBarChart(true);
    setDoughnutChart(false);
  };

  const showDoughnut = () => {
    setBarChart(false);
    setDoughnutChart(true);
}
  return (<>
  <div className="card text-center">
  <div className="card-header">
    <ul className="nav nav-tabs card-header-tabs">
      <li className="nav-item">
        <a className={`nav-link ${barChart === true ? 'active': ''}`} aria-current="true" onClick={showBarGraph}>Bar Chart</a>
      </li>
      <li className="nav-item">
        <a className={`nav-link ${doughnutChart === true ? 'active': ''}`} href="#" onClick={showDoughnut}>Doughnut</a>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" aria-disabled="true">Disabled</a>
      </li>
    </ul>
  </div>
  
        {
            barChart===true && 
            <div className="card-body">
            <h5 className="card-title">Bar Chart - Time Spend on Task</h5>
            <p className="card-text">
            <Bar 
            data={{
                // labels: ["A","B","C"],
                labels: labels,
                datasets: [
                //    {
                //     label:"Revenue",
                //     data: [300,600,500],
                //     backgroundColor: [
                //         "rgba(43,63,229,0.8)"
                //     ],
                //    },
                   {
                    label:"Total Time Spent On Task",
                    data: datamin,
                   },
        
                ]
            }}/>
            </p>
            </div>
        }
        {
            doughnutChart===true && 
            <div className="card-body">
            <h5 className="card-title">Doughnut Chart - Time Spend on Task</h5>
            <p className="card-text">
            <Doughnut 
            data={{
                labels: labels,
                datasets: [
                   {
                    label:"Total Time Spent On Task",
                    data: datamin,
                   },
        
                ]
            }}/>
            </p>
            </div>
        }
    
  
</div>
  
  </>
   
  );
};

BarChart.propTypes = {
  data: PropTypes.array
}

export default BarChart;
