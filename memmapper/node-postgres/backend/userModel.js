const passport = require("passport");
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

const getUser = async (body) => {

    const  { username, password } = body;

    try {
        return await new Promise(function (resolve, reject) {
            pool.query("SELECT * FROM users WHERE username = $1", 
            [username],
            async (error, results) => {
                if (error) {
                    reject(error);
                }

                // no users with username
                if (results.rows.length == 0) {
                    reject(new Error("Incorrect username."));
                
                // check input password to hashedpass
                } else {
                    try {
                        const passwordsMatch = await bcrypt.compare(password, results.rows[0].password);
                    
                        if (passwordsMatch) {
                            console.log("match yuh.");
                            resolve(results.rows);
                        } else {
                            reject(new Error("Incorrect password."));
                        }
                    } catch (bcryptError) {
                        reject(bcryptError);
                    }
                    
                }
                
            });
        });
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error");
    }
};

const createUser = async (body) => {
    const { username, email, password } = body;
    const hashPW = await bcrypt.hash(password, 10);

    return new Promise(function (resolve, reject) {
        pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", 
            [username, email, hashPW], 
            (error, results) => {
                if (error) {

                    // duplicate user name
                    if (error.code === '23505') {
                        console.log("Username already in use.");
                        reject("Username already in use.");
                    } else {
                        console.error("Error during registration:", error);
                        reject("Could not register.");
                    }
                } else {
                    console.log(results.rows);
                    resolve(results.rows[0]);
                }
            }
        );
    });
}


module.exports = { getUser, createUser };