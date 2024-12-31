from flask import Flask, jsonify, request
from json import load

app = Flask(__name__)

"""

# Book data
book = {
    "title": "The God of Small Things",
    "author": "Arundhati Roy",
    "publicationYear": 1997,
    "genre": "Novel",
    "isAvailable": True,
    "stock": 5,
}


@app.get("/book")
def getBook():
    return jsonify(book)


@app.get("/book/fulltitle-author")
def fullTitleAuthor():
    full_title_author = book["title"] + book["author"]
    return jsonify({"fullTitleAuthor": full_title_author})


@app.get("/book/genre-availability")
def genreAvailability():
    is_available = False
    if book["genre"]:
        is_available = True
    return jsonify({"genre": book["genre"], "isAvailable": is_available})


@app.get("/book/age")
def age():
    age = 2024 - book["publicationYear"]
    return jsonify({"age": age})


@app.get("/book/summary")
def bookSummary():
    summary = f"Title: {book['title']}, Author: {book['author']}, Genre: {book['genre']}, Published: {book['publicationYear']}"
    return jsonify({"summary": summary})


@app.get("/book/stock-status")
def stockStatus():
    return jsonify({"status": "In stock", "stock": book["stock"]})


# PY2.1 - HW2
github_public_data = {
    "username": "ankit123",
    "fullName": "Ankit Kumar",
    "email": "ankit@gmail.com",
    "repositories": 24,
    "gists": 12,
    "joinedOn": "Sep 2018",
}


@app.get("/github-profile")
def githubProfile():
    username = github_public_data["username"]
    return jsonify({"profileURL": f"https://github.com/{username}"})


@app.get("/github-public-email")
def githubPublicEmail():
    return jsonify({"publicEmail": github_public_data["email"]})


@app.get("/github-repos-count")
def githubReposCount():
    return jsonify({"reposCount": github_public_data["repositories"]})


@app.get("/github-gists-count")
def gistsCount():
    return jsonify({"gistsCount": github_public_data["gists"]})


@app.get("/github-user-bio")
def githubUserBio():
    return jsonify(
        {
            "fullName": github_public_data["fullName"],
            "joinedOn": github_public_data["joinedOn"],
            "email": github_public_data["email"],
        }
    )


@app.get("/github-repo-url")
def githubRepoURL():
    repo_name = request.args.get("repoName")
    url = f"https://github.com/{github_public_data["username"]}/{repo_name}"
    return jsonify({"repoURL": url})


# PY2.2 - HW1
@app.get("/high-temperatures")
def highTemperatures():
    dummy = [22, 26, 19, 30, 23, 28, 17, 31]
    result = []
    for temp in dummy:
        if temp > 25:
            result.append(temp)

    return result


@app.get("/low-prices")
def lowPrices():
    dummy = [80, 120, 95, 150, 60, 110]
    result = []
    for price in dummy:
        if 100 > price:
            result.append(price)
    return result


@app.get("/high-ratings")
def highRatings():
    dummy = [4.2, 3.8, 2.5, 4.7, 3.0, 4.9, 3.6]
    result = []
    for rating in dummy:
        if 3.5 < rating:
            result.append(rating)
    return result


@app.get("/long-indian-names")
def longIndianNames():
    dummy = ["Akshay", "Priyanka", "Arjun", "Anushka", "Rajesh", "Kavita"]
    result = []
    for name in dummy:
        if len(name) > 6:
            result.append(name)
    return result


@app.get("/cheaper-products")
def cheaperProducts():
    dummy = [10, 25, 50, 75, 100, 150, 200]
    filter_param = int(request.args.get("filterParam"))
    result = []
    for price in dummy:
        if filter_param > price:
            result.append(price)
    return result

# PY2.2 - HW2

# Sample data used for the exercises
numbers = [-10, -5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


@app.get("/prime-numbers")
def prime():
    prime_list = []
    for i in numbers:
        if i <= 1:
            continue
        else:
            for j in range(2, int(i / 2) + 1):
                if i % j == 0:
                    break
            else:
                prime_list.append(i)
    return prime_list


@app.get("/positive-numbers")
def positiveNumbers():
    result = []
    for number in numbers:
        if number >= 1:
            result.append(number)
    return result


@app.get("/negative-numbers")
def negativeNumbers():
    result = []
    for number in numbers:
        if number < 0:
            result.append(number)
    return result


@app.get("/odd-numbers")
def oddNumbers():
    result = []
    for number in numbers:
        if number % 2 != 0:
            result.append(number)
    return result


@app.get("/numbers-greater-than")
def numbersGreaterThen():
    value = int(request.args.get("value", 0))
    result = []
    for number in numbers:
        if number > value:
            result.append(number)
    return result


@app.get("/numbers-less-than")
def numbersLessThen():
    value = int(request.args.get("value", 0))
    result = []
    for number in numbers:
        if number < value:
            result.append(number)
    return result


# PY2.3 - HW1


@app.route("/employees/department/<string:department>", methods=["GET"])
def getEmployeeByDepartment(department):
    employees = [
        {"name": "Rahul Gupta", "department": "HR", "salary": 50000},
        {"name": "Sneha Sharma", "department": "Finance", "salary": 60000},
        {"name": "Priya Singh", "department": "Marketing", "salary": 55000},
        {"name": "Amit Kumar", "department": "IT", "salary": 65000},
    ]
    result = [
        employee for employee in employees if employee["department"] == department
    ]
    return result


@app.route("/bikes/mileage/<int:min_mileage>", methods=["GET"])
def sortBikesByMileage(min_mileage):
    bikes = [
        {"make": "Hero", "model": "Splendor", "mileage": 80},
        {"make": "Bajaj", "model": "Pulsar", "mileage": 60},
        {"make": "TVS", "model": "Apache", "mileage": 70},
    ]
    result = [bike for bike in bikes if bike["mileage"] > min_mileage]
    return result


@app.route("/bikes/make/<string:make>", methods=["GET"])
def sortBikesByMake(make):
    bikes = [
        {"make": "Hero", "model": "Splendor", "mileage": 80},
        {"make": "Bajaj", "model": "Pulsar", "mileage": 60},
        {"make": "TVS", "model": "Apache", "mileage": 70},
    ]
    result = [bike for bike in bikes if bike["make"] == make]
    return result


@app.route("/songs/rating/<int:min_rating>", methods=["GET"])
def sortSongsByRating(min_rating):
    songs = [
        {"title": "Tum Hi Ho", "genre": "Romantic", "rating": 4},
        {"title": "Senorita", "genre": "Pop", "rating": 5},
        {"title": "Dil Chahta Hai", "genre": "Bollywood", "rating": 3},
    ]
    result = [song for song in songs if song["rating"] > min_rating]
    return result


@app.route("/songs/genre/<string:genre>", methods=["GET"])
def sortSongsByGenre(genre):
    songs = [
        {"title": "Tum Hi Ho", "genre": "Romantic", " rating": 4},
        {"title": "Senorita", "genre": "Pop", " rating": 5},
        {"title": "Dil Chahta Hai", "genre": "Bollywood", " rating": 3},
    ]
    result = [song for song in songs if song["genre"] == genre]
    return result


@app.route("/tasks/status/<string:status>", methods=["GET"])
def sortTasksByStatus(status):
    tasks = [
        {"taskId": 1, "taskName": "Prepare Presentation", "status": "pending"},
        {"taskId": 2, "taskName": "Attend Meeting", "status": "in-progress"},
        {"taskId": 3, "taskName": "Submit Report", "status": "completed"},
    ]
    result = [task for task in tasks if task["status"] == status]
    return result

# PY2.3 - HW2

products = [
    {"name": "Product A", "inStock": True},
    {"name": "Product B", "inStock": False},
    {"name": "Product C", "inStock": True},
    {"name": "Product D", "inStock": False},
]


@app.get("/in-stock-products")
def sortProductsByIsInStock():
    result = [product for product in products if product["inStock"]]
    return result


users = [
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 30},
    {"name": "Charlie", "age": 17},
    {"name": "Dave", "age": 16},
]


@app.get("/adult-users")
def adultUsers():
    result = [user for user in users if user["age"] >= 18]
    return result


productPrices = [
    {"name": "Product A", "price": 50},
    {"name": "Product B", "price": 150},
    {"name": "Product C", "price": 200},
    {"name": "Product D", "price": 90},
]


@app.get("/expensive-products")
def expensiveProducts():
    price = float(request.args.get("price"))
    result = [product for product in productPrices if product["price"] > price]
    return result


articles = [
    {"title": "Article A", "wordCount": 400},
    {"title": "Article B", "wordCount": 600},
    {"title": "Article C", "wordCount": 700},
    {"title": "Article D", "wordCount": 300},
]


@app.get("/long-articles")
def logArticles():
    min_words = int(request.args.get("minWords"))
    result = [article for article in articles if article["wordCount"] > min_words]
    return result


movies = [
    {"title": "Movie A", "rating": 8.5},
    {"title": "Movie B", "rating": 7.0},
    {"title": "Movie C", "rating": 9.0},
    {"title": "Movie D", "rating": 6.5},
]


@app.get("/high-rated-movies")
def highRatedMovies():
    rating = float(request.args.get("rating"))
    result = [movie for movie in movies if movie["rating"] > rating]
    return result


employees = [
    {"name": "Employee A", "experience": 3},
    {"name": "Employee B", "experience": 6},
    {"name": "Employee C", "experience": 10},
    {"name": "Employee D", "experience": 2},
]


@app.get("/experienced-employees")
def experiencedEmployees():
    years = int(request.args.get("years"))
    result = [employee for employee in employees if employee["experience"] > years]
    return result

# PY2.4 - HW1


heights = [160, 175, 180, 165, 170]


@app.get("/heights/sort-ascending")
def sortHeighByAsc():
    heights_copy = heights.copy()
    heights_copy.sort()
    return heights_copy


@app.get("/heights/sort-descending")
def sortHeighByDesc():
    heights_copy = heights.copy()
    heights_copy.reverse()
    return heights_copy


employees = [
    {"name": "Rahul", "employeeId": 101, "salary": 50000},
    {"name": "Sita", "employeeId": 102, "salary": 60000},
    {"name": "Amit", "employeeId": 103, "salary": 45000},
]


def get_employee(employee):
    return employee["salary"]


@app.get("/employees/sort-by-salary-descending")
def sortBySalaryDescending():
    employees_copy = employees.copy()
    employees_copy.sort(key=get_employee, reverse=True)
    return employees_copy


books = [
    {"title": "The God of Small Things", "author": "Arundhati Roy", "pages": 340},
    {"title": "The White Tiger", "author": "Aravind Adiga", "pages": 321},
    {"title": "The Palace of Illusions", "author": "Chitra Banerjee", "pages": 360},
]


def get_book(book):
    return book["pages"]


@app.get("/books/sort-by-pages-ascending")
def booksByPagesAscending():
    books_copy = books.copy()
    books_copy.sort(key=get_book)
    return books_copy 
"""

# PY2.4 - HW2

books = [
    {"title": "Moby Jonas", "author": "Herman Melville", "publication_year": 2023},
    {"title": "1984", "author": "George Orwell", "publication_year": 1984},
    {
        "title": "A Tale of Two Cities",
        "author": "Charles Jonas",
        "publication_year": 2000,
    },
]


def get_book(book):
    return book["publication_year"]


@app.get("/books/sort-by-year")
def sortBooksByYear():
    books_copy = books.copy()
    books_copy.sort(key=get_book)
    return books_copy


employees = [
    {"name": "John", "salary": 75000},
    {"name": "Doe", "salary": 30000},
    {"name": "Jane", "salary": 50000},
]


def get_employee(employee):
    return employee["salary"]


@app.get("/employees/sort-by-salary")
def sortBySalaryDescending():
    employees_copy = employees.copy()
    employees_copy.sort(key=get_employee, reverse=True)
    return employees_copy


products = [
    {"name": "Product A", "price": 15},
    {"name": "Product B", "price": 25},
    {"name": "Product C", "price": 10},
]


def get_product(product):
    return product["price"]


@app.get("/products/sort-by-price")
def sortProductsByPrice():
    products_copy = products.copy()
    products_copy.sort(key=get_product)
    return products_copy


events = [
    {"name": "Event A", "date": "2023-05-01"},
    {"name": "Event B", "date": "2023-01-01"},
    {"name": "Event C", "date": "2023-12-01"},
]


def get_event_by_date(event):
    return event["date"]


@app.get("/events/sort-by-date")
def sortEventsByDate():
    events_copy = events.copy()
    events_copy.sort(key=get_event_by_date)
    return events_copy


movies = [
    {"title": "Movie A", "rating": 9.0},
    {"title": "Movie C", "rating": 7.0},
    {"title": "Movie B", "rating": 8.5},
]


def get_movie_by_rating(movie):
    return movie["rating"]


@app.get("/movies/sort-by-rating")
def sortMoviesByRating():
    movies_copy = movies.copy()
    movies_copy.sort(key=get_movie_by_rating, reverse=True)
    return movies_copy


customers = [
    {"name": "Customer A", "lastPurchase": "2023-06-15"},
    {"name": "Customer B", "lastPurchase": "2023-11-01"},
    {"name": "Customer C", "lastPurchase": "2023-03-10"},
]


def get_customer_by_purchase(customer):
    return customer["lastPurchase"]


@app.get("/customers/sort-by-last-purchase")
def sortCustomerByLastPurchase():
    customers_copy = customers.copy()
    customers_copy.sort(key=get_customer_by_purchase, reverse=True)
    return customers_copy


if __name__ == "__main__":
    app.run(debug=True)
