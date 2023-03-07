import React from 'react';
import './App.css';
import { HomePage } from './components/HomePage/HomePage';
import { Route, Routes } from "react-router-dom";
import LogIn from './components/login/login';
import TopBar from './components/TopBar';
import { Box } from '@mui/material';
import LateralMenu from './components/LateralMenu';

function App() {

  

  return (
    <>
      <TopBar></TopBar>
      <section>
        
        <LateralMenu></LateralMenu>
      </section>
      
    </>
  );
}

export default App;
