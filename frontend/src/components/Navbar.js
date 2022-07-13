import React, {useContext} from 'react'
import {Link, useNavigate} from "react-router-dom";
import noteContext from '../context/notes/noteContext';


function Navbar(){
  const navigate = useNavigate();
  const context = useContext(noteContext)
  const {showAlert} = context
  // const host = "https://writenote.herokuapp.com/";

  const handleLogout =() =>{
    localStorage.removeItem('token');
    showAlert("Logged out Successfully", 'success')
    navigate('/login');
  }
  return (
    <>
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link exact className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link exact className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link exact className="nav-link" to="/contact">Contact</Link>
            </li>
            </ul>
            <form className="d-flex" role="search">
            {!localStorage.getItem('token') ? <div>
            <Link className="btn btn-light mx-1" role="button" to="/login">Login</Link>
            <Link className="btn btn-light mx-1" role="button" to="/signup">Sign Up</Link>
            </div>:<button className="btn btn-light mx-1" onClick={handleLogout} >Logout</button>}
            </form>
        </div>
      </div>
    </nav>
    </>
    
  )
}

export default Navbar