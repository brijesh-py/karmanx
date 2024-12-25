-- -- SQL4.3 - GROUP BY Clause
-- -- Create the API Logs table
 CREATE TABLE api_logs (
     id INTEGER PRIMARY KEY,
     endpoint TEXT NOT NULL,
     user_id INTEGER NOT NULL,
     request_time_seconds INTEGER NOT NULL,
     response_time_seconds INTEGER NOT NULL,
     status_code INTEGER NOT NULL,
     method TEXT NOT NULL,
     response_size_kb INTEGER NOT NULL
 );
 
-- -- Insert data into the API Logs table
 INSERT INTO api_logs (id, endpoint, user_id, request_time_seconds, response_time_seconds, status_code, method, response_size_kb) VALUES
 (1, '/api/v1/login', 101, 2, 3, 200, 'POST', 12),
 (2, '/api/v1/getData', 102, 1, 4, 200, 'GET', 20),
 (3, '/api/v1/updateProfile', 101, 3, 5, 500, 'PUT', 15),
 (4, '/api/v1/logout', 103, 2, 2, 200, 'POST', 5),
 (5, '/api/v1/getData', 104, 1, 3, 404, 'GET', 0),
 (6, '/api/v1/createAccount', 105, 4, 6, 201, 'POST', 18),
 (7, '/api/v1/deleteAccount', 106, 3, 7, 204, 'DELETE', 10),
 (8, '/api/v1/login', 107, 2, 3, 200, 'POST', 12),
 (9, '/api/v1/getData', 108, 1, 4, 200, 'GET', 22),
 (10, '/api/v1/updateProfile', 109, 3, 5, 400, 'PUT', 16),
 (11, '/api/v1/logout', 110, 2, 2, 200, 'POST', 6),
 (12, '/api/v1/getData', 111, 1, 3, 404, 'GET', 0),
 (13, '/api/v1/createAccount', 112, 4, 6, 201, 'POST', 19),
 (14, '/api/v1/deleteAccount', 113, 3, 7, 204, 'DELETE', 11),
 (15, '/api/v1/login', 114, 2, 3, 200, 'POST', 12),
 (16, '/api/v1/getData', 115, 1, 4, 200, 'GET', 23),
 (17, '/api/v1/updateProfile', 116, 3, 5, 500, 'PUT', 17),
 (18, '/api/v1/logout', 117, 2, 2, 200, 'POST', 7),
 (19, '/api/v1/getData', 118, 1, 3, 404, 'GET', 0),
 (20, '/api/v1/createAccount', 119, 4, 6, 201, 'POST', 20);

--> Exercise 1: Average Response Time by Endpoint
-- SELECT endpoint, AVG(response_time_seconds) AS avg_response_time FROM api_logs WHERE response_time_seconds > 4 GROUP BY endpoint;

--> Exercise 2: Total Requests by User with High Response Time
-- SELECT user_id, COUNT(id) AS total_requests FROM api_logs WHERE response_time_seconds > 5 GROUP BY user_id;

--> Exercise 3: Average Response Size by HTTP Method
-- SELECT method, AVG(response_size_kb) AS avg_response_size FROM api_logs WHERE response_size_kb > 15 GROUP BY method;

--> Exercise 4: Response Time Analysis by Status Code
-- SELECT status_code, AVG(response_size_kb) AS avg_response_size FROM api_logs WHERE response_time_seconds < 4 GROUP BY status_code;

--> Exercise 5: Large Response Size by Endpoint
-- SELECT endpoint, AVG(response_size_kb) AS avg_response_size FROM api_logs WHERE response_size_kb > 10 GROUP BY endpoint;

--> Exercise 6: Maximum Response Time by Endpoint
-- SELECT endpoint, MAX(response_time_seconds) AS max_response_time FROM api_logs WHERE status_code = 500 GROUP BY endpoint;

--> Exercise 7: Average Request and Response Time by User
-- SELECT user_id, AVG(request_time_seconds) AS avg_request_time, AVG(response_time_seconds) AS avg_response_time FROM api_logs  GROUP BY user_id ORDER BY response_time_seconds DESC;;

--> Exercise 8: Most Common HTTP Methods
-- SELECT method, COUNT(*) AS method_count FROM api_logs GROUP BY method ORDER BY method_count DESC LIMIT 1;

--> Exercise 9: Average Response Size by Status Code
-- SELECT status_code, AVG(response_size_kb) AS avg_response_size FROM api_logs GROUP BY status_code HAVING COUNT(*) >= 5;

--> Exercise 10: Longest Response Time by Endpoint and Status Code
-- SELECT endpoint, status_code, AVG(response_time_seconds) AS avg_response_time FROM api_logs WHERE method = 'POST' GROUP BY endpoint, status_code;

--> Exercise 11: Count of Successful Requests by User
-- SELECT user_id, COUNT(id) AS successful_requests FROM api_logs WHERE status_code = 200 GROUP BY user_id;

--> Exercise 12: Average Request Time for Specific Endpoints
-- SELECT endpoint, AVG(request_time_seconds) AS avg_request_time FROM api_logs WHERE  endpoint IN ('/api/v1/login', '/api/v1/getData') GROUP BY endpoint;

--> Exercise 13: Users with High Average Response Size
-- SELECT user_id, AVG(response_size_kb) AS avg_response_size FROM api_logs GROUP BY user_id HAVING AVG(response_size_kb) > 15 ORDER BY avg_response_size DESC;

--> Exercise 14: Slowest Endpoints by Response Time
-- SELECT endpoint, AVG(response_time_seconds) AS avg_response_size FROM api_logs  GROUP BY response_time_seconds ORDER BY response_time_seconds DESC LIMIT 3;

--> Exercise 15: Count of Requests by User and Status Code
-- SELECT user_id, COUNT(id) AS request_count FROM api_logs WHERE status_code = 404 GROUP BY user_id, status_code;

--> Exercise 16: Average Response Time for POST and GET Methods
-- SELECT method, AVG(response_time_seconds) AS avg_response_time FROM api_logs WHERE method IN ('GET', 'POST') GROUP BY method ORDER BY method; 

--> Exercise 17: Minimum and Maximum Response Size by Endpoint
-- SELECT endpoint, MIN(response_size_kb) AS min_response_size, MAX(response_size_kb) AS max_response_size FROM api_logs GROUP BY endpoint;

--> Exercise 18: Top 5 Endpoints with the Most Requests
-- SELECT endpoint, COUNT(id) AS request_count FROM api_logs GROUP BY endpoint ORDER BY request_count DESC LIMIT 5 ;

--> Exercise 19: Most Frequently Used Endpoint by Each User
-- SELECT user_id, endpoint, COUNT(*) AS access_count FROM api_logs GROUP BY user_id, endpoint;

--> Exercise 20: Requests with Long Processing Times
-- SELECT endpoint, SUM(request_time_seconds + response_time_seconds) AS total_processing_time FROM api_logs GROUP BY endpoint;

--> Exercise 21: Average Response Size by User for Successful Requests
-- SELECT user_id, AVG(response_size_kb) AS avg_response_size FROM api_logs WHERE status_code = 200 GROUP BY user_id;

--> Exercise 22: Endpoint Performance Analysis
SELECT endpoint, AVG(response_time_seconds) AS avg_response_time, COUNT(id) AS request_count FROM api_logs GROUP BY endpoint ORDER BY avg_response_time ASC;

