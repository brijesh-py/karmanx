-- Create the employee_salaries table
CREATE TABLE employee_salaries (
    id INTEGER PRIMARY KEY,
    employee_name TEXT,
    department TEXT,
    designation TEXT,
    salary INTEGER,
    joining_year INTEGER,
    gender TEXT,
    age INTEGER
);

-- Insert data into the employee_salaries table
INSERT INTO employee_salaries (id, employee_name, department, designation, salary, joining_year, gender, age) VALUES
(1, 'Amit Sharma', 'IT', 'Software Engineer', 60000, 2020, 'Male', 29),
(2, 'Neha Verma', 'HR', 'HR Manager', 75000, 2019, 'Female', 34),
(3, 'Rajesh Kumar', 'Finance', 'Accountant', 55000, 2021, 'Male', 40),
(4, 'Suman Gupta', 'IT', 'Senior Developer', 90000, 2018, 'Female', 32),
(5, 'Vikas Singh', 'IT', 'Junior Developer', 45000, 2022, 'Male', 25),
(6, 'Preeti Rani', 'HR', 'HR Executive', 50000, 2019, 'Female', 28),
(7, 'Ravi Mehta', 'IT', 'DevOps Engineer', 70000, 2020, 'Male', 30),
(8, 'Divya Nair', 'Finance', 'Senior Accountant', 85000, 2017, 'Female', 38),
(9, 'Karan Malhotra', 'IT', 'Software Engineer', 60000, 2020, 'Male', 27),
(10, 'Seema Patel', 'Finance', 'Junior Accountant', 40000, 2021, 'Female', 24),
(11, 'Nitin Rao', 'HR', 'HR Assistant', 48000, 2020, 'Male', 31),
(12, 'Shweta Joshi', 'IT', 'Senior Developer', 95000, 2017, 'Female', 35),
(13, 'Rohit Aggarwal', 'Finance', 'Financial Analyst', 72000, 2021, 'Male', 33),
(14, 'Priya Desai', 'HR', 'HR Executive', 52000, 2019, 'Female', 26),
(15, 'Vivek Rana', 'IT', 'Project Manager', 100000, 2016, 'Male', 45),
(16, 'Alok Jain', 'Finance', 'Accountant', 55000, 2021, 'Male', 39),
(17, 'Sneha Mishra', 'HR', 'HR Manager', 75000, 2019, 'Female', 34),
(18, 'Ankit Tiwari', 'IT', 'Software Engineer', 62000, 2020, 'Male', 28),
(19, 'Ritika Bansal', 'Finance', 'Financial Analyst', 75000, 2021, 'Female', 41),
(20, 'Deepak Yadav', 'IT', 'DevOps Engineer', 70000, 2020, 'Male', 30);

-- QUERY database
SELECT * FROM employee_salaries LIMIT 2;

--> Example 1: Total Number of Employees in the Company
-- SELECT count(id) AS total_employees FROM employee_salaries;

--> Example 2: Calculate Average Salary in the IT Department
 --SELECT AVG(salary) as average_salary FROM employee_salaries WHERE department = "IT";

--> Example 3: Find the Highest Salary
-- SELECT MAX(salary) AS highest_salary FROM employee_salaries;

--> Exercise 1: Find the Minimum Salary
-- SELECT MIN(salary) AS lowerst_salary FROM employee_salaries;

--> Exercise 2: Find the Total Salary of All Employees
-- SELECT SUM(salary) AS total_salary FROM employee_salaries;

--> Exercise 3: Find the Average Salary for Employees Older Than 30
-- SELECT AVG(salary) AS average_salary FROM employee_salaries WHERE age > 30;

--> Exercise 4: Find the Highest Salary in the IT Department
-- SELECT MAX(salary) AS highest_salary FROM employee_salaries WHERE department = "IT";

--> Exercise 5: Find the Number of Employees in the HR Department
-- SELECT COUNT(id) AS total_employees FROM employee_salaries WHERE department = "HR";

--> Exercise 6: Find the Average Salary for Employees Who Joined After 2018
-- SELECT AVG(salary) AS average_salary FROM employee_salaries WHERE joining_year > 2018; 

--> Exercise 7: Find the Minimum Salary for Female Employees
-- SELECT MIN(salary) AS highest_salary FROM employee_salaries WHERE gender = "Female"; 

--> Exercise 8: Calculate the Total Salary for Employees in the Finance Department
-- SELECT SUM(salary) AS total_salary FROM employee_salaries WHERE department = "Finance";

--> Exercise 9: Find the Average Salary for Employees Aged 25 or Less
-- SELECT AVG(salary) AS average_salary FROM employee_salaries WHERE age <= 25;

--> Exercise 10: Find the Highest Salary for Employees in the Finance Department
-- SELECT MAX(salary) AS highest_salary FROM employee_salaries WHERE department = "Finance";

--> Exercise 11: Calculate the Total Salary for Male Employees
-- SELECT SUM(salary) AS total_salary FROM employee_salaries WHERE gender = "Male";

--> Exercise 12: Count the Number of Employees Who Joined Before 2020
-- SELECT COUNT(id) AS total_employees FROM employee_salaries WHERE joining_year < 2020;

--> Exercise 13: Find the Average Salary for Employees with a Salary Above 60,000
-- SELECT AVG(salary) AS average_salary FROM employee_salaries  WHERE salary > 60000;

--> Exercise 14: Find the Minimum Salary for Employees Who Joined in 2019
-- SELECT MIN(salary) AS lowert_salary FROM employee_salaries WHERE joining_year = 2019;

--> Exercise 15: Find the Highest Salary for Employees Aged 35 or Above
-- SELECT MAX(salary) AS highest_salary FROM employee_salaries WHERE age >= 35;

--> Exercise 16: Calculate the Total Salary for Employees with Designation 'Software Engineer'
-- SELECT SUM(salary) AS total_salary FROM employee_salaries WHERE designation = "Software Engineer";

--> Exercise 17: Count the Number of Employees with Salaries Below 50,000
-- SELECT COUNT(id) AS total_employees FROM employee_salaries WHERE salary < 50000;

--> Exercise 18: Find the Average Salary for Employees in the 'IT' Department Who Are Younger Than 30
-- SELECT AVG(salary) AS average_salary FROM employee_salaries WHERE department = "IT" AND age < 30;

--> Exercise 19: Find the Highest Salary for Employees Who Joined in 2020
-- SELECT MAX(salary) AS highest_salary FROM employee_salaries WHERE joining_year = 2020;

--> Exercise 20: Calculate the Total Salary for Employees with Gender 'Female'
-- SELECT SUM(salary) AS total_salary FROM employee_salaries WHERE gender = "Female";

--> Exercise 21: Find the Average Salary for Employees with Designation 'Project Manager'
-- SELECT AVG(salary) AS average_salary FROM employee_salaries WHERE designation = "Project Manager";

--> Exercise 22: Find the Minimum Salary for Employees Who Joined Before 2017
-- SELECT MIN(salary) AS lowest_salary FROM employee_salaries WHERE joining_year < 2017; 

--> Exercise 23: Calculate the Total Salary for Employees with Age Between 30 and 40
-- SELECT SUM(salary) AS total_salary FROM employee_salaries WHERE age BETWEEN 30 AND 40;

--> Exercise 24: Find the Maximum Salary for Employees in the 'IT' Department Who Joined After 2018
-- SELECT MAX(salary) AS highest_salary FROM employee_salaries WHERE department = "IT" AND joining_year > 2018;

--> Exercise 25: Calculate the Total Salary for Female Employees in the Finance Department
-- SELECT SUM(salary) AS tatal_salary FROM employee_salaries WHERE gender = "Female" AND department = "Finance";

--> Exercise 26: Find the Average Salary for Employees Aged Between 25 and 35 Who Joined Before 2020
-- SELECT AVG(salary) AS average_salary FROM employee_salaries WHERE age BETWEEN 25 AND 35 AND joining_year < 2020;

--> Exercise 27: Find the Minimum Salary for Male Employees in the 'HR' Department Who Are 30 or Older
-- SELECT MIN(salary) AS lowest_salary FROM employee_salaries WHERE gender = "Male" AND department = "HR" AND age >= 30;

--> Exercise 28: Calculate the Total Salary for Employees with a Salary Greater Than 50,000 and Who Joined in 2019
-- SELECT SUM(salary) AS total_salary FROM employee_salaries WHERE salary > 50000 AND joining_year = 2019;

--> Exercise 29: Count the Number of Employees in the 'IT' Department with a Salary Above 60,000
-- SELECT COUNT(id) AS total_employees FROM employee_salaries WHERE department = "IT" AND salary > 60000;

--> Exercise 30: Find the Highest Salary for Employees Aged Under 30 and with Designation 'Junior Developer'
-- SELECT MAX(salary) AS highest_salary FROM employee_salaries WHERE age < 30 AND designation = "Junior Developer";

--> Exercise 31: Calculate the Average Salary for Employees Who Joined Between 2015 and 2018 and Are in the Finance Department
-- SELECT AVG(salary) AS average_salary FROM employee_salaries WHERE joining_year BETWEEN 2015 AND 2018 AND department = "Finance";

--> Exercise 32: Count the Number of Male Employees Aged Between 30 and 40 Who Work in the IT Department
-- SELECT COUNT(id) AS total_employees FROM employee_salaries WHERE gender = "Male" AND age BETWEEN 30 AND 40 AND department = "IT";

--> Exercise 33: Find the Average Salary for Employees in the 'HR' Department Who Are Younger Than 40 and Joined After 2017
-- SELECT AVG(salary) AS average_salary FROM employee_salaries WHERE department = "HR" AND age < 40 AND joining_year > 2017;

--> Exercise 34: Find the Highest Salary for Employees Aged Between 25 and 35 Who Are in the Finance Department
-- SELECT MAX(salary) AS highest_salary FROM employee_salaries WHERE age BETWEEN 25 AND 35 AND department = "Finance";

--> Exercise 35: Calculate the Total Salary for Female Employees Who Joined Between 2019 and 2021 and Have a Salary Above 55,000
SELECT SUM(salary) AS total_salary FROM employee_salaries WHERE gender = "Female" AND joining_year BETWEEN 2019 AND 2021 AND salary > 55000;
