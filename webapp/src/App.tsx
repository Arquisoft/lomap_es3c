import React from 'react';
import './App.css';
import { Home } from './components/homeView/Home';
import { Index } from './components/indexView/Index';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LogIn from './components/login/login';
import Map from './components/map/Map';
import FileNotFound from './components/Error404/FileNotFound';

const App = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);
//<Router>
  //      <Route path='/' Component={Index} />
    //    <Route path='/index' Component={Index} />
      //  <Route path='/home' Component={Home} />
        //<Route path='/login' Component={LogIn} />
        //<Route path='*' Component={FileNotFound} />
    //</Router>
//<Route path='/map' element={<Map/>} />
//<Route path='/amigo/:id' element={<MapasAmigo/>} />
export default App;
