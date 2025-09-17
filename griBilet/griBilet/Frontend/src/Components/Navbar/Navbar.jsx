import React from "react";
import "./navbar.scss";
import TicketLogo from "./tickets.png"
import { FaRegCircleUser } from "react-icons/fa6";


function Navbar() {
  return <div className="navbar">

    <div className="header-box">
      <div className="header">
        <img src={TicketLogo} alt="Ticket Logo" />
        <h1>GRIBILET</h1>
      </div>
      <div className="sign-in">
        <h3>Sign In<FaRegCircleUser className="user-icon" /></h3>
               

      </div>
    </div>




  </div>
}

export default Navbar;
