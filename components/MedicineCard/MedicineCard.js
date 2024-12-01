import React from 'react'
import './MedicineCard.css'

function MedicineCard({medicine}) {
  return (
    <>
      <div className="main-medCard-container">
        <div className="med-image-container">
          <img src={medicine.image} alt={medicine.name} />  
        </div>
        <div className="med-description">
          <h3 className="med-description-heading">
            {medicine.name}
          </h3>
          <h4 className='pharma-company'>
            {medicine.company}
          </h4>
        </div>
      </div>
    </>
  )
}

export default MedicineCard
