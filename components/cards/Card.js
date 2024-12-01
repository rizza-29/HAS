import React from 'react'
import './Card.css'
function Card({image,name,description,type}) {
  return (
    <div>
      <div className={`main-card-container-${type}`}>
        <div className="img-container">
            <img src={image} alt="" />
        </div>
        <div className={`desc-container-${type}`}>
            <h1 className="doc-name">{name}</h1>
            <p className="doc-spec">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
