import React from "react";
import "./PharmacyCard.css";
function PharmacyCard({ medicines, doctorName, patientName, cost }) {
  return (
    <div>
      <div className="pharmacy-card-cont">
        <div className="prescription">
          <div className="prescription-info">
            <div className="heading-container">
              <h1 className="medicine-heading">Medicines</h1>
            </div>
            <div className="info-container">
              {medicines.slice(0, 3).map((medicine, index) => (
                <div className="medicine-info-cont" key={index}>
                  <h1 className="medicine-name">{medicine.name}</h1>
                  <h1 className="medicine-price">{medicine.price}</h1>
                </div>
              ))}
            </div>
          </div>
          <div className="doctor-info">
            <h1 className="Information-heading">Information</h1>
            <h3 className="doctor-name">Prescribed by: {doctorName}</h3>
            <h3 className="patientName">Prescribed To: {patientName}</h3>
          </div>
          <div className="full-prescription">
            <button className="view-full-pre">View Full Prescription</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PharmacyCard;
