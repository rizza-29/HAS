import React from 'react'
import Card from '../cards/Card'
import './Services.css'
import image1 from './card1.jfif'
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
  ]
  return (
    <section>
      <div className="services-home-cont">
            <h1>OUR SERVICES</h1>
            <div className="services-card-container">
                {
                  services.map((service)=>(
                    <Card image={service.image} name={service.name} description={service.description} type={'service'}/>
                  ))
                }
            </div>
            <button className='more-services'><a href="/services">MORE SERVICES</a></button>
      </div>

    </section>
  )
}

export default Services
