import React from 'react'
import './NavFragment.css';
import { Link } from "react-router-dom";
import ImageComponent from '../Image';

export const NavFragment = () => {

  return (
    <div>
      <nav className='NavFrag'>
        <Link to='/home'>
          <ImageComponent src="/barLogo-FondoNegro.png" alt="LoMap es3c" />
        </Link>
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

