
import "../Itinerary.css"
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

                     

function Itinerary(){
    
    // State to manage input values
    const [activityDate, setActivityDate] = useState('');
    const [activityTime, setActivityTime] = useState('');
    const [activityDesc, setActivityDesc] = useState('');
    const [activityCost, setActivityCost] = useState('');
    // State to manage activity table rows
    const [activityRows, setActivityRows] = useState([]);
    
    // Generates the PDF
   const generatePdf = () => {
    const doc = new jsPDF();

    // Add background color
    doc.setFillColor(245, 245, 220);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    // Set title font style
    doc.setFont('courier', 'bold');
    doc.setFontSize(40);

    // Center the title horizontally
    const titleWidth = doc.getStringUnitWidth('Trip Itinerary') * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;

    // Add title to the PDF
    doc.text('Trip Itinerary', titleX, 20);

    // Reset font to default
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(15);

    // Add trip information to the PDF
    doc.text(`Destination: ${savedDestination}`, 20, 40); // Adjust vertical position
    doc.text(`Start Date: ${savedStartDate}`, 20, 50);   // Adjust vertical position
    doc.text(`End Date: ${savedEndDate}`, 20, 60);       // Adjust vertical position
    doc.text(`Budget Remaining: $${savedBudget}`, 20, 70); // Adjust vertical position

    // Add a separator line
    doc.line(20, 74, 190, 74); 

    
    // Add the dollar sign to the cost values
    const formattedActivityRows = activityRows.map(row => ({ ...row, cost: `$${row.cost}` }));

    // Define table options for brown colors
    const tableOptions = {
        theme: 'grid', // or 'striped', 'plain'
        headStyles: { fillColor: [102, 66, 41], textColor: 255 }, // Dark brown
        bodyStyles: { fillColor: [210, 180, 140], textColor: 0 }, // Light brown
    };

    // Add the activity table to the PDF
    doc.autoTable({
        columns: [
            { header: 'Date', dataKey: 'date' },
            { header: 'Time', dataKey: 'time' },
            { header: 'Activity', dataKey: 'desc' },
            { header: 'Cost', dataKey: 'cost' },
        ],
        body: formattedActivityRows,
        startY: 78,
        ...tableOptions, // Adjust the starting Y position as needed
    });

    // Save the PDF
    doc.save('TripItinerary.pdf');
};


    // Handles the One-way button
    const [isOneWay, setIsOneWay] = useState(false);

    // State to manage the trip informaiton
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState(0);


    // State to manage the saved information 
    const [savedDestination, setSavedDestination] = useState('');
    const [savedStartDate, setSavedStartDate] = useState('');
    const [savedEndDate, setSavedEndDate] = useState('');
    const [savedBudget, setSavedBudget] = useState(0);



    const isDateWithinRange = (date, startDate, endDate) => {
        const activityDate = new Date(date);
        const tripStartDate = new Date(startDate);
        const tripEndDate = new Date(endDate);

        return activityDate >= tripStartDate && activityDate <= tripEndDate;
    };

    // Function to handle the saved values
    const handleSave = () => {

        if (!destination || !startDate || !endDate || !budget) {
            alert("Please fill out all the fields before saving your trip.");
        return;
        }

       const totalActivityCost = activityRows.reduce((total, activity) => {
        return total + parseFloat(activity.cost);
        }, 0);

        // Calculate the remaining budget after subtracting the total activity cost
        const remainingBudget = budget - totalActivityCost;

        // If the remaining budget is negative, show an alert
        if (remainingBudget < 0) {
            alert("The total cost of activities exceeds your budget. Please adjust your budget or remove activities.");
        return;
        }

        // Save the values to the read-only boxes
        
        setSavedDestination(destination);
        setSavedStartDate(startDate);
        setSavedEndDate(endDate);
        setSavedBudget(remainingBudget);
    };


    // Function for the isOneWay
    const handleFlightSearchFormChange = () => {
    setIsOneWay((prevIsOneWay) => !prevIsOneWay);
    };
    
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
        // Check if all fields are filled out
        if (!activityDate || !activityTime || !activityDesc || !activityCost) {
            alert('Before adding an activity make sure that all of the fields filled.');
            return;
        }

        // Check if activity date is within the trip dates
        const activityDateWithinTrip = isDateWithinRange(activityDate, startDate, endDate);

        if (!activityDateWithinTrip) {
            alert("The activity you are trying to add is outside of your trip dates or you have not initialized a trip above.");
            return;
        }

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

        // Calculate remaining budget after adding the activity
        const activityCostFloat = parseFloat(activityCost);
        // Subtract the cost of the activity from the saved budget
        const updatedSavedBudget = savedBudget - activityCostFloat;
       

        if (updatedSavedBudget < 0) {
            setSavedBudget(updatedSavedBudget);
            alert("Adding this activity exceeds your budget. Please adjust your budget or remove activities.");
        return;
        }

        if (updatedSavedBudget < -500){
            setSavedBudget(updatedSavedBudget);
            alert("Adding this activity significantly exceeds your budget. Either update your budget or ");
        return;
        }

        // Update the remaining budget
        setSavedBudget(updatedSavedBudget);
        
        // Clear input fields
        setActivityDate('');
        setActivityTime('');
        setActivityDesc('');
        setActivityCost('');

    };
    
    // Function to handle deleting an activity
    const handleDeleteActivity = (index) => {
        // Retrieve the cost of the deleted activity
        const deletedActivityCost = parseFloat(activityRows[index].cost);
        
        // Create a copy of the array and remove the specified index
        const updatedRows = [...activityRows];
        updatedRows.splice(index, 1);
        
        // Update activityRows state
        setActivityRows(updatedRows);
    
        // Add the cost of the deleted activity back to the saved budget
        const updatedSavedBudget = savedBudget + deletedActivityCost;

        // Update the saved budget
        setSavedBudget(updatedSavedBudget);            
    };


    const handleFlightSearch = (e) => {
        e.preventDefault();

        // Construct the Kayak URL with the filled-out information
        const kayakURL = 'https://www.kayak.com/flights?';

        // Assuming you want to pass some parameters to Kayak, modify the URL accordingly
        const params = new URLSearchParams({
            departureCity: document.getElementById('departure_city').value,
            arrivalCity: document.getElementById('arrival_city').value,
            // Add more parameters as needed
        });

        // Append the parameters to the Kayak URL
        const fullKayakURL = `${kayakURL}${params.toString()}`;

        // Open the URL in a new tab
        window.open(fullKayakURL, '_blank');
    };


    // Sorting the Activity Table
    useEffect(() => {
        const sortedActivities = [...activityRows].sort((a, b) => {
        return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
    });

    setActivityRows(sortedActivities);
    }, [activityRows]);

    
    return(
    

        <div style={{backgroundColor: "beige"}}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="Homepage">MemMapper</a>
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
                    <button className="nav-link" href="#">Logout</button>
                </li>
            </ul>
        </div>
        </nav>
        <div className="container">
            <div className="form-row">
                <div className="form-group">
                    <label for="destination">Destination:</label>
                    <input type="text" id="destination" className="form-control" placeholder="Enter your Destination..." value={destination} onChange={(e) => setDestination(e.target.value)} />
                </div>
                <div className="form-group">
                    <label for="start_date">Start Date:</label>
                    <input type="date" id="start_date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="form-group">
                    <label for="end_date">End Date:</label>
                    <input type="date" id="end_date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div className="form-group">
                    <label for="budget">Budget($):</label>
                    <input type="number" id="budget" className="form-control" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Enter your Budget..." />
                </div>
                <div className="col-md-9"></div>
                <div className="col-md-3">
                    <button className="btn btn-primary black-button" onClick={handleSave}>Save</button>
                </div>
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
        
        <form  onSubmit={handleFlightSearch} id="flight_search_form">
            <h2 className="text-center">Flight Search</h2>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="departure_city">Departure City:</label>
                    <input type="text" id="departure_city" name="departure_city" placeholder="Enter your Departing city..." required />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="arrival_city">Arrival City:</label>
                    <input type="text" id="arrival_city" name="arrival_city" placeholder="Enter your Arrival city..." required />
                </div>
            </div>

    
        {/* Trip type - One way or Round trip */}
        <label>Trip Type:</label>
        <div className="radio_buttons">
            <input type="radio" id="round_trip" name="trip_type" value="round_trip" checked ={!isOneWay} onChange={handleFlightSearchFormChange}/>
            <p for="round_trip"> Round-trip </p>
        </div>
        <div className="radio_buttons">
            <input type="radio" id="one_way" name="trip_type" value="one_way" checked={isOneWay} onChange={handleFlightSearchFormChange}/>
            <p for="one_way"> One-way </p>
        </div>
        
        {/* Departue and return dates for Flights */}
        <div className="form-row">
            <div className="form-group col-md-6">
                <label htmlFor="departure_date">Departure Date:</label>
                <input type="date" id="departure_date" name="departure_date" required />
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="return_date">Return Date:</label>
                <input type="date" id="return_date" name="return_date" disabled={isOneWay} />
            </div>
        </div>

        {/* Search button for Flights */}
        <input type="submit" value="Search Hotels"/>
        </form>
        
        <div id="search_results"></div>
        </form>
        </div>
        <div className="tab-pane fade" id="hotel_search">
        <form>
        
        <form id="hotel_search_form">
        <h2 className="text-center">Hotel Search</h2>
        <label for="destination">Destination:</label>
        <input type="text" id="destination" name="destination" placeholder="Enter your Destination" required/>
        <div className="form-row">
            <div className="form-group col-md-6">
                <label htmlFor="checkin_date">Check-in Date:</label>
                <input type="date" id="checkin_date" name="checkin_date" required />
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="checkout_date">Check-out Date:</label>
                <input type="date" id="checkout_date" name="checkout_date" required />
            </div>
        </div>
        <label for="guests">Number of Guests:</label>
        <input type="number" id="guests" name="guests" min="1" placeholder="Enter the number of Guests..." required/>
        <br/>
        <input type="submit" value="Search Hotels"/>
        </form>
        </form>
        </div>
        </div>
        <div className="container2">
            <h2 className="text-center">Plan your trip to {savedDestination}</h2>
            <form id="activity_form">
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label for="activity_date">Date:</label>
                        <input type="date" className="form-control" id="activity_date" value={activityDate}
                        onChange={(e) => setActivityDate(e.target.value)} required/>
                    </div>
                    <div className="form-group col-md-3">
                        <label for="activity_time">Time:</label>
                        <input type="time" className="form-control" id="activity_time" value={activityTime}
                        onChange={(e) => setActivityTime(e.target.value)} required/>
                    </div>
                    <div className="form-group col-md-3">
                        <label for="activity_desc">Activity:</label>
                        <input type="text" className="form-control" id="activity_desc" value={activityDesc}
                        onChange={(e) => setActivityDesc(e.target.value)} required />
                    </div>
                    <div className="form-group col-md-3">
                        <label for="activity_cost">Cost:</label>
                        <input type="number" className="form-control" id="activity_cost" min="0" step="1" value={activityCost}
                        onChange={(e) => setActivityCost(e.target.value)} required/>
                    </div>
                </div>
                <button type="button" className="btn btn-primary black-button1" id="add_activity" onClick={handleAddActivity}>Add Activity</button>
            </form>
            <br/>
    <div className="container3">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="saved_destination"><strong>Destination:</strong></label>
            <input
              type="text"
              id="saved_destination"
              className="form-control"
              readOnly
              value={savedDestination}
            />
          </div>
          <div className="form-group">
            <label htmlFor="saved_start_date"> <strong>Start Date:</strong></label>
            <input
              type="date"
              id="saved_start_date"
              className="form-control"
              readOnly
              value={savedStartDate}
            />
          </div>
          <div className="form-group">
            <label htmlFor="saved_end_date"><strong>End Date:</strong></label>
            <input
              type="date"
              id="saved_end_date"
              className="form-control"
              readOnly
              value={savedEndDate}
            />
          </div>
          <div className="form-group">
            <label htmlFor="saved_budget"><strong>Budget Remaining($):</strong></label>
            <input
              type="number"
              id="saved_budget"
              className="form-control"
              readOnly
              value={savedBudget}
            />
          </div>
        </div>
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
                        <td>${row.cost}</td>
                        <td><button className="delete-button" onClick={() => handleDeleteActivity(index)}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="form-row">
            <div className="col-md-9"></div>
             <div className="text-left col-md-3">
                <button className="btn btn-primary black-button2" onClick={generatePdf} type="submit" id="create_plan"> Create Plan</button>
            </div>
            </div>
        </div>
    </div>
    </div>
    )           
}

        export default Itinerary
        
