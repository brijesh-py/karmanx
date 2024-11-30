CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT NOT NULL,
    publication_year INTEGER NOT NULL,
    price INTEGER NOT NULL,
    publisher TEXT NOT NULL,
    stock_quantity INTEGER NOT NULL 
);

INSERT INTO books (id, title, author, genre, publication_year, price, publisher, stock_quantity) VALUES
(1, 'The God of Small Things', 'Arundhati Roy', 'Fiction', 1997, 399, 'Penguin Books', 50),
(2, 'A Suitable Boy', 'Vikram Seth', 'Fiction', 1993, 499, 'Aleph Book Company', 30),
(3, 'The White Tiger', 'Aravind Adiga', 'Fiction', 2008, 350, 'HarperCollins India', 40),
(4, 'Train to Pakistan', 'Khushwant Singh', 'Historical', 1956, 299, 'Penguin Random House', 20),
(5, 'The Discovery of India', 'Jawaharlal Nehru', 'History', 1946, 450, 'Oxford University Press', 25),
(6, 'The Argumentative Indian', 'Amartya Sen', 'Non-Fiction', 2005, 375, 'Picador', 35),
(7, 'In Custody', 'Anita Desai', 'Fiction', 1984, 325, 'Vintage Books', 15),
(8, 'The Guide', 'R.K. Narayan', 'Fiction', 1958, 280, 'Indian Thought Publications', 60),
(9, 'My Experiments with Truth', 'Mahatma Gandhi', 'Autobiography', 1927, 500, 'Navajivan Publishing House', 10),
(10, 'The Shadow Lines', 'Amitav Ghosh', 'Fiction', 1988, 300, 'Ravi Dayal Publisher', 45),
(11, 'Midnight''s Children', 'Salman Rushdie', 'Fiction', 1981, 350, 'Jonathan Cape', 50),
(12, 'The Namesake', 'Jhumpa Lahiri', 'Fiction', 2003, 400, 'Houghton Mifflin Harcourt', 35),
(13, 'Interpreter of Maladies', 'Jhumpa Lahiri', 'Fiction', 1999, 375, 'Mariner Books', 40),
(14, 'The Glass Palace', 'Amitav Ghosh', 'Historical', 2000, 450, 'HarperCollins', 20),
(15, 'The Immortals of Meluha', 'Amish Tripathi', 'Fiction', 2010, 299, 'Westland Press', 55),
(16, 'The Secret of the Nagas', 'Amish Tripathi', 'Fiction', 2011, 325, 'Westland Press', 60),
(17, 'The Oath of the Vayuputras', 'Amish Tripathi', 'Fiction', 2013, 350, 'Westland Press', 45),
(18, 'Shantaram', 'Gregory David Roberts', 'Fiction', 2003, 550, 'Scribe Publications', 25),
(19, 'The Palace of Illusions', 'Chitra Banerjee Divakaruni', 'Fiction', 2008, 399, 'Picador', 40),
(20, 'The Alchemist', 'Paulo Coelho', 'Fiction', 1988, 299, 'HarperOne', 70);

 -- QUERY database
SELECT * FROM books LIMIT 2; 

--> Exercise 1: Find the Total Stock Quantity of All Books
-- SELECT SUM(stock_quantity) as total_stock FROM books;

--> Exercise 2: Find the Average Price of Fiction Books
-- SELECT AVG(price) AS avg_price FROM books WHERE genre = "Fiction";

--> Exercise 3: Find the Maximum Price of Books Published After 2000
-- SELECT MAX(price) as highest_price FROM books WHERE publication_year > 2000;

--> Exercise 4: Count the Number of Books by Amitav Ghosh
-- SELECT COUNT(id) AS total_books FROM books WHERE publisher = "Amitav Ghosh";

--> Exercise 5: Find the Minimum Price of Historical Books
-- SELECT MIN(price) as lowest_price FROM books WHERE genre = "Historical";

--> Exercise 6: Find the Total Stock Quantity of Books Priced Above 300
-- SELECT SUM(stock_quantity) AS total_stock FROM books WHERE price > 300;

--> Exercise 7: Find the Average Publication Year of Non-Fiction Books
-- SELECT AVG(publication_year) as avg_year FROM books WHERE genre = "Non-Fiction";

--> Exercise 8: Find the Maximum Stock Quantity Among Books Published Before 1980
-- SELECT MAX(stock_quantity) as max_books FROM books WHERE publication_year < 1980;

--> Exercise 9: Count the Number of Publishers with Books Priced Below 400
-- SELECT COUNT(id) as total_publishers FROM books WHERE price < 400;

--> Exercise 10: Find the Minimum Publication Year for Books by Salman Rushdie
-- SELECT MIN(publication_year) AS earlisest_year FROM books WHERE author = "Salman Rushdie";

--> Exercise 11: Find the Total Price of All Books in Stock
-- SELECT SUM(stock_quantity * price) AS total_value FROM books;

--> Exercise 12: Find the Average Stock Quantity of Books Priced Above 350
-- SELECT AVG(stock_quantity) as avg_books FROM books WHERE price > 350;

--> Exercise 13: Count the Number of Books Published by Penguin Random House
-- SELECT COUNT(id) AS total_books FROM books WHERE publisher = "Penguin Random House";

--> Exercise 14: Find the Maximum Price of Autobiographies
-- SELECT MAX(price) AS highest_price FROM books WHERE genre = "Autobiography";

--> Exercise 15: Find the Minimum Stock Quantity Among Books Priced Below 300
-- SELECT MIN(stock_quantity) AS min_stock FROM books WHERE price < 300;

--> Exercise 16: Count the Number of Books Published After 2010
-- SELECT COUNT(id) as total_books FROM books WHERE publication_year > 2010;

--> Exercise 17: Find the Average Price of Books by Westland Press
-- SELECT AVG(price) AS avg_price FROM books WHERE publisher = "Westland Press";

--> Exercise 18: Find the Maximum Stock Quantity of Books by Arundhati Roy
-- SELECT MAX(stock_quantity) as max_stock FROM books WHERE author = "Arundhati Roy";

--> Exercise 19: Find the Minimum Price of Fiction Books Published Before 1990
-- SELECT MIN(price) AS min_price FROM books WHERE publication_year < 1990;

--> Exercise 20: Count the Number of Distinct Genres in the Books Table
-- SELECT COUNT(id) AS total_genres FROM books WHERE genre = "Distinct";

--> Exercise 21: Find the Total Number of Books Published by HarperCollins
-- SELECT COUNT(id) AS total_books FROM books WHERE publisher = "HarperCollins";

--> Exercise 22: Find the Average Price of Historical Books Published Before 2000
-- SELECT AVG(price) AS avg_price FROM books WHERE genre = "Historical" AND publication_year < 2000;

--> Exercise 23: Find the Minimum Stock Quantity of Books Published by Picador
-- SELECT MIN(stock_quantity) AS min_stock FROM books WHERE publisher = "Picador";

--> Exercise 24: Find the Maximum Price of Books Published Before 1990
-- SELECT MAX(price) AS max_price FROM books WHERE publication_year < 1990;

--> Exercise 25: Count the Number of Books Priced Below 350
-- SELECT COUNT(id) AS total_books FROM books WHERE price < 350;

--> Exercise 26: Find the Total Stock Quantity of Fiction Books
-- SELECT SUM(stock_quantity) AS total_stock FROM books WHERE genre = "Fiction";

--> Exercise 27: Find the Average Publication Year of Books by Jhumpa Lahiri
-- SELECT AVG(publication_year) AS avg_year FROM books WHERE author  = "Jhumpa Lahiri";

--> Exercise 28: Find the Minimum Price of Books Published by Jonathan Cape
-- SELECT MIN(price) AS min_price FROM books WHERE publisher = "Jonathan Cape";

--> Exercise 29: Find the Maximum Stock Quantity of Books Published by Houghton Mifflin Harcourt
-- SELECT MAX(stock_quantity) AS max_stock FROM books WHERE publisher = "Houghton Mifflin Harcourt";

--> Exercise 30: Count the Number of Books Published After 2005 with a Price Above 400
-- SELECT COUNT(id) AS total_books FROM books WHERE publication_year > 2005 AND price > 400;

--> Exercise 31: Find the Maximum Price of Books Published by Penguin Books and Priced Above 300
-- SELECT MAX(price) AS max_price FROM books WHERE publisher = "Penguin Books" AND price > 300;

--> Exercise 32: Count the Number of Books by Arundhati Roy Published Before 2000
-- SELECT COUNT(id) AS total_books FROM books WHERE author = "Arundhati Roy" AND publication_year < 2000;

--> Exercise 33: Find the Minimum Stock Quantity of Non-Fiction Books Priced Below 400
-- SELECT MIN(stock_quantity) AS min_stock  FROM books WHERE genre = "Non-Fiction" AND price < 400;

--> Exercise 34: Find the Average Price of Books by Westland Press Published After 2010
-- SELECT AVG(price) AS avg_price FROM books WHERE publisher = "Westland Press" AND publication_year > 2010;

--> Exercise 35: Find the Total Stock Quantity of Historical Books Priced Between 200 and 400
-- SELECT SUM(stock_quantity) AS total_stock FROM books WHERE genre = "Historical" AND price BETWEEN 200 AND 400;
