class MockClient {
    constructor() {
        this.user = "postgres";
        this.host = "localhost";
        this.database = "travel";
        this.password = "yourPassword";
        this.port = 5432;
        this.isConnected = false;
    }

    connect() {
        this.isConnected = true;
    }

    async query(sql, params) {
        switch (sql) {
            case "SELECT * FROM users WHERE username = $1":
                // Simulate a query for checking if a username exists
                if (params[0] === 'existingUsername') {
                    return { rows: [{ id: 1, username: 'existingUsername', email: 'user@example.com' }], rowCount: 1 };
                } else {
                    return { rows: [], rowCount: 0 };
                }
            case "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *":
                
                return { rows: [{ id: 2, username: params[0], email: params[1], password: params[2] }], rowCount: 1 };
            // Add more cases as needed for other queries
            default:
                // Default behavior for unknown queries
                return { rows: [], rowCount: 0 };
        }
    }

    // Mock the bcrypt.compare method
    async compare(password, hashPassword) {
        // Simulate a password match or mismatch
        if (password === 'password') {
            return true;
        } else {
            return false;
        }
    }

    end() {
        this.isConnected = false;
    }
}

module.exports = MockClient;
