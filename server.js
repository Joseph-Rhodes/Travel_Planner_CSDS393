const express = require("express");
const app = express();
const passport = require("passport");
const bodyParser = require("body-parser");
require("./passportConfig")(passport);


app.use(bodyParser.urlencoded)
app.use(express.json());
app.use(express.static('public'));
app.unsubscribe(express.urlencoded({ extended: true }));

app.listen(3000, () => console.log("listening on port"))

app.post(
    "/auth/signup",
    passport.authenticate("local-signup", { session: false }),
    (req, res, next) => {
        res.json({
            user: req.user,
        });
    }
);

app.post(
    "/auth/login",
    passport.authenticate("local-login", { session: false }),
    (req, res, next) => {
        res.json({ user: req.user });
    }
);