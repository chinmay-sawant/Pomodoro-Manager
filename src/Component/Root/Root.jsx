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
    const newPomodoros = [
      ...pomodoros,
      {
        id:maxId + 1,
        title: `Task ${maxId + 1}`,
        desc: `Task Description - ${maxId + 1}`,
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
  setPomodoros(newPomodoros);
  localStorage.setItem('pomodoros', JSON.stringify(newPomodoros));
  setAlertText(`${titleToRemove} has been deleted.`)
  setShowAlert(true);
  setAlertType("danger")
};
// Remove All Pomodoro
const handleRemoveAllPomodoro = () => {
  setShowAlert(false);
  setAlertText(`All Task Removed.`)
  setShowAlert(true);
  localStorage.removeItem('pomodoros');
  setPomodoros(() => []);
  setAlertType("danger")
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

  return (<>
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
    <button onClick={handleAddPomodoro} className="btn btn-dark">Add New Pomodoro</button>
    &emsp;
    <button onClick={handleRemoveAllPomodoro} className="btn btn-danger">Remove All Pomodoro</button>
    &emsp;
    <CSVLink className="btn btn-success" data={data} headers={headers} filename={"pomodoros.csv"}>
        Export to CSV
      </CSVLink>
    </div>
   <br/>
   {pomodoros.map((pomodoro, index) => (
        <Pomodoro key={pomodoro.id} accordion={String(pomodoro.id)} title={pomodoro.title} desc={pomodoro.desc} bodyCollapse={pomodoro.bodyCollapse} removeItemByTitle={removeItemByTitle}/>
      ))}
  </>
  )
}
