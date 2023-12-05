const { pool } = require("./dbConfig");

const getUser = async (body) => {

    const  { username } = body;

    try {
        return await new Promise(function (resolve, reject) {
            pool.query("SELECT * FROM users WHERE username = $1", 
            [username],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results.rows.length == 0) {
                    reject(new Error("That user does not exist."));
                } else {
                    resolve(results.rows);
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
    
    return new Promise(function (resolve, reject) {
        pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, password], 
            (error, results) => {
                if (error) {
                    console.log("incorrect");
                    reject(new Error("Already exists"));
                }

                if (results && results.rows) {
                    console.log(results.rows);
                    resolve(results.rows[0]);
                } else {
                    reject(new Error("Could not register."));
                }
            }
        );
    });
}


module.exports = { getUser, createUser };