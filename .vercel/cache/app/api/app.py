# api/index.py
from flask import *
from .temperature import temperature_app
from .location import location_app
from .single_datatype import single_datatype_app
from .basic_datatype import basic_datatype_app
from datetime import datetime
import logging

app = Flask(__name__, template_folder="../templates")
app.json.ensure_ascii = False
app.config["TEMPLATES_AUTO_RELOAD"] = True

# blueprints
app.register_blueprint(temperature_app)
app.register_blueprint(location_app)
app.register_blueprint(single_datatype_app)
app.register_blueprint(basic_datatype_app)

# log
today = datetime.now().strftime("%Y-%m-%d")
logging.basicConfig(
    filename="./log/record-" + today + ".log",
    level=logging.DEBUG,
    encoding="utf-8",
    format=f"%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s",
)
## for console setting
console = logging.StreamHandler()
console.setLevel(logging.DEBUG)
## 設定輸出格式
formatter = logging.Formatter("%(name)-12s: %(levelname)-8s %(message)s")
## handler 設定輸出格式
console.setFormatter(formatter)
## 加入 hander 到 root logger
logging.getLogger("").addHandler(console)


@app.route("/")
def index():
    return render_template("index.html")


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=3500, debug=True)
