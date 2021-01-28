CREATE TABLE users (
  id SERIAL,
  email VARCHAR(50),
  nombre VARCHAR(50),
  password VARCHAR(50),
  auth BOOLEAN
);