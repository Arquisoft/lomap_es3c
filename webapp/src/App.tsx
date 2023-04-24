import React from 'react';
import './App.css';
import { Home } from './components/homeView/Home';
import { Index } from './components/indexView/Index';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from './components/login/login';
import FileNotFound from './components/Error404/FileNotFound';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/index' element={<Index />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='*' element={<FileNotFound />} />
      </Routes>
    </div>
  );
}
//<Route path='/map' element={<Map/>} />
//<Route path='/amigo/:id' element={<MapasAmigo/>} />
export default App;
