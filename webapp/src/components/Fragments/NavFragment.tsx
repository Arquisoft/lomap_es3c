import React from 'react'
import './NavFragment.css';
import { Link } from "react-router-dom";

export const NavFragment = () => {

  return (
    <div>
      <nav className='NavFrag'>
        <Link to='/home'><h2>Lomap es3c</h2></Link>
        <ul>
          <li>
            <Link to='/home'>Home</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
        
      </nav>
    </div>
  )

}

