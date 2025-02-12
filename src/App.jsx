import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TravelBookingForm from "./Components/TravelBookingForm";
import Bookings from "./Components/Bookings"; // Import your Bookings component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TravelBookingForm />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </Router>
  );
};

export default App;
