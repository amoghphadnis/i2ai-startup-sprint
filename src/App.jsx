import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./components/header/Navbar";
import Home from "./components/HomePage/Home"
import UnicornClub from './pages/UnicornClub';

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/unicorns" element= {<UnicornClub/>} />
      </Routes>
    </>
  )
}

export default App;
