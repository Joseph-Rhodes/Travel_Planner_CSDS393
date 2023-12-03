import React from 'react'
import "../Itinerary.css"

function Itinerary(){
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">MemMapper</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="Itinerary">Create an Plan</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="Media">Media</a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <button className="nav-link" href="#">User</button>
                    </li>
                </ul>
            </div>
        </nav>
        <div className="container">
            <div className="form-row">
                <div className="form-group">
                    <label for="destination">Destination:</label>
                    <input type="text" id="destination" className="form-control" placeholder="Enter your Destination..."/>
                </div>
                <div className="form-group">
                    <label for="start_date">Start Date:</label>
                    <input type="date" id="start_date" className="form-control"/>
                </div>
                <div className="form-group">
                    <label for="end_date">End Date:</label>
                    <input type="date" id="end_date" className="form-control"/>
                </div>
                <div className="form-group">
                    <label for="budget">Budget($):</label>
                    <input type="number" id="budget" className="form-control" placeholder="Enter your Budget..."/>
                </div>
            </div>
            
            
            
            <div className="container">
                <ul className="nav nav-tabs nav-justified">
                    <li className="nav-item">
                        <a className="nav-link active" href="#flight_search" data-toggle="tab">Flight Search</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#hotel_search" data-toggle="tab">Hotel Search</a>
                    </li>
                </ul>
            </div>
            <div className="tab-content">
                <div className="tab-pane fade show active" id="flight_search">
                    <form>
                        
                        <form id="flight_search_form">
                            <label for="departure_city">Departure City:</label>
                            <input type="text" id="departure_city" name="departure_city" placeholder="Enter your Departing city..." required/>
                            <br/>
                            <label for="arrival_city">Arrival City:</label>
                            <input type="text" id="arrival_city" name="arrival_city" placeholder="Enter your Arrival city..." required/>
                            <br/>
                            <label>Trip Type:</label>
                            <div className="radio_buttons">
                                <input type="radio" id="round_trip" name="trip_type" value="round_trip" checked/>
                                <p for="round_trip">Round-trip</p>
                            </div>
                            <div className="radio_buttons">
                                <input type="radio" id="one_way" name="trip_type" value="one_way"/>
                                <p for="one_way">One-way</p>
                            </div>
                            <br/>
                            <label for="departure_date">Departure Date:</label>
                            <input type="date" id="departure_date" name="departure_date" required/>
                            <br/>
                            <label for="return_date">Return Date:</label>
                            <input type="date" id="return_date" name="return_date"/>
                            <br/>
                            <label for="num_passengers">Number of Passengers:</label>
                            <input type="number" id="num_passengers" name="num_passengers" placeholder="Enter the number of Passengers..." required/>
                            <br/>
                            <input type="submit" value="Search Flights"/>
                        </form>
                        
                        <div id="search_results"></div>
                    </form>
                </div>
                <div className="tab-pane fade" id="hotel_search">
                    <form>
                        
                        <form id="hotel_search_form">
                            <label for="destination">Destination:</label>
                            <input type="text" id="destination" name="destination" placeholder="Enter your Destination" required/>
                            <br/>
                            <label for="checkin_date">Check-in Date:</label>
                            <input type="date" id="checkin_date" name="checkin_date" required/>
                            <br/>
                            <label for="checkout_date">Check-out Date:</label>
                            <input type="date" id="checkout_date" name="checkout_date" required/>
                            <br/>
                            <label for="guests">Number of Guests:</label>
                            <input type="number" id="guests" name="guests" min="1" placeholder="Enter the number of Guests..." required/>
                            <br/>
                            <input type="submit" value="Search Hotels"/>
                        </form>
                    </form>
                </div>
            </div>
            
            <div className="container">
                <h2>Create Your Activity Plan</h2>
                <form id="activity_form">
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label for="activity_date">Date:</label>
                            <input type="date" className="form-control" id="activity_date" required/>
                        </div>
                        <div className="form-group col-md-3">
                            <label for="activity_time">Time:</label>
                            <input type="time" className="form-control" id="activity_time" required/>
                        </div>
                        <div className="form-group col-md-3">
                            <label for="activity_desc">Activity:</label>
                            <input type="text" className="form-control" id="activity_desc" required/>
                        </div>
                        <div className="form-group col-md-3">
                            <label for="activity_cost">Cost:</label>
                            <input type="number" className="form-control" id="activity_cost" min="0" step="0.01" required/>
                        </div>
                    </div>
                    
                    <button type="button" className="btn btn-primary" id="add_activity">Add Activity</button>
                </form>
                <br/>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Activity</th>
                            <th>Cost</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="activity_table">
                    
                    </tbody>
                </table>
                <button className="btn btn-success" tpye = "submit" id="create_plan">Create Plan</button>
            </div>
        </div>
        </div>
        )
    }

    export default Itinerary