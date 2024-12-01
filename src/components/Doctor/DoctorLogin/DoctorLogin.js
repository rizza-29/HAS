import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorLogin.css'
function DoctorLogin({closeModal,switchForm,setIsLoggedIn}) {
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
            body: JSON.stringify({email: Email, password: Password, role_id: 1})
        })
        .then(response => response.json())
        .then((data)=>{
            console.log("Login data", data.data)
            if(data.code === 200) {
                console.log("Login succesfful")
                localStorage.setItem("doctorId", data.data[0].id);
                localStorage.setItem("isDoctorLoggedIn", "true")
                setIsLoggedIn(true);
                closeModal();
                navigate('./doctor-portal'); 
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
            <h1>Login/Doctor</h1>
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

export default DoctorLogin
