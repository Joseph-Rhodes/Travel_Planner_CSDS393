
import "../Itinerary.css"
import React, { useState, useEffect } from 'react';


function Itinerary(){
    
        // State to manage input values
        const [activityDate, setActivityDate] = useState('');
        const [activityTime, setActivityTime] = useState('');
        const [activityDesc, setActivityDesc] = useState('');
        const [activityCost, setActivityCost] = useState('');
        
        // State for flight type
        const [tripType, setTripType] = useState('round_trip');
      
        // State to manage activity table rows
        const [activityRows, setActivityRows] = useState([]);
      
        // Function to convert military time to 12-hour time
        const convertTo12Hour = (time) => {
          const timeArray = time.split(':');
          let hours = timeArray[0];
          const minutes = timeArray[1];
          const amPm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12 || 12; // the hour '0' should be '12'
          return `${hours}:${minutes} ${amPm}`;
        };
      
        // Function to handle adding a new activity
        const handleAddActivity = () => {
          // Convert military time to 12-hour time
          const formattedTime = convertTo12Hour(activityTime);
      
          // Create new row
          const newRow = {
            date: activityDate,
            time: formattedTime,
            desc: activityDesc,
            cost: activityCost,
          };
      
          // Update activityRows state
          setActivityRows((prevRows) => [...prevRows, newRow]);
      
          // Clear input fields
          setActivityDate('');
          setActivityTime('');
          setActivityDesc('');
          setActivityCost('');
        };
      
        // Function to handle deleting an activity
        const handleDeleteActivity = (index) => {
          // Create a copy of the array and remove the specified index
          const updatedRows = [...activityRows];
          updatedRows.splice(index, 1);
      
          // Update activityRows state
          setActivityRows(updatedRows);

          
        
        };
        useEffect(() => {
            const flightSearchForm = document.getElementById('flight_search_form');
        
            if (flightSearchForm) {
              const handleFlightSearchFormChange = () => {
                const isOneWay = document.getElementById('one_way').checked;
                document.getElementById('return_date').disabled = isOneWay;
              };
        
              flightSearchForm.addEventListener('change', handleFlightSearchFormChange);
        
              return () => {
                // Cleanup: Remove the event listener when the component is unmounted
                flightSearchForm.removeEventListener('change', handleFlightSearchFormChange);
              };
            }
          }, []); // Empty dependency array to ensure the effect runs once after the initial render
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
                        <a className="nav-link" href="Homepage">Home</a>
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
                    <label htmlFor="destination">Destination:</label>
                    <input type="text" id="destination" className="form-control" placeholder="Enter your Destination..."/>
                </div>
                <div className="form-group">
                    <label htmlFor="start_date">Start Date:</label>
                    <input type="date" id="start_date" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="end_date">End Date:</label>
                    <input type="date" id="end_date" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="budget">Budget($):</label>
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
                   
                        
                        <form id="flight_search_form">
                            <label htmlFor="departure_city">Departure City:</label>
                            <input type="text" id="departure_city" name="departure_city" placeholder="Enter your Departing city..." required/>
                            <br/>
                            <label htmlFor="arrival_city">Arrival City:</label>
                            <input type="text" id="arrival_city" name="arrival_city" placeholder="Enter your Arrival city..." required/>
                            <br/>
                            <label>Trip Type:</label>
                            <div className="radio_buttons">
                                <input type="radio" id="round_trip" name="trip_type" value="round_trip" checked={tripType === "round_trip"} onChange={() => setTripType('round_trip')}/>
                                <p htmlFor="round_trip">Round-trip</p>
                            </div>
                            <div className="radio_buttons">
                                <input type="radio" id="one_way" name="trip_type" value="one_way" checked={tripType === "one_way"} onChange={() => setTripType('one_way')}/>
                                <p htmlFor="one_way">One-way</p>
                            </div>
                            <br/>
                            <label htmlFor="departure_date">Departure Date:</label>
                            <input type="date" id="departure_date" name="departure_date" required/>
                            <br/>
                            <label htmlFor="return_date">Return Date:</label>
                            <input type="date" id="return_date" name="return_date"/>
                            <br/>
                            <label htmlFor="num_passengers">Number of Passengers:</label>
                            <input type="number" id="num_passengers" name="num_passengers" placeholder="Enter the number of Passengers..." required/>
                            <br/>
                            <input type="submit" value="Search Flights"/>
                        </form>
                        
                        <div id="search_results"></div>
                    
                </div>
                <div className="tab-pane fade" id="hotel_search">
                   
                        
                        <form id="hotel_search_form">
                            <label htmlFor="destination">Destination:</label>
                            <input type="text" id="destination" name="destination" placeholder="Enter your Destination" required/>
                            <br/>
                            <label htmlFor="checkin_date">Check-in Date:</label>
                            <input type="date" id="checkin_date" name="checkin_date" required/>
                            <br/>
                            <label htmlFor="checkout_date">Check-out Date:</label>
                            <input type="date" id="checkout_date" name="checkout_date" required/>
                            <br/>
                            <label htmlFor="guests">Number of Guests:</label>
                            <input type="number" id="guests" name="guests" min="1" placeholder="Enter the number of Guests..." required/>
                            <br/>
                            <input type="submit" value="Search Hotels"/>
                        </form>
                    
                </div>
            </div>
            
            <div className="container">
                <h2>Create Your Activity Plan</h2>
                <form id="activity_form">
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="activity_date">Date:</label>
                            <input type="date" className="form-control" id="activity_date" value={activityDate}
          onChange={(e) => setActivityDate(e.target.value)}required/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="activity_time">Time:</label>
                            <input type="time" className="form-control" id="activity_time" required value={activityTime}
          onChange={(e) => setActivityTime(e.target.value)}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="activity_desc">Activity:</label>
                            <input type="text" className="form-control" id="activity_desc" required value={activityDesc}
          onChange={(e) => setActivityDesc(e.target.value)}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="activity_cost">Cost:</label>
                            <input type="number" className="form-control" id="activity_cost" min="0" step="0.01" value={activityCost}
          onChange={(e) => setActivityCost(e.target.value)} required/>
                        </div>
                    </div>
                    
                    <button type="button" className="btn btn-primary" id="add_activity" onClick={handleAddActivity}>Add Activity</button>
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
                    {activityRows.map((row, index) => (
                        <tr key={index}>
                            <td>{row.date}</td>
                            <td>{row.time}</td>
                            <td>{row.desc}</td>
                            <td>{row.cost}</td>
                            <td>
                                <button onClick={() => handleDeleteActivity(index)}>
                                Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button className="btn btn-success" tpye = "submit" id="create_plan">Create Plan</button>
            </div>
        </div>
        </div>
        )
        
    }

    export default Itinerary