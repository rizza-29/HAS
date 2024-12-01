import React from 'react'
import './DoctorPortal.css'
import { useState } from 'react';
function DoctorPortal() {
  const [appointments, setAppointments] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [DoctorInfo, setDoctorInfo] = useState([]);
  const [userId, setUserId] = useState();
  return (
    <div>
      <div className="main-pportal-container">
        <div className="right-container">
          <h1 className="welcome-doctor">Welcome, {DoctorInfo.first_name}!</h1>
          <div className="Doctor-info">
            <div className="Doctor-info-left-container">
              <h1 className="Doctor-info-heading">Your Information</h1>
              <div className="Doctor-info-content">
                <h2 className="Doctor-name">Doctor Name: {DoctorInfo.first_name + " " + DoctorInfo.last_name}</h2>
                <h2 className="DOB"> Age: {DoctorInfo.age}</h2>
                <h2 className="Conact-Num"> Conact Number: {DoctorInfo.phone} </h2>
              </div>
            </div>
            <div className="Doctor-info-right-container">
              <h1 className="Doctor-history-heading">Your History</h1>
              <div className="Doctor-history-content">
                <h2 className="appointments">Appointments: 0</h2>
                <h2 className="reports">Reports: 0</h2>
                <h2 className="Conact-Num"> </h2>
              </div>
            </div>
          </div>
          <div className="upcoming-appointments">
            <h1 className="upcoming-appointments-heading">Upcoming Appointments</h1>
            <div className="upcoming-appointments-content">
              {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                  <div key={index} className="appointment">
                    <span className="appointment-doctor">
                      <h3 className="doctor-name-heading">Doctor</h3>
                      <h4>{appointment.doctorName}</h4>
                    </span>
                    <span className="appointment-time">
                      <h3 className="time-heading">Time</h3>
                      <h4>{appointment.time}</h4>
                    </span>
                    <span className="appointment-date">
                      <h3 className="appt-date-heading">Date</h3>
                      <h4>{appointment.date}</h4>
                    </span>
                    <span className="view-appointment-info">
                      <h3>Complete details</h3>
                      <button className="view-full-details">View Appointment Details</button>
                    </span>
                  </div>
                ))
              ) : (
                <h4 className="no-upcoming-appts-heading">No upcoming appointments</h4>
              )}
            </div>
          </div>

          <div className="recent-consultations">
            <h1 className="recent-consultations-heading">Recent Consultations</h1>
            <div className="recent-consultations-content">
              {consultations.length > 0 ? (
                consultations.map((consultation, index) => (
                  <div key={index} className="consultation">
                    <h4>{consultation.doctorName}</h4>
                    <p>{consultation.summary}</p>
                  </div>
                ))
              ) : (
                <h4 className="no-upcoming-appts-heading">No recent consultations</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorPortal
