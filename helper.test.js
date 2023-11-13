const client = require('./db.js');
const { usernameExists, registerUser, matchingPass } = require('./your-helper-file'); // Replace with your actual file name
const bcrypt = require('bcryptjs');

describe('Helper Functions Tests', () => {
    // Mocking user data
    const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'testuser@example.com',
        password: '$2b$10$KQkSC4uKuHZvcK83KF7ZBOz6Fzh6tbZdDlOHjATo17uqIH/B6XDyG', // Replace with hashed password
    };

    // Mocking client.query function
    const mockClientQuery = async (sql, values) => {
        // Mock the SELECT query for usernameExists
        if (sql.startsWith('SELECT * FROM users WHERE username =')) {
            return {
                rowCount: values[0] === mockUser.username ? 1 : 0,
                rows: values[0] === mockUser.username ? [mockUser] : [],
            };
        }

        // Mock the INSERT query for registerUser
        if (sql.startsWith('INSERT INTO user(username, email, password)')) {
            return {
                rowCount: 1,
                rows: [mockUser],
            };
        }

        // Implement other mock scenarios as needed

        // Default case
        return {
            rowCount: 0,
            rows: [],
        };
    };

    // Override the client.query function with the mock
    client.query = mockClientQuery;

    it('should check if username exists', async (done) => {
        const exists = await usernameExists('testuser');
        expect(exists).toEqual(mockUser);
        done();
    });

    it('should register a new user', async (done) => {
        const newUser = await registerUser('newuser', 'newuser@example.com', 'password123');
        expect(newUser).toEqual(mockUser);
        done();
    });

    it('should match passwords', async (done) => {
        const match = await matchingPass('password123', mockUser.password);
        expect(match).toBe(true);
        done();
    });

    it('should not match incorrect passwords', async (done) => {
        const match = await matchingPass('wrongpassword', mockUser.password);
        expect(match).toBe(false);
        done();
    });

    // Add more test cases or scenarios as needed

    afterAll(() => {
        // Clean up or reset any changes made during testing
    });
});
ß