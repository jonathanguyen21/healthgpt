import React from "react";
import ReactDOM from "react-dom/client";
import Chat from "./pages/Chat.jsx";
import Home from "./pages/Home.jsx";
import LocalDoctor from "./pages/LocalDoctor.jsx";
import Navbar from "./pages/Navbar.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/DoctorsNearMe" element={<LocalDoctor />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
