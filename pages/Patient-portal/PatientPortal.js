import React from "react";
import {useEffect, useState} from "react"
import "./PatientPortal.css";

function PatientPortal() {
  const [appointments, setAppointments] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [PatientInfo, setPatientInfo] = useState([]);
  const [userId, setUserId] = useState(0);
  useEffect(()=>{
    const id = Number(localStorage.getItem("patientId"));
    console.log(id, typeof id);
    setUserId(id);
    fetchInfo(id);
    fetchAppointments(id);
  },[])
  const fetchInfo = async(id) => {
    console.log("UserId",id);
    fetch("http://localhost:3000/HAS/ReviewUser",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_id: id})
    })
    .then(response => response.json())
    .then((data)=> {
      if(data.code === 200){
        console.log("PatientInfo",data);
        setPatientInfo(data.data[0]);
      }
      else {
        console.log("Patient Info not found!")
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }
  const fetchAppointments = async(id) => {
    console.log("Appointment UserId",id);
    fetch("http://localhost:3000/HAS/ReviewAppointmentByUserId",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_id: id})
    })
    .then(response => response.json())
    .then((data)=> {
      if(data.code === 200){
        console.log("Appointments: ",data);
        const currentDate = new Date();
        
        // Filter future and past appointments
        const futureAppointments = data.data.filter(appointment => new Date(appointment.aDate) > currentDate);
        const pastAppointments = data.data.filter(appointment => new Date(appointment.aDate) <= currentDate);
        
        // Set the state
        console.log("Futures appointments", futureAppointments);
        console.log("Past appointments", pastAppointments);
        setAppointments(futureAppointments);
        setConsultations(pastAppointments);
      }
      else {
        console.log("Appointments Info not found!")
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }
  let sum = appointments.length+consultations.length;
  return (
    <div>
      <div className="main-pportal-container">
        <div className="right-container">
          <h1 className="welcome-patient">Welcome, {PatientInfo.first_name}!</h1>
          <div className="patient-info">
            <div className="patient-info-left-container">
              <h1 className="patient-info-heading">Your Information</h1>
              <div className="patient-info-content">
                <h2 className="patient-name">Patient Name: {PatientInfo.first_name + " " + PatientInfo.last_name}</h2>
                <h2 className="DOB"> Age: {PatientInfo.age}</h2>
                <h2 className="Conact-Num"> Conact Number: {PatientInfo.phone} </h2>
              </div>
            </div>
            <div className="patient-info-right-container">
              <h1 className="patient-history-heading">Your History</h1>
              <div className="patient-history-content">
                <h2 className="appointments">Appointments: {sum}</h2>
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
                      <h4>{appointment.doctor_name}</h4>
                    </span>
                    <span className="appointment-time">
                      <h3 className="time-heading">Time</h3>
                      <h4>{appointment.startTime+'-'+appointment.endTime}</h4>
                    </span>
                    <span className="appointment-date">
                      <h3 className="appt-date-heading">Date</h3>
                      <h4>{appointment.aDate}</h4>
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
            {console.log("Consulations",consultations)}
            <div className="recent-consultations-content">
              {consultations.length > 0 ? (
                consultations.map((consultation, index) => (
                  <div key={index} className="consultation">
                    <h4>{consultation.doctor_name}</h4>
                    <p>{consultation.aDate}</p>
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
  );
}

export default PatientPortal;
