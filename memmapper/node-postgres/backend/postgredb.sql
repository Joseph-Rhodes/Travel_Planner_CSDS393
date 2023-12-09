CREATE TABLE users {
    id BIGSERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    UNIQUE (username)
};

CREATE TABLE media (
    id BIGSERIAL PRIMARY KEY,
    destination TEXT NOT NULL,
    stay TEXT NOT NULL,
    activity TEXT NOT NULL,
    memory TEXT NOT NULL,
    eat TEXT NOT NULL,
    image1 BYTEA,
    image2 BYTEA,
    trip_description TEXT NOT NULL,
    uid INTEGER REFERENCES users(id)
);
