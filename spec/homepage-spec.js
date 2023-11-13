const { usernameExists, registerUser, matchingPass } = require('../helper');
const MockClient = require('./mock-db-spec');


mockClient = new MockClient(user = "postgres",
host = "localhost",
database = "travel",
password = "yourPassword",
port = 5432);

describe('registerUser function', () => {
    it('should successfully register the user by adding values to the db', async () => {
        const mockUser = { id: 2, username: 'newUser', email: 'newEmail', password: 'hashPass' };
        mockClient.query({ rowCount: 1, rows: [mockUser] });

        const result = await registerUser('newUser', 'newEmail', 'hashPass');
        expect(result).toBe(mockUser);
    });

    it('should fail registeration ', async () => {
        mockClient.query({ rowCount: 0 });

        const result = await registerUser('newUser', 'newEmail', 'hashPass');
        expect(result).toBe(false);
    });
});

describe('usernameExists function', () => {
    it('should handle when username is already in the db', async () => {
        const mockUser = { id: 1, username: 'userExists', email:'emailExits', password: 'hashPass'};
        mockClient.query({ rowCount: 1, rows: [mockUser] });

        const result = await usernameExists('userExists');
        expect(result).toBe(mockUser);
    });

    it('should handle when username is not in db', async () => {
        mockClient.query(false);

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

