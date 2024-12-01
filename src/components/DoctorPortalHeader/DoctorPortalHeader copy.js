import React from "react";
import './DoctorPortalHeader.css'
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import logo from '/public/images/-2.png'
import navIcon from '/public/images/side-nav-icon.png'
import profilepic from '/public/images/blue-profile-icon-free-png.png'
import ProfileModal from '../ProfileModal/ProfileModal';
function DoctorPortalHeader({openModal, openMenu, isMenuOpen,setIsLoggedIn}) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };
  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };
  return (
    <div>
      <div className="main_container">
        <nav className="LL-navbar">
          <div className="side-nav-icon">
            <button onClick={openMenu}>
              <img
                className={`side-nv-icon-img ${isMenuOpen ? "menu-open" : ""}`}
                src={navIcon}
                alt="menu-icon"
              />
            </button>
          </div>
          <div className="logo-container">
            <Link className="home-link" to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div
            className="register-btn"
            onMouseEnter={openProfileModal}
            onMouseLeave={closeProfileModal}
          >
            <button className="account-btn">
              <img className="profile-pic" src={profilepic} alt="" />
            </button>
            <ProfileModal
              isProfileModalOpen={isProfileModalOpen}
              setIsLoggedIn={setIsLoggedIn}
            />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default DoctorPortalHeader;
