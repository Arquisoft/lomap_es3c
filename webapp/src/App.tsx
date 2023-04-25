import React from 'react';
import './App.css';
import { Home } from './components/homeView/Home';
import { Index } from './components/indexView/Index';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from './components/login/login';
import Map from './components/map/Map';
import FileNotFound from './components/Error404/FileNotFound';

export default function App(): JSX.Element {
  return (
  <Router>
    <Routes>
      <Route path='/' Component={Index} />
      <Route path='/index' Component={Index} />
      <Route path='/home' Component={Home} />
      <Route path='/login' Component={LogIn} />
      <Route path='*' Component={FileNotFound} />
    </Routes>
  </Router>
  );
}