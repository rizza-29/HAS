import React from 'react'
import './DoctorSignUp.css'
import { useState, useEffect } from 'react';
function DoctorSignUp({closeModal,switchForm}) {
        const [FirstName,setFirstName]=useState('');
        const [LastName,setLastName]=useState('');
        const [Email,setEmail]=useState('');
        const [Password,setPassword]=useState('');
        const [Address,setAddress]=useState('');
        const [PhoneNo,setPhoneNo]=useState('');
        const [gender,setGender]=useState('');
        const [confirmPassword,setconfirmPassword]=useState('');
        const [Age,setAge]=useState();
        const [day,setDay]=useState('');
        const [month,setMonth]=useState('');
        const [year,setYear]=useState('');
        const [qualification,setQualification]=useState('');
        const [startTime, setStartTime] = useState("");
        const [endTime, setEndTime] = useState("");
        const [speciality, setSpeciality] = useState([]);
        const [specialityId, setSpecialityId] = useState(-1);
        const [experince,setExperince]=useState('');
        const [DoctorID, setDoctorID] = useState(0);
        const fetchSpeciality = () => {
            fetch("http://localhost:3000/HAS/ReviewSpeciality",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            .then(response => response.json())
            .then((data)=> {
                console.log("Speciality data", data.data);
                if(data.code === 200) {
                    console.log("Data fetched successfully!")
                    setSpeciality(data.data);
                }
                else {
                    console.log("Data not fetched successfully!")
                }
            })
            .catch((error)=> {
                console.log("Error",error)
            })
        }
        useEffect(()=>{
            fetchSpeciality();
        },[])
        const SignUpAsDoctor = ()=> {
            fetch("http://localhost:3000/HAS/CreateDoctor",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user_id: DoctorID, qualification: qualification, experince: experince, speciality_id: specialityId, start_time: startTime, end_time: endTime})
            })
            .then(response => response.json())
            .then((data)=> {
                console.log("Doctor Sign Up", data);
                if(data.code === 200) {
                    console.log("User Signed up successfully!")
                    closeModal();  
                }
                else {
                    console.log("User not signed up !")
                }
            })
            .catch((error)=> {
                console.log("Error",error)
            })
        }
        useEffect (()=>{
            SignUpAsDoctor()
        },[DoctorID])
        const SignUp = async()=> {
            console.log("speciality",specialityId);
            fetch("http://localhost:3000/HAS/CreateUser",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({first_name: FirstName,last_name: LastName, age: Age, email: Email, password: Password, phone: PhoneNo,address: Address,gender: gender, role_id: 2})
            })
            .then(response => response.json())
            .then((data)=> {
                console.log("User Sign Up", data.data[0].id);
                if(data.code === 200) {
                    console.log("User Signed up successfully!")
                    setDoctorID(data.data[0].id)
                }
                else {
                    console.log("User not signed up !")
                }
            })
            .catch((error)=> {
                console.log("Error",error)
            })
        }
        const handleSubmit = (e) => {
            e.preventDefault();
            const hasCapital=/[A-Z]/.test(Password);
            const hasNum=/[0-9]/.test(Password);
            if(Password===confirmPassword){
                if(hasCapital===true && hasNum===true){

                }
                else{
                    alert('password must have a number and an uppercase letter');
                }
            }
            else{
                alert('password and confirmed password do not match!');
            }
            SignUp();
          };
          const days=Array.from({length:31},(_,i)=>i+1);
          const currentYear=new Date().getFullYear();
          const Year=Array.from({length:currentYear-1970+1},(_,i)=>currentYear-i);
          const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ];
  return (
    <div>
        <div className="container-SignUp">
            <h1>SignUp/Doctor</h1>
            <form action="" className="signup-form">
                <span className="input_slot">
                    <label htmlFor="firstName"></label>
                    <input 
                    type="text"
                    id='firstname'
                    placeholder='First Name'
                    value={FirstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                    required
                    />
                </span>
                <span className="input_slot">
                    <label htmlFor="LastName"></label>
                    <input 
                    type="text"
                    id='LastName'
                    placeholder='Last Name'
                    value={LastName}
                    onChange={(e)=>setLastName(e.target.value)}
                    required
                    />
                </span>
                <span className="input_slot">
                    <label htmlFor="Last Name"></label>
                    <input 
                    type="Address"
                    id='address'
                    placeholder='Address'
                    value={Address}
                    onChange={(e)=>setAddress(e.target.value)}
                    required
                    />
                </span>
                <span className="input_slot">
                    <label htmlFor="Last Name"></label>
                    <input 
                    type="PhoneNo"
                    id='phone'
                    placeholder='Phone Number'
                    value={PhoneNo}
                    onChange={(e)=>setPhoneNo(e.target.value)}
                    required
                    />
                </span>
                <span className="input_slot">
                    <label htmlFor="Last Name"></label>
                    <input 
                    type="Age"
                    id='age'
                    placeholder='Age'
                    value={Age}
                    onChange={(e)=>setAge(e.target.value)}
                    required
                    />
                </span>
                <span className="input_slot">
                    <label htmlFor="email"></label>
                    <input 
                    type="experince"
                    id='experince'
                    placeholder='Experince'
                    value={experince}
                    onChange={(e)=>setExperince(e.target.value)}
                    required
                    />
                </span>
                <span className="input_slot">
                    <label htmlFor="email"></label>
                    <input 
                    type="qualification"
                    id='qualification'
                    placeholder='Qualification'
                    value={qualification}
                    onChange={(e)=>setQualification(e.target.value)}
                    required
                    />
                </span>
                <span className="input_slot">
                <label htmlFor="Gender"></label>
                    <select  
                    id="speciality"
                    value={specialityId} 
                    onChange={(e)=>setSpecialityId(e.target.value)}
                    required>
                        <option value={-1} disabled>Speciality</option>
                        {speciality.map((data) => (
                            <option key={data.id} value={data.id}>
                                {data.name}
                            </option>
                        ))}
                    </select>
                </span>
                <span className="input_slot">
                <label htmlFor="Gender"></label>
                    <select  
                    id="Gender" 
                    value={gender} 
                    onChange={(e)=>setGender(e.target.value)}
                    required>
                        <option value="" disabled>Gender</option>
                        <option value={"M"}>Male</option>
                        <option value={"F"}>Female</option>  
                    </select>
                </span>
                <span className="input_slot">
                    <label htmlFor="email"></label>
                    <input 
                    type="email"
                    id='email'
                    placeholder='Email'
                    value={Email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    />
                </span>
                <span className="input_slot">
                    <label htmlFor="email"></label>
                    <input 
                    type="qualification"
                    id='qualification'
                    placeholder='Qualification'
                    value={qualification}
                    onChange={(e)=>setQualification(e.target.value)}
                    required
                    />
                </span>
                <span className="input_slot">
                    <label htmlFor="timer">Appointments start time</label>
                    <input 
                        type="time" 
                        id="timer" 
                        value={startTime} 
                        onChange={(e) => setStartTime(e.target.value)} 
                        required 
                    />
                </span>
                <span className="input_slot">
                    <label htmlFor="timer">Appointments end time</label>
                    <input 
                        type="time" 
                        id="timer"
                        value={endTime} 
                        onChange={(e) => setEndTime(e.target.value)} 
                        required 
                    />
                </span>
                <span className="input_slot">
                    <label htmlFor="password"></label>
                    <input 
                    type="password"
                    id='password'
                    value={Password}
                    placeholder='Password'
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    />
                </span>
                <span className="input_slot">
                    <label htmlFor="confirmpassword"></label>
                    <input 
                    type="password"
                    id='confirmPassword'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e)=>setconfirmPassword(e.target.value)}
                    required
                    />
                </span>
                <button type='submit' onClick={handleSubmit} className='signup-btn'>
                    Sign Up
                </button>
            </form>
            <div className='break-line'></div>
            <div className="switch-to-login">
                <button onClick={switchForm}>Already A user? Sign  In</button>
            </div>
        </div>
    </div>
  )
}

export default DoctorSignUp
