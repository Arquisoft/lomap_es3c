import React from 'react';
import './App.css';
import { HomePage } from './components/HomePage/HomePage';
import { Route, Routes } from "react-router-dom";
import LogIn from './components/login/login';

function App() {

  

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/login' element={<LogIn/>} />
      </Routes>
    </div>
  );
}

export default App;
