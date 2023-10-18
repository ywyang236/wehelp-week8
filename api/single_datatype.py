from flask import *
import requests
single_datatype_app = Blueprint("single_datatype_app", __name__)

data_key = "CWA-A66B5608-4EE6-4851-8CD5-CF7D4F70F4F0"
data_url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization="


def get_data(location_name, data_type):
    response = requests.get(data_url+data_key+"&locationName="+location_name)
    data = response.json()

    detail = data["records"]["locations"][0]["location"][0]
    data_time = detail["weatherElement"][data_type]["time"]

    clearData = {
		"locationName" : detail["locationName"],
		"longitude" : detail["lon"],
		"latitude" : detail["lat"],
		"description" : detail["weatherElement"][data_type]["description"],
		"time" : []
	}

    for item in data_time:
        timeData = {
            "startTime" : item["startTime"],
            "endTime" : item["endTime"],
            "result" : item["elementValue"][0]["value"],
            "measures" : item["elementValue"][0]["measures"]
        }
        clearData["time"].append(timeData)

    return clearData

@single_datatype_app.route("/api/weekly_data")
def get_weekly_data():
    location_name = str(request.args.get("location_name", ""))
    data_type = int(request.args.get("data_type", ""))

    finalData = get_data(location_name, data_type)
    return jsonify(finalData)