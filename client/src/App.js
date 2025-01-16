import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard"; // Import the Dashboard component
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Google Sign-up */}
        <Route exact path="/" element={<Header />} />

        {/* Route for Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
