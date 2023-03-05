import React from 'react';
import './App.css';
import LogIn from './components/login/login';
import Home from './components/home';
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Home />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
