-- create db
CREATE DATABASE artexplorer;

--login to db
psql artexplorer;

-- pg module to generatez unique ids
CREATE extension IF NOT EXISTS "uuid-ossp";

--set extension
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

-- \x off;

-- create example users
INSERT INTO users (user_name, user_email, user_password)
VALUES
('bob', 'bob@gmail.com', 'password'),
('cindy', 'cindy@gmail.com', 'password');

-- select users
SELECT * FROM users;

-- grant privilege to edit users table
GRANT ALL PRIVILEGES ON TABLE users TO postgres;
GRANT ALL PRIVILEGES ON TABLE art TO postgres;

-- check current user
\conninfo

-- grant more privileges
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO postgres;