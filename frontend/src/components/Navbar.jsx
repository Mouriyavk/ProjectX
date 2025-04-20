import React from 'react'
import{ Link, NavLink } from "react-router-dom"
import "./Navbar.css";
export const Navbar = () => {
  return <nav>
    <Link to="/" className='title'>Project X</Link>
    {/* <div className='menu'>
      <span></span>
      <span></span>
      <span></span>
    </div> */}
    <ul>
        <li>
          <NavLink to="/Events">Events</NavLink>
        </li>
        <li>
          <NavLink to= "/Leaderboard">Leaderboard</NavLink>
        </li>
        <li>
          <NavLink to="/XPRewards" >XP Rewards</NavLink>
        </li>
        <li>
          <NavLink to="/CreateEvent">Create Event</NavLink>
        </li>
        <li>
          <NavLink to="/Login">Login</NavLink>
        </li>
    </ul>
  </nav>
  
}

export default Navbar;
