import React, { useState, useEffect } from "react";
import "./BookAmbulance.css";
function BookAmbulance({ closeModal }) {
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [patientCondition, setPatientCondition] = useState("");
  const [emergencyType, setEmergencyType] = useState("");
  const [address, setAddress] = useState({
    city: "",
    streetAddress: "",
    area: "",
  });
  const [ambulanceID, setAmbulanceID] = useState(0);
  const [hospitalDest, setHospitalDest] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [date, setDate] = useState("");

  const handlePatientConditionChange = (e) => {
    const selectedCondition = e.target.value;
    setPatientCondition(selectedCondition);

    if (selectedCondition === "critical") {
      setIsEmergency(true);
    } else {
      setIsEmergency(false);
      setEmergencyType("");
    }
  };
  useEffect(()=>{
    if(address.city !="" && address.area!=""){
      fetch("http://localhost:3000/HAS/ReviewAmbulanceInArea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({city: address.city, area: address.area}),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Ambulance Booking", data.data);
          if (data.code === 200) {
            console.log("Ambulance Booked");
            setAmbulanceID(data.data[0].id);
          } else {
            alert("Ambulance not available in your area!");
          }
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  },[address])
  const updateAmbulanceStatus = () => {
    fetch("http://localhost:3000/HAS/UpdateAmbulance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ambulance_id: ambulanceID, booked: true }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Ambulance Status", data.data);
        if (data.code === 200) {
          console.log("Ambulance Status Changed");
        } else {
          console.log("Ambulance Status not Changed");
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/HAS/CreateAmbulanceBooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ambulance_id: ambulanceID,
        name: name,
        phone_no: contactNo,
        city: address.city,
        area: address.area,
        Address: address.streetAddress,
        condition: patientCondition,
        hospital: hospitalDest,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Ambulance Booking", data.data);
        if (data.code === 200) {
          console.log("Ambulance Booked");
          updateAmbulanceStatus();
          closeModal();
        } else {
          console.log("Ambulance not Booked");
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <div>
      <div className="container-Ambulance">
        <h1>Book An Ambulance</h1>

        <form className="Ambulance-form" onSubmit={handleSubmit}>
            <span className="input_slot">
              <label htmlFor="Name"></label>
              <input
                type="text"
                id="Name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </span>

          <span className="input_slot">
            <label htmlFor="Address"></label>
            <input
              type="text"
              id="city"
              placeholder="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              required
            />
          </span>
          <span className="input_slot">
            <label htmlFor="Address"></label>
            <input
              type="text"
              id="area"
              placeholder="Area"
              value={address.area}
              onChange={(e) => setAddress({ ...address, area: e.target.value })}
              required
            />
          </span>
          <span className="input_slot">
            <label htmlFor="Address"></label>
            <input
              type="text"
              id="Street Address"
              placeholder="Street Address"
              value={address.streetAddress}
              onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
              required
            />
          </span>
          <span className="input_slot">
            <label htmlFor="Address"></label>
            <input
              type="text"
              id="condition"
              placeholder="Patient Condition"
              value={patientCondition}
              onChange={(e) => setPatientCondition(e.target.value)}
              required
            />
          </span>
            <span className="input_slot">
              <label htmlFor="HospitalDest"></label>
              <input
                type="text"
                id="HospitalDest"
                placeholder="Preferred Hospital Destination"
                value={hospitalDest}
                onChange={(e) => setHospitalDest(e.target.value)}
                required
              />
            </span>
          <button type="submit" className="bookApt-btn">
            Book Ambulance
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookAmbulance;
