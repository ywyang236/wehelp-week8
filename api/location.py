from flask import *
import requests
location_app = Blueprint("location_app", __name__)

data_key = 'CWA-F2CD5749-135D-4AED-AB5D-6F4785E1AD73'
data_url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization="


def getLocationData():
    response = requests.get(data_url+data_key)
    data = response.json()
    raw_data_list = data['records']['location']
    location_list = []

    for raw_data in raw_data_list:
        location = raw_data['locationName']
        if location not in location_list:
            location_list.append(location)

    return location_list

@location_app.route("/api/location")
def get_daily_data():
    location_list = getLocationData()
    return jsonify({'data' : location_list})