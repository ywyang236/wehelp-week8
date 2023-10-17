from flask import *

temperature_app = Blueprint("temperature_app", __name__)

# 取得所有測站的氣溫資料
# @temperature_app.route("/api/temperature")