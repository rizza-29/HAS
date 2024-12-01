import React from 'react'
import './Services.css'
function Services() {
  const services = [
    {
      name: "Emergency Room",
      image: "/images/emergency-room.jpg",
      description: '24 Hours with 11 Beds, emergency ward equipped with state-of-the-art equipment along dedicated team of qualified doctors & nursing staff to handle all medical and surgical emergencies round the clock.'
    },
    {
      name: "Clinical Laboratory",
      image: "/images/clinical-laboratory.jpg",
      description: 'Fully equipped with latest & automated analyzers to fulfill modern diagnostics requirements under the supervision of qualified pathologist and trained technicians'
    },
    {
      name: "Radiology",
      image: "/images/radiology.jpg",
      description: 'Computerized Radiography, C-Arm, Ultrasound, Mammography, Endoscopy, C.T Scan, Echo Cardiography & Flouroscopy services under the supervision of qualified radiologist and skilled technicians.' 
    },
    {
      name: "Labur Room",
      image: "/images/labour-room.jpg",
      description: 'Equipped with recently inducted and most modern 3 labour tables to cater 3 deliveries independently at a time.' 
    },
    {
      name: "Operation Rooms",
      image: "/images/operation-room.jpg",
      description: 'peration theaters equipped with latest & sophisticated equipment to perform all Gynaecology/Obstetrics, Orthopaedic, General Surgery, ENT Procedures, Neuro Surgery, Ophthalmic Surgery and Pediatrics Surgery etc.' 
    },
  ]
  return (
    <div className="services-container">
    <h1 className="page-title">Our Services</h1>
    <div className="services-grid">
      {services.map((service) => (
        <div key={service.name} className="services-card">
          <img src={service.image} alt={service.name} className="services-image" />
          <h3>{service.name}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Services
