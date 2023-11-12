const client = require("./db.js")
const bcrypt = require("bcryptjs")

// to check if username is already registered
const usernameExists = async (username) => {
    const data = await client.query("SELECT * FROM users WHERE username = $1", [
        username,
    ]);
    if (data.rowCount == 0) return false;
    return data.rows[0];
};

// to register a user
const registerUser = async (username, email, password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hast(password, salt);

    const data = await client.query(
        "INSERT INTO user(username, email, password) VALUES ($1, $2, $3) RETURNING id, username, password",
        [username, email, hash]
    );
    if (data.rowCount == 0) return false;
    return data.rows[0];
};

const matchingPass = async (password, hashPassword) => {
    const match = await bcrypt.compare(password, hashPassword);
    return match;
};

module.exports = { usernameExists, registerUser, matchingPass };
