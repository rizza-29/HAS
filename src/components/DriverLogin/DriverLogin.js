import React from 'react'
import './DriverLogin.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function DriverLogin({closeModal,switchForm,setIsLoggedIn}) {
    const [Email,setEmail] = useState('');
    const [Password,setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("isDriverLoggedIn", "true");
        fetch("http://localhost:3000/HAS/Login",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: Email, password: Password, role_id: 4})
        })
        .then(response => response.json())
        .then((data)=>{
            console.log("Login data", data.data)
            if(data.code === 200) {
                console.log("Login succesfful")
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("driverId", data.data[0].id);
                setIsLoggedIn(true);
                closeModal();  
                navigate('/DriverPortal');
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
            <h1>Login/Driver</h1>
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
                <button type='submit' onClick={handleSubmit} className='login-submit-btn'>
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

export default DriverLogin
