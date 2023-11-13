const LocalStrategy = require("passport-local");
const { usernameExists, registerUser, matchingPass } = require("./helper");


module.exports = (passport) => {

    // registration
    passport.use(
        "local-signup",
        new LocalStrategy(
            {
                usernameField: "username",
                passwordField: "password",
            },

            async (username, password, done) => {
                try {

                    // checks if username taken
                    const userExistence = await usernameExists(username)
                    
                    if (userExistence) {
                        return done(null, false);
                    }

                    // if no existence in db, new user registered
                    const user = await registerUser(username, password);
                    return done(null, user);

                } catch (error) {
                    done(error);
                }
            }
        )
    );

    // login
    passport.use(
        "local-login",
        new LocalStrategy(
            {
                usernameField: "username",
                passwordField: "password",
            },

            async (username, password, done) => {
                try {
                    
                    // checks if username registered
                    const user = await usernameExists(username);
                    if (!user) return done(null, false);

                    // checks that password of user and request match
                    const matches = await matchingPass(password, user.password);
                    if (!matches) return done(null, false);

                    // logs in user
                    return done(null, {id: user.id, username: user.username});

                } catch (error) {
                    done(error, false);
                }
            }
        )
    );

};
