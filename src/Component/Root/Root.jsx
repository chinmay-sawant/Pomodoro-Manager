/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Pomodoro } from "../Pomodoro/Pomodoro"
import './Root.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { CSVLink } from "react-csv";

export const Root = () => {
  const [pomodoros, setPomodoros] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText,setAlertText] = useState("");
  const [taskName,setTaskName] = useState("");
  const [taskDesc,setTaskDesc] = useState("");
  const [alertType,setAlertType] = useState("primary");
  // Useeffect Here
  useEffect(() => {
    const storedPomodoros = localStorage.getItem('pomodoros');
    if (storedPomodoros && !pomodoros.length) {
      setPomodoros(JSON.parse(storedPomodoros));
    }
  }, [pomodoros]); // Add pomodoros to dependency array

  // handling onClick of Add Pomodoro function 
  const maxId = pomodoros.reduce((max, pomodoro) => (pomodoro.id > max ? pomodoro.id : max), 0);

  const handleAddPomodoro = () => {
    localStorage.setItem(`pomodoroMinutes_${maxId+1}`,25);
    localStorage.setItem(`pomodoroSeconds_${maxId+1}`,0);
    const newPomodoros = [
      ...pomodoros,
      {
        id:maxId + 1,
        title: taskName !== "" ? taskName : `Task ${maxId + 1}`,
        desc: taskDesc !== "" ? taskDesc :`Task Description - ${maxId + 1}`,
        bodyCollapse: "show"
      }];
     setPomodoros(newPomodoros);
     // Accessing Items via newPomodors as the og pomodoro is 
     // getting updated async so we wll be getting old values
    // Store the updated pomodoros array in localStorage
    setAlertText(`Task ${newPomodoros.length} Added.`)
    setAlertType("primary")

    setShowAlert(true);
    // Hide the alert after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  localStorage.setItem('pomodoros', JSON.stringify(newPomodoros));
  }; // handleAddPomodoro Ends Here

// Function to remove item by title
const removeItemByTitle = (titleToRemove) => {
  const newPomodoros = pomodoros.filter(pomodoro => pomodoro.title !== titleToRemove);
  if(newPomodoros.length===0){
    setPomodoros([]);
    localStorage.removeItem('pomodoros')
  }
  else{
    setPomodoros([...newPomodoros]);    
    localStorage.setItem('pomodoros', JSON.stringify(newPomodoros));
  }
  
  
  setAlertText(`${titleToRemove} has been deleted.`)
  setShowAlert(true);
  setAlertType("danger")
};
// Remove All Pomodoro
const handleRemoveAllPomodoro = () => {
  if (pomodoros !== null) {
    setShowAlert(false);
    setAlertText(`No Tasks To Remove.`)
    setAlertType("primary")
  }
  else{
    setShowAlert(false);
    setAlertText(`All Task Have Been Removed.`)
    setAlertType("danger")
  }
  
  setShowAlert(true);
  localStorage.removeItem('pomodoros');
  setPomodoros(() => []);
  
}; // end handleRemoveAllPomodoro

 // Define headers for CSV export
 const headers = [
  { label: 'ID', key: 'id' },
  { label: 'Title', key: 'title' },
  { label: 'Description', key: 'desc' },
  { label: 'Body Collapse', key: 'bodyCollapse' },
  { label: 'Minutes', key: 'minutes' },
  { label: 'Seconds', key: 'seconds' }
];

// Define data for CSV export
const data = pomodoros.map(pomodoro => ({
  id: pomodoro.id,
  title: pomodoro.title,
  desc: pomodoro.desc,
  bodyCollapse: pomodoro.bodyCollapse,
  minutes: localStorage.getItem(`pomodoroMinutes_${pomodoro.id}`),
  seconds: localStorage.getItem(`pomodoroSeconds_${pomodoro.id}`)
}));

// Add new Pomodoro 
const addnewPomodoro = () => {
  setTaskName("");
  setTaskDesc("");
};

const handleTaskNameChange = (event) => {
  setTaskName(event.target.value)
};

const handleTaskDescChange = (event) => {
  setTaskDesc(event.target.value)
};
  return (<>
{/* <!-- Modal --> */}
<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Add A New Pomodoro</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Task Name :</label>
            <input type="text" className="form-control" id="task-name" value={taskName} onChange={handleTaskNameChange} placeholder={`Task ${maxId + 1}`}/>
          </div>
          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">Task Description :</label>
            <textarea className="form-control" id="task-description" value={taskDesc} onChange={handleTaskDescChange} placeholder={`Task Description - ${maxId + 1}`}></textarea>
          </div>
      
          
        </form>
      
      </div>
      <div className="modal-footer">
      <button onClick={handleAddPomodoro} data-bs-dismiss="modal" className="btn btn-dark">Add</button>
        <button type="button" data-bs-dismiss="modal" className="btn btn-danger">Close</button>
      </div>
    </div>
  </div>
</div>
   <div className="alert-container">
      {/* Bootstrap alert */}
      {showAlert && (
        <div className={`alert alert-${alertType} alert-dismissible fade show custom-alert`} role="alert">
          <strong>{alertText}</strong>
             <button type="button" className="close transparent-close" data-dismiss="alert" aria-label="Close" onClick={() => setShowAlert(false)}>
              <span aria-hidden="true"> ❌ </span>
            </button>
        </div>
      )}
    </div>
   <div className="container-sm">
    <button onClick={addnewPomodoro} className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add New Pomodoro</button>
    &emsp;
    <button onClick={handleRemoveAllPomodoro} className="btn btn-danger">Remove All Pomodoro</button>
    &emsp;
    <CSVLink className="btn btn-success" data={data} headers={headers} filename={"pomodoros.csv"}>
        Export to CSV
      </CSVLink>
      &emsp;
    </div>
   <br/>
   {pomodoros.map((pomodoro, index) => (
        <Pomodoro key={pomodoro.id} accordion={String(pomodoro.id)} title={pomodoro.title} desc={pomodoro.desc} bodyCollapse={pomodoro.bodyCollapse} removeItemByTitle={removeItemByTitle}/>
      ))}
  </>
  )
}
