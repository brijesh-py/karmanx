CREATE TABLE inventory (
    id INTEGER PRIMARY KEY,
    item_name TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity_in_stock INTEGER NOT NULL,
    unit_price REAL NOT NULL,
    reorder_level INTEGER NOT NULL,
    supplier_id TEXT NOT NULL,
    supplier_location TEXT NOT NULL 
);

INSERT INTO inventory (id, item_name, category, quantity_in_stock, unit_price, reorder_level, supplier_id, supplier_location) VALUES
(201, 'Samsung LED TV 43', 'Television', 50, 29999, 10, 'SUP101', 'New Delhi'),
(202, 'Mi 10 Power Bank 20000mAh', 'Accessories', 200, 1499, 30, 'SUP102', 'Mumbai'),
(203, 'Dell Inspiron 15 Laptop', 'Computers', 35, 55000, 5, 'SUP103', 'Bengaluru'),
(204, 'Sony WH-1000XM4 Headphones', 'Audio', 60, 24990, 15, 'SUP104', 'Chennai'),
(205, 'Realme C55 Smartphone', 'Mobiles', 100, 13999, 20, 'SUP102', 'Mumbai'),
(206, 'LG 260L Refrigerator', 'Appliances', 25, 23499, 8, 'SUP105', 'Pune'),
(207, 'Philips Air Fryer', 'Kitchen', 40, 9499, 10, 'SUP106', 'Kolkata'),
(208, 'HP DeskJet 2723 Printer', 'Office', 80, 4299, 20, 'SUP107', 'Hyderabad'),
(209, 'Lenovo ThinkPad E14 Laptop', 'Computers', 45, 63000, 10, 'SUP103', 'Bengaluru'),
(210, 'Bose SoundLink Mini II Speaker', 'Audio', 70, 17500, 15, 'SUP104', 'Chennai'),
(211, 'OnePlus Nord 2T Smartphone', 'Mobiles', 120, 28999, 25, 'SUP102', 'Mumbai'),
(212, 'Whirlpool 7kg Washing Machine', 'Appliances', 30, 22999, 8, 'SUP105', 'Pune'),
(213, 'Canon EOS 1500D DSLR Camera', 'Cameras', 20, 38999, 5, 'SUP108', 'Jaipur'),
(214, 'Samsung Galaxy Tab S7', 'Tablets', 65, 47999, 15, 'SUP102', 'Mumbai'),
(215, 'Havells Insta Cook Induction', 'Kitchen', 50, 3999, 12, 'SUP106', 'Kolkata'),
(216, 'Apple iPad Air', 'Tablets', 40, 54900, 10, 'SUP102', 'Mumbai'),
(217, 'Panasonic 1.5 Ton AC', 'Appliances', 20, 39990, 5, 'SUP105', 'Pune'),
(218, 'JBL Flip 5 Bluetooth Speaker', 'Audio', 90, 8999, 20, 'SUP104', 'Chennai'),
(219, 'Vivo Y21 Smartphone', 'Mobiles', 110, 12499, 20, 'SUP102', 'Mumbai'),
(220, 'HP Omen 15 Gaming Laptop', 'Computers', 30, 79999, 8, 'SUP103', 'Bengaluru');

 -- QUERY database
SELECT * FROM inventory LIMIT 2; 


--> Exercise 1: Find the Minimum Price of Mobiles
-- SELECT MIN(unit_price) AS lowest_price FROM inventory WHERE category = "Mobiles";

--> Exercise 2: Find the Maximum Quantity in Stock for Audio Products
-- SELECT MAX(quantity_in_stock) AS max_audio_stock FROM inventory WHERE category = "Audio";

--> Exercise 3: Calculate the Average Price of Computers
-- SELECT AVG(unit_price) AS average_computers_price FROM inventory WHERE category = "Computers";

--> Exercise 4: Calculate the Total Stock for Kitchen Appliances
-- SELECT SUM(quantity_in_stock) AS total_kitchen_stock FROM inventory WHERE category = "Kitchen";

--> Exercise 5: Count the Number of Products Supplied from Mumbai
-- SELECT COUNT(id) AS products_from_mumbai FROM inventory WHERE supplier_location = "Mumbai";

--> Exercise 6: Find the Minimum Reorder Level for Appliances
-- SELECT MIN(reorder_level) AS min_appliances_reorder_level FROM inventory WHERE category = "Appliances";

--> Exercise 7: Find the Maximum Price of Televisions
-- SELECT MAX(unit_price) AS max_tv_price FROM inventory WHERE category = "Television";

--> Exercise 8: Calculate the Average Stock of Tablets
-- SELECT AVG(quantity_in_stock) AS average_tablets_stock  FROM inventory WHERE category = "Tablets";

--> Exercise 9: Calculate the Total Value of Stock for Audio Products
-- SELECT SUM(quantity_in_stock * unit_price) AS total_audio_stock_value FROM inventory WHERE category = "Audio";

--> Exercise 10: Count the Number of Items with Reorder Level Less Than 10
-- SELECT COUNT(id) AS item_with_low_reorder_level FROM inventory WHERE reorder_level < 10;

--> Exercise 11: Find the Minimum Price of Accessories
-- SELECT MIN(unit_price) AS lowest_accessories_price FROM inventory WHERE category = "Accessories";

--> Exercise 12: Find the Maximum Quantity in Stock for Televisions
-- SELECT MAx(quantity_in_stock) AS max_tv_stock FROM inventory WHERE category = "Television";

--> Exercise 13: Calculate the Average Reorder Level for Mobiles
-- SELECT AVG(reorder_level) AS avg_reorder_level_mobiles FROM inventory WHERE category = "Mobiles";

--> Exercise 14: Calculate the Total Stock Supplied by Supplier SUP103
-- SELECT SUM(quantity_in_stock) AS total_stock_by_sup103 FROM inventory WHERE supplier_id = "SUP103";

--> Exercise 15: Count the Number of Items Priced Above 20,000 INR
-- SELECT COUNT(id) AS items_above_20000 FROM inventory WHERE unit_price > 20000;

--> Exercise 16: Find the Minimum Stock for Kitchen Items
-- SELECT MIN(quantity_in_stock) AS lowest_kitchen_stock FROM inventory WHERE category = "Kitchen";

--> Exercise 17: Find the Maximum Reorder Level for Tablets
-- SELECT MAx(reorder_level) AS max_tablets_reorder_level FROM inventory WHERE category = "Tablets";

--> Exercise 18: Calculate the Average Price of Televisions
-- SELECT AVG(unit_price) AS average_tv_price FROM inventory WHERE category = "Television";

--> Exercise 19: Calculate the Total Stock Value for Mobiles
-- SELECT SUM(quantity_in_stock * unit_price) AS total_mobiles_stock_value FROM inventory WHERE category = "Mobiles"; 

--> Exercise 20: Count the Number of Products Supplied from Chennai
-- SELECT COUNT(id) AS products_from_chennai FROM inventory WHERE supplier_location = "Chennai";

--> Exercise 21: Find the Minimum Price of Cameras
-- SELECT MIN(unit_price) AS lowest_camera_price FROM inventory WHERE category = "Cameras";

--> Exercise 22: Find the Maximum Quantity in Stock for Accessories
-- SELECT MAX(quantity_in_stock) as max_accessories_stock FROM inventory WHERE category = "Accessories";

--> Exercise 23: Calculate the Average Price of Appliances
-- SELECT AVG(unit_price) avg_appliances_price FROM inventory WHERE category = "Appliances";

--> Exercise 24: Calculate the Total Stock for Computers
-- SELECT SUM(quantity_in_stock) AS total_computers_stock FROM inventory WHERE category = "Computers";

--> Exercise 25: Count the Number of Items Supplied by Supplier SUP105
-- SELECT COUNT(id) AS item_supplier_sup105 FROM inventory WHERE supplier_id = "SUP105";

--> Exercise 26: Find the Minimum Reorder Level for Office Supplies
-- SELECT MIN(reorder_level) as min_office_reorder_level FROM inventory WHERE category = "Office";

--> Exercise 27: Find the Maximum Price of Tablets
-- SELECT MAX(unit_price) AS highest_tablet_price FROM inventory WHERE category = "Tablets";

--> Exercise 28: Calculate the Average Stock of Audio Products
-- SELECT AVG(quantity_in_stock) AS avg_audio_stock FROM inventory WHERE category = "Audio";

--> Exercise 29: Calculate the Total Stock Value for Appliances
-- SELECT SUM(quantity_in_stock * unit_price) AS total_appliances_stock_value FROM inventory WHERE category = "Appliances";

--> Exercise 30: Count the Number of Items Priced Below 10,000 INR
SELECT COUNT(unit_price) AS items_below_10000 FROM inventory WHERE unit_price < 10000;
