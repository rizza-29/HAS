import React from 'react'
import './UpcomingAppointments.css'
import AppointmentCard from '../../components/AppointmentCard/AppointmentCard'
function UpcomingAppointments() {
    const appointments = [
        {
            name: 'Ali',
            time: '10-10:30 AM',
        },
        {
            name: 'Murtuza',
            time: '10-10:30 AM',
        },
        {
            name: 'Hamza',
            time: '10-10:30 AM',
        },
    ];
  return (
    <div className='upcoming-appts-main'>
      <h1 className="page-title">Upcoming Appointments</h1>
      <div className="appointments-grid">
        {appointments.map((appt)=>(
            <AppointmentCard patient={appt.name} appointment={appt.time} />
        ))}
      </div>
    </div>
  )
}

export default UpcomingAppointments
