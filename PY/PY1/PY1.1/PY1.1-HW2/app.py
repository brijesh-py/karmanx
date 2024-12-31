from flask import Flask, request

app = Flask(__name__)

"""

@app.get("/custom-commit")
def custom_commit():
    type = request.args.get("type")
    message = request.args.get("message")
    return f"{type}: {message}"


@app.get("/certificate")
def certificate():
    first_name = request.args.get("firstName")
    last_name = request.args.get("lastName")
    course_name = request.args.get("courseName")
    message = f"This certification is awarded to {first_name} {last_name} for completing the course {course_name}"
    return message


@app.get("/autoreply")
def out_of_office_message():
    start_month = request.args.get("startMonth")
    end_month = request.args.get("endMonth")
    message = f"Dear customer, thank you for reaching out to me. 
Unfortunately, I'm out of office from {start_month} till {end_month}. Your enquiry will be resolved by another colleague."
    return message


@app.get("/secureurl")
def secure_url():
    domain = request.args.get("domain")
    return f"https://{domain}"


@app.get("/sendotp")
def send_otp():
    otp_code = request.args.get("otpCode")
    return f"Your OTP for account verification is {otp_code}. Do not share this with anyone"


@app.get("/welcome")
def new_user():
    first_name = request.args.get("firstName")
    email = request.args.get("email")
    message = f"Hey {first_name}. We're excited to have you here, we'll send future notifications to your registered mail ({email})"
    return message


@app.get("/github-profile")
def github_profile():
    username = request.args.get("userName")
    return f"https://github.com/{username}"


@app.get("/text-to-csv")
def test_to_csv():
    id_ = request.args.get("id")
    email = request.args.get("email")
    roll_number = request.args.get("rollNumber")
    return f"{id_}, {email}, {roll_number}"


#   PY 1.2 - HW1 


@app.get("/total-marks")
def total_marks():
    marks1 = request.args.get("marks1")
    marks2 = request.args.get("marks2")
    return str(float(marks1) + float(marks2))


@app.get("/total-weight")
def total_weight():
    weight1 = float(request.args.get("weight1"))
    weight2 = float(request.args.get("weight2"))
    weight3 = float(request.args.get("weight3"))
    return str(weight1 + weight2 + weight3)


# @app.get("/monthly-salary")
# def monthly_salary():
#     annual_salary = float(request.args.get("annualSalary"))
#     return str(annual_salary / 12)


@app.get("/total-pages")
def total_pages():
    pages_per_day = int(request.args.get("pagesPerDay"))
    days = int(request.args.get("days"))
    return str(pages_per_day * days)


@app.get("/currency-conversion")
def currency_conversion():
    exchange_rate = float(request.args.get("exchangeRate"))
    amount = float(request.args.get("amount"))
    return str(exchange_rate * amount)


@app.get("/average-sales")
def average_sales():
    sales1 = int(request.args.get("sales1"))
    sales2 = int(request.args.get("sales2"))
    sales3 = int(request.args.get("sales3"))
    total_sales = sales1 + sales2 + sales3
    return str(total_sales / 3)


# PY1.2 - HW2 


@app.get("/bmi")
def bmi():
    weight = float(request.args.get("weight"))
    height = float(request.args.get("height"))
    return f"Your BMI is {weight / (height * height)})"


@app.get("/checkout")
def checkout():
    product = request.args.get("product")
    units = int(request.args.get("units"))
    price = float(request.args.get("price"))
    total_price = units * price
    return f"Your total for {units} {product} is {total_price}"


@app.get("/grade")
def grade():
    maths = float(request.args.get("maths"))
    science = float(request.args.get("science"))
    english = float(request.args.get("english"))
    gradeInPercentage = ((maths + science + english) / 300) * 100
    return f"Your grade in percentage is {gradeInPercentage}%"


@app.get("/discounted-price")
def discounted_price():
    cart_total = float(request.args.get("cartTotal"))
    discount = float(request.args.get("discount"))
    price = cart_total - (cart_total * (discount / 100))
    return f"Result: Your bill amount is {price}"


@app.get("/split-bill")
def split_bill():
    bill_amount = float(request.args.get("billAmount"))
    number_of_friends = int(request.args.get("numberOfFriends"))
    price = bill_amount / number_of_friends
    return f"Result: Each friend owes Rs. {price} against the bill"


@app.get("/celsius-to-fahrenheit")
def celsius_to_fahrenheit():
    temperature = float(request.args.get("temperature"))
    fahrenheit = temperature * 9 / 5 + 32
    return f"Result: {fahrenheit} Fahrenheit"


@app.get("/monthly-salary")
def monthly_salary():
    pass
    hourly_wage = float(request.args.get("hourlyWage"))
    total_hours = float(request.args.get("totalHours"))
    monthlySalary = hourly_wage * total_hours
    return f"Result: Your monthly salary is ₹{monthlySalary}"


# PY1.3 - HW1 


@app.route("/check-whole-number", methods=["GET"])
def check_whole_number():
    number = int(request.args.get("number"))
    whole = "Number is not whole number"
    if number >= 0:
        whole = "Number is whole number"
    print(whole)
    return whole


@app.route("/check-equal", methods=["GET"])
def check_equal():
    num1 = int(request.args.get("num1"))
    num2 = int(request.args.get("num2"))
    result = "Number are not equal"
    if num1 == num2:
        result = "Number are equal"
    return result


@app.route("/check-active", methods=["GET"])
def check_active():
    isActive = request.args.get("isActive", "false") == "true"
    result = "User is not active"
    if isActive:
        result = "User is active"
    return result


@app.route("/check-discount", methods=["GET"])
def check_discount():
    cost = int(request.args.get("cost"))
    result = "User is not eligible for discount"
    if cost > 1000:
        result = "User is eligible for discount"
    return result


# @app.route("/check-experience", methods=["GET"])
# def check_experience():
#     years = int(request.args.get("years"))
#     result = "Person is fresher"
#     if years > 0:
#         result = "Person is experienced"
#     return result


@app.route("/check-result", methods=["GET"])
def check_result():
    marks = float(request.args.get("result"))
    result = "The grade is Fail"
    if marks > 80:
        result = "The grade is A"
    elif marks > 50:
        result = "The grade is B"
    return result


@app.route("/check-attendance", methods=["GET"])
def check_attendance():
    attendance = float(request.args.get("attendance"))
    result = "Attendance is Low"
    if attendance > 90:
        result = "Attendance is High"
    elif attendance > 50:
        result = "Attendance is Moderate"
    return result


@app.route("/check-rating", methods=["GET"])
def check_rating():
    stars = int(request.args.get("stars"))
    result = "Restaurant rating is Low"
    if stars > 4:
        result = "Restaurant rating is High"
    elif stars > 3:
        result = "Restaurant rating is Medium"

    return result


# PY1.3 - HW2 


@app.route("/check-bmi", methods=["GET"])
def check_bmi():
    weight = float(request.args.get("weight"))
    height = float(request.args.get("height"))
    return "BMI category is normal weight"


@app.route("/check-performance", methods=["GET"])
def check_performance():
    grade = float(request.args.get("grade"))
    result = "Poor"
    if grade >= 90:
        result = "excellent"
    elif grade >= 75:
        result = "good"
    elif grade >= 50:
        result = "average"

    return f"Academic performance is {result}"


@app.route("/check-age-group", methods=["GET"])
def check_age_group():
    age = float(request.args.get("age"))
    result = "Senior"
    if age <= 12:
        result = "Child"
    elif age <= 17:
        result = "Teenager"
    elif age <= 64:
        result = "Adult"
    return f"Age group is {result}"


@app.route("/check-loan-eligibility", methods=["GET"])
def check_loan_eligibility():
    credit_score = float(request.args.get("creditScore"))
    result = "Low"
    if credit_score >= 750:
        result = "High"
    elif credit_score >= 650:
        result = "Medium"
    return f"Loan eligibility is {result}"


@app.route("/check-tax-bracket", methods=["GET"])
def check_tax_bracket():
    income = float(request.args.get("income"))
    result = "30%"
    if income <= 500000:
        result = "10%"
    elif income <= 1000000:
        result = "15%"
    elif income <= 1500000:
        result = "20%"
    return f"You fall under the {result} tax bracket"


@app.route("/check-experience", methods=["GET"])
def check_experience():
    years_of_experience = float(request.args.get("yearsOfExperience"))
    result = "Expert"
    if years_of_experience <= 5:
        result = "Intermediate"
    return f"Experience level is {result}"



# PY 1.4 - HW1
def getWelcomeMessage():
    return "We will now learn Functions!"


@app.route("/welcome", methods=["GET"])
def welcome():
    return getWelcomeMessage()


def getGreetingMessage(username):
    return f"Hey, {username}! Are you ready to learn functions with us?"


@app.route("/greet", methods=["GET"])
def greet():
    username = request.args.get("username")
    return getGreetingMessage(username)


def checkYearsOfExp(years_of_exp):
    if years_of_exp > 0:
        return "You have some experience with functions. Great!"
    return "You will start writing functions in no time!"


@app.route("/message", methods=["GET"])
def message():
    years_of_exp = float(request.args.get("yearsOfExp"))
    return checkYearsOfExp(years_of_exp)


def getTime(days, hours):
    return str(days * hours)


@app.route("/hours", methods=["GET"])
def hours():
    days = int(request.args.get("days"))
    hours = int(request.args.get("hours"))
    return getTime(days=days, hours=hours)


def getModuleCompletion(username, has_completed):
    if has_completed:
        has_completed = "completed"
    else:
        has_completed = "not completed"
    return f"{username} has {has_completed} the modules"


@app.route("/module-completion-status", methods=["GET"])
def moduleCompletionStatus():
    username = request.args.get("username")
    has_completed = request.args.get("hasCompleted", "false") == "true"
    return getModuleCompletion(username, has_completed)


def getPersonalizedGreeting(name, city):
    return f"Hey, {name}! What's famous about {city}?"


@app.route("/personalized-greeting", methods=["GET"])
def personalizedGreeting():
    name = request.args.get("name")
    city = request.args.get("city")
    return getPersonalizedGreeting(name, city)


def findAge(year):
    return str(2024 - year)


@app.route("/find-age", methods=["GET"])
def findAges():
    birth_year = int(request.args.get("birthyear"))
    return findAge(birth_year)


def findRequiredTime(days, hours):
    result = "The time being dedicated is not sufficient for learning functions"
    if days * hours >= 30:
        result = "The time being dedicated is sufficient for learning functions"
    return result


@app.route("/is-time-sufficient", methods=["GET"])
def isTimeSufficient():
    days = int(request.args.get("days"))
    hours = int(request.args.get("hours"))
    return findRequiredTime(days, hours)


# PY 1.4 - HW2


def generateProfileURL(username):
    return f"https://github.com/{username}"


@app.route("/github-profile", methods=["GET"])
def githubProfile():
    username = request.args.get("username")
    return generateProfileURL(username)


def generateCertificate(first_name, last_name, course_name):
    return f"This certification is awarded to {first_name} {last_name} for completing the course {course_name}"


@app.get("/certificate")
def certificate():
    first_name = request.args.get("firstName")
    last_name = request.args.get("lastName")
    course_name = request.args.get("courseName")
    return generateCertificate(first_name, last_name, course_name)


def calculateGrade(maths, science, english):
    gradeInPercentage = ((maths + science + english) / 300) * 100
    return f"Your grade in percentage is {gradeInPercentage}%"


@app.route("/grade", methods=["GET"])
def grade():
    maths = float(request.args.get("maths"))
    science = float(request.args.get("science"))
    english = float(request.args.get("english"))
    return calculateGrade(maths, science, english)


def splitBill(bill_amount, number_of_friends):
    splitAmount = bill_amount / number_of_friends
    return f"Result: Each friend owes Rs. {splitAmount} against the bill"


@app.route("/split-bill", methods=["GET"])
def splitBills():
    bill_amount = float(request.args.get("billAmount"))
    number_of_friends = int(request.args.get("numberOfFriends"))
    return splitBill(bill_amount, number_of_friends)


def calculateSalary(total_hours, hourly_wage):
    monthlySalary = hourly_wage * total_hours
    return f"Result: Your monthly salary is ₹{monthlySalary}"


@app.route("/monthly-salary", methods=["GET"])
def monthlySalary():
    total_hours = float(request.args.get("totalHours"))
    hourly_wage = float(request.args.get("hourlyWage"))
    return calculateSalary(total_hours, hourly_wage)
"""


@app.get("/title-length")
def titleLength():
    title = request.args.get("title", "")
    return f" Assignment title length: {len(title)}"


@app.get("/extract-initials")
def extractInitials():
    name = request.args.get("name")
    name_arr = name.split(" ")
    result = ""
    for n in name_arr:
        result += n[0]
    return f"Student initials: {result}"


@app.get("/create-slug")
def createSlug():
    title = request.args.get("title", "")
    result = title.replace(" ", "-")
    return f"Assignment slug: {result}"


@app.get("/calculate-total-marks")
def calculateTotalMarks():
    marks1 = float(request.args.get("marks1"))
    marks2 = float(request.args.get("marks2"))
    marks3 = float(request.args.get("marks3"))
    result = marks1 + marks2 + marks3
    return f"Total marks: {result}"


@app.get("/calculate-average-marks")
def calculateAverageMarks():
    marks1 = float(request.args.get("marks1"))
    marks2 = float(request.args.get("marks2"))
    marks3 = float(request.args.get("marks3"))
    result = (marks1 + marks2 + marks3) / 3
    return f"Average marks: {result}"


@app.get("/calculate-grade")
def calculateGrade():
    total_marks = float(request.args.get("totalMarks"))
    grade = "F"
    if total_marks >= 90:
        grade = "A"
    elif total_marks >= 80:
        grade = "B"
    elif total_marks >= 70:
        grade = "C"
    elif total_marks >= 35:
        grade = "D"
    return f"Grade: {grade}"


@app.get("/check-pass-fail")
def checkPassOrFail():
    marks = float(request.args.get("marks"))
    result = "Fail"
    if marks >= 40:
        result = "Pass"
    return result


@app.get("/check-scholarship")
def checkScholarshipEligibility():
    marks = float(request.args.get("marks"))
    attendance = int(request.args.get("attendance"))
    result = "Not Eligible"
    if marks >= 85 and attendance >= 90:
        result = "Eligible"
    return f"{result} for scholarship."


@app.get("/calculate-late-penalty")
def calculateLatePenalty():
    days_late = int(request.args.get("daysLate"))
    penalty_per_day = int(request.args.get("penaltyPerDay"))
    result = days_late * penalty_per_day
    return f"Total Penalty: {result}"


@app.get("/estimate-study-hours")
def estimateStudyHours():
    daily_hours = int(request.args.get("dailyHours"))
    total_days = int(request.args.get("totalDays"))
    return f"Total Study hours: {daily_hours * total_days}"


@app.get("/recommend-topics")
def recommendTopics():
    topics_data = {
        "AI": ["Machine Learning", "Neural Networks", "Natural Language Processing"],
        "Web Development": ["HTML", "CSS", "JavaScript", "React"],
        "Data Science": ["Data Analysis", "Visualization", "Pandas", "NumPy"],
    }
    interest = request.args.get("interest")
    return f"Recommended Topics: {",".join(topics_data[interest])}"


if __name__ == "__main__":
    app.run(debug=True)
