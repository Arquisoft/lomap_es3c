import React from 'react';
import './App.css';
import { Home } from './components/homeView/Home';
import { Index } from './components/indexView/Index';
import { Route, Routes, useLocation } from "react-router-dom";
import LogIn from './components/login/login';
import Map from './components/map/Map';
import { OldIndex } from './components/indexView/OldIndex';
import MapasAmigo from './components/Amigos/mapasAmigo';

function App() {

  const location = useLocation();

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Index/>} />
        <Route path='/index' element={<Index/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/login' element={<LogIn/>} />
        <Route path='/map' element={<Map/>} />
        <Route path='/amigo/:id' element={<MapasAmigo/>} />
      </Routes>
    </div>
  );
}

export default App;
