const express = require('express');
const app = express();
const port = 3001;
const { pool } = require('./dbConfig');
const user_model = require('./userModel');
const session = require('express-session');
require("dotenv").config();

app.use(session({
    secret: process.env.COOKIE_SECRET,
    
    // session id
    name: "sid",
    
    // only saves session if something changes
    resave: false,
    
    // no setting cookie on browser if user not logged in
    saveUninitialized: false,
    cookie: {
        // cookie only set through https
        secure: process.env.ENVIRONMENT  === "production",
        httpOnly: true,

        // only communicated through same domain
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax"
    },
}));

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    res.render('Login.jsx')
});

app.post('/login', (req, res) => {
        user_model.getUser(req.body)
        
        .then(response => {
            req.session.user = {
                username: req.body.username,
                id: response[0].id
            };
            res.status(200).send(response);
            
        })
        .catch(error => {
            res.status(500).send(error);
            
        })
    });

// register endpoint
app.post('/register', async (req, res) => {
    try {
        // want to use this function to query user model database for this endpoint
        const response = await user_model.createUser(req.body);

        if (response && response.id) {
            req.session.user = {
                username: req.body.username,
                id: response.id
            };

             // no problems, sent to where this endpoint is being called
            res.status(200).send(response);
            console.log("response being sent")
        } else {
            console.log("error: ", response)
            res.status(400).send(response);
        }
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send({ error: "Internal server error" });
    }
   
});

app.post('/logout', (req, res) => {

    // Destroy session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).send('Internal Server Error');
      } else {
        // Session is destroyed, send a success response
        res.status(200).send('Logout successful');
      }
    });
  });
  

app.listen(port, () => {
    console.log(`Running on port ${port}`)
});