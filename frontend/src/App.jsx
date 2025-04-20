import { Route, Routes } from "react-router-dom";
import "./App.css"
import Navbar from "./components/Navbar";
import {ProjectX,Events, Leaderboard, XPRewards, CreateEvent, Login } from "./components/pages";
// import ProjectX from "./components/pages/ProjectX ";

function App() {
  return(
  <div className="App">
    <Navbar />
    <Routes>
      <Route path="/" element={<ProjectX />} />
      <Route path="/Events" element={<Events />} />
      <Route path="/Leaderboard" element={<Leaderboard />} />
      <Route path="/XPRewards" element={<XPRewards />} />
      <Route path="/CreateEvent" element={<CreateEvent />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  </div>
  ) 
}
export default App;


