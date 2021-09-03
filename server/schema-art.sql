-- DB Schema

-- create table
CREATE TABLE art (
  id SERIAL PRIMARY KEY,
  NAME VARCHAR(255),
  user_id VARCHAR(255)
);

--  insert example
INSERT INTO art (name, user_id) 
VALUES
('mona lisa', '5993fe32-21d2-445d-b687-e1aff1a5ed36');

--select from table
SELECT * FROM art;

--  delete example
DELETE FROM art WHERE id = 1;

-- delete table *care advised*
DROP TABLE art;

-- display tables
\dt
-- display userss
\du