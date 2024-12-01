import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from './-2.png';
import menuIcon from './side-nav-icon.png';

function Header({ openModal, openMenu, isMenuOpen }) {
  return (
    <div className="main_container">
      <nav className="LL-navbar">
        <div className='side-nav-icon'>
          <button onClick={openMenu}>
            <img className={`side-nv-icon-img ${isMenuOpen ? 'menu-open' : ''}`} src={menuIcon} alt="menu-icon" />
          </button>
        </div>
        <div className="logo-container">
          <Link className="home-link" to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="register-btn">
          <button onClick={openModal}>Login</button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
