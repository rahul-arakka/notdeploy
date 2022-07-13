import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import '../App.css'

const Login = () => {
  const context = useContext(noteContext);
  const { showAlert } = context;
  const [credential, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`https://writenote.herokuapp.com/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });

    const json = await response.json();
    // console.log(json);
    if(json.success) {
      // Save auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      showAlert("Logged in succesfully", "success");
    } else {
      showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className="formDiv">
      <h1 className="formHeading">Login to Extrapoints</h1>
      <form onSubmit={handleSubmit} id="form">
        <div className="mb-3 my-2 d-flex">
        <i className="fa-solid fa-envelope"></i>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            placeholder="Enter Your Email"
            value={credential.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3 d-flex">
        <i className="fa-solid fa-key"></i>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter Your Password"
            value={credential.password}
            onChange={onChange}
          />
        </div>
        <div className="btnlen">
          <button type="submit" className="btn btn-dark">
          Login
          </button>
        </div>
        
      </form>
    </div>
    </>
  );
};

export default Login;
