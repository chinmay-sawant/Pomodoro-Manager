import { NavLink } from "react-router-dom"

export const Navbar = () => {
  return (<>
 <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
   
     {/* <a className="navbar-brand" href="#">Pomodoro Manager</a>  */}
     <NavLink to="/" className="navbar-brand">Pomodoro Manager</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
        <NavLink to="/Pomodoro-Manager" className="nav-link active">Home</NavLink>
        </li>
        <li className="nav-item">
        <NavLink to="/pom" className="nav-link active">Single Pomodoro</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </>
 
  )
}
