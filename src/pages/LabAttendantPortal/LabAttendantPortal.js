import React from 'react'
import './LabAttendantPortal.css'
import { useState } from 'react';
function LabAttendantPortal() {
    const [Patients, setPatients] = useState([]);
    const [CompPatients, setCompPatients] = useState([]);
    const [AttendantInfo, setAttendantInfo] = useState([]);
    const [userId, setUserId] = useState(1);
  return (
    <div>
      <div className="main-Aportal-container">
        <div className="right-container">
          <h1 className="welcome-Attendant">Welcome, {AttendantInfo.first_name}!</h1>
          <div className="Attendant-info">
            <div className="Attendant-info-left-container">
              <h1 className="Attendant-info-heading">Your Information</h1>
              <div className="Attendant-info-content">
                <h2 className="Attendant-name">Attendant Name: {AttendantInfo.first_name + " " + AttendantInfo.last_name}</h2>
                <h2 className="DOB"> Age: {AttendantInfo.age}</h2>
                <h2 className="Conact-Num"> Conact Number: {AttendantInfo.phone} </h2>
              </div>
            </div>
            <div className="Attendant-info-right-container">
              <h1 className="Attendant-history-heading">Your History</h1>
              <div className="Attendant-history-content">
                <h2 className="Patients">Rides Completed: {AttendantInfo.ridesCount}</h2>
              </div>
            </div>
          </div>
          <div className="upcoming-patients">
            <h1 className="upcoming-patients-heading">Upcoming Patients</h1>
            <div className="upcoming-patients-content">
              {Patients.length > 0 ? (
                Patients.map((patient, index) => (
                  <div key={index} className="patient">
                    <span className="booking-Attendant">
                      <h3 className="Attendant-name-heading">Attendant</h3>
                      <h4>{patient.AttendantName}</h4>
                    </span>
                    <span className="patient-room">
                      <h3 className="time-heading">Time</h3>
                      <h4>{patient.room}</h4>
                    </span>
                    <span className="patient-admit-date">
                      <h3 className="appt-date-heading">Date</h3>
                      <h4>{patient.AdmitDate}</h4>
                    </span>
                    <span className="patient-discharge-date">
                      <h3 className="appt-date-heading">Date</h3>
                      <h4>{patient.DischargeDate}</h4>
                    </span>
                    <span className="view-Patient-info">
                      <h3>Complete details</h3>
                      <button className="view-full-details">View Full Patient Details</button>
                    </span>
                  </div>
                ))
              ) : (
                <h4 className="no-upcoming-appts-heading">No Upcoming Patients</h4>
              )}
            </div>
          </div>

          <div className="recent-Patients">
            <h1 className="recent-Patients-heading">Recent Patients</h1>
            <div className="recent-Patients-content">
              {CompPatients.length > 0 ? (
                CompPatients.map((CompPatients, index) => (
                  <div key={index} className="Patients">
                    <h4>{CompPatients.AttendantName}</h4>
                    <p>{CompPatients.summary}</p>
                  </div>
                ))
              ) : (
                <h4 className="no-upcoming-appts-heading">No recent Patients</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LabAttendantPortal
