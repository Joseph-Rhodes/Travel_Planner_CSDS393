import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../AuthForm.css";


export const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        // page does not reload and lose state
        e.preventDefault();
        console.log(username);
        loginUser();
    }

    function loginUser() {
        fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username,password}),
        })

        // get the results back
        .then(async response => {
            
            // converts to readable format
            //const data = await response.json();

            if (response.status === 200) {
                navigate("/Homepage");
            } else {
                setError("Incorrect credentials. Try again")
            }
            
        })
        
        .catch(error => {
            console.log(error)
            setError("Something went wrong.");
        })
        
      }

    return (
        <div className="wrapper">
            <div className="auth-form-container">
                <h2>Login</h2>
                <span>{error}</span>
                <form className="login-form" onSubmit={handleSubmit} >
                    
                        <label htmlFor="username">Username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Enter username" id="username" name="username" required/>
                
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" id="password" name="password" required/>
                
                    
                    <button type="submit">Login</button>
                    
                </form>
                <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
            </div>
        </div>
    )
}