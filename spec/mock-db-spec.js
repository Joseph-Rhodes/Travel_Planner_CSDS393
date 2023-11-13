class MockClient {

    constructor() {
        user = "postgres",
        host = "localhost",
        database = "travel",
        password = "yourPassword",
        port = 5432,
        this.isConnected = false;
    }

    connect() {
        this.isConnected = true;
    }

    async query(sql, params){
        if (data.rowCount == 0) return false;
        return { rows: [], rowCount: 0 };
    }

    end() {
        this.isConncted = false;
    }

}

module.exports = MockClient;