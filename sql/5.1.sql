--> Exercise 1: Sales Data Table
-- CREATE TABLE IF NOT EXISTS sales (id INTEGER, product_category TEXT, sales_amount FLOAT, quantity_sold INTEGER);
-- INSERT INTO sales(id, product_category, sales_amount, quantity_sold) VALUES (1, 'Electronics', 1500, 10), (2, 'Apparel', 800, 5);
-- SELECT * FROM sales;

--> Exercise 2: Customer Orders Table
-- CREATE TABLE IF NOT EXISTS orders (id INTEGER, customer_name TEXT, order_amount FLOAT, order_quantity INTEGER);
-- INSERT INTO orders (id, customer_name, order_amount, order_quantity) VALUES (1, 'Aarav Sharma', 250.75, 3), (2, 'Isha Patel', 120.50, 2);
-- SELECT * FROM orders;

--> Exercise 3: Employee Attendance Table
-- CREATE TABLE IF NOT EXISTS attendance (id INTEGER, employee_name TEXT, hours_worked FLOAT);
-- INSERT INTO attendance (id, employee_name, hours_worked) VALUES (1, 'Rajesh Kumar', 8), (2, 'Neha Singh', 7.5);
-- SELECT * FROM attendance;

--> Exercise 4: Product Inventory Table
-- CREATE TABLE IF NOT EXISTS inventory (id INTEGER, product_name TEXT, stock_quantity INTEGER, price_per_unit FLOAT);
-- INSERT INTO inventory (id, product_name, stock_quantity, price_per_unit) VALUES (1, 'Washing Machine', 15, 12000), (2, 'Air Conditioner', 10, 25000);
-- SELECT * FROM inventory;

--> Exercise 5: Student Grades Table
-- CREATE TABLE IF NOT EXISTS grades (id INTEGER, student_name TEXT, subject TEXT, grade FLOAT);
-- INSERT INTO grades (id, student_name, subject, grade) VALUES (1, 'Aanya Gupta', 'Mathematics', 92.5), (2, 'Rohan Mehta', 'Science', 88);
-- SELECT * FROM grades;

--> Exercise 6: Library Books Table
-- CREATE TABLE IF NOT EXISTS library_books(id INTEGER, book_title TEXT, author_name TEXT, copies_available INTEGER);
-- INSERT INTO library_books (id, book_title, author_name, copies_available) VALUES (1, 'The Silent Patient', 'Ravi Kapoor', 12), (2, 'The Alchemist', 'Priya Sharma', 7);
-- SELECT * FROM library_books;

--> Exercise 7: Product Reviews Table
-- CREATE TABLE IF NOT EXISTS product_reviews(id INTEGER, product_name TEXT, reviewer_name TEXT, rating FLOAt);
-- INSERT INTO product_reviews (id, product_name, reviewer_name, rating) VALUES (1, 'Coffee Maker', 'Sanjay Patel', 4.5), (2, 'Blender', 'Meera Nair', 4);
-- SELECT * FROM product_reviews

--> Exercise 8: Rental Properties Table
-- CREATE TABLE IF NOT EXISTS rental_properties(id INTEGER, property_name TEXT, location TEXT, rent_per_month FLOAT);
-- INSERT INTO rental_properties (id, property_name, location, rent_per_month) VALUES (1, 'Green Villa', 'Bangalore', 25000), (2, 'Blue Apartment', 'Mumbai', 30000);
-- SELECT * FROM rental_properties;

--> Exercise 9: Restaurant Menu Table
-- CREATE TABLE IF NOT EXISTS restaurant_menu (id INTEGER, item_name TEXT, item_price FLOAT, availability TEXT);
-- INSERT INTO restaurant_menu (id, item_name, item_price, avalibility) VALUES (1, 'Paneer Tikka', 180, 'Available'), (2, 'Masala Dosa', 90, 'Available') ;
-- SELECT * FROM restaurant_menu;

--> Exercise 10: Workshop Registrations Table
CREATE TABLE IF NOT EXISTS workshop_registrations(id INTEGER, participate_name TEXT, workshop_topic TEXT, registration_fee TEXT);
INSERT INTO workshop_registrations (id, participate_name, workshop_topic, registration_fee) VALUES (1, 'Deepak Rao', 'SQL Basics', 1500), (2, 'Meenal Reddy', 'Python Advanced', 2000);
SELECT * FROM workshop_registrations;
