import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../images/logo.png";
import "../styles/Layout.css";

function Layout() {
  return (
    <div className="layout">
      {/* Top Contact Bar */}
      <div className="top-bar">
        <img src={logo} alt="Logo" className="logo" />
        <span>📞 1800-123-4567 | ✉️ support@municipality.gov.in | 🏢 Sector 12, City, India</span>
      </div>

      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-container">
          <h1>PowerConnect</h1>
          <nav>
            <NavLink to="/" end>DASHBOARD</NavLink>
            <NavLink to="/outages">ALERTS</NavLink>
            <NavLink to="/complaints">SERVICE REQUESTS</NavLink>
            <NavLink to="/visits">VISITS</NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
          <p>
            © {new Date().getFullYear()} विद्युत मंत्रालय | Ministry of Power | All Rights Reserved
            </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
