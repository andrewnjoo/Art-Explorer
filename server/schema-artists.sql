-- DB Schema

-- create table
CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  NAME VARCHAR(255),
  user_id VARCHAR(255)
);

--  insert example
INSERT INTO artists (name, user_id) 
VALUES
('Pablo Picasso', '5993fe32-21d2-445d-b687-e1aff1a5ed36');
