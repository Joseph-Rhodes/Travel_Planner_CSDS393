// Import necessary modules
const assert = require('chai').assert;

// Include the JavaScript code to be tested
const script = require('Itinerary.js');

// Mocha test suite
describe('Travel Planner Script', function () {
    // Test case for the addActivity function
    describe('#addActivity()', function () {
        it('should add a new activity to the table', function () {
            // Simulate user input
            document.getElementById('activity_date').value = '2023-12-01';
            document.getElementById('activity_time').value = '12:30';
            document.getElementById('activity_desc').value = 'Test Activity';
            document.getElementById('activity_cost').value = '50';

            // Trigger click event on add_activity button
            document.getElementById('add_activity').click();

            // Get the last row in the activity_table
            var table = document.getElementById('activity_table');
            var lastRow = table.rows[table.rows.length - 1];

            // Check if the values are correctly added to the last row
            assert.equal(lastRow.cells[0].innerHTML, '2023-12-01');
            assert.equal(lastRow.cells[1].innerHTML, '12:30 PM');
            assert.equal(lastRow.cells[2].innerHTML, 'Test Activity');
            assert.equal(lastRow.cells[3].innerHTML, '50');
        });

        // Add more test cases as needed
    });

    // Test case for the flight search form
    describe('#flightSearchForm()', function () {
        it('should disable return_date when one_way is selected', function () {
            // Simulate changing the radio button to one_way
            document.getElementById('one_way').checked = true;

            // Trigger change event on flight_search_form
            document.getElementById('flight_search_form').dispatchEvent(new Event('change'));

            // Check if the return_date is disabled
            assert.isTrue(document.getElementById('return_date').disabled);
        });

        // Add more test cases as needed
    });

    // Add more test suites for other functions as needed
});

