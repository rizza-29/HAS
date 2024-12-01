import React, { useState } from "react";
import "./SideNavBar.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function SideNavBar({
  openModal,
  openAmbulanceModal,
  openLabTestModal,
  isMenuOpen,
  setIsMenuOpen,
  IsPatientLoggedIn,
  IsDoctorLoggedIn,
  IsAttendantLoggedIn,
  IsDriverLoggedIn,
  sidebarRef
}) {
  const [seletcedDoctor,setSelectedDoctor] = useState('');
  const navigate = useNavigate();
  const handleClick = () => {
    setIsMenuOpen(false)
  }
  const handleApptHistoryClick = (doctor) => {
    setSelectedDoctor(doctor);
    navigate('/doctor-appt-history');
  }
  return (
    <div
      className={`side-navbar-container ${isMenuOpen ? "open" : ""}`}
      ref={sidebarRef}
      style={{ display: isMenuOpen ? "block" : "none" }} 
    >
      <div className="side-nav-container">
        <nav className="side-navigation">
          <ul className="side-nav-list">
            {IsPatientLoggedIn ? (
              <>
                <li className="side-nav-list-items" onClick={openModal}>Schedule An Appointment</li>
                <li className="side-nav-list-items" onClick={openAmbulanceModal}>
                  Book An Ambulance
                </li>
                <li className="side-nav-list-items">
                  <a href="/LabTests">
                    Book A Lab Test
                  </a>
                </li>
                <li className="side-nav-list-items" >
                  Schedule A Video Call
                </li>
                <li className="side-nav-list-items" >
                  Medical History
                </li>
              </>
            ) : IsDoctorLoggedIn ? (
              <>
                <li className="side-nav-list-items" onClick={handleClick}><Link to="/doctor-portal/AppointmentsHistory">Appointments History</Link></li>
                <li className="side-nav-list-items" onClick={handleClick}><Link to="/doctor-portal/UpcomingAppointments">Upcoming Appointments</Link></li>
                <li className="side-nav-list-items" onClick={openModal}> Book An Appointment</li>
                <li className="side-nav-list-items" onClick={openAmbulanceModal}>
                  Book An Ambulance
                </li>
                
              </>
            ) : IsDriverLoggedIn ? (
              <>
                <li className="side-nav-list-items">Rides History</li>
                <li className="side-nav-list-items">Upcoming Rides</li>
              </>
            ) : IsAttendantLoggedIn ? (
              <>
                <li className="side-nav-list-items">Labtests History</li>
                <li className="side-nav-list-items">Upcoming Tests</li>
                <li className="side-nav-list-items" onClick={openModal}>LabTests</li>
                <li className="side-nav-list-items" onClick={openAmbulanceModal}>
                  Book An Ambulance
                </li>
                
              </>
            ) : 
            (
              <>
                <a href="/about"><li className="side-nav-list-items" >About Us</li></a>
                <a href="/contact"><li className="side-nav-list-items" >Contact Us</li></a>
                <li className="side-nav-list-items" onClick={openModal}> Book An Appointment</li>
                <li className="side-nav-list-items" onClick={openAmbulanceModal}>
                  Book An Ambulance
                </li>
                <li className="side-nav-list-items" >
                <a href="/LabTests">
                  Book A Lab Test
                </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SideNavBar;
