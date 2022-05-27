/* Replace with your SQL commands */
CREATE TABLE users (
UserID SERIAL PRIMARY KEY,
UserName VARCHAR(100) UNIQUE , 
Password VARCHAR(255),
FirstName VARCHAR(100),
LastName VARCHAR(100),
GroupID integer , 
Email VARCHAR(50) UNIQUE
);