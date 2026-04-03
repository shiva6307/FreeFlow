import React, { useContext, useState } from "react";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";
import logo from '../images/srmcem_head_logo-BN0LEybD.png'; // ✅ Import logo image

const Navbar = () => {
  const userId = localStorage.getItem("userId");
  const usertype = localStorage.getItem("usertype");
  const navigate = useNavigate();
  const { logout } = useContext(GeneralContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const renderNavOptions = () => {
    if (usertype === "freelancer") {
      return (
        <>
          <button onClick={() => { closeMenu(); navigate("/freelancer"); }}>Dashboard</button>
          <button onClick={() => { closeMenu(); navigate("/all-projects"); }}>All Projects</button>
          <button onClick={() => { closeMenu(); navigate("/my-projects"); }}>My Projects</button>
          <button onClick={() => { closeMenu(); navigate("/myApplications"); }}>Applications</button>
          <button onClick={() => { closeMenu(); logout(); }}>Logout</button>
        </>
      );
    } else if (usertype === "client") {
      return (
        <>
          <button onClick={() => { closeMenu(); navigate("/client"); }}>Dashboard</button>
          <button onClick={() => { closeMenu(); navigate("/new-project"); }}>New Project</button>
          <button onClick={() => { closeMenu(); navigate("/project-applications"); }}>Applications</button>
          <button onClick={() => { closeMenu(); logout(); }}>Logout</button>
        </>
      );
    } else if (usertype === "admin") {
      return (
        <>
          <button onClick={() => { closeMenu(); navigate("/admin"); }}>Home</button>
          <button onClick={() => { closeMenu(); navigate("/all-users"); }}>All Users</button>
          <button onClick={() => { closeMenu(); navigate("/admin-projects"); }}>Projects</button>
          <button onClick={() => { closeMenu(); navigate("/admin-applications"); }}>Applications</button>
          <button onClick={() => { closeMenu(); logout(); }}>Logout</button>
        </>
      );
    }
    return null;
  };

  return (
    <div className="navbar">
      <div className="logo-container">
                <img src={logo} alt="Logo" className="navbar-logo" />
                <h3 class="navbar-title">FreeFlow-freelancing platform</h3>
              </div>
      <div className={`nav-options ${menuOpen ? "active" : ""}`}>
        {renderNavOptions()}
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default Navbar;
