from flask import *
import requests
import datetime
temperature_app = Blueprint("temperature_app", __name__)

# 取得所有測站的氣溫資料
# 
data_key = 'CWA-F2CD5749-135D-4AED-AB5D-6F4785E1AD73'
data_url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization="

def getDailyData(location_name):
    response = requests.get(data_url+data_key+"&locationName="+location_name)
    data = response.json()
    raw_data_list = data['records']['location'][0]['weatherElement']
    data_list = []
    for weather_data in raw_data_list:
        elementName = weather_data['elementName']
        time_list = weather_data['time']
        for time in time_list:
            parameter = time['parameter']
            new_data = {
                'elementName': elementName,
                'startTime': time['startTime'],
                'endTime': time['endTime'],
                'parameterName': parameter.get('parameterName'),
                'parameterValue': parameter.get('parameterValue'),
                'parameterUnit': parameter.get('parameterUnit')
            }
            
            new_data = handleSpecialWeatherData(new_data)

            data_list.append(new_data)
    
    new_weather_data = handleDataByTime(data_list)

    
    return {
        'location_name': location_name,
        'weather_data': new_weather_data
    }

def handleSpecialWeatherData(weather_data):
    if weather_data['elementName'] == 'PoP':
        weather_data['elementDescription'] = '降雨機率'
        weather_data['parameterDescription'] = weather_data['parameterName'] + '%'
            
    if weather_data['elementName'] == 'MinT':
        weather_data['elementDescription'] = '最低溫度'
        weather_data['parameterDescription'] = weather_data['parameterName'] + '°C'

    if weather_data['elementName'] == 'MaxT':
        weather_data['elementDescription'] = '最高溫度'
        weather_data['parameterDescription'] = weather_data['parameterName'] + '°C'

    if weather_data['elementName'] == 'Wx':
        weather_data['elementDescription'] = '天氣現象'
        weather_data['parameterDescription'] = weather_data['parameterValue'] 
        weather_data['wxDescription'] = weather_data['parameterName']
    return weather_data

def handleDataByTime(dataList):
    today = datetime.datetime.now()
    # 5/11/17/23
    if today.hour < 5:
         tomorrow = datetime.date(year=today.year, month=today.month, day=today.day-1)

    tomorrow = datetime.date(year=today.year, month=today.month, day=today.day+1)
    theDayAfterTomorrow = datetime.date(year=tomorrow.year, month=tomorrow.month, day=tomorrow.day+1)
    period_type_one = [{
            "description": "今日白天",
            "startTime": today.strftime("%Y-%m-%d") + (' 12:00:00' if today.hour >= 11 else ' 06:00:00'),
            "endTime": today.strftime("%Y-%m-%d") + ' 18:00:00',
            "descriptionTime": ('12:00-18:00' if today.hour >= 11 else '06:00-18:00')
        }, {
            "description": "今夜至明晨",
            "startTime": today.strftime("%Y-%m-%d") + ' 18:00:00',
            "endTime": tomorrow.strftime("%Y-%m-%d") + ' 06:00:00',
            "descriptionTime": '18:00-06:00'
        }, {
            "description": "明日白天",
            "startTime": tomorrow.strftime("%Y-%m-%d") + ' 06:00:00',
            "endTime": tomorrow.strftime("%Y-%m-%d") + ' 18:00:00',
            "descriptionTime": '06:00-18:00'
        }
    ]

    # 5-17是用period_type_one
    # 0-5點period_type_two要修正減一天時間，因為是前一天的23點更新資料的，要以前一天日期去計算
    period_type_two = [
        {
            "description": "今晚至明晨",
            "startTime": (today.strftime("%Y-%m-%d") + ' 18:00:00' if today.hour < 23 else tomorrow.strftime("%Y-%m-%d") + ' 00:00:00'),
            "endTime": tomorrow.strftime("%Y-%m-%d") + ' 06:00:00',
            "descriptionTime": '18:00 - 06:00' if today.hour < 23 else ' 00:00 - 06:00'
        },
        # {
        #     "description": "今晚至明晨",
        #     "startTime": today.strftime("%Y-%m-%d") + ' 00:00:00',
        #     "endTime": tomorrow.strftime("%Y-%m-%d") + ' 06:00:00',
        #     "descriptionTime": '00:00 - 06:00'
        # },
        {
            "description": "明日白天",
            "startTime": tomorrow.strftime("%Y-%m-%d") + ' 06:00:00',
            "endTime": tomorrow.strftime("%Y-%m-%d") + ' 18:00:00',
            "descriptionTime": '06:00 - 18:00'
        },
        {
            "description": "明夜至後天清晨",
            "startTime": tomorrow.strftime("%Y-%m-%d") + ' 18:00:00',
            "endTime": theDayAfterTomorrow.strftime("%Y-%m-%d") + ' 06:00:00',
            "descriptionTime": '18:00 - 06:00'
        }
    ]

    periodType = period_type_one if today.hour >= 5 and today.hour < 17 else period_type_two
   
    for period in periodType:
        periodWeatherData = []
        for data in dataList:
            periodStartTime = period['startTime']
            periodEndTime = period['endTime']
            dataStartTime = data['startTime']
            dataEndTime = data['endTime']
            elementName = data['elementName']
            if periodStartTime == dataStartTime and periodEndTime == dataEndTime:
                periodWeatherData.append(data)

                if elementName == 'PoP':
                    period['pop'] = data['parameterDescription']
                    period['popTitle'] = data['elementDescription']
    
                if elementName == 'MaxT':
                    period['maxT'] = data['parameterDescription']
                    period['maxTTitle'] = data['elementDescription']

                if elementName == 'MinT':
                    period['minT'] = data['parameterDescription']
                    period['minTTitle'] = data['elementDescription']

                if elementName == 'Wx':
                    period['wx'] = data['parameterDescription']
                    period['wxTitle'] = data['elementDescription']
                    period['wxDescription'] = data['wxDescription']

        # period['weatherData'] = periodWeatherData

    return periodType

@temperature_app.route("/api/temperature")
def get_daily_data():
    location_name = str(request.args.get("locationName", ""))
    result = getDailyData(location_name)
    return jsonify(result)
