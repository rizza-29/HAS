import React from 'react'
import './Card2.css'
function Card2({review,image}) {
  return (
    <div>
      <div className="main-card2-container">
        <div className="card2-img-container">
            <img src={image} alt="" />
        </div>
        <div className={`desc-container`}>
            <h2 className="cus-review">{review}</h2>
        </div>
      </div>
    </div>
    
  )
}

export default Card2
