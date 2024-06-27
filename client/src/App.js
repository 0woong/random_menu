import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MenuManagementPage from "./pages/MenuManagementPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuManagementPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
