import React, { useState, useEffect } from 'react';
import './BookAppointmentForm.css';

function BookAppointment({ closeModal, DoctorSelected }) {
    const [name, setName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [appDate, setAppDate] = useState('');
    const [appTime, setAppTime] = useState('');
    const [depts, setDepts] = useState([]);
    const [dept, setDept] = useState("");
    const [doc, setDoc] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor,setSelectedDoctor] = useState([]);
    const [selectedAppointment,setSelectedAppointment] = useState({
        startTime:'',
        endTime:'',
        date:'',
        slotString:''
    });
    const [availableTimeSlots, setAvailableTimeSlots ] = useState([]);
    const [bookedAppointments,setBookedAppointment] = useState([]);
    const availableDays = selectedDoctor ? selectedDoctor.daySlots : [];
    useEffect(()=>{
        fetch("http://localhost:3000/HAS/ReviewSpeciality",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
            })
            .then(response => response.json())
            .then((data)=>{
                console.log("Speciality data", data);
                if(data.code === 200) {
                    console.log("Speciality fetched");
                    setDepts(data.data);
                }
                else {
                    console.log("Speciality not fetches");
                }
            }) 
            .catch((error)=>{
                console.log("error",error);
            })
    },[])
    useEffect(()=>{
        if(dept!=null){
        console.log("Department",dept);
        fetch("http://localhost:3000/HAS/ReviewDoctorBySpeciality",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({speciality_name: dept})
            })
            .then(response => response.json())
            .then((data)=>{
                console.log("Doctors", data);
                if(data.code === 200) {
                    console.log("Doctors fetched");
                    setDoctors(data.data);
                }
                else {
                    console.log("Doctors not fetches");
                }
            }) 
            .catch((error)=>{
                console.log("error",error);
            })
        }
    },[dept])
    function createTimeSlots(startTime, endTime, slotDuration = 60, existingSlots) {
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
        setAvailableTimeSlots(availableSlots);
    }
    
    
    useEffect(()=>{
        if(doc){
        fetch("http://localhost:3000/HAS/ReviewAppointmentByDoctorId",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({doctor_id: selectedDoctor.id})
            })
            .then(response => response.json())
            .then((data)=>{
                console.log("Doctors", data);
                if(data.code === 200) {
                    console.log("Doctors fetched");
                    createTimeSlots(doc.start_time,doc.end_time,60,data.data);
                }
                else {
                    console.log("Doctors not fetches");
                }
            }) 
            .catch((error)=>{
                console.log("error",error);
            })
            console.log("SelectedDoctor",doc);
        }
        else{
            console.log("Doctor doesn't exist");
        }
    },[doc])
    
    const departments = [
        'Orthopedics',
        'Neurology',
        'Cardiology'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("patientId");
        console.log({
            userId: userId || 'undefined',
            docUserId: doc?.user_id || 'undefined',
            startTime: selectedAppointment?.startTime || 'undefined',
            endTime: selectedAppointment?.endTime || 'undefined',
            date: selectedAppointment?.date || 'undefined',
        });
        fetch("http://localhost:3000/HAS/CreateAppoinment",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: userId, doctor_id: doc.user_id, startTime: selectedAppointment.startTime, endTime: selectedAppointment.endTime, date: selectedAppointment.date})
            })
            .then(response => response.json())
            .then((data)=>{
                console.log("Appointment", data);
                if(data.code === 200) {
                    console.log("Appointment booked");
                }
                else {
                    alert("Appointment not booked!");
                }
            }) 
            .catch((error)=>{
                console.log("error",error);
            })

        closeModal();  
    };

    return (
        <div>
            <div className="container-Appointment" >
                <h1>Book An Appointment</h1>
                <form className="Appointment-form" onSubmit={handleSubmit}>
                    <span className="input_slot">
                        <label htmlFor="Name"></label>
                        <input
                            type="text"
                            id='Name'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </span>
                    <span className="input_slot">
                        <label htmlFor="ContactNo"></label>
                        <input
                            type="tel"
                            id='ContactNo'
                            placeholder='Enter Your Contact Number'
                            value={contactNo}
                            pattern='\+92[0-9]{10}'
                            onChange={(e) => setContactNo(e.target.value)}
                            required
                        />
                    </span>
                    <span className="input_slot">
                        <label htmlFor="Department"></label>
                        <select
                            id="Department"
                            value={dept}
                            onChange={(e) => {
                                setDept(e.target.value);
                            }}
                        >
                            <option value="" disabled>Department</option>
                            {depts && depts.length > 0 ? (
                            depts.map((d, index) => (
                                d && d.name ? ( // Ensure `d` and `d.name` are not null or undefined
                                <option key={index} value={d.name}>{d.name}</option>
                                ) : null
                            ))
                            ) : (
                            <option disabled>No departments available</option>
                            )}
                        </select>
                    </span>
                    <span className="input_slot"> 
                        <label htmlFor="Doctor">Doctor</label>
                        <select
                            id="Doctor"
                            onChange={(e) => {
                                const selectedDoctor = doctors.find(doctor => doctor.user_id == e.target.value);
                                console.log("Selected Doctor", selectedDoctor);
                                setDoc(selectedDoctor);
                            }}
                        >
                            <option value="default">Select Doctor</option> {/* Changed from empty string to 'default' */}
                            {doctors && doctors.length > 0 ? (
                                doctors.map((doctor, index) => (
                                    <option key={index} value={doctor.user_id}>
                                        {doctor.user_name}
                                    </option>
                                ))
                            ) : (
                                <option value="no-doctors" disabled>No doctors available</option>
                            )}
                        </select>
                    </span>
                    <span className="input_slot"> 
                    <label htmlFor="AppointmentDate">Appointment Date</label>
                    <input
                        type="date"
                        id="AppointmentDate"
                        value={selectedAppointment.date}
                        onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        const today = new Date();
                        
                        // Remove time part from today's date for accurate comparison
                        today.setHours(0, 0, 0, 0);

                        if (selectedDate < today) {
                            alert("Selected date cannot be before today's date!");
                        } else {
                            setSelectedAppointment({ ...selectedAppointment, date: e.target.value });
                        }
                        }}
                    />
                    </span>
                    <span className="input_slot">
                        <label htmlFor="AppointmentTime">Appointment Time</label>
                        <select
                            id="AppointmentTime"
                            value={selectedAppointment?.slotString || "default"} // Set the current value from state or default
                            onChange={(e) => {
                                const selectedSlot = availableTimeSlots?.find(
                                    (slot) => slot.slotString === e.target.value
                                ); // Find the selected slot

                                if (selectedSlot) {
                                    setSelectedAppointment((prev) => ({
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
                            disabled={!selectedAppointment?.date || !availableTimeSlots?.length} // Disable if no date is selected or no slots available
                        >
                            <option value="default" disabled>
                                Select Time
                            </option>
                            {availableTimeSlots?.length > 0 ? (
                                availableTimeSlots.map((slot, index) => (
                                    <option key={index} value={slot.slotString}>
                                        {slot.slotString}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No available time slots</option>
                            )}
                        </select>
                    </span>

                    <button type='submit' className='bookApt-btn'>
                        Book Appointment
                    </button>
                </form>
                
            </div>
        </div>
    );
}

export default BookAppointment;