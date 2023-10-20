// 一天的時間區分和顯示
let getTimeDisplay = function(p){
    let t
    let c
    if (p == "12:00 - 18:00"){
        t = "今日白天"
        c = "#16a8d4"
    }
    else if (p == "00:00 - 06:00") {
        t = "今夜明晨"
        c = "#021217"
    }
    else if (p == "06:00 - 18:00") {
        t = "明日白天"
        c = "#16a8d4"
    }
    else if (p == "18:00 - 06:00") {
        t = "晚上清晨"
        c = "#20496B"
    }
    return {"text" : t, "color" : c}
}

// 天氣圖像分類和顯示
let getWeatherIcon = function (wx,t) {
    wx = parseInt(wx)
    if (t == "06:00 - 18:00" || t == "12:00 - 18:00"){
        if ([15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41].includes(wx)) {
            img = "/static/images/weather/isThunderstorm.svg"
        }
        else if ([1].includes(wx)) {
            img = "/static/images/weather/isClear.svg"
        }
        else if ([25, 26, 27, 28].includes(wx)) {
            img = "/static/images/weather/isCloudyFog.svg"
        }
        else if ([2, 3, 4, 5, 6, 7].includes(wx)) {
            img = "/static/images/weather/isCloudy.svg"
        }
        else if ([24].includes(wx)) {
            img = "/static/images/weather/isFog.svg"
        }
        else if ([8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39].includes(wx)) {
            img = "/static/images/weather/isPartiallyClearWithRain.svg"
        }
        else if ([23, 37, 42].includes(wx)) {
            img = "/static/images/weather/isSnowing.svg"
        }
    }
    else {
        if ([15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41].includes(wx)) {
            img = "/static/images/weather/isThunderstormN.svg"
        }
        else if ([1].includes(wx)) {
            img = "/static/images/weather/isClearN.svg"
        }
        else if ([25, 26, 27, 28].includes(wx)) {
            img = "/static/images/weather/isCloudyFogN.svg"
        }
        else if ([2, 3, 4, 5, 6, 7].includes(wx)) {
            img = "/static/images/weather/isCloudyN.svg"
        }
        else if ([24].includes(wx)) {
            img = "/static/images/weather/isFogN.svg"
        }
        else if ([8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39].includes(wx)) {
            img = "/static/images/weather/isPartiallyClearWithRainN.svg"
        }
        else if ([23, 37, 42].includes(wx)) {
            img = "/static/images/weather/isSnowing.svg"
        }
    }
    return img
}

// 一天預報
let getData = function (src) {
    fetch(src)
    .then((res) => {
        return res.json()
    }).then((data) => {
        let weatherData = data["weather_data"]
        weatherToday = weatherData["0"]
        weatherNight = weatherData["1"]
        weatherTmr = weatherData["2"]

            // 主畫面 > 總覽 > 圖片
            getWeatherIcon(weatherToday["wx"], weatherToday["descriptionTime"])
            overviewImg.style.backgroundImage = 'url(' + img + ')'

            // 主畫面 > 總覽 > 資料 > 名字
            infoAreaName.innerText = data["location_name"];

            // 主畫面 > 總覽 > 資料 > 日期時間 > 日期
            let weatherDate = weatherToday["startTime"].slice(0, 10)
            let yy = weatherDate.slice(0,4)
            let mm = weatherDate.slice(5,7)
            mm = String(mm).padStart(2, "0")
            let dd = weatherDate.slice(8,10)
            dd = String(dd).padStart(2, "0")
            let cleanWeatherDate = yy + " - " + mm + " - " + dd
            infoAreaDate.innerText = cleanWeatherDate;

            // 主畫面 > 總覽 > 資料 > 日期時間 > 時間
            infoAreaTime.innerText = weatherToday["descriptionTime"];

            // 主畫面 > 總覽 > 資料 > 細節 > 氣溫
            infoTemp_span.innerText = weatherToday["minT"] + " - " + weatherToday["maxT"]

            // 主畫面 > 總覽 > 資料 > 細節 > 降雨量
            infoRain_span.innerText = weatherToday["pop"]

            // 主畫面 > 細節 > 詳情 > 晚上 > 詳情 > 時段
            nightPeriod.innerText = weatherNight["descriptionTime"];
            const night__Period = document.querySelector("#night__Period")
            const night__time = document.querySelector(".night__time")
            getTimeDisplay(night__Period.innerText)
            let display = getTimeDisplay(night__Period.innerText)
            night_time_t.innerText = display["text"]
            night__time.style.backgroundColor = display["color"]

            // 主畫面 > 細節 > 詳情 > 晚上 > 詳情 > 氣溫
            nightTemp_span.innerText = weatherNight["minT"] + " - " + weatherNight["maxT"];

            // 主畫面 > 細節 > 詳情 > 晚上 > 詳情 > 降雨
            nightRain_span.innerText = weatherNight["pop"];

            // 主畫面 > 細節 > 詳情 > 白天 > 詳情 > 時段
            dayPeriod.innerText = weatherTmr["descriptionTime"];
            const day__Period = document.querySelector("#day__Period")
            const day__time = document.querySelector(".day__time")
            getTimeDisplay(day__Period.innerText)
            display = getTimeDisplay(day__Period.innerText)
            day_time_t.innerText = display["text"]
            day__time.style.backgroundColor = display["color"]

            // 主畫面 > 細節 > 詳情 > 白天 > 詳情 > 氣溫
            dayTemp_span.innerText = weatherTmr["minT"] + " - " + weatherTmr["maxT"];

            // 主畫面 > 細節 > 詳情 > 白天 > 詳情 > 降雨
            dayRain_span.innerText = weatherTmr["pop"];
        })
}

// 一周預報
let getWeekData = function (url) {
    fetch(url)
        .then((result) => {
            return result.json()
        }).then((response) => {
            detail = response["detail"]
            for (i = 0; i < detail.length; i++) {
                // 主畫面 > 一周概括 > 每一天 > 星期幾
                let weekly_i_day = document.querySelector("#weekly_" + i + "_day")
                weekly_i_day.innerText = detail[i]["endWeek"]

                // 主畫面 > 一周概括 > 每一天 > 圖片
                let weekly_i_img = document.querySelector("#weekly_" + i + "_img")
                getWeatherIcon(detail[i]["weatherCode"], "06:00 - 18:00")
                weekly_i_img.style.backgroundImage = 'url(' + img + ')';

                // 主畫面 > 一周概括 > 每一天 > 氣溫
                let weekly_i_Temp = document.querySelector("#weekly_" + i + "_Temp")
                weekly_i_Temp.innerText = detail[i]["temperature"];
            }
        })
}

// 初始載入
getData("/api/temperature?locationName=臺北市")
getWeekData("/api/weekly_basic_data?location_name=臺北市")

// 主畫面
const weatherDetail = document.querySelector(".weather-area__container")

// 主畫面 > 總覽
const detailOverview = document.createElement("div")
detailOverview.className = "content__weatherDetail--overview"
weatherDetail.appendChild(detailOverview)

// 主畫面 > 總覽 > 圖片
const overviewImg = document.createElement("div")
let img = "/static/images/weather/lightning.png";
overviewImg.className = "overview__img";
detailOverview.appendChild(overviewImg)

// 主畫面 > 總覽 > 資料
const overviewInfo = document.createElement("div");
overviewInfo.className = "overview__info"
detailOverview.appendChild(overviewInfo)

// 主畫面 > 總覽 > 資料 > 上排
const infoMain = document.createElement("div")
infoMain.className = "info__Main"
overviewInfo.appendChild(infoMain)

// 主畫面 > 總覽 > 資料 > 名字
const infoAreaName = document.createElement("div");
infoAreaName.className = "info__areaName";
infoMain.appendChild(infoAreaName)

// 主畫面 > 總覽 > 資料 > 日期時間
const infoAreaDT = document.createElement("div");
infoAreaDT.className = "info__areaDT"
infoMain.appendChild(infoAreaDT)

// 主畫面 > 總覽 > 資料 > 日期時間 > 日期
const infoAreaDate = document.createElement("span");
infoAreaDate.className = "info__areaDT span";
infoAreaDate.id = "info__areaDate";
infoAreaDT.appendChild(infoAreaDate)

// 主畫面 > 總覽 > 資料 > 日期時間 > 時間
const infoAreaTime = document.createElement("span");
infoAreaTime.className = "info__areaDT span";
infoAreaTime.id = "info__areaTime";
infoAreaDT.appendChild(infoAreaTime)

// 主畫面 > 總覽 > 資料 > 細節
const infoDetail = document.createElement("div");
infoDetail.className = "info__Detail";
overviewInfo.appendChild(infoDetail)

// 主畫面 > 總覽 > 資料 > 細節 > 氣溫
const infoTemp = document.createElement("div");
infoTemp.id = "info__temp";
infoTemp.className = "title"
infoTemp.innerHTML = `<div>氣溫<br/><span></span></div>`;
infoDetail.appendChild(infoTemp)
const infoTemp_span = document.querySelector("#info__temp span");
infoTemp_span.className = "content"

// 主畫面 > 總覽 > 資料 > 細節 > 降雨量
const infoRain = document.createElement("div");
infoRain.id = "info__Rain";
infoRain.className = "title"
infoRain.innerHTML = `<div>降雨機率<br/><span></span></div>`;
infoDetail.appendChild(infoRain);
const infoRain_span = document.querySelector("#info__Rain span");
infoRain_span.className = "content"

// 主畫面 > 細節
const dn = document.createElement("div");
dn.className = "dn";
weatherDetail.appendChild(dn)

// 主畫面 > 細節 > 詳情
const dn_info = document.createElement("div")
dn_info.className = "dn__info"
dn.appendChild(dn_info)

// 主畫面 > 細節 > 詳情 > 晚上
const night = document.createElement("div");
night.className = "night"
dn_info.appendChild(night)

// 主畫面 > 細節 > 詳情 > 晚上 > "晚上"
const night_time = document.createElement("div")
night_time.className = "night__time"
night.appendChild(night_time)

const night_time_t = document.createElement("span")
night_time.appendChild(night_time_t)

// 主畫面 > 細節 > 詳情 > 晚上 > 詳情
const night_info = document.createElement("div")
night_info.className = "night__info"
night.appendChild(night_info)

// 主畫面 > 細節 > 詳情 > 晚上 > 詳情 > 時段
const nightPeriod = document.createElement("div");
nightPeriod.id = "night__Period";
night_info.appendChild(nightPeriod);

// 主畫面 > 細節 > 詳情 > 晚上 > 詳情 > 氣溫
const nightTemp = document.createElement("div");
nightTemp.id = "night__Temp";
nightTemp.innerHTML = `<div>氣溫：<br/><span></span></div>`;
night_info.appendChild(nightTemp);
const nightTemp_span = document.querySelector("#night__Temp span");

// 主畫面 > 細節 > 詳情 > 晚上 > 詳情 > 降雨
const nightRain = document.createElement("div");
nightRain.id = "night__Rain";
nightRain.innerHTML = `<div>降雨機率：<br/><span></span></div>`;
night_info.appendChild(nightRain);
const nightRain_span = document.querySelector("#night__Rain span");

// 主畫面 > 細節 > 詳情 > 白天
const day = document.createElement("div");
day.className = "day"
dn_info.appendChild(day)

// 主畫面 > 細節 > 詳情 > 白天 > "白天"
const day_time = document.createElement("div")
day_time.className = "day__time"
day.appendChild(day_time)

const day_time_t = document.createElement("span")
day_time.appendChild(day_time_t)

// 主畫面 > 細節 > 詳情 > 白天 > 詳情
const day_info = document.createElement("div")
day_info.className = "day__info"
day.appendChild(day_info)

// 主畫面 > 細節 > 詳情 > 白天 > 詳情 > 時段
const dayPeriod = document.createElement("div");
dayPeriod.id = "day__Period";
day_info.appendChild(dayPeriod);

// 主畫面 > 細節 > 詳情 > 白天 > 詳情 > 氣溫
const dayTemp = document.createElement("div");
dayTemp.id = "day__Temp";
dayTemp.innerHTML = `<div>氣溫：<br/><span></span></div>`;
day_info.appendChild(dayTemp);
const dayTemp_span = document.querySelector("#day__Temp span");

// 主畫面 > 細節 > 詳情 > 白天 > 詳情 > 降雨
const dayRain = document.createElement("div");
dayRain.id = "day__Rain";
dayRain.innerHTML = `<div>降雨機率：<br/><span></span></div>`;
day_info.appendChild(dayRain);
const dayRain_span = document.querySelector("#day__Rain span");

// 主畫面 > 一周概括
const weekly = document.createElement("div")
weekly.className = "weekly"
weatherDetail.appendChild(weekly)

for (i = 0; i < 7; i++) {
    // 主畫面 > 一周概括 > 每一天
    const weekly_i = document.createElement("div")
    weekly_i.className = "weekly__each"
    weekly_i.id = "weekly__" + i
    weekly.appendChild(weekly_i)

    // 主畫面 > 一周概括 > 每一天 > 星期幾
    const weekly_i_day = document.createElement("div");
    weekly_i_day.className = "weekly__title"
    weekly_i_day.id = "weekly_" + i + "_day";
    weekly_i.appendChild(weekly_i_day)

    // 主畫面 > 一周概括 > 每一天 > 圖片
    const weekly_i_img = document.createElement("div");
    weekly_i_img.className = "weekly__img"
    weekly_i_img.id = "weekly_" + i + "_img";
    let weekly_i_image = "/static/images/weather/lightning.png"
    weekly_i.appendChild(weekly_i_img)

    // 主畫面 > 一周概括 > 每一天 > 氣溫
    const weekly_i_Temp = document.createElement("div");
    weekly_i_Temp.className = "weekly__Temp"
    weekly_i_Temp.id = "weekly_" + i + "_Temp";
    weekly_i.appendChild(weekly_i_Temp)
}