import React from 'react'
import { useState } from 'react'
import './Signup.css'
function Signup({closeModal,switchForm}) {

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
        const fetchSignUp = async()=> {
            fetch("http://localhost:3000/HAS/CreateUser",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({first_name: FirstName,last_name: LastName, age: Age, email: Email, password: Password, phone: PhoneNo,address: Address,gender: gender, role_id: 2})
            })
            .then(response => response.json())
            .then((data)=> {
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
            fetchSignUp();
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
            <h1>SignUp/Patient</h1>
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
                <label htmlFor="Gender"></label>
                    <select  
                    id="Gender" 
                    value={gender} 
                    onChange={(e)=>setGender(e.target.value)}>
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
                <span className="input_slot">
                    <label htmlFor="day"></label>
                    <select  
                    id="day" 
                    value={day} 
                    onChange={(e)=>setDay(e.target.value)}>
                        <option value="" disabled>Day</option>
                            {days.map((d)=>
                                (
                                    <option key={d} value={d}>{d}</option> 
                                )
                            )
                            }
                    </select>
                    <label htmlFor="Month"></label>
                    <select  
                    id="Month" 
                    value={month} 
                    onChange={(e)=>setMonth(e.target.value)}>
                        <option value="" disabled>Month</option>
                            {months.map((m,index)=>
                                (
                                    <option key={index} value={index+1}>{m}</option> 
                                )
                            )
                            }
                    </select>
                    <label htmlFor="year"></label>
                    <select  
                    id="year" 
                    value={year} 
                    onChange={(e)=>setYear(e.target.value)}>
                        <option value="" disabled >Year</option>
                            {Year.map((y)=>
                                (
                                    <option key={y} value={y}>{y}</option> 
                                )
                            )
                            }
                    </select>
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

export default Signup
