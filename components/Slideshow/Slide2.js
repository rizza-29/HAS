import React from "react";
import './Slide2.css'
function Slide2({handleLoginClick}) {
  return (
    <div className='slide2-container'>
      <div className="slide2-info">
        <div className="slide2-info-heading-cont">
          <h1 className="slide2-info-heading">
            Manage Your Health Records Online
          </h1>
        </div>
        <div className="slide2-info-desc-cont">
          <p className="slide2-info-desc">
            keep a track of your health
          </p>
          <button onClick={handleLoginClick}>
            Login Now
          </button>
        </div>
      </div>
      <div className="slide2-img-container">
          <img src='/images/slide2-img.jpg' alt="" />
      </div>
    </div>
  );
}

export default Slide2;
