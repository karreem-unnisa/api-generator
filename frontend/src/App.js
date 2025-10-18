import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import EndpointForm from "./pages/EndpointForm";
import TryApi from "./pages/TryApi";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/endpoints" element={<EndpointForm />} />
          <Route path="/try" element={<TryApi />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
