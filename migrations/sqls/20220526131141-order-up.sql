/* Replace with your SQL commands */
CREATE TABLE orders (
OrederID SERIAL PRIMARY KEY,
UserOreder bigint REFERENCES users(UserID),
ProductOrder bigint REFERENCES product(ProductID),
Status VARCHAR(100),
Quantity integer  
);