-- Create the products table
CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    product_name TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity_in_stock INTEGER,
    unit_price REAL,
    reorder_level INTEGER,
    supplier_id INTEGER,
    supplier_location TEXT
);

-- Insert data into the products table
INSERT INTO products (product_name, category, quantity_in_stock, unit_price, reorder_level, supplier_id, supplier_location) VALUES
('Smartphone', 'Mobiles', 150, 299.99, 20, 1, 'Delhi'),
('Laptop', 'Computers', 75, 899.99, 10, 2, 'Mumbai'),
('Headphones', 'Audio', 200, 49.99, 50, 3, 'Bangalore'),
('Smartwatch', 'Wearables', 120, 149.99, 15, 4, 'Chennai'),
('Tablet', 'Tablets', 90, 249.99, 30, 5, 'Hyderabad'),
('Monitor', 'Computers', 60, 179.99, 20, 2, 'Mumbai'),
('Bluetooth Speaker', 'Audio', 110, 89.99, 25, 3, 'Bangalore'),
('Keyboard', 'Accessories', 300, 29.99, 100, 6, 'Delhi'),
('Mouse', 'Accessories', 350, 19.99, 150, 6, 'Delhi'),
('Printer', 'Office Supplies', 40, 129.99, 5, 7, 'Chennai');

-- Create the suppliers table
CREATE TABLE suppliers (
    supplier_id INTEGER PRIMARY KEY,
    supplier_name TEXT NOT NULL,
    contact_number TEXT,
    supplier_location TEXT,
    contact_email TEXT
);

-- Insert data into the suppliers table
INSERT INTO suppliers (supplier_name, contact_number, supplier_location, contact_email) VALUES
('Tech Supplies Inc', '9876543210', 'Delhi', 'contact@techsupplies.com'),
('Gadget World Ltd', '9123456789', 'Mumbai', 'info@gadgetworld.com'),
('AudioMasters', '9988776655', 'Bangalore', 'support@audiomasters.com'),
('WearableTech', '9456781234', 'Chennai', 'sales@wearabletech.com'),
('TabletZone', '9345678123', 'Hyderabad', 'service@tabletzone.com'),
('Accessory Hub', '9162736450', 'Delhi', 'contact@accessoryhub.com'),
('Print Solutions', '9798675432', 'Chennai', 'info@printsolutions.com');



--> Example 1: List All Products with Their Supplier Names
-- SELECT p.product_name, s.supplier_name FROM products p INNER JOIN suppliers s ON p.supplier_id = s.supplier_id;

--> Example 2: List All Products Supplied by 'Tech Supplies Inc'
-- SELECT p.product_name, p.unit_price FROM products p INNER JOIN suppliers s ON p.supplier_id = s.supplier_id WHERE s.supplier_name = "Teck Supplies Inc";

--> Example 3: Find the Maximum Unit Price of Products Supplied by 'Tech Supplies Inc'
-- SELECT MAX(p.unit_price) as max_price FROM products p INNER JOIN suppliers s ON p.supplier_id = s.supplier_id WHERE s.supplier_name = "Tech Supplies Inc";

--> Exercise 1: Show the Contact Numbers of Suppliers for Each Product
-- SELECT p.product_name, s.contact_number FROM products p INNER JOIN suppliers s ON p.supplier_id = s.supplier_id;

--> Exercise 2: Display Supplier Locations for Each Product
-- SELECT p.product_name, s.supplier_location FROM products p INNER JOIN suppliers s ON p.supplier_id = s.supplier_id;

--> Exercise 3: List All Products with Their Supplier IDs and Names
-- SELECT p.product_name, p.supplier_id, s.supplier_name FROM products p INNER JOIN suppliers s ON p.supplier_id = s.supplier_id;

--> Exercise 4: Find the Unit Price and Supplier Name for Each Product
-- SELECT p.product_name, p.unit_price, s.supplier_name FROM products p INNER JOIN suppliers s ON p.supplier_id = s.supplier_id;

--> Exercise 5: Find Products Supplied by 'Gadget World Ltd' Located in a Specific Location
-- SELECT p.product_name, s.supplier_location FROM products p INNER JOIN suppliers s ON p.supplier_id = s.supplier_id WHERE s.supplier_name = "Gadget World Ltd" AND s.supplier_location = "Mumbai";

--> Exercise 6: Find Products Priced Under 200 from Suppliers in 'Bangalore'
-- SELECT p.product_name, p.unit_price, s.supplier_location FROM products p INNER JOIN suppliers s ON p.supplier_id = s.supplier_id WHERE s.supplier_location = "Bangalore";

--> Exercise 7: Display Products with Prices Above 250 and Their Supplier's Contact Number
-- SELECT p.product_name, p.unit_price, s.contact_number FROM products p INNER JOIN suppliers s ON p.supplier_id = s.supplier_id WHERE p.unit_price > 250;

--> Exercise 8: Find Products Priced Below 300 from Suppliers Located in 'Chennai'
-- SELECT p.product_name, p.unit_price, s.supplier_location FROM products p INNER JOIN suppliers s ON p.supplier_id = s.supplier_id WHERE p.unit_price < 300 AND s.supplier_location = "Chennai";

--> Exercise 9: Determine the Minimum Quantity in Stock for Products Supplied by 'Gadget World Ltd'
-- SELECT MIN(p.quantity_in_stock) as min_stock FROM products p INNER JOIN suppliers s ON p.supplier_id = s.supplier_id WHERE s.supplier_name = "Gadget World Ltd";

--> Exercise 10: Calculate the Total Number of Products in the 'Accessories' Category Supplied by 'MegaElectronics'
SELECT COUNT(p.id) AS total_products FROM products p INNER JOIN suppliers s ON p.supplier_id = s.supplier_id WHERE p.category = "Accessories" AND s.supplier_name = "MegaElectronics";

SELECT * FROM products LIMIT 1;
SELECT * FROM suppliers LIMIT 1;
