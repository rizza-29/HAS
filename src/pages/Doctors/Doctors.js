import React from 'react'
import AppointmentModal from '../../components/AppointmentModal/AppointmentModal';
import { useState } from 'react';
import BookAppointment from '../../components/BookAppointmentForm/BookAppointmentForm';
import './Doctors.css'

function Doctors() {
    const [IsAppointmentModalOpen,setIsAppointmentModalOpen] = useState(false);
    const [selectedDoctor,setSelectedDoctor]=useState('');
    const handleAppointmentClick=(doctor)=>{
        setIsAppointmentModalOpen(true);
        setSelectedDoctor(doctor);
    }
    const CloseModal = () => {
        setIsAppointmentModalOpen(false);
    }
    const doctorsData = [
        {
          id: 1,
          name: "Dr. Sarah Khan",
          specialty: "Cardiologist",
          image: "/images/doctor1.jfif",
          contact: "sarah.khan@lifeline.com",
        },
        {
          id: 2,
          name: "Dr. Ahmed Ali",
          specialty: "Neurologist",
          image: "/images/doctor2.jfif",
          contact: "ahmed.ali@lifeline.com",
        },
        {
          id: 3,
          name: "Dr. Maria Sheikh",
          specialty: "Pediatrician",
          image: "/images/doctor1.jfif",
          contact: "maria.sheikh@lifeline.com",
        },
        {
          id: 4,
          name: "Dr. Omar Farooq",
          specialty: "Orthopedic Surgeon",
          image: "/images/doctor3.jfif",
          contact: "omar.farooq@lifeline.com",
        },
      ];
  return (
    <div className="doctors-container">
      <h1 className="page-title">Our Doctors</h1>
      <div className="doctors-grid">
        {doctorsData.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img src={doctor.image} alt={doctor.name} className="doctor-image" />
            <h3>{doctor.name}</h3>
            <p>{doctor.specialty}</p>
            <button onClick={()=>handleAppointmentClick(doctor)} className="contact-link">
              Book Appointment
            </button>
          </div>
        ))}
      </div>
      <AppointmentModal
          isOpen={IsAppointmentModalOpen}
          closeModal={CloseModal}
        >
          <BookAppointment closeModal={CloseModal} DoctorSelected={selectedDoctor}/>
      </AppointmentModal>
      
    </div>
    
  )
}

export default Doctors
