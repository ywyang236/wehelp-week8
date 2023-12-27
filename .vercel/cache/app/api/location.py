# api/location.py
from flask import *
import requests

location_app = Blueprint("location_app", __name__)

data_key = "CWB-63E16CA4-FA08-4227-922E-77E02CCB772C"
data_url = (
    "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization="
)


def getLocationData():
    response = requests.get(data_url + data_key)
    data = response.json()
    raw_data_list = data["records"]["location"]
    location_list = []

    for raw_data in raw_data_list:
        location = raw_data["locationName"]
        if location not in location_list:
            location_list.append(location)

    return location_list


@location_app.route("/api/location")
def get_daily_data():
    # location_list = getLocationData()

    location_list = [
        {"code": "01", "name": "基隆市"},
        {"code": "02", "name": "臺北市"},
        {"code": "03", "name": "新北市"},
        {"code": "04", "name": "桃園市"},
        {"code": "05", "name": "新竹市"},
        {"code": "06", "name": "新竹縣"},
        {"code": "07", "name": "苗栗縣"},
        {"code": "08", "name": "臺中市"},
        {"code": "09", "name": "彰化縣"},
        {"code": "10", "name": "南投縣"},
        {"code": "11", "name": "雲林縣"},
        {"code": "12", "name": "嘉義市"},
        {"code": "13", "name": "嘉義縣"},
        {"code": "14", "name": "臺南市"},
        {"code": "15", "name": "高雄市"},
        {"code": "16", "name": "屏東縣"},
        {"code": "17", "name": "臺東縣"},
        {"code": "18", "name": "花蓮縣"},
        {"code": "19", "name": "宜蘭縣"},
        {"code": "20", "name": "澎湖縣"},
        {"code": "21", "name": "金門縣"},
        {"code": "22", "name": "連江縣"},
    ]

    return jsonify({"data": location_list})
