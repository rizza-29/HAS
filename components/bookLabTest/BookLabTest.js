import React from "react";
import { useState, useEffect } from "react";
function BookLabTest({closeModal,LabTestSelected}) {
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [Gender, setGender] = useState("");
  const [sampleOption, setsampleOption] = useState("");
  const [Test, setTest] = useState("");

  const [address, setAddress] = useState({
    city: '',
    streetAddress: '',
    area: '',
  });
  const [hospitalDest, setHospitalDest] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedBookings,setSelectedBookings] = useState({
    startTime:'',
    endTime:'',
    date:'',
    slotString:''
});
const [availableBookings, setAvailableBookings ] = useState([]);
const [booked,setBooked] = useState([]);

    useEffect(()=>{
      fetch("http://localhost:3000/HAS/ReviewLabTestUniquely",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
        })
        .then(response => response.json())
        .then((data)=>{
            console.log("Lab tests", data);
            if(data.code === 200) {
                console.log("Lab tests fetched");
                setTest(data.data);
            }
            else {
                console.log("Lab tests not fetched");
            }
        }) 
        .catch((error)=>{
            console.log("error",error);
        })
  },[])

  function createTimeSlots(startTime, endTime, slotDuration, existingSlots) {
    const slots = [];
    console.log("BookedAppointments",existingSlots);
    if (!startTime && !endTime) {
        console.error("Selected slot is undefined or invalid.");
        return;
      }
    // Convert start and end times to hours and minutes
    let [startHour, startMinute] = startTime.split(':').map(Number);
    let [endHour, endMinute] = endTime.split(':').map(Number);
    
    // Loop until the start time exceeds or equals the end time
    while (startHour < endHour || (startHour === endHour && startMinute < endMinute)) {
        // Format the current start time slot
        const currentStart = `${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`;
        
        // Calculate end time for the current slot
        let tempMinute = startMinute + slotDuration;
        let tempHour = startHour;
        
        // Handle minute overflow
        if (tempMinute >= 60) {
            tempHour += Math.floor(tempMinute / 60);
            tempMinute = tempMinute % 60;
        }
        
        // Format the current end time slot
        const currentEnd = `${String(tempHour).padStart(2, '0')}:${String(tempMinute).padStart(2, '0')}`;
        
        // Add slot only if it's within the bounds of the end time
        if (tempHour < endHour || (tempHour === endHour && tempMinute <= endMinute)) {
            const slot = {
                startTime: currentStart,
                endTime: currentEnd,
                slotString: `${currentStart}-${currentEnd}`  // Added string representation
            };
            slots.push(slot);
        }

        // Increment start time for the next slot
        startMinute += slotDuration;
        if (startMinute >= 60) {
            startMinute -= 60;
            startHour += 1;
        }
    }

    // Filter out existing slots from the generated ones
    const availableSlots = slots.filter(slot => {
        return !existingSlots.some(existingSlot => 
            (existingSlot.startTime === slot.startTime && existingSlot.endTime === slot.endTime)
        );
    });
    console.log("Available slots", availableSlots);
    setAvailableBookings(availableSlots);
}
  useEffect(()=>{
    fetch("http://localhost:3000/HAS/ReviewLabTest",{
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
      })
      .then(response => response.json())
      .then((data)=>{
          console.log("Booked lab tests", data);
          if(data.code === 200) {
              console.log("Booked lab tests fetched");
              createTimeSlots("9:00","22:00",20,data.data)
          }
          else {
              console.log("Booked lab tests not fetched");
          }
      }) 
      .catch((error)=>{
          console.log("error",error);
      })
  },[Test])
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("PatientId");
    
    fetch("http://localhost:3000/HAS/CreateLabTest",{
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({userId: userId, date: selectedBookings.date, time: selectedBookings.startTime, address: address.streetAddress, city: address.city, area: address.area})
      /*name: req.body.name,
        price: req.body.price,
        sample: req.body.sample,
        userId: req.body.userId,
        attendantId: req.body.attendantId,
        date: req.body.date,
        time: req.body.time,
        address: req.body.address,
        city: req.body.city,
        area: req.body.area,
        status: req.body.status*/
      })
      .then(response => response.json())
      .then((data)=>{
          console.log("Lab tests booked", data);
          if(data.code === 200) {
              console.log("Lab tests booked");
              closeModal();
          }
          else {
              console.log("Lab tests not booked");
          }
      }) 
      .catch((error)=>{
          console.log("error",error);
      })
  };
  return (
    <div>
      <div className="container-BookLabTest">
        <h1>Book A Lab Test</h1>
        <form className="LabTest-form" onSubmit={handleSubmit}>
          <span className="input_slot">
            <label htmlFor="Name"></label>
            <input
              type="text"
              id="Name"
              placeholder="Patient Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </span>

          <span className="input_slot">
            <label htmlFor="ContactNo"></label>
            <input
              type="tel"
              id="ContactNo"
              placeholder="Enter Your Contact Number"
              value={contactNo}
              pattern="\+92[0-9]{10}"
              onChange={(e) => setContactNo(e.target.value)}
              required
            />
          </span>

          <span className="input_slot">
            <label htmlFor="Gender"></label>
            <select id="Gender" 
            value={Gender}
            onChange={(e) => setGender(e.target.value)} 
            required>
              <option value="" disabled>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </span>

          <span className="input_slot">
            <label htmlFor="Select Test"></label>
            <select
              id="Test Type"
              value={Test}
              onChange={(e) => setTest(e.target.value)}
            >
              <option value="" disabled>
                Select Test
              </option>

              <option value="cbc">Complete Blood Count (CBC)</option>
              <option value="clotting-test">Clotting Test</option>
              <option value="urinalysis">Urinalysis</option>
            </select>
          </span>

          <span className="input_slot">
            <label htmlFor="SampleCollectionMethod"></label>
            <select id="SampleCollectionMethod" 
            value={sampleOption} 
            onChange={(e) => setsampleOption(e.target.value)}
            required>
              <option value="" disabled>
                Select Sample Collection Method
              </option>
              <option value="Home">Home</option>
              <option value="Submit in Lab">Submit in Lab</option>
            </select>
          </span>
          {sampleOption === "Submit in Lab" && (
            <span className="input_slot">
              <label htmlFor="Time">Appointment Time</label>
              <select
                id="Time"
                value={selectedBookings?.slotString || "default"} // Set the current value from state or default
                onChange={(e) => {
                  const selectedSlot = availableBookings?.find(
                    (slot) => slot.slotString === e.target.value
                  ); // Find the selected slot

                  if (selectedSlot) {
                    setSelectedBookings((prev) => ({
                      ...prev,
                      slotString: selectedSlot.slotString,
                      startTime: selectedSlot.startTime,
                      endTime: selectedSlot.endTime,
                    }));
                    console.log("Time selected:", {
                      slotString: selectedSlot.slotString,
                      startTime: selectedSlot.startTime,
                      endTime: selectedSlot.endTime,
                    });
                  }
                }}
                disabled={!selectedBookings?.date || !availableBookings?.length} // Disable if no date is selected or no slots available
              >
                <option value="default" disabled>
                  Select Time
                </option>
                {availableBookings?.length > 0 ? (
                  availableBookings.map((slot, index) => (
                    <option key={index} value={slot.slotString}>
                      {slot.slotString}
                    </option>
                  ))
                ) : (
                  <option disabled>No available time slots</option>
                )}
              </select>
            </span>
          )}

          <span className="input_slot"> 
            <label htmlFor="Date">Lab Test Date</label>
            <input
                type="date"
                id="AppointmentDate"
                value={selectedBookings.date}
                onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                const today = new Date();
                
                // Remove time part from today's date for accurate comparison
                today.setHours(0, 0, 0, 0);

                if (selectedDate < today) {
                    alert("Selected date cannot be before today's date!");
                } else {
                    setSelectedBookings({ ...selectedBookings, date: e.target.value });
                }
                }}
            />
          </span>
          <span className="input_slot">
            <label htmlFor="Address"></label>
            <input
              type="text"
              id="stateAddress"
              placeholder="Address"
              value={address.streetAddress}
              onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
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
              onChange={(e) => setAddress({...address, city: e.target.value})}
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
          <button type="submit" className="bookApt-btn">
            Book LabTest
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookLabTest;
