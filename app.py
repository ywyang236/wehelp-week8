from flask import *
from api.precipitation import precipitation_app
from api.temperature import temperature_app

app = Flask(__name__)
app.json.ensure_ascii = False
app.config["TEMPLATES_AUTO_RELOAD"] = True

# blueprints
app.register_blueprint(precipitation_app)
app.register_blueprint(temperature_app)

@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3500, debug=True)
