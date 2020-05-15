from flask import Flask, Response, request, render_template, current_app, jsonify


app = Flask(__name__)


### reload static to update cache
# !!! CMD + SHIF + R

# Access-Control-Allow-Origin header

class database:
    data = []
    def __init__(self):
        self.data = []

    def save(self, entry):
        self.data.append(entry)

    def fetch(self):
        return self.data

    def getLen(self):
        return len(self.data)

db = database()

@app.route("/", methods=["GET"])
def mainpage():
    return render_template("index.html", data="WelCUM ;)")



@app.route("/list", methods=["GET"])
def showList():
    data = db.fetch()
    return render_template("list.html", data=data)



#####===API ROUTES===######
API_V1_prefix = "/api/v1/"

@app.route(API_V1_prefix+"create", methods=["POST"])
def process():
    if not request.is_json:
        return "wrong data format", 500

    data = request.get_json()
    db.save(data)

    resp = {
        "len": db.getLen(),
        "test": "test"
    }
    return jsonify(resp)

@app.route(API_V1_prefix+"len", methods=["GET"])
def getLen():
    resp = {
        "len": db.getLen(),
        }
    return resp
    
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")