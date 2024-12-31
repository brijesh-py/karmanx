from flask import Flask, request, make_response, jsonify

app = Flask(__name__)


@app.route("/whisper")
def index():
    name = request.args.get("name")
    return jsonify({"name": name})


@app.route("/productname")
def productName():
    companyName = request.args.get("companyName")
    productName = request.args.get("productName")
    return jsonify({"companyName": companyName, "productName": productName})


@app.get("/date")
def date():
    month = request.args.get("month")
    year = request.args.get("year")
    formattedDate = f"{month}/{year}"
    return formattedDate


@app.get("/greet")
def greet():
    city = request.args.get("city")
    return f"You live in {city}"


@app.get("/capital")
def get_capital():
    capital = request.args.get("capital")
    country = request.args.get("country")
    return f"{capital} is the capital of {country}"


@app.get("/email")
def get_email():
    first_name = request.args.get("firstName")
    last_name = request.args.get("lastName")
    domain = request.args.get("domain")
    return f"{first_name}.{last_name}@{domain}"


if __name__ == "__main__":
    app.run(debug=True)
