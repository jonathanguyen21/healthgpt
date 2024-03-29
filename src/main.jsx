import React from "react";
import ReactDOM from "react-dom/client";
import Chat from "./pages/Chat.jsx";
import Home from "./pages/Home.jsx";
import LocalDoctor from "./pages/LocalDoctor.jsx";
import Navbar from "./pages/Navbar.jsx";
import ScrollToTop from "./helpers/ScrollToTop";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/AboutUs" element={<LocalDoctor />} />
      </Routes>
    </Router>
    <Analytics />
  </React.StrictMode>
);
