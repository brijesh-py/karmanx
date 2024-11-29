-- Create the patients table
CREATE TABLE patients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT CHECK(gender IN ('Male', 'Female', 'Other')) NOT NULL,
  city TEXT NOT NULL,
  insurance_provider TEXT,
  medical_history TEXT,
  primary_physician TEXT
);

-- Insert data
INSERT INTO patients (full_name, age, gender, city, insurance_provider, medical_history, primary_physician) VALUES
('Rajesh Sharma', 44, 'Male', 'Mumbai', 'LIC', 'Hypertension', 'Dr. Anil Mehta'),
('Amit Verma', 39, 'Male', 'Pune', 'ICICI Lombard', 'Diabetes', 'Dr. Ramesh Gupta'),
('Pooja Yadav', 33, 'Female', 'Bengaluru', 'HDFC Ergo', 'Thyroid disorder', 'Dr. Suresh Rao'),
('Vikram Chauhan', 49, 'Male', 'Hyderabad', 'Max Bupa', 'Heart disease', 'Dr. Priya Singh'),
('Anjali Nair', 35, 'Female', 'Mumbai', 'LIC', 'Hypertension', 'Dr. Anil Mehta');

INSERT INTO patients (full_name, age, gender, city, insurance_provider, medical_history, primary_physician) VALUES
('Ravi Singh', 45, 'Male', 'Nagpur', 'ICICI Lombard', 'Hypertension', 'Dr. Anil Mehta'),
('Meena Tripathi', 31, 'Female', 'Nagpur', 'HDFC Ergo', 'Thyroid disorder', 'Dr. Suresh Rao'),
('Ashok Pandey', 56, 'Male', 'Pune', 'Max Bupa', 'Thyroid disorder', 'Dr. Suresh Rao'),
('Rekha Desai', 29, 'Female', 'Mumbai', 'LIC', 'Diabetes', 'Dr. Ramesh Gupta'),
('Neha Malhotra', 33, 'Female', 'Mumbai', 'ICICI Lombard', 'Heart disease', 'Dr. Priya Singh');

INSERT INTO patients (full_name, age, gender, city, insurance_provider, medical_history, primary_physician) VALUES
('Priya Sharma', 36, 'Female', 'Mumbai', 'HDFC Ergo', 'Hypertension', 'Dr. Anil Mehta'),
('Divya Reddy', 39, 'Female', 'Mumbai', 'Max Bupa', 'Heart disease', 'Dr. Priya Singh'),
('Sneha Patel', 32, 'Female', 'Ahmedabad', 'LIC', 'Asthma', 'Dr. Suresh Rao'),
('Shweta Kapoor', 37, 'Female', 'Indore', 'Max Bupa', 'Asthma', 'Dr. Suresh Rao'),
('Kunal Agarwal', 40, 'Male', 'Panaji', 'ICICI Lombard', 'Diabetes', 'Dr. Ramesh Gupta');

INSERT INTO patients (full_name, age, gender, city, insurance_provider, medical_history, primary_physician) VALUES
('Rohan Joshi', 41, 'Male', 'Surat', 'HDFC Ergo', 'Thyroid disorder', 'Dr. Suresh Rao'),
('Sanjay Sinha', 43, 'Male', 'Bhopal', 'LIC', 'Asthma', 'Dr. Suresh Rao'),
('Anita Saxena', 33, 'Female', 'Raipur', 'Max Bupa', 'Diabetes', 'Dr. Ramesh Gupta'),
('Arun Bose', 51, 'Male', 'Bengaluru', 'ICICI Lombard', 'Heart disease', 'Dr. Priya Singh');

--> Display Patients
-- SELECT * FROM patients;

--> Exercise 1: Retrieve Patients with Specific Insurance Provider
-- SELECT full_name, age, city FROM patients WHERE insurance_provider = "ICICI Lombard";

--> Exercise 2: Find Patients with Heart Disease
-- SELECT full_name, primary_physician FROM patients WHERE medical_history = "Heart disease";

--> Exercise 3: Filter by Age Range
-- SELECT full_name, city FROM patients WHERE age BETWEEN 30 AND 40;

--> Exercise 4: List Patients and Their Primary Physicians
-- SELECT full_name, primary_physician FROM patients ORDER BY primary_physician ASC;

--> Exercise 5: Retrieve Full Name, Age, and City of Patients with Insurance Provider 'LIC’
-- SELECT full_name, age, city FROM patients WHERE insurance_provider = "LIC";

--> Exercise 6: List Full Name, Age, and Medical History of Patients from Mumbai
-- SELECT full_name, age, medical_history FROM patients WHERE city = "Mumbai";

--> Exercise 7: Get the Full Name, Insurance Provider, and Primary Physician of Patients aged Greater than 35
-- SELECT full_name, insurance_provider, primary_physician FROM patients WHERE age > 35;

--> Exercise 8: Select Full Name, City, and Medical History of Patients with Either Diabetes or Thyroid Disorder
-- SELECT full_name, city, medical_history FROM patients WHERE medical_history = "Diabetes" OR medical_history = "Thyroid disorder";

--> Exercise 9: Display the Full Name, Age, and Insurance Provider of Patients with a Medical History of asthma and Sort by Age
-- SELECT full_name, age, insurance_provider FROM patients WHERE medical_history = "Asthma" ORDER BY age ASC;

--> Exercise 10: Display the Full Name and City of Patients with Age Greater Than 40 and Sort by Full Name
-- SELECT full_name, city FROM patients WHERE age > 40 ORDER BY full_name ASC;

--> Exercise 11: Display the Full Name, Age, and Gender of Patients from a Specific City and Sort by Age
-- SELECT full_name, age, gender FROM patients WHERE city = "Pune" ORDER BY age DESC;

--> Exercise 12: Display the Full Name and Medical History of Patients with Insurance Provider 'Max Bupa' and Sort by Medical History
-- SELECT full_name, medical_history FROM patients WHERE insurance_provider = "Max Bupa" ORDER BY medical_history ASC;

--> Exercise 13: Display the Full Name, Age, and Insurance Provider of Female Patients and Sort by Age
-- SELECT full_name, age, insurance_provider FROM patients WHERE gender="Female" ORDER BY age ASC;

--> Exercise 14: Display the Full Name, Age, and Primary Physician of Patients with Heart Disease and Sort by Full Name
-- SELECT full_name, age, primary_physician FROM patients WHERE medical_history = "Heart disease" ORDER BY full_name ASC;

--> Exercise 15: Display the Full Name and Age of Patients with Insurance Provider 'HDFC Ergo' and Sort by Age
-- SELECT full_name, age FROM patients WHERE insurance_provider = "HDFC Ergo" ORDER BY age ASC;

--> Exercise 16: Display the Full Name, Age, and City of Patients with Age Less Than 30 and Sort by City
-- SELECT full_name, age, city FROM patients WHERE age < 30 ORDER BY city ASC; 

--> Exercise 17: Display the Full Name and Primary Physician of Patients Diagnosed with Thyroid Disorder and Sort by Primary Physician
-- SELECT full_name, primary_physician FROM patients WHERE medical_history = "Thyroid disorder" ORDER BY primary_physician ASC;

--> Exercise 18: Display the Full Name, Age, and Gender of Patients with Gender 'Male' and Sort by Age
-- SELECT full_name, age, gender FROM patients WHERE gender = "Male" ORDER BY age DESC;

--> Exercise 19: Display the Full Name, Age, and Insurance Provider of Patients with a Medical History of Diabetes and Sort by Insurance Provider
-- SELECT full_name, age, insurance_provider FROM patients WHERE medical_history = "Diabetes" ORDER BY insurance_provider ASC;

--> Exercise 20: Display the Full Name and City of Patients from a Specific City and Age Greater Than 35
-- SELECT full_name, city FROM patients WHERE city = "Nagpur" AND age > 35;

--> Exercise 21: Display the Full Name, Age, and Gender of Patients with Age Between 30 and 40 and Sort by Age
-- SELECT full_name, age, gender FROM patients WHERE age BETWEEN 30 and 40 ORDER BY age ASC;

--> Exercise 22: Display the Full Name and Medical History of Patients with Insurance Provider 'ICICI Lombard' and Sort by Medical History
-- SELECT full_name, medical_history FROM patients WHERE insurance_provider = "ICICI Lombard" ORDER BY medical_history ASC;

--> Exercise 23: Display the Full Name, Age, and Insurance Provider of Patients with Medical History of Asthma and Sort by Age
-- SELECT full_name, age, insurance_provider FROM patients WHERE medical_history = "Asthma" ORDER BY age DESC;

--> Exercise 24: Display the Full Name, Age, and City of Patients with Insurance Provider 'LIC' and Sort by Full Name
-- SELECT full_name, age, city FROM patients WHERE insurance_provider = "LIC" ORDER BY full_name ASC;

--> Exercise 25: Display the Full Name and Age of Patients with a Primary Physician 'Dr. Suresh Rao' and Sort by Age
-- SELECT full_name, age FROM patients WHERE primary_physician = "Dr. Suresh Rao" ORDER BY age ASC;

--> Exercise 26: Display the Full Name, Age, and City of Patients with Age Greater Than 40 and Sort by City
-- SELECT full_name, age, city FROM patients WHERE age > 40 ORDER BY city ASC;

--> Exercise 27: Display the Full Name and Medical History of Patients with Medical History of Heart Disease and Sort by Full Name
-- SELECT full_name, medical_history FROM patients WHERE medical_history = "Heart disease" ORDER BY full_name ASC;

--> Exercise 28: Display the Full Name, Age, and Gender of Patients with Gender 'Female' and Sort by Age
-- SELECT full_name, age, gender FROM patients WHERE gender = "Female" ORDER BY age DESC; 

--> Exercise 29: Display the Full Name, Age, and Insurance Provider of Patients from 'Pune' and Sort by Insurance Provider
-- SELECT full_name, age, insurance_provider FROM patients WHERE city = "Pune" ORDER BY insurance_provider ASC; 

--> Exercise 30: Display the Full Name and City of Patients with Insurance Provider 'Max Bupa' and Sort by Full Name
-- SELECT full_name, city FROM patients WHERE insurance_provider = "Max Bupa" ORDER BY full_name ASC;

--> Exercise 31: Display the Full Name, Age, and Gender of Patients with Age Between 25 and 35 and Sort by Gender
-- SELECT full_name, age, gender FROM patients WHERE age BETWEEN 25 AND 35 ORDER BY gender ASC;

--> Exercise 32: Display the Full Name and Medical History of Patients with Primary Physician 'Dr. Anil Mehta' and Sort by Full Name
-- SELECT full_name, medical_history FROM patients WHERE primary_physician = "Dr. Anil Mehta" ORDER BY full_name ASC;

--> Exercise 33: Display the Full Name, Age, and City of Patients with Insurance Provider 'HDFC Ergo' and Age Less Than 35
-- SELECT full_name, age, city FROM patients WHERE insurance_provider = "HDFC Ergo" AND age < 35;

--> Exercise 34: Display the Full Name and Age of Patients from 'Mumbai' and Sort by Age in Descending Order
-- SELECT full_name, age FROM patients WHERE city = "Mumbai" ORDER BY age DESC;

--> Exercise 35: Display the Full Name and Age of Patients with a Medical History of Diabetes and Sort by Age
-- SELECT full_name, age FROM patients WHERE medical_history = "Diabetes" ORDER BY age ASC;

--> Exercise 36: Display the Full Name, City, and Insurance Provider of Patients with Age Greater Than or Equal to 50
-- SELECT full_name, city, insurance_provider from patients WHERE age >= 50;

--> Exercise 37: Display the Full Name and Primary Physician of Patients with Gender 'Male' and Sort by Primary Physician
-- SELECT full_name, primary_physician FROM patients WHERE gender = "Male" ORDER BY primary_physician ASC;

--> Exercise 38: Display the Full Name and Age of Patients with a Medical History of Asthma and Age Less Than 40
-- SELECT full_name, age FROM patients WHERE medical_history = "Asthma" AND age < 40;

--> Exercise 39: Display the Full Name, Age, and City of Patients with a Primary Physician 'Dr. Priya Singh' and Sort by Age
-- SELECT full_name, age, city FROM patients WHERE primary_physician = "Dr. Priya Singh" ORDER BY age ASC;

--> Exercise 40: Display the Full Name and City of Patients with Insurance Provider 'LIC' and Sort by City
SELECT full_name, city FROM patients  WHERE insurance_provider = "LIC" ORDER BY city ASC;