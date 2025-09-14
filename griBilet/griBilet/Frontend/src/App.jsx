import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import LogIn from "./pages/LogIn/LogIn.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import TicketInfo from "./pages/TicketInfo/TicketInfo.jsx";
import "./styles/global.scss";


import Home from "./pages/Home/Home.jsx";


export default function App() {
  return (
    <BrowserRouter>
      
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/ticketinfo" element={<TicketInfo />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
