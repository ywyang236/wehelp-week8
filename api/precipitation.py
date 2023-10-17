from flask import *

precipitation_app = Blueprint("precipitation_app", __name__)

# 取得所有測站的降雨量資料
# @precipitation_app.route("/api/precipitation")
