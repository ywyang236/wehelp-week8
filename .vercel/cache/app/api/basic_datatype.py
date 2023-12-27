# api/basic_datatype.py
from flask import *
from datetime import datetime
import requests

basic_datatype_app = Blueprint("basic_datatype_app", __name__)

data_key = "CWB-63E16CA4-FA08-4227-922E-77E02CCB772C"
data_url = (
    "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization="
)


def basic_data(location_name):
    response = requests.get(data_url + data_key + "&locationName=" + location_name)
    data = response.json()

    detail = data["records"]["locations"][0]["location"][0]
    weather_data = detail["weatherElement"][6]["time"]
    mintemp_data = detail["weatherElement"][8]["time"]
    maxtemp_data = detail["weatherElement"][12]["time"]

    time_detail = []
    for item in weather_data:
        date_format = "%Y-%m-%d %H:%M:%S"
        date_object = datetime.strptime(item["endTime"], date_format)
        end_time = date_object.time()
        end_weekday = date_object.weekday()

        week_list = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
        time_data = {
            "endDate": item["endTime"],
            "endWeek": week_list[end_weekday],
            "endTime": str(end_time),
        }
        time_detail.append(time_data)

    weather_detail = []
    for item in weather_data:
        weather_code = item["elementValue"][1]["value"]
        weather_detail.append(weather_code)

    mintemp_detail = []
    for item in mintemp_data:
        mintemp = item["elementValue"][0]["value"]
        mintemp_detail.append(mintemp)

    maxtemp_detail = []
    for item in maxtemp_data:
        maxtemp = item["elementValue"][0]["value"]
        maxtemp_detail.append(maxtemp)

    all_data = {"locationName": detail["locationName"], "description": []}

    for time, weather, mintemp, maxtemp in zip(
        time_detail, weather_detail, mintemp_detail, maxtemp_detail
    ):
        detail_data = {
            "time": time,
            "weather": weather,
            "temperature": mintemp + "° - " + maxtemp + "°",
        }
        all_data["description"].append(detail_data)

    return all_data


def choose_daytime_data(all_data):
    final_data = {"locationName": all_data["locationName"], "detail": []}

    for item in all_data["description"]:
        if item["time"]["endTime"] == "18:00:00":
            detail = {
                "temperature": item["temperature"],
                "endWeek": item["time"]["endWeek"],
                "weatherCode": item["weather"],
            }
            final_data["detail"].append(detail)

    return final_data


@basic_datatype_app.route("/api/weekly_basic_data")
def get_basic_data():
    location_name = str(request.args.get("location_name", ""))

    all_data = basic_data(location_name)
    final_data = choose_daytime_data(all_data)

    return jsonify(final_data)
