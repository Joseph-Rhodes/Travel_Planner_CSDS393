$(document).ready(function() {
    // Add itinerary-specific functionality here
});

document.getElementById('add_activity').addEventListener('click', function() {
    // Retrieve input values
    var date = document.getElementById('activity_date').value;
    var time = document.getElementById('activity_time').value;
    var desc = document.getElementById('activity_desc').value;
    var cost = document.getElementById('activity_cost').value;
    
    // Convert military time to 12-hour time
    var timeArray = time.split(':');
    var hours = timeArray[0];
    var minutes = timeArray[1];
    var amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    time = hours + ':' + minutes + ' ' + amPm;
    
    // Clear input fields
    document.getElementById('activity_date').value = '';
    document.getElementById('activity_time').value = '';
    document.getElementById('activity_desc').value = '';
    document.getElementById('activity_cost').value = '';
    
    // Create new row and cells
    var table = document.getElementById('activity_table');
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = date;
    cell2.innerHTML = time;
    cell3.innerHTML = desc;
    cell4.innerHTML = cost;
    
    // Create delete button
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.className = 'btn btn-danger btn-sm';
    
    // Handle delete button click event
    deleteButton.addEventListener('click', function() {
        var row = this.parentNode.parentNode;
        row.parentNode.removeChild(row);
    });
    
    cell5.appendChild(deleteButton);        
});






// Disables the return data when the one-way button is selected
document.getElementById('flight_search_form').addEventListener('change', function() {
    var isOneWay = document.getElementById('one_way').checked;
    document.getElementById('return_date').disabled = isOneWay;
});