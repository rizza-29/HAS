import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './ProfileModal.css'
function ProfileModal({isProfileModalOpen,setIsLoggedIn}) {
    const navigate=useNavigate();
  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isPatientLoggedIn", "false");
    localStorage.setItem("isPatientLoggedIn", "false");
    localStorage.setItem("patientId",0);
    navigate('./');
  }
  return (
    <div>
      {isProfileModalOpen && (
              <div className="profile-modal">
                <ul>
                  <li><Link to="/patient-portal">Dashboard</Link></li>
                  <li><Link to="/profile">Edit Profile</Link></li>
                  <li><button onClick={handleLogOut}>Logout</button></li>
                </ul>
              </div>
        )}
    </div>
  )
}

export default ProfileModal
