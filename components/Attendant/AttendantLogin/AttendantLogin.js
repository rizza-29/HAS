import React from 'react'
import './AttendantLogin.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function AttendantLogin({closeModal,switchForm,setIsLoggedIn}) {
    const [Email,setEmail] = useState('');
    const [Password,setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/HAS/Login",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: Email, password: Password, role_id: 3})
        })
        .then(response => response.json())
        .then((data)=>{
            console.log("Login data", data.data)
            if(data.code === 200) {
                console.log("Login succesfful")
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("attendantId", data.data[0].id);
                closeModal();  
                setIsLoggedIn(true);
                navigate('/LabAttendantPortal');
                localStorage.setItem("isAttendantLoggedIn", "true");
            }
            else {
                console.log("Login unsuccesful")
            }
        })
        .catch((error) => {
            console.error("Error",error)
        })
      };
  return (
    <div>
        <div className="container-LogIn">
            <h1>Login/Attendant</h1>
            <form action="" className="login-form">
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
                <button type='submit' onClick={handleSubmit}>
                    Login
                </button>
            </form>
            <div className='break-line'></div>
            <div className="switch-to-signup">
                <button onClick={switchForm}>Not a user? Sign Up</button>
            </div>
        </div>
    </div>
  )
}

export default AttendantLogin
