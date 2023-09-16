from flask import Flask
from scipy.stats.distributions import chi2
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


@app.route('/chi/<prob>/<dl>/' , methods=['GET'])
def chi(prob,dl):
    print(prob,dl)
    value = chi2.ppf(float(prob), int(dl))
    print(value)
    return str(value)

@app.route("/")
def hello_world():
    return "<p>Simulacio-de-computadores-2023-2</p>"