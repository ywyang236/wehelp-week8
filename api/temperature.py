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
    print(dataList)
    startTime0 = dataList[0]['startTime']
    endTime0 = dataList[0]['endTime']
    timeDescription0 = startTime0[11:16] + '-' + endTime0[11:16]
    startTime1 = dataList[1]['startTime']
    endTime1 = dataList[1]['endTime']
    timeDescription1 = startTime1[11:16] + '-' + endTime1[11:16]
    startTime2 = dataList[2]['startTime']
    endTime2 = dataList[2]['endTime']
    timeDescription2 = startTime2[11:16] + '-' + endTime2[11:16]
    period_type_one = [
        {
            "description": "今日白天",
            "startTime": startTime0,
            "endTime": endTime0,
            "descriptionTime": timeDescription0
        },
        {
            "description": "今夜至明晨",
            "startTime": startTime1,
            "endTime": endTime1,
            "descriptionTime": timeDescription1
        },
        {
            "description": "明日白天",
            "startTime": startTime2,
            "endTime": endTime2,
            "descriptionTime": timeDescription2
        }
    ]

    # 5-17是用period_type_one
    # 0-5點period_type_two要修正減一天時間，因為是前一天的23點更新資料的，要以前一天日期去計算

    period_type_two = [
        {
            "description": "今晚至明晨",
            "startTime": startTime0,
            "endTime": endTime0,
            "descriptionTime": timeDescription0
        },
        {
            "description": "明日白天",
            "startTime": startTime1,
            "endTime": endTime1,
            "descriptionTime": timeDescription1
        },
        {
            "description": "明夜至後天清晨",
            "startTime": startTime2,
            "endTime": endTime2,
            "descriptionTime": timeDescription2
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
