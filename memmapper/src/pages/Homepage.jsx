import React from 'react'
import "../Homepage.css"
import { useAuth } from './AccountContext';
import { useNavigate } from 'react-router-dom';

function Homepage() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout();  
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
                    <button className="nav-link btnLogin-popup" onClick={handleLogoutClick}>Logout</button>
                </li>
            </ul>
        </div>
    </nav>

    <div className="containerHomepage center">
        <nav>
            <a className="mainIcon1Homepage" href="Itinerary">Plan a Trip</a>
            <a className="mainIcon2Homepage" href="Media">Media</a>
        </nav>
    </div> 

       

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script></div>
    
    )
}

export default Homepage