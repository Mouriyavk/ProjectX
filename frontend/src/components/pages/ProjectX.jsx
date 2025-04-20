import React from 'react'
import { Link } from "react-router-dom";
// import './ProjectX.css';
const ProjectX = () => {
  return (
    <div className='projectx-page'>
        <h1>PROJECT X</h1>
        <h3>Turning college chaos into unforgettable stories.<br/>It's not just an app-its your campus <br/>stage</h3>
        <Link to="/events" className="launch-link">Launch the Madness</Link>
        <div className='line'></div>
        <h4 className='one'>Welcome to Project X - your daily dose of unforgettable events, wild surprises,<br/>
          and student powered vibes. Create your own events or crash someone else's.<br/>
          From classroom to rooftops, it all counts</h4>
          <h4 className='two'>Rack up XP. Climb the leaderboard. Unlock crazy campus rewards. Your college
          <br/>life is now gamified. 
        </h4>
      </div>
  )
}

export default ProjectX;
