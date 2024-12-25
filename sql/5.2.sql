--> SQL5.2 - Creating Tables with SQL

--> Exercise 1: Employees Table
-- CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY, employee_name TEXT NOT NULL, department_name TEXT NOT NULL, salary FLOAT CHECK (salary > 0));
-- INSERT INTO employees(employee_name, department_name, salary) VALUES ('Aman Mehra', 'HR', 50000), ('Shreya Patil', 'Marketing', 60000);
-- SELECT * FROM employees;

--> Exercise 2: Products Table
-- CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, product_name TEXT NOT NULL, price FLOAT CHECK (price > 0), stock_quantity INTEGER CHECK(stock_quantity > 1));
-- INSERT INTO products (product_name, price, stock_quantity) VALUES ('Laptop', 55000, 10), ('Mobile Phone', 15000, 25);
-- SELECT * FROM  products;

--> Exercise 3: Students Table
-- CREATE TABLE IF NOT EXISTS students(id INTEGER PRIMARY KEY, student_name TEXT NOT NULL, course TEXT NOT NULL, fees_paid FLOAT CHECK(fees_paid >= 0));
-- INSERT INTO students (student_name, course, fees_paid) VALUES ('Rajesh Lyer', 'SQL', 12000), ('Anjali Sharma', 'Python', 15000);
-- SELECT * FROM students;

--> Exercise 4: Vehicle Rentals Table
-- CREATE TABLE IF NOT EXISTS vehicle_rentals(id INTEGER PRIMARY KEY, vehicle_name TEXT NOT NULL, rental_per_day FLOAT CHECK (rental_per_day > 0), availability_status TEXT NOT NULL);
-- INSERT INTO vehicle_rentals(vehicle_name, rental_per_day, availability_status) VALUES ('Swift, Dzire', 1500, 'Available'), ('Honda City', 2000, 'Not Available');
-- SELECT * FROM vehicle_rentals;

--> Exercise 5: Orders Table
-- CREATE TABLE IF NOT EXISTS orders(id INTEGER PRIMARY KEY, customer_name TEXT NOT NULL, total_amount FLOAT CHECK(total_amount > 0));
-- INSERT INTO orders (customer_name, total_amount) VALUES ('Rakesh Verma', 7500), ('Neha Singh', 5500);
-- SELECT * FROM orders;

--> Exercise 6: Customers Table
-- CREATE TABLE IF NOT EXISTS customers(id INTEGER PRIMARY KEY, customer_name TEXT NOT NULL, email TEXT UNIQUE, balance FLOAT CHECK (balance >= 0));
--  INSERT INTO customers (customer_name, email, balance) VALUES ('Karan Kapoor', 'karan@example.com', 1000), ('Priya Nair', 'priya@example.com', 500);
-- SELECT * FROM customers;

--> Exercise 7: Books Table
-- CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY, book_title TEXT NOT NULL, author TEXT NOT NULL, price FLOAT CHECK(price > 0));
-- INSERT INTO books (book_title, author, price) VALUES ('The Alchemist', 'Paulo Coelo', 499), ('The Guide', 'R.K. Narayan', 350);
-- SELECT * FROM books;

--> Exercise 8: Hotels Table
-- CREATE TABLE IF NOT EXISTS hotels(id INTEGER PRIMARY KEY, hotel_name TEXT NOT NULL, city TEXT NOT NULL, room_price FLOAT CHECK (room_price > 0));
-- INSERT INTO hotels (hotel_name, city, room_price) VALUES ('Taj Mahal Palace', 'Mumbai', 10000), ('ITC Grand Chola', 'Chennai', 8000);
-- SELECT * FROM hotels;

--> Exercise 9: Inventory Table
-- CREATE TABLE IF NOT EXISTS inventory(id INTEGER PRIMARY KEY, item_name TEXT NOT NULL, quantity INTEGER CHECK(quantity >= 0), price_per_unit FLOAT CHECK (price_per_unit > 0));
-- INSERT INTO inventory (item_name, quantity, price_per_unit) VALUES ('Pen', 100, 10), ('Notebook', 200, 50);
-- SELECT * FROM inventory;

--> Exercise 10: Courses Table
CREATE TABLE IF NOT EXISTS courses(id INTEGER PRIMARY KEY, course_name TEXT NOT NULL, duration INTEGER CHECK (duration > 1), fee FLOAT CHECK(fee > 0));
INSERT INTO courses (course_name, duration, fee) VALUES ('Data Science', 6, 25000), ('Web Development', 4, 20000);
SELECT * FROM courses;
