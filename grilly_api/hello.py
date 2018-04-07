from flask import Flask
from flask import jsonify
app = Flask(__name__)

class Barbecue:
    Name = ""

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/barbecues")
def getBarbecues():
    b = Barbecue()
    b.Name = "Wammerl"
    return jsonify([ { "name": "Steak", "cookingLevels": [ { "name": "Raw", "requiredSeconds": 240, "turns": [ { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 60 } ] }, { "name": "Medium", "requiredSeconds": 360, "turns": [ { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 120 } ] }, { "name": "Well Done", "requiredSeconds": 480, "turns": [ { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 120 }, { "turnAfterSeconds": 120 } ] } ] }, { "name": "Käsegriller", "cookingLevels": [ { "name": "Hell", "requiredSeconds": 240, "turns": [ { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 60 } ] }, { "name": "Braun", "requiredSeconds": 360, "turns": [ { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 120 } ] }, { "name": "Dunkel", "requiredSeconds": 480, "turns": [ { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 30 }, { "turnAfterSeconds": 120 }, { "turnAfterSeconds": 120 } ] } ] } ])

if __name__ == "__main__":
    app.run()