-- Creating the Customers Table
CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    customer_name TEXT,
    contact_number TEXT,
    email TEXT,
    city TEXT,
    customer_type TEXT,
    payment_method TEXT
);

-- Inserting Sample Data into the Customers Table
INSERT INTO customers (id, customer_name, contact_number, email, city, customer_type, payment_method) VALUES
(1, 'Ananya Sharma', '9876543210', 'ananya.sharma@example.com', 'Mumbai', 'Regular', 'Credit Card'),
(2, 'Raj Patel', '9123456789', 'raj.patel@example.com', 'Bangalore', 'VIP', 'Net Banking'),
(3, 'Sneha Reddy', '9988776655', 'sneha.reddy@example.com', 'Delhi', 'Regular', 'Debit Card'),
(4, 'Amit Kumar', '9112233445', 'amit.kumar@example.com', 'Kolkata', 'New', 'UPI'),
(5, 'Priya Desai', '9944556677', 'priya.desai@example.com', 'Chennai', 'VIP', 'Credit Card');

-- Creating the Orders Table
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    order_month TEXT,
    customer_id INTEGER,
    total_amount REAL,
    discount REAL,
    status TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers (id)
);

-- Inserting Sample Data into the Orders Table
INSERT INTO orders (id, order_month, customer_id, total_amount, discount, status) VALUES
(1001, 'January', 1, 1500.00, 50.00, 'Shipped'),
(1002, 'February', 2, 250.00, 10.00, 'Delivered'),
(1003, 'March', 3, 1200.00, 0.00, 'Processing'),
(1004, 'April', 4, 300.00, 15.00, 'Cancelled'),
(1005, 'May', 1, 800.00, 30.00, 'Shipped'),
(1006, 'June', 5, 500.00, 20.00, 'Delivered'),
(1007, 'July', 2, 2200.00, 100.00, 'Shipped'),
(1008, 'August', 3, 600.00, 25.00, 'Processing'),
(1009, 'September', 4, 1500.00, 50.00, 'Shipped'),
(1010, 'October', 5, 400.00, 20.00, 'Delivered'),
(1011, 'November', 1, 900.00, 30.00, 'Shipped'),
(1012, 'December', 2, 200.00, 5.00, 'Delivered'),
(1013, 'January', 3, 1300.00, 0.00, 'Processing'),
(1014, 'February', 4, 100.00, 5.00, 'Cancelled'),
(1015, 'March', 5, 750.00, 25.00, 'Shipped'),
(1016, 'April', 1, 600.00, 20.00, 'Shipped'),
(1017, 'May', 2, 1800.00, 75.00, 'Delivered'),
(1018, 'June', 3, 120.00, 0.00, 'Processing'),
(1019, 'July', 4, 130.00, 10.00, 'Cancelled'),
(1020, 'August', 5, 1100.00, 40.00, 'Shipped');


--> Exercise 1: List VIP Customers with Orders Over 1000 in August
-- SELECT c.customer_name, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.id WHERE c.customer_type = "VIP" AND o.order_month = "August";

--> Exercise 2: List Orders from Bangalore Customers that Received a Discount Over 20
-- SELECT c.customer_name, o.discount FROM orders o INNER JOIN customers c ON o.customer_id = c.id WHERE c.city = "Bangalore" AND o.discount > 20;

--> Exercise 3: Show Orders of New Customers from Kolkata in September
-- SELECT o.id, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.id WHERE c.city = "Kolkata" AND o.order_month = "September";

--> Exercise 4: List Shipped Orders Over 1000
-- SELECT c.customer_name, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.id WHERE o.status = "Shipped";

--> Exercise 5: List Orders from Bangalore with a Discount
-- SELECT o.id, o.discount FROM orders o INNER JOIN customers c ON o.customer_id = c.id WHERE c.city = "Bangalore";

--> Exercise 6: Show Regular Customers with Orders in June
-- SELECT c.customer_name, c.contact_number FROM orders o INNER JOIN customers c ON o.customer_id = c.id WHERE c.customer_type = "Regular" AND o.order_month = "June";

--> Exercise 7: Find New Customers with Orders Over 500
-- SELECT c.customer_name, c.email FROM orders o INNER JOIN customers c ON o.customer_id = c.id WHERE c.customer_type = "New" AND o.total_amount > 500;

--> Exercise 8: Calculate the Total Amount of All Orders by VIP Customers
-- SELECT SUM(o.total_amount) AS total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.id WHERE c.customer_type = "VIP";

--> Exercise 9: Find the Maximum Discount Given to Customers in Delhi
-- SELECT SUM(o.discount) AS max_discount FROM orders o INNER JOIN customers c ON o.customer_id = c.id WHERE c.city = "Delhi";

--> Exercise 10: Calculate the Average Order Amount for Shipped Orders
-- SELECT AVG(o.total_amount) AS avg_total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.id  WHERE o.status = "Shipped";

--> Exercise 11: Count the Number of Orders from Customers in Mumbai
-- SELECT COUNT (o.id) as avg_shipped_order_amount  FROM orders o INNER JOIN customers c ON o.customer_id = c.id WHERE c.city = "Mumbai";

--> Exercise 12: Count the Number of Orders by VIP Customers
-- SELECT COUNT(o.id) AS total_vip_orders FROM orders o INNER JOIN customers c ON o.customer_id = c.id WHERE c.customer_type = "VIP";

--> Exercise 13: Calculate the Total Order Amount for Customers in Chennai
-- SELECT SUM(o.total_amount) AS total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.id WHERE c.city = "Chennai";

--> Exercise 14: Find the Average Order Amount for Customers Who Use Credit Card
-- SELECT AVG(o.total_amount) AS avg_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.id WHERE c.payment_method = "Credit Card";

--> Exercise 15: Count the Number of Customers with Orders in March
-- SELECT COUNT(o.id) AS march_customer_count FROM orders o INNER JOIN customers c ON o.customer_id = c.id WHERE o.order_month = "March";

--> Exercise 16: Find the Maximum Total Amount Spent by Customers in Bangalore
SELECT MAX(o.total_amount) AS max_total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.id WHERE c.city = "Bangalore";


SELECT * FROM customers LIMIT 2;
SELECT * FROM orders LIMIT 2;