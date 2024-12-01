import React from "react";
import back from "./image2.png";
function Slide3() {
  return (
    <div>
      <div className="slide-container">
        <div className="desc-container">
          <div className="main-desc"><h1>LifeLine, The House of Doctors</h1></div>
            <div className="cta-container">
                <button>Book An Appointment Now</button>
            </div>
        </div>
        <div className="img-container">
            <img src={back} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Slide3;
