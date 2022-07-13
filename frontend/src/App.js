import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';

function App() {
  
  return (
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert/>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/about" element={ <About/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/signup" element={ <Signup/>}/>
    </Routes>
  </BrowserRouter>
  </NoteState>
  );
}

export default App;
