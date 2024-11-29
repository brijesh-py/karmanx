-- Create the Financial Summary Table with an ID column
CREATE TABLE financial_summary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    account_type TEXT,
    balance REAL,
    num_transactions_month INTEGER,
    last_transaction_amount REAL,
    credit_rating INTEGER,
    loan_taken TEXT,
    loan_type TEXT
);

-- Insert 20 rows of data
INSERT INTO financial_summary (username, account_type, balance, num_transactions_month, last_transaction_amount, credit_rating, loan_taken, loan_type) VALUES
('rohanmehta', 'Savings', 15000.00, 12, 2000.00, 750, 'Yes', 'Personal'),
('riyaagarwal', 'Checking', 5000.00, 8, 1000.00, 720, 'No', '-'),
('arunkumar', 'Savings', 25000.00, 20, 3000.00, 680, 'Yes', 'Mortgage'),
('nehasingh', 'Checking', 10000.00, 5, 500.00, 710, 'No', '-'),
('vikasjoshi', 'Savings', 2000.00, 15, 1500.00, 690, 'Yes', 'Auto'),
('priyapatel', 'Checking', 7500.00, 10, 1000.00, 740, 'No', '-'),
('amitsharma', 'Savings', 30000.00, 25, 4000.00, 760, 'Yes', 'Education'),
('shivamkhanna', 'Checking', 6000.00, 7, 700.00, 700, 'No', '-'),
('poojakapur', 'Savings', 10000.00, 18, 2500.00, 730, 'Yes', 'Personal'),
('anilkumar', 'Checking', 8500.00, 9, 1200.00, 710, 'No', '-'),
('sangeetav', 'Savings', 12000.00, 14, 1800.00, 715, 'Yes', 'Business'),
('rahulgupta', 'Checking', 6500.00, 11, 900.00, 725, 'No', '-'),
('manishverma', 'Savings', 22000.00, 16, 2700.00, 735, 'Yes', 'Home Improvement'),
('anushab', 'Checking', 9500.00, 6, 1100.00, 705, 'No', '-'),
('deepakchopra', 'Savings', 18000.00, 13, 1600.00, 745, 'Yes', 'Personal'),
('sunilrana', 'Checking', 4000.00, 4, 800.00, 685, 'No', '-'),
('neerajm', 'Savings', 28000.00, 19, 3100.00, 770, 'Yes', 'Car'),
('sunitas', 'Checking', 10500.00, 9, 1300.00, 715, 'No', '-'),
('gauravt', 'Savings', 9000.00, 21, 2400.00, 725, 'Yes', 'Personal'),
('kiranb', 'Checking', 12000.00, 8, 1500.00, 700, 'No', '-');

--> Display the full table 
-- SELECT * FROM financial_summary

--> Exercise 1: Retrieve Savings Accounts with High Balance
-- SELECT * FROM financial_summary WHERE account_type = "Savings";

--> Exercise 2: Retrieve Users with Personal Loans
-- SELECT username, loan_type, balance FROM financial_summary WHERE loan_type = "Personal" ORDER BY username ASC;

--> Exercise 3: Retrieve Users with High Transaction Count
-- SELECT username, num_transactions_month, last_transaction_amount FROM financial_summary WHERE num_transactions_month > 10 ORDER BY num_transactions_month DESC;

--> Exercise 4: Retrieve Checking Accounts with Low Credit Rating
-- SELECT username, credit_rating, balance FROM financial_summary WHERE credit_rating < 710 ORDER BY credit_rating ASC;

--> Exercise 5: Retrieve Users with Recent Large Transactions
-- SELECT username, last_transaction_amount, balance FROM financial_summary WHERE last_transaction_amount > 2000 ORDER BY last_transaction_amount DESC;
 
 --> Exercise 6: Retrieve Users with Specific Account Types
 -- SELECT username, account_type, balance FROM financial_summary WHERE account_type = "Savings" OR account_type = "Checking" ORDER BY account_type ASC, balance DESC;  

--> Exercise 7: Retrieve Users with High Credit Rating and Loans
-- SELECT username, credit_rating, loan_type FROM financial_summary WHERE credit_rating > 730 ORDER BY credit_rating DESC;

--> Exercise 8: Retrieve Users with Specific Loan Types
-- SELECT username, loan_type, balance FROM financial_summary WHERE loan_type = "Personal" OR loan_type = "Auto" ORDER BY loan_type ASC, balance ASC;

--> Exercise 9: Retrieve Users with High Balances and Low Transactions
-- SELECT username, balance, num_transactions_month FROM financial_summary WHERE balance > 10000 AND num_transactions_month < 10 ORDER BY balance DESC;

--> Exercise 10: Retrieve Users with Education Loans
-- SELECT username, loan_type, balance FROM financial_summary WHERE loan_type = "Education" ORDER BY balance ASC;

--> Exercise 11: Retrieve Users with Loans and High Balances
-- SELECT username, balance, loan_type FROM financial_summary WHERE balance > 15000 ORDER BY balance DESC;

--> Exercise 12: Retrieve Users with Low Balances
-- SELECT username, balance FROM financial_summary WHERE balance < 5000 ORDER BY balance ASC;

--> Exercise 13: Retrieve Users with Specific Credit Ratings
-- SELECT username, credit_rating FROM financial_summary WHERE credit_rating BETWEEN 700 and 750 ORDER BY credit_rating ASC;

--> Exercise 14: Retrieve Users with Checking Accounts and Low Balances
-- SELECT username, account_type, balance FROM financial_summary WHERE account_type = "Checking" AND balance < 7000 ORDER BY balance ASC;

--> Exercise 15: Retrieve Users with Auto Loans
-- SELECT username, loan_type, balance FROM financial_summary WHERE loan_type = "Auto" ORDER BY balance ASC;

--> Exercise 16: Retrieve Users with High Number of Transactions
-- SELECT username, num_transactions_month, balance FROM financial_summary WHERE num_transactions_month > 15 ORDER BY num_transactions_month DESC;

--> Exercise 17: Retrieve Users with Low Last Transaction Amount
-- SELECT username, last_transaction_amount, balance FROM financial_summary WHERE last_transaction_amount < 1000 ORDER BY last_transaction_amount ASC;

--> Exercise 18: Retrieve Users with High Credit Rating and Low Balance
-- SELECT username, credit_rating, balance FROM financial_summary WHERE credit_rating > 740 AND balance < 10000 ORDER BY credit_rating DESC; 

--> Exercise 19: Retrieve Users with Savings Accounts and Education Loans
-- SELECT username, account_type, loan_type FROM financial_summary WHERE account_type = "Savings" AND loan_type = "Education" ORDER BY username ASC;

--> Exercise 20: Retrieve Users with Balances between 5,000 and 15,000
-- SELECT username, balance FROM financial_summary WHERE balance BETWEEN 5000 AND 15000 ORDER BY balance ASC;

--> Exercise 21: Retrieve Users with Specific Last Transaction Amount
-- SELECT username, last_transaction_amount FROM financial_summary WHERE last_transaction_amount = 1500 ORDER BY username ASC; 

--> Exercise 22: Retrieve Users with High Transaction Count and Low Balance
-- SELECT username, num_transactions_month, balance FROM financial_summary WHERE num_transactions_month > 10 and balance < 10000 ORDER BY num_transactions_month DESC; 

--> Exercise 23: Retrieve Users with No Loans and High Balances
-- SELECT username, balance FROM financial_summary WHERE loan_taken = "No" AND balance > 10000 ORDER BY balance DESC;

--> Exercise 24: Retrieve Users with Business Loans
-- SELECT username, loan_type, balance FROM financial_summary WHERE loan_type = "Business" ORDER BY username ASC; 

--> Exercise 25: Retrieve Users with Home Improvement Loans
-- SELECT username, loan_type, balance FROM financial_summary WHERE loan_type = "Home Improvement" ORDER BY balance ASC;

--> Exercise 26: Retrieve Users with Specific Number of Transactions
-- SELECT username, num_transactions_month FROM financial_summary WHERE num_transactions_month = 10 ORDER BY username ASC; 

--> Exercise 27: Retrieve Users with High Credit Rating and Savings Accounts
-- SELECT username, credit_rating, account_type FROM financial_summary WHERE credit_rating > 720 and account_type = "Savings" ORDER BY credit_rating DESC; 

--> Exercise 28: Retrieve Users with Low Transaction Count and High Balance
-- SELECT username, num_transactions_month, balance FROM financial_summary WHERE num_transactions_month < 5 AND balance > 8000 ORDER BY balance DESC;

--> Exercise 29: Retrieve Users with Checking Accounts and High Last Transaction Amount
-- SELECT username, account_type, last_transaction_amount FROM financial_summary WHERE account_type = "Checking" AND last_transaction_amount > 1000 ORDER BY last_transaction_amount DESC; 

--> Exercise 30: Retrieve Users with Specific Balances and Loan Types
SELECT username, balance, loan_type FROM financial_summary WHERE balance BETWEEN 10000 AND 20000 AND loan_type = "Car" ORDER BY balance ASC;