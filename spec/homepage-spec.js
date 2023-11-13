const { usernameExists, registerUser, matchingPass } = require('../helper');
const MockClient = require('./mock-db-spec');

let mockClient;

beforeEach(() => {
    mockClient = new MockClient({
        user: "postgres",
        host: "localhost",
        database: "travel",
        password: "rawr",
        port: 5432
    });
});

describe('registerUser function', () => {
    it('should successfully register the user by adding values to the db', async () => {
        const mockUser = { id: 2, username: 'newUser', email: 'newEmail', password: 'hashPass' };
        mockClient.query("INSERT INTO your_table (id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *", [2, 'newUser', 'newEmail', 'hashPass']);
        
        const result = await registerUser('newUser', 'newEmail', 'hashPass');
        expect(result).toEqual(mockUser);
    });

    it('should fail registration', async () => {
        mockClient.query("INSERT INTO your_table (id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *", [2, 'newUser', 'newEmail', 'hashPass']);

        const result = await registerUser('newUser', 'newEmail', 'hashPass');
        expect(result).toBe(false);
    });
});

describe('usernameExists function', () => {
    it('should handle when username is already in the db', async () => {
        const mockUser = { id: 1, username: 'userExists', email: 'emailExists', password: 'hashPass' };
        mockClient.query("SELECT * FROM your_table WHERE username = $1", ['userExists']);

        const result = await usernameExists('userExists');
        expect(result).toEqual(mockUser);
    });

    it('should handle when username is not in db', async () => {
        mockClient.query("SELECT * FROM your_table WHERE username = $1", ['noUser']);

        const result = await usernameExists('noUser');
        expect(result).toBe(false);
    });
});

describe('matchingPass function', () => {
    it('should have password match', async () => {
        const hashPass = '$2$142512$%@&!5161';
        const result = await matchingPass('password', hashPass);
        expect(result).toBe(true);
    });

    it('should have no password match', async () => {
        const hashPass = '$2$142512$%@&!5161';
        const result = await matchingPass('wrongPass', hashPass);
        expect(result).toBe(false);
    });
});
