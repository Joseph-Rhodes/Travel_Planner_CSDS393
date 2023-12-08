import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        // page does not reload and lose state
        e.preventDefault();
        
        registerUser();
    }

    function registerUser() {
        fetch('http://localhost:3001/register', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username, email, password}),
        })

        // get the results back
        .then(async response => {
            if (response.status === 200) {
                setError("Succesfully registered. Proceed to login.");
            } else if (response.status === 400) {
                setError("Username already exists. Try again.");
            } else {
                setError("Something bad happened.")
            }
        })
        
        .catch(error => {
            setError("Something went wrong.");
        })
        
      }


    return (
        <div className="wrapper">
            <div className="auth-form-container">
                <h2>Register</h2>
                <span>{error}</span>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Enter username" id="username" name="username" required/>

                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" id="email" name="email" required/>

                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" id="password" name="password" required/>

                    <button type="submit">Register</button>
                   
                </form>
                <button className="link-btn" onClick={() => navigate("/")}>Already have an account? Login here.</button>
            </div>
        </div>
    )
}

//  )
