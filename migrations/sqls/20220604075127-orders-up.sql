/* Replace with your SQL commands */
CREATE TYPE mood AS ENUM ('active', 'complete');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
);

CREATE TABLE order_products (
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES product(id)
);