-- -- SQL4.2 - GROUP BY Clause
-- -- Create the user_sessions table
-- CREATE TABLE user_sessions (
--     id INTEGER PRIMARY KEY,
--     user_id INTEGER,
--     login_date TEXT,
--     device_type TEXT,
--     browser TEXT,
--     location TEXT,
--     session_duration INTEGER,
--     pages_viewed INTEGER,
--     data_used_MB INTEGER
-- );

-- -- Insert data into the user_sessions table
-- INSERT INTO user_sessions (id, user_id, login_date, device_type, browser, location, session_duration, pages_viewed, data_used_MB) VALUES
-- (1, 1001, '2024-08-01', 'Mobile', 'Chrome', 'Mumbai', 45, 10, 15),
-- (2, 1001, '2024-08-02', 'Desktop', 'Firefox', 'Mumbai', 60, 15, 20),
-- (3, 1002, '2024-08-01', 'Desktop', 'Firefox', 'Bangalore', 45, 12, 18),
-- (4, 1002, '2024-08-03', 'Mobile', 'Chrome', 'Bangalore', 30, 8, 12),
-- (5, 1003, '2024-08-01', 'Tablet', 'Safari', 'Delhi', 30, 7, 10),
-- (6, 1003, '2024-08-02', 'Desktop', 'Edge', 'Delhi', 75, 20, 25),
-- (7, 1004, '2024-08-01', 'Mobile', 'Chrome', 'Pune', 60, 18, 22),
-- (8, 1004, '2024-08-02', 'Tablet', 'Safari', 'Pune', 45, 10, 14),
-- (9, 1005, '2024-08-01', 'Desktop', 'Edge', 'Chennai', 105, 30, 35),
-- (10, 1005, '2024-08-03', 'Mobile', 'Chrome', 'Chennai', 50, 12, 16),
-- (11, 1006, '2024-08-01', 'Mobile', 'Chrome', 'Kolkata', 45, 9, 13),
-- (12, 1006, '2024-08-03', 'Desktop', 'Chrome', 'Kolkata', 55, 14, 19),
-- (13, 1007, '2024-08-02', 'Tablet', 'Safari', 'Hyderabad', 30, 6, 11),
-- (14, 1007, '2024-08-03', 'Mobile', 'Chrome', 'Hyderabad', 40, 10, 15),
-- (15, 1008, '2024-08-01', 'Desktop', 'Chrome', 'Ahmedabad', 60, 14, 20),
-- (16, 1008, '2024-08-02', 'Mobile', 'Chrome', 'Ahmedabad', 35, 8, 12),
-- (17, 1009, '2024-08-01', 'Mobile', 'Chrome', 'Jaipur', 30, 7, 10),
-- (18, 1009, '2024-08-03', 'Tablet', 'Safari', 'Jaipur', 50, 11, 15),
-- (19, 1010, '2024-08-02', 'Desktop', 'Firefox', 'Lucknow', 30, 6, 9),
-- (20, 1010, '2024-08-03', 'Mobile', 'Chrome', 'Lucknow', 45, 9, 13);

--> Exercise 1: Total Sessions per User
-- SELECT user_id, COUNT(session_duration) AS total_sessions FROM user_sessions GROUP BY user_id;

--> Exercise 2: Average Session Duration by Device Type
-- SELECT device_type, AVG(session_duration) AS avg_duration FROM user_sessions GROUP BY device_type;

--> Exercise 3: Total Data Used by Each User
-- SELECT user_id, SUM(data_used_MB) AS total_data_use FROM user_sessions GROUP BY user_id;

--> Exercise 4: Maximum Pages Viewed per User
-- SELECT user_id, MAX(pages_viewed) AS max_page FROM user_sessions GROUP BY user_id;

--> Exercise 5: Total Sessions by Browser and Device Type
-- SELECT browser, device_type, SUM(session_duration) AS total_sessions FROM user_sessions GROUP BY browser, device_type;

--> Exercise 6: Average Data Used by City
-- SELECT location, AVG(data_used_MB) AS avg_data_used FROM user_sessions GROUP BY location;

--> Exercise 7: Sessions by Device Type and Browser
-- SELECT device_type, browser, COUNT(id) AS session_count FROM user_sessions GROUP BY device_type, browser;

--> Exercise 8: Total Sessions by User and Browser
-- SELECT user_id, browser, COUNT(id) AS session_count FROm user_sessions GROUP BY user_id, browser; 

--> Exercise 9: Average Session Duration by City and Device Type
-- SELECT location, device_type, AVG(session_duration) AS avg_duration FROM user_sessions GROUP BY location, device_type;

--> Exercise 10: Total Data Used by User and Device Type
-- SELECT user_id, device_type, SUM(data_used_MB) AS total_data_used FROM user_sessions GROUP BY user_id, device_type;

--> Exercise 11: Count of Sessions by Browser and Login Date
-- SELECT browser, login_date, COUNT(id) AS session_count FROM user_sessions GROUP BY browser, login_date;

--> Exercise 12: Maximum Pages Viewed by User and Device Type
-- SELECT user_id, device_type, MAX(pages_viewed) AS max_pages FROM user_sessions GROUP BY user_id, device_type;

--> Exercise 13: Average Data Used by City and Browser
-- SELECT location, browser, AVG(data_used_MB) AS avg_data_used FROM user_sessions GROUP BY location, browser;

--> Exercise 14: Total Sessions by User and Login Date\
-- SELECT user_id, login_date, COUNT(session_duration) AS session_count FROM user_sessions GROUP BY user_id, login_date;

--> Exercise 15: Total Pages Viewed by City and Device Type
-- SELECT location, device_type, SUM(pages_viewed) AS total_page FROM user_sessions GROUP BY location, device_type;

--> Exercise 16: Maximum Session Duration by Browser and Login Date
-- SELECT browser, login_date, MAX(session_duration) AS max_duration FROM user_sessions GROUP BY browser, login_date;

--> Exercise 17: Total Data Used by User and City
-- SELECT user_id, location, SUM(data_used_MB) AS total_data_used FROM user_sessions GROUP BY user_id, location;

--> Exercise 18: Total Sessions by Device Type in Mumbai
-- SELECT device_type, COUNT(id) AS session_count FROM user_sessions WHERE location = 'Mumbai' GROUP BY device_type

--> Exercise 19: Total Data Used by User with Sessions Longer Than 1 Hour
-- SELECt user_id, SUM(data_used_MB) AS total_data_used FROM user_sessions WHERE session_duration > 1 * 60 GROUP BY user_id;

--> Exercise 20: Total Sessions by User and Device Type in Bangalore
-- SELECT user_id, device_type, COUNT(id) AS session_count FROM user_sessions WHERE location = 'Bangalore' GROUP BY user_id, device_type;

--> Exercise 21: Maximum Data Used by Browser for Sessions Longer Than 30 Minutes
-- SELECT browser, MAX(data_used_MB) AS max_data_used FROM user_sessions WHERE session_duration > 30 GROUP BY browser;

--> Exercise 22: Total Data Used by City and Browser for Mobile Sessions
-- SELECT location, browser, SUM(data_used_MB) AS total_data_used FROM user_sessions WHERE device_type = 'Mobile' GROUP BY location, browser;

--> Exercise 23: Number of Sessions by User and Location for Desktop Devices
-- SELECT user_id, location, COUNT(id) AS session_count FROM user_sessions WHERE device_type = 'Desktop' GROUP BY user_id, location;

--> Exercise 24: Average Data Used by Browser for Sessions in Mumbai
-- SELECT browser, AVG(data_used_MB) AS avg_data_used FROM user_sessions WHERE location = 'Mumbai' GROUP BY browser;

--> Exercise 25: Total Sessions by Browser and Device Type with More Than 10 Pages Viewed
-- SELECT browser, device_type, COUNT(id) As session_count FROM user_sessions WHERE pages_viewed > 10 GROUP BY browser, device_type;

--> Exercise 26: Total Pages Viewed by City for Sessions Longer Than 45 Minutes
-- SELECT location, SUM(pages_viewed) AS total_pages_viewed FROM user_sessions WHERE session_duration > 45 GROUP BY location;

--> Exercise 27: Average Session Duration by Device Type for Sessions in Bangalore
-- SELECT device_type, AVG(session_duration) AS avg_duration FROM user_sessions WHERE location = 'Bangalore' GROUP BY device_type;

--> Exercise 28: Average Session Duration by Browser in Pune
-- SELECT browser, AVG(session_duration) AS avg_duration FROM user_sessions WHERE location = 'Pune' GROUP BY browser;

--> Exercise 29: Total Data Used by Device Type for Sessions with More Than 3 Pages Viewed
-- SELECT device_type, SUM(data_used_MB) AS total_data_used FROM user_sessions WHERE pages_viewed > 3 GROUP BY device_type;

--> Exercise 30: Maximum Data Used by Browser for Sessions in Bangalore
-- SELECT browser, MAX(data_used_MB) AS max_data_used FROM user_sessions WHERE location = 'Bangalore' GROUP BY browser;
