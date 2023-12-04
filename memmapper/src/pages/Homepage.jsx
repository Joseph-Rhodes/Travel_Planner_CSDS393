import React from 'react'
import "../Homepage.css"

function Homepage(){
    const handleRegisterClick = () => {
    const wrapper = document.querySelector('.wrapper');
    wrapper.classList.add('active');
  };

  const handleLoginClick = () => {
    const wrapper = document.querySelector('.wrapper');
    wrapper.classList.remove('active');
  };

  const handlePopupClick = () => {
    const wrapper = document.querySelector('.wrapper');
    wrapper.classList.add('active-popup');
  };

  const handleIconCloseClick = () => {
    const wrapper = document.querySelector('.wrapper');
    wrapper.classList.remove('active-popup');
  };
    return(
        <div> <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{opacity: "0.75"}}>
        <a className="navbar-brand" style={{fontSize: "30px"}} href="/">MemMapper: For mapping your best memories.</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <button className="nav-link btnLogin-popup" href="#" onClick={handlePopupClick}>Login</button>
                </li>
            </ul>
        </div>
    </nav>

    <div className="container">
        <nav>
            <a className="mainIcon1" href="Itinerary">Plan a Trip</a>
            <a className="mainIcon2" href="Media">Media</a>
        </nav>
    </div> 

            <dialog id="modal" className="wrapper">
                <span className="icon-close" onClick={handleIconCloseClick}><ion-icon name="close"></ion-icon></span>
        
                
                <div className="form-box login">
                    <h2>Login</h2>
                    <form action="/auth/login" method="post">
                        <div className="input-box">
                            <span className="icon"><ion-icon name="mail"></ion-icon></span>
                            <input type="email" id="emailLogin" name="emailLogin" required/>
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                            <input type="password" id="passwordLogin" name="passwordLogin" required/>
                            <label>Password</label>
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox"/>
                            Remember me</label>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button type="submit" className="btn">Login</button>
                        <div className="login-register">
                            <p>Don't have an account? <a href="#" className="register-link" onClick={handleRegisterClick}>Register</a></p>
                        </div>
                    </form>
                </div>
        
        
                <div className="form-box register">
                    <h2>Registration</h2>
                    <form action="/auth/signup" method="post" novalidate>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="person"></ion-icon></span>
                            <input type="username" id="username" name="username" required/>
                            <label>Username</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="mail"></ion-icon></span>
                            <input type="email" id="emailRegister" name="emailRegister" required/>
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                            <input type="password" id="passwordReg" name="passwordReg" required/>
                            <label>Password</label>
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox"/>
                            I agree to the terms & conditions</label>
            
                        </div>
                        <button type="submit" className="btn">Register</button>
                        <div className="login-register">
                            <p>Already have an account? <a href="#" className="login-link" onClick={handleLoginClick}>Login</a></p>
                        </div>
                    </form>
                </div>
            </dialog>

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script></div>
    )
}

export default Homepage