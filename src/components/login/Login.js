import React from 'react'
import './Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login({closeModal,switchForm,setIsLoggedIn}) {
    const [Email,setEmail] = useState('');
    const [Password,setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        closeModal();  
        navigate('./patient-portal');
        localStorage.setItem("isPatientLoggedIn", "true");
        setIsLoggedIn(true);
        // fetch("http://localhost:3000/HAS/Login",{
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({email: Email, password: Password, role_id: 2})
        // })
        // .then(response => response.json())
        // .then((data)=>{
        //     console.log("Login data", data.data)
        //     if(data.code === 200 && data.data && data.data.length > 0) {
        //         console.log("Login succesfful")
        //         localStorage.setItem("isLoggedIn", true);
        //         localStorage.setItem("patientId", data.data[0].id);
        //         closeModal();  
        //         navigate('./patient-portal');
        //         localStorage.setItem("isPatientLoggedIn", "true");
        //         setIsLoggedIn(true);
        //     }
        //     else {
        //         alert("Login unsuccesful")
        //     }
        // })
        // .catch((error) => {
        //     console.error("Error",error)
        // })
      };
    return (
    <div>
        <div className="container-LogIn">
            <h1>Login/Patient</h1>
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

export default Login
