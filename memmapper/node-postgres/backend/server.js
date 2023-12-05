const express = require('express');
const app = express();
const port = 3001;
const { pool } = require('./dbConfig');
const user_model = require('./userModel');

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
    res.render('Login.jsx')
});

app.post('/login', (req, res) => {
    user_model.getUser(req.body)
    .then(response => {
        console.log("dis is criminal");
        res.status(200).send(response);
        
    })
    .catch(error => {
        console.log("wut");
        res.status(500).send(error);
        
    })
});

// register endpoint
app.post('/register', (req, res) => {

    // want to use this function to query user model database for this endpoint
    user_model.createUser(req.body)

    // no problems, sent to where this endpoint is being called
    .then(response => {
        res.status(200).send(response);
        console.log("response being sent")
    })

    // rejected
    .catch(error => {
        console.log("error: ", error)
        res.status(400).send(error);
    })
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)
});