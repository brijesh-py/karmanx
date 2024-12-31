from flask import Flask, request, jsonify

app = Flask(__name__)
"""
# PY3.1 - HW1
# Data for the exercises
users = [
    {"id": 1, "username": "ankit", "fullName": "Ankit Kumar"},
    {"id": 2, "username": "dhananjit", "fullName": "Dhananjit Singh"},
]
credit_cards = [
    {"number": "1234567890123456", "holder": "John Doe", "expiry": "12/24"},
    {"number": "9876543210987654", "holder": "Jane Smith", "expiry": "01/25"},
]
users_details = [
    {"email": "johndoe@example.com", "name": "John Doe", "age": 30},
    {"email": "janesmith@example.com", "name": "Jane Smith", "age": 25},
]
books = [
    {"isbn": "9783161484100", "title": "Example Book", "author": "John Author"},
    {"isbn": "9781234567897", "title": "Another Book", "author": "Jane Writer"},
]
people = [
    {"ssn": "123-45-6789", "name": "John Doe", "birthDate": "1990-01-01"},
    {"ssn": "987-65-4321", "name": "Jane Smith", "birthDate": "1985-05-05"},
]


@app.get("/username/find/<string:username>")
def find_username(username):
    result = "Username is not available"
    for user in users:
        if user["username"] == username:
            result = "Username is available"
    return jsonify({"result": result})


@app.get("/credit-cards/find")
def credit_card_find():
    card_number = request.args.get("cardNumber", 0)
    result = {}
    for card in credit_cards:
        if card["number"] == card_number:
            print(card)
            result = card
    return jsonify({"creditCard": result})


@app.get("/emails/find")
def email_find():
    email = request.args.get("email")
    result = {}
    for user in users_details:
        if user["email"] == email:
            result = user
    return jsonify({"user": result})


@app.get("/books/find")
def book_find():
    isbn = request.args.get("isbn")
    result = {}
    for book in books:
        if book["isbn"] == isbn:
            result = book
    return jsonify({"book": result})


@app.get("/ssn/find")
def ssn_find():
    ssn = request.args.get("ssn")
    result = {}
    for user in people:
        if user["ssn"] == ssn:
            result = user
    return jsonify({"person": result})


# PY3.1 - HW2
phones = [
    {"number": "123-456-7890", "owner": "Alice", "type": "mobile"},
    {"number": "987-654-3210", "owner": "Bob", "type": "home"},
]
accounts = [
    {"number": "111122223333", "holder": "Charlie", "balance": 5000},
    {"number": "444455556666", "holder": "Dave", "balance": 3000},
]
licenses = [
    {"number": "D1234567", "name": "Eve", "expiryDate": "2026-04-01"},
    {"number": "D7654321", "name": "Frank", "expiryDate": "2024-11-15"},
]
employees = [
    {"id": "E1234", "name": "Grace", "department": "Engineering"},
    {"id": "E5678", "name": "Hank", "department": "Marketing"},
]
orders = [
    {"id": "ORD12345", "customerName": "Ivy", "totalAmount": 150},
    {"id": "ORD67890", "customerName": "Jake", "totalAmount": 200},
]


@app.get("/phones/find")
def find_phone():
    phone_number = request.args.get("phoneNumber")
    result = {}
    for phone in phones:
        if phone["number"] == phone_number:
            result = phone
    return jsonify({"phone": result})


@app.get("/accounts/find")
def find_account():
    account_number = request.args.get("accountNumber")
    result = {}
    for account in accounts:
        if account["number"] == account_number:
            result = account
    return jsonify({"account": result})


@app.get("/licenses/find")
def find_license():
    li_number = request.args.get("licenseNumber")
    result = {}
    for li in licenses:
        if li["number"] == li_number:
            result = li
    return jsonify({"license": result})


@app.get("/employees/find")
def find_employee():
    employee_id = request.args.get("employeeId")
    result = {}
    for employee in employees:
        if employee["id"] == employee_id:
            result = employee
    return jsonify({"employee": result})


@app.get("/orders/find")
def find_order():
    order_id = request.args.get("orderId")
    result = {}
    for order in orders:
        if order["id"] == order_id:
            result = order
    return jsonify({"order": result})



# PY3.2 - HW1

library = [
    {"bookId": 1, "title": "1984", "dueDate": "2023-12-01", "isOverdue": True},
    {
        "bookId": 2,
        "title": "Brave New World",
        "dueDate": "2024-01-10",
        "isOverdue": False,
    },
    {
        "bookId": 3,
        "title": "Fahrenheit 451",
        "dueDate": "2023-11-15",
        "isOverdue": True,
    },
]
bookList = [
    {
        "bookId": 1,
        "title": "Python Programming",
        "author": "John Doe",
        "completed": False,
        "url": "<https://shorturl.to/python>",
        "isFavorite": False,
    },
    {
        "bookId": 2,
        "title": "Flask Framework Guide",
        "author": "Jane Smith",
        "completed": True,
        "url": "<https://shorturl.to/flask>",
        "isFavorite": False,
    },
    {
        "bookId": 3,
        "title": "Machine Learning Basics",
        "author": "Alan Turing",
        "completed": False,
        "url": "<https://shorturl.to/ml>",
        "isFavorite": False,
    },
]
products = [
    {"productId": 1, "name": "Laptop", "inStock": True},
    {"productId": 2, "name": "Phone", "inStock": True},
    {"productId": 3, "name": "Tablet", "inStock": False},
]


@app.get("/library/remove-overdue")
def remove_overdue():
    result = []
    for book in library:
        if book["isOverdue"] == False:
            result.append(book)
    return result


@app.get("/book/favorite")
def mark_favorite_book():
    book_id = int(request.args.get("bookId"))
    is_favorite = request.args.get("isFavorite") == "true"
    for book in bookList:
        if book["bookId"] == book_id:
            book["isFavorite"] = is_favorite
    return bookList

@app.get("/book/update")
def book_update_complete():
    book_id = int(request.args.get("bookId"))
    completed = request.args.get("completed") == "true"
    for book in bookList:
        if book["bookId"] == book_id:
            book["completed"] = completed
    return bookList

@app.get("/books/remove-completed")
def remove_completed_book():
    result = []
    for book in bookList:
        if book["completed"]:
            result.append(book)
    return result


@app.get("/products/remove-out-of-stock")
def remove_out_of_stock():
    result = []
    for product in products:
        if  product["inStock"]:
            result.append(product)
    return result



# PY3.2 - HW2

movies = [
    {"id": 1, "title": "Inception", "genre": "Sci-Fi", "available": True},
    {"id": 2, "title": "Titanic", "genre": "Romance", "available": False},
    {"id": 3, "title": "The Dark Knight", "genre": "Action", "available": True},
    {"id": 4, "title": "The Matrix", "genre": "Sci-Fi", "available": True},
]
reviews = [
    {"id": 1, "product_id": 1, "rating": 4, "content": "Great laptop for work."},
    {"id": 2, "product_id": 2, "rating": 5, "content": "Excellent sound quality."},
    {"id": 3, "product_id": 3, "rating": 3, "content": "Works fine but feels cheap."},
    {"id": 4, "product_id": 4, "rating": 4, "content": "Good value for money."},
]


@app.get("/movies/update")
def update_movie():
    id_ = int(request.args.get("id"))
    available = request.args.get("available") == "true"
    for movie in movies:
        if movie["id"] == id_:
            movie["available"] = available
    return movies


@app.get("/movies/delete")
def delete_movie():
    result = []
    id_ = int(request.args.get("id"))
    for movie in movies:
        if movie["id"] != id_:
            result.append(movie)
    return result


@app.get("/reviews/update")
def update_review():
    id_ = int(request.args.get("id"))
    content = request.args.get("content")
    for review in reviews:
        if review["id"] == id_:
            review["content"] = content
    return reviews


@app.get("/reviews/delete")
def delete_review():
    id_ = int(request.args.get("product_id"))
    result = []
    for review in reviews:
        if review["product_id"] != id_:
            result.append(review)
    return result


@app.get("/movies/update-genre")
def update_genre_movie():
    id_ = int(request.args.get("id"))
    genre = request.args.get("genre")
    for movie in movies:
        if movie["id"] == id_:
            movie["genre"] = genre
    return movies


@app.get("/movies/delete-by-genre")
def delete_movie_by_genre():
    genre = request.args.get("genre")
    result = []
    for movie in movies:
        if movie["genre"] != genre:
            result.append(movie)
    return result


# PY3.3 - HW1
movies = [
    {"id": 1, "title": "Inception", "genre": "Sci-Fi", "available": True},
    {"id": 2, "title": "Titanic", "genre": "Romance", "available": False},
    {"id": 3, "title": "The Dark Knight", "genre": "Action", "available": True},
    {"id": 4, "title": "The Matrix", "genre": "Sci-Fi", "available": True},
]
students = [
    {"id": 1, "name": "Anna", "major": "Computer Science", "gpa": 3.8},
    {"id": 2, "name": "Ben", "major": "Physics", "gpa": 3.4},
    {"id": 3, "name": "Clara", "major": "Engineering", "gpa": 3.9},
    {"id": 4, "name": "David", "major": "Computer Science", "gpa": 2.8},
]
products = [
    {"id": 1, "name": "Laptop", "category": "Electronics", "price": 1200},
    {"id": 2, "name": "Headphones", "category": "Electronics", "price": 100},
    {"id": 3, "name": "Coffee Maker", "category": "Appliances", "price": 150},
    {"id": 4, "name": "Smartphone", "category": "Electronics", "price": 800},
]
reviews = [
    {"id": 1, "product_id": 1, "rating": 4, "content": "Great laptop for work."},
    {"id": 2, "product_id": 2, "rating": 5, "content": "Excellent sound quality."},
    {"id": 3, "product_id": 3, "rating": 3, "content": "Works fine but feels cheap."},
    {"id": 4, "product_id": 4, "rating": 4, "content": "Good value for money."},
]


@app.get("/movies/filter")
def get_movies():
    genre = request.args.get("genre")
    available = request.args.get("available") == "true"
    result = []
    for movie in movies:
        if movie["genre"] == genre and movie["available"] == available:
            result.append(movie)
    return result


@app.get("/students/find")
def get_students():
    major = request.args.get("major")
    min_gpa = float(request.args.get("min_gpa"))
    max_gpa = float(request.args.get("max_gpa"))
    result = []
    for student in students:
        if (
            student["major"] == major
            and student["gpa"] >= min_gpa
            and student["gpa"] <= max_gpa
        ):
            result.append(student)
    return result


@app.get("/products/delete")
def delete_product_category():
    category = request.args.get("category")
    price = int(request.args.get("price"))
    result = []
    for product in products:
        if product["category"] != category or product["price"] != price:
            result.append(product)
    return result


@app.get("/reviews/search")
def get_reviews():
    product_id = int(request.args.get("product_id"))
    rating = int(request.args.get("rating"))
    result = []
    for review in reviews:
        if review["product_id"] == product_id and review["rating"] == rating:
            result.append(review)
    return result
"""

# PY3.3 - HW2

customers = [
    {"id": 1, "name": "Alice", "age": 30, "city": "New York", "membership": "Premium"},
    {"id": 2, "name": "Bob", "age": 45, "city": "Los Angeles", "membership": "Basic"},
    {"id": 3, "name": "Eve", "age": 28, "city": "San Francisco", "membership": "Gold"},
    {"id": 4, "name": "Frank", "age": 60, "city": "Chicago", "membership": "Premium"},
]
cars = [
    {"id": 1, "make": "Toyota", "model": "Camry", "year": 2020, "price": 25000},
    {"id": 2, "make": "Honda", "model": "Civic", "year": 2019, "price": 22000},
    {"id": 3, "make": "Ford", "model": "Mustang", "year": 2021, "price": 35000},
    {"id": 4, "make": "Chevrolet", "model": "Malibu", "year": 2020, "price": 23000},
]


@app.get("/customers/filter")
def get_customer():
    age = int(request.args.get("age"))
    membership = request.args.get("membership")
    result = []
    for customer in customers:
        if customer["age"] == age and customer["membership"] == membership:
            result.append(customer)
    return result


@app.get("/cars/find")
def find_car():
    price = int(request.args.get("price"))
    year = int(request.args.get("year"))
    result = []
    for car in cars:
        if car["price"] == price or car["year"] == year:
            result.append(car)
    return result


@app.get("/customers/filterByCity")
def get_customer_by_city():
    city = request.args.get("city")
    membership = request.args.get("membership")
    result = []
    for customer in customers:
        if customer["city"] == city or customer['membership'] == membership:
            result.append(customer)
    return result


@app.get("/cars/filter")
def get_cars_by_make_and_year():
    make = request.args.get("make")
    year = int(request.args.get("year"))
    result = []
    for car in cars:
        if car["make"] == make and car["year"] == year:
            result.append(car)
    return result


@app.get("/customers/find")
def get_customer_by_age():
    age = int(request.args.get("age"))
    city = request.args.get("city")
    result = []
    for customer in customers:
        if customer["age"] == age or customer["city"] == city:
            result.append(customer)
    return result


if __name__ == "__main__":
    app.run(debug=True)
