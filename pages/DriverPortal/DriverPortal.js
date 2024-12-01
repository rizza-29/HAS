import React from 'react'
import './DriverPortal.css'
import { useState } from 'react';
function DriverPortal() {
    const [Bookings, setBookings] = useState([]);
    const [bookings, setbookings] = useState([]);
    const [CompBookings, setCompBookings] = useState([]);
    const [DriverInfo, setDriverInfo] = useState([]);
    const [userId, setUserId] = useState(1);
  return (
    <div>
      <div className="main-Dportal-container">
        <div className="right-container">
          <h1 className="welcome-driver">Welcome, {DriverInfo.first_name}!</h1>
          <div className="Driver-info">
            <div className="Driver-info-left-container">
              <h1 className="Driver-info-heading">Your Information</h1>
              <div className="Driver-info-content">
                <h2 className="Driver-name">Driver Name: {DriverInfo.first_name + " " + DriverInfo.last_name}</h2>
                <h2 className="DOB"> Age: {DriverInfo.age}</h2>
                <h2 className="Conact-Num"> Conact Number: {DriverInfo.phone} </h2>
              </div>
            </div>
            <div className="Driver-info-right-container">
              <h1 className="Driver-history-heading">Your History</h1>
              <div className="Driver-history-content">
                <h2 className="appointments">Rides Completed: {DriverInfo.ridesCount}</h2>
              </div>
            </div>
          </div>
          <div className="upcoming-bookings">
            <h1 className="upcoming-bookings-heading">Upcoming Bookings</h1>
            <div className="upcoming-bookings-content">
              {Bookings.length > 0 ? (
                Bookings.map((booking, index) => (
                  <div key={index} className="booking">
                    <span className="booking-Driver">
                      <h3 className="Driver-name-heading">Driver</h3>
                      <h4>{booking.DriverName}</h4>
                    </span>
                    <span className="appointment-time">
                      <h3 className="time-heading">Time</h3>
                      <h4>{booking.time}</h4>
                    </span>
                    <span className="appointment-date">
                      <h3 className="appt-date-heading">Date</h3>
                      <h4>{booking.date}</h4>
                    </span>
                    <span className="view-appointment-info">
                      <h3>Complete details</h3>
                      <button className="view-full-details">View Full Booking Details</button>
                    </span>
                  </div>
                ))
              ) : (
                <h4 className="no-upcoming-appts-heading">No Upcoming Bookings</h4>
              )}
            </div>
          </div>

          <div className="recent-bookings">
            <h1 className="recent-bookings-heading">Recent bookings</h1>
            <div className="recent-bookings-content">
              {CompBookings.length > 0 ? (
                CompBookings.map((CompBookings, index) => (
                  <div key={index} className="bookings">
                    <h4>{CompBookings.DriverName}</h4>
                    <p>{CompBookings.summary}</p>
                  </div>
                ))
              ) : (
                <h4 className="no-upcoming-appts-heading">No recent bookings</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverPortal
