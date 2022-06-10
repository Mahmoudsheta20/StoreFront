/* Replace with your SQL commands */
CREATE TABLE orders (

OrederID SERIAL PRIMARY KEY,
UserOreder bigint REFERENCES users(UserID),
Status VARCHAR(15)
);

CREATE TABLE order_products (
  order_id   INTEGER NOT NULL REFERENCES orders (id),
  product_id INTEGER NOT NULL REFERENCES product (ProductID),
  quantity   INTEGER NOT NULL
);