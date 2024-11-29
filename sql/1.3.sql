-- INIT database
CREATE TABLE food_delivery (
    id INT PRIMARY KEY,
    order_amount DECIMAL(10, 2),
    payment_method VARCHAR(20),
    delivery_status VARCHAR(20),
    delivery_time INT,
    cuisine_type VARCHAR(30),
    customer_rating DECIMAL(2, 1),
    delivery_fee DECIMAL(10, 2),
    tip_amount DECIMAL(10, 2),
    order_size VARCHAR(10),
    promo_code VARCHAR(20)
);

-- INSERT DATA
INSERT INTO food_delivery (id, order_amount, payment_method, delivery_status, delivery_time, cuisine_type, customer_rating, delivery_fee, tip_amount, order_size, promo_code) VALUES
(1, 300.50, 'Credit Card', 'Delivered', 40, 'Indian', 4.7, 20.00, 15.00, 'Large', 'SUMMER21'),
(2, 150.00, 'Cash', 'Pending', 0, 'Chinese', 0.0, 10.00, 0.00, 'Small', NULL),
(3, 200.75, 'Debit Card', 'Delivered', 50, 'South Indian', 4.5, 15.00, 10.00, 'Medium', NULL),
(4, 220.00, 'Credit Card', 'Delivered', 30, 'Mexican', 5.0, 18.00, 12.00, 'Large', 'FESTIVE50'),
(5, 170.25, 'Digital Wallet', 'Delivered', 25, 'Thai', 4.2, 12.00, 8.00, 'Medium', 'NEWUSER'),
(6, 130.50, 'UPI', 'Delivered', 20, 'Italian', 3.9, 10.00, 5.00, 'Small', 'DISCOUNT10'),
(7, 180.00, 'Credit Card', 'Delivered', 45, 'Indian', 4.6, 15.00, 10.00, 'Medium', NULL),
(8, 220.50, 'Cash', 'Pending', 0, 'Chinese', 0.0, 20.00, 0.00, 'Large', NULL),
(9, 160.75, 'Debit Card', 'Delivered', 35, 'South Indian', 4.4, 12.00, 8.00, 'Medium', 'SUMMER21'),
(10, 140.00, 'UPI', 'Delivered', 30, 'Mexican', 4.0, 10.00, 6.00, 'Small', 'FESTIVE50'),
(11, 175.50, 'Digital Wallet', 'Delivered', 25, 'Thai', 4.3, 15.00, 7.00, 'Medium', 'NEWUSER'),
(12, 210.25, 'Credit Card', 'Delivered', 40, 'Indian', 4.5, 18.00, 10.00, 'Large', NULL),
(13, 190.75, 'Cash', 'Pending', 0, 'Chinese', 0.0, 15.00, 0.00, 'Medium', NULL),
(14, 170.00, 'Debit Card', 'Delivered', 50, 'South Indian', 4.2, 12.00, 5.00, 'Medium', 'DISCOUNT10'),
(15, 150.50, 'UPI', 'Delivered', 20, 'Mexican', 3.8, 10.00, 3.00, 'Small', NULL),
(16, 200.00, 'Credit Card', 'Delivered', 35, 'Thai', 4.1, 15.00, 7.00, 'Medium', 'SUMMER21'),
(17, 250.50, 'Cash', 'Pending', 0, 'Indian', 0.0, 20.00, 0.00, 'Large', 'FESTIVE50'),
(18, 180.75, 'Debit Card', 'Delivered', 30, 'Chinese', 4.3, 12.00, 8.00, 'Medium', 'NEWUSER'),
(19, 160.00, 'Digital Wallet', 'Delivered', 25, 'South Indian', 4.0, 10.00, 5.00, 'Small', 'DISCOUNT10'),
(20, 220.25, 'UPI', 'Delivered', 40, 'Mexican', 4.6, 18.00, 10.00, 'Large', NULL);

-- QUERY database
SELECT * FROM food_delivery LIMIT 2;

--> Exercise 1: Retrieve Large Orders with High Ratings
-- SELECT id, order_amount, cuisine_type, customer_rating FROM food_delivery WHERE order_size = "Large" and customer_rating >= 4.5 ORDER BY order_amount DESC;

--> Exercise 2: Retrieve Orders with Delivery Time Under 30 Minutes
-- SELECT id, order_amount, payment_method, delivery_status FROM food_delivery WHERE delivery_time < 30 ORDER BY delivery_time ASC;

--> Exercise 3: Retrieve Cash Payments
-- SELECT id, order_amount, cuisine_type, customer_rating FROM food_delivery WHERE payment_method = "Cash" ORDER BY customer_rating DESC;

--> Exercise 4: Retrieve Orders with High Tips
-- SELECT id, order_amount, tip_amount, order_size FROM food_delivery WHERE tip_amount > 10 ORDER BY tip_amount DESC;

--> Exercise 5: Retrieve Delivered Orders with a Promo Code
-- SELECT id, order_amount, promo_code, delivery_status FROM food_delivery WHERE promo_code NOT NULL ORDER BY order_amount ASC;

--> Exercise 6: Retrieve Orders with Specific Cuisines
-- SELECT id, order_amount, cuisine_type, delivery_time FROM food_delivery WHERE cuisine_type = "Indian" OR cuisine_type = "Mexican" ORDER BY delivery_time DESC;

--> Exercise 7: Retrieve High-Value Orders with Delivery Fees
-- SELECT id, order_amount, delivery_fee, payment_method FROM food_delivery WHERE order_amount > 200 ORDER BY delivery_fee DESC; 

--> Exercise 8: Retrieve Orders with No Tips
-- SELECT id, order_amount, cuisine_type, order_size FROM food_delivery WHERE tip_amount = 0 ORDER BY order_size ASC;

--> Exercise 9: Retrieve Orders with Digital Wallet Payments
-- SELECT id, order_amount, cuisine_type, delivery_status FROM food_delivery WHERE payment_method = "Digital Wallet" ORDER BY order_amount DESC;

--> Exercise 10: Retrieve Orders with Promo Code 'SUMMER21'
-- SELECT id, order_amount, tip_amount, delivery_time FROM food_delivery WHERE promo_code  = "SUMMER21" ORDER BY delivery_time ASC;

--> Exercise 11: Retrieve Orders with Low Customer Ratings
-- SELECT id, order_amount, cuisine_type, customer_rating FROM food_delivery WHERE customer_rating < 3.0 ORDER BY customer_rating ASC;

--> Exercise 12: Retrieve Orders with Free Delivery
-- SELECT id, order_amount, delivery_fee, delivery_status FROM food_delivery WHERE delivery_fee = 0 ORDER BY order_amount DESC;

--> Exercise 13: Retrieve Orders with Delivery Status Pending
-- SELECT id, order_amount, payment_method, delivery_status FROM food_delivery WHERE delivery_status = "Pending" ORDER BY delivery_time ASC;

--> Exercise 14: Retrieve Orders with Specific Payment Methods
-- SELECT id, order_amount, payment_method, customer_rating FROM food_delivery WHERE payment_method = "UPI" OR payment_method = "Credit Card" ORDER BY order_amount ASC;

--> Exercise 15: Retrieve Orders with a Specific Cuisine and High Tips
-- SELECT id, order_amount, cuisine_type, tip_amount FROM food_delivery WHERE cuisine_type = "Indian" AND tip_amount > 10 ORDER BY tip_amount DESC;

--> Exercise 16: Retrieve Orders with No Promo Code
-- SELECT id, order_amount, payment_method, delivery_status FROM food_delivery WHERE promo_code IS NULL ORDER BY order_amount ASC;

--> Exercise 17: Retrieve Orders with Payment Method UPI
-- SELECT id, order_amount, cuisine_type, delivery_time FROM food_delivery WHERE payment_method = "UPI" ORDER BY delivery_time ASC;

--> Exercise 18: Retrieve Orders with Cuisine Type Thai
-- SELECT id, order_amount, cuisine_type, customer_rating FROM food_delivery WHERE cuisine_type = "Thai" ORDER BY customer_rating DESC;

--> Exercise 19: Retrieve Orders with Small Order Size
-- SELECT id, order_amount, order_size, delivery_fee FROM food_delivery WHERE order_size = "Small" ORDER BY delivery_fee ASC;

--> Exercise 20: Retrieve Orders with a Promo Code and High Ratings
-- SELECT id, order_amount, promo_code, customer_rating FROM food_delivery WHERE promo_code NOT NULL AND customer_rating >= 4.0 ORDER BY customer_rating DESC; 

--> Exercise 21: Retrieve Orders with Cuisine Type Chinese
-- SELECT id, order_amount, cuisine_type, delivery_status FROM food_delivery WHERE cuisine_type = "Chinese" ORDER BY order_amount DESC;

--> Exercise 22: Retrieve Orders with Medium Order Size
-- SELECT id, order_amount, order_size, tip_amount FROM food_delivery WHERE order_size = "Medium" ORDER BY tip_amount ASC; 

--> Exercise 23: Retrieve Orders with Payment Method Debit CardExercise 23: Retrieve Orders with Payment Method Debit Card
-- SELECT id, order_amount, payment_method, delivery_fee FROM food_delivery WHERE payment_method = "Debit Card" ORDER BY order_amount ASC; 

--> Exercise 24: Retrieve Orders with High Delivery Fees
-- SELECT id, order_amount, delivery_fee, delivery_status FROM food_delivery WHERE delivery_fee > 15 ORDER BY delivery_fee DESC;

--> Exercise 25: Retrieve Orders with Promo Code NEWUSER
-- SELECT id, order_amount, promo_code, customer_rating FROM food_delivery WHERE promo_code = "NEWUSER" ORDER BY customer_rating ASC;

--> Exercise 26: Retrieve Orders with Specific Delivery Status
-- SELECT id, order_amount, delivery_status, delivery_time FROM food_delivery WHERE delivery_status = "Delivered" ORDER BY delivery_time ASC;

--> Exercise 27: Retrieve Orders with Delivery Time Greater Than 30 Minutes
-- SELECT id, order_amount, delivery_time, payment_method FROM food_delivery WHERE delivery_time > 30 ORDER BY delivery_time DESC;

--> Exercise 28: Retrieve Orders with Payment Method Cash
-- SELECT id, order_amount, payment_method, delivery_status FROM food_delivery WHERE payment_method = "Cash" ORDER BY order_amount ASC;

--> Exercise 29: Retrieve Orders with Delivery Status Delivered
-- SELECT id, order_amount, delivery_status, delivery_fee FROM food_delivery WHERE delivery_status = "Delivered" ORDER BY delivery_fee ASC;

--> Exercise 30: Retrieve Orders with Specific Promo Code and Delivery Status
-- SELECT id, order_amount, promo_code, delivery_status FROM food_delivery WHERE promo_code = "DISCOUNT10" AND delivery_status = "Delivered" ORDER BY order_amount DESC;

--> Exercise 31: Retrieve Orders with High Order Amounts
-- SELECT id, order_amount, cuisine_type, delivery_fee FROM food_delivery WHERE order_amount > 250 ORDER BY order_amount ASC;

--> Exercise 32: Retrieve Orders with Delivery Time Less Than 20 Minutes
-- SELECT id, order_amount, delivery_time, customer_rating FROM food_delivery WHERE delivery_time < 20 ORDER BY customer_rating DESC;

--> Exercise 33: Retrieve Orders with Specific Order Size and High Delivery Fees
-- SELECT id, order_amount, order_size, delivery_fee FROM food_delivery WHERE order_size = "Large" AND delivery_fee > 15 ORDER BY delivery_fee DESC;

--> Exercise 34: Retrieve Orders with Promo Code FESTIVE50
-- SELECT id, order_amount, promo_code, customer_rating FROM food_delivery WHERE promo_code = "FESTIVE50" ORDER BY customer_rating ASC;

--> Exercise 35: Retrieve Orders with Customer Rating Less Than 4.0
SELECT id, order_amount, cuisine_type, customer_rating FROM food_delivery WHERE customer_rating < 4 ORDER BY customer_rating ASC;
