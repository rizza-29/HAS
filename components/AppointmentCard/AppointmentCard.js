import React from 'react'
import './AppointmentCard.css'
function AppointmentCard({patient,appointment}) {
  return (
    <div>
    <div className="Appt-card-cont">
      <div className="Appointment">
        <div className="Appointment-info">
          <div className="heading-container">
            <h1 className="appt-heading">Appointment</h1>
          </div>
          <div className="info-container">
            <h3>PatientName: {patient.name}</h3>
            <h3>Appointment Timing: {appointment.time}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AppointmentCard
