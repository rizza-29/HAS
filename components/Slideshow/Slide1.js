import React from 'react'
import './Slide1.css'
import image from './slide1-back.webp'
function Slide1({handleApptClick}) {
  return (
    <div className='slide-container'>
      <div className="slide-info">
        <div className="slide-info-heading-cont">
          <h1 className="slide-info-heading">
            WELCOME TO LIFELINE HOSPITAL
          </h1>
        </div>
        <div className="slide-info-desc-cont">
          <p className="slide-info-desc">
            The home of the most trusted doctors
          </p>
          <button onClick={handleApptClick}>
            Book An Appointment
          </button>
        </div>
      </div>
      <div className="img-container">
          <img src={image} alt="" />
      </div>
    </div>
  )
}

export default Slide1
