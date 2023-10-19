// 天氣圖像
let getWeatherIcon = function (wx) {
    wx = parseInt(wx)
    // console.log(wx)
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
    return img
}

// 一天預報
let getData = function (src) {
    fetch(src)
    .then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data)
        let weatherData = data["weather_data"]
        // console.log(weatherData)
        weatherToday = weatherData["0"]
        weatherNight = weatherData["1"]
        weatherTmr = weatherData["2"]
        // console.log(weatherToday, weatherNight, weatherTmr)

            // 主畫面 > 總覽 > 圖片
            getWeatherIcon(weatherToday["wx"])
            overviewImg.style.backgroundImage = 'url(' + img + ')'

            // 主畫面 > 總覽 > 資料 > 名字
            infoAreaName.innerText = data["location_name"];

            // 主畫面 > 總覽 > 資料 > 日期時間 > 日期
            let weatherDate = weatherToday["endTime"].slice(0, 10)
            infoAreaDate.innerText = weatherDate;

            // 主畫面 > 總覽 > 資料 > 日期時間 > 時間
            infoAreaTime.innerText = weatherToday["descriptionTime"];
            const content_weatherDetail_overview = document.querySelector(".content__weatherDetail--overview")
            const info_areaDate = document.querySelector("#info__areaTime")
            if (info_areaDate.innerText == "00:00-06:00") {
                // content_weatherDetail_overview.style.boxShadow = "0 1px 5px 2px #E3F2FE"
            }
            else if (info_areaDate.innerText == "06:00-18:00") {
                // content_weatherDetail_overview.style.boxShadow = "0 1px 5px 2px #E3F2FE"
            }
            else {
                // content_weatherDetail_overview.style.boxShadow = "0 1px 5px 2px #E3F2FE"
            }

            // 主畫面 > 總覽 > 資料 > 細節 > 氣溫
            infoTemp_span.innerText = weatherToday["minT"] + " - " + weatherToday["maxT"]

            // 主畫面 > 總覽 > 資料 > 細節 > 降雨量
            infoRain_span.innerText = weatherToday["pop"]

            // 主畫面 > 細節 > 詳情 > 晚上 > 詳情 > 時段
            nightPeriod.innerText = weatherNight["descriptionTime"];
            const night__Period = document.querySelector("#night__Period")
            const night = document.querySelector(".night")
            const night__time = document.querySelector(".night__time")
            if (night__Period.innerText == "00:00-06:00") {
                night_time_t.innerText = "今夜明晨"
                night__time.style.backgroundColor = "#021217"
                // night.style.boxShadow = "0 1px 5px 2px #E3F2FE"
            }
            else if (night__Period.innerText == "06:00-18:00") {
                night_time_t.innerText = "明日白天"
                night__time.style.backgroundColor = "#16a8d4"
                // night.style.boxShadow = "0 1px 5px 2px #E3F2FE"
            }
            else {
                night_time_t.innerText = "晚上清晨"
                night__time.style.backgroundColor = "#093d4d"
                // night.style.boxShadow = "0 1px 5px 2px #E3F2FE"
            }

            // 主畫面 > 細節 > 詳情 > 晚上 > 詳情 > 氣溫
            nightTemp_span.innerText = weatherNight["minT"] + " - " + weatherNight["maxT"];

            // 主畫面 > 細節 > 詳情 > 晚上 > 詳情 > 降雨
            nightRain_span.innerText = weatherNight["pop"];

            // // 主畫面 > 細節 > 詳情 > 晚上 > 圖片
            // getWeatherIcon(weatherNight["wx"])
            // nightImg.style.backgroundImage = 'url(' + img + ')'

            // 主畫面 > 細節 > 詳情 > 白天 > 詳情 > 時段
            dayPeriod.innerText = weatherTmr["descriptionTime"];
            const day__Period = document.querySelector("#day__Period")
            const day = document.querySelector(".day")
            // console.log(day__Period)
            const day__time = document.querySelector(".day__time")
            if (day__Period.innerText == "00:00-06:00") {
                day_time_t.innerText = "今夜明晨"
                day__time.style.backgroundColor = "#021217"
                // day.style.boxShadow = "0 1px 5px 2px #021217"
            }
            else if (day__Period.innerText == "06:00-18:00") {
                day_time_t.innerText = "明日白天"
                day__time.style.backgroundColor = "#16a8d4"
                // day.style.boxShadow = "0 1px 5px 2px #E3F2FE"
            }
            else {
                day_time_t.innerText = "晚上清晨"
                day__time.style.backgroundColor = "#20496B"
                // day.style.boxShadow = "0 1px 5px 2px #093d4d"
            }

            // 主畫面 > 細節 > 詳情 > 白天 > 詳情 > 氣溫
            dayTemp_span.innerText = weatherTmr["minT"] + " - " + weatherTmr["maxT"];

            // 主畫面 > 細節 > 詳情 > 白天 > 詳情 > 降雨
            dayRain_span.innerText = weatherTmr["pop"];

            // // 主畫面 > 細節 > 詳情 > 白天 > 圖片
            // getWeatherIcon(weatherTmr["wx"])
            // dayImg.style.backgroundImage = 'url(' + img + ')'
        })
}

// 一周預報
let getWeekData = function (url) {
    fetch(url)
        .then((result) => {
            return result.json()
        }).then((response) => {
            // console.log(response)
            detail = response["detail"]
            // console.log(detail)
            for (i = 0; i < detail.length; i++) {
                // 主畫面 > 一周概括 > 每一天 > 星期幾
                let weekly_i_day = document.querySelector("#weekly_" + i + "_day")
                // console.log(weekly_i_day)
                weekly_i_day.innerText = detail[i]["endWeek"]

                // 主畫面 > 一周概括 > 每一天 > 圖片
                let weekly_i_img = document.querySelector("#weekly_" + i + "_img")
                getWeatherIcon(detail[i]["weatherCode"])
                weekly_i_img.style.backgroundImage = 'url(' + img + ')';

                // 主畫面 > 一周概括 > 每一天 > 氣溫
                let weekly_i_Temp = document.querySelector("#weekly_" + i + "_Temp")
                weekly_i_Temp.innerText = detail[i]["temperature"];
            }
        })
}

// 主畫面
const weatherDetail = document.querySelector(".weather-area__container")

// 主畫面 > 總覽
const detailOverview = document.createElement("div")
detailOverview.className = "content__weatherDetail--overview"
weatherDetail.appendChild(detailOverview)

// 主畫面 > 總覽 > 圖片
const overviewImg = document.createElement("div")
let img = "/static/images/weather/lightning.png";
// overviewImg.style.backgroundImage = 'url(' + img + ')'
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
// infoAreaName.innerText = data["location_name"];
infoMain.appendChild(infoAreaName)

// 主畫面 > 總覽 > 資料 > 日期時間
const infoAreaDT = document.createElement("div");
infoAreaDT.className = "info__areaDT"
infoMain.appendChild(infoAreaDT)

// 主畫面 > 總覽 > 資料 > 日期時間 > 日期
const infoAreaDate = document.createElement("span");
infoAreaDate.className = "info__areaDT span";
infoAreaDate.id = "info__areaDate";
// let weatherDate = weatherToday["endTime"].slice(0,10)
// infoAreaDate.innerText = weatherDate;
infoAreaDT.appendChild(infoAreaDate)

// 主畫面 > 總覽 > 資料 > 日期時間 > 時間
const infoAreaTime = document.createElement("span");
infoAreaTime.className = "info__areaDT span";
infoAreaTime.id = "info__areaTime";
// infoAreaTime.innerText = weatherToday["descriptionTime"];
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
// infoTemp_span.innerText = weatherToday["minT"] + " - " + weatherToday["maxT"]

// 主畫面 > 總覽 > 資料 > 細節 > 降雨量
const infoRain = document.createElement("div");
infoRain.id = "info__Rain";
infoRain.className = "title"
infoRain.innerHTML = `<div>降雨機率<br/><span></span></div>`;
infoDetail.appendChild(infoRain);
const infoRain_span = document.querySelector("#info__Rain span");
infoRain_span.className = "content"
// infoRain_span.innerText = weatherToday["pop"]

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
// night_time_t.innerText = "今夜明晨"
night_time.appendChild(night_time_t)

// 主畫面 > 細節 > 詳情 > 晚上 > 詳情
const night_info = document.createElement("div")
night_info.className = "night__info"
night.appendChild(night_info)

// 主畫面 > 細節 > 詳情 > 晚上 > 詳情 > 時段
const nightPeriod = document.createElement("div");
nightPeriod.id = "night__Period";
// nightPeriod.innerText = weatherNight["descriptionTime"];
night_info.appendChild(nightPeriod);

// 主畫面 > 細節 > 詳情 > 晚上 > 詳情 > 氣溫
const nightTemp = document.createElement("div");
nightTemp.id = "night__Temp";
nightTemp.innerHTML = `<div>氣溫：<span></span></div>`;
night_info.appendChild(nightTemp);
const nightTemp_span = document.querySelector("#night__Temp span");
// nightTemp_span.innerText = weatherNight["minT"] + " - " + weatherNight["maxT"];

// 主畫面 > 細節 > 詳情 > 晚上 > 詳情 > 降雨
const nightRain = document.createElement("div");
nightRain.id = "night__Rain";
nightRain.innerHTML = `<div>降雨機率：<span></span></div>`;
night_info.appendChild(nightRain);
const nightRain_span = document.querySelector("#night__Rain span");
// nightRain_span.innerText = weatherNight["pop"];

// 主畫面 > 細節 > 詳情 > 晚上 > 圖片
// const nightImg = document.createElement("div")
// let nighticon = "/static/images/weather/lightning.png";
// // nightImg.style.backgroundImage = 'url(' + nighticon + ')'
// nightImg.className = "night__img";
// night.appendChild(nightImg)

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
// dayPeriod.innerText = weatherTmr["descriptionTime"];
day_info.appendChild(dayPeriod);

// 主畫面 > 細節 > 詳情 > 白天 > 詳情 > 氣溫
const dayTemp = document.createElement("div");
dayTemp.id = "day__Temp";
dayTemp.innerHTML = `<div>氣溫：<span></span></div>`;
day_info.appendChild(dayTemp);
const dayTemp_span = document.querySelector("#day__Temp span");
// dayTemp_span.innerText = weatherTmr["minT"] + " - " + weatherTmr["maxT"];

// 主畫面 > 細節 > 詳情 > 白天 > 詳情 > 降雨
const dayRain = document.createElement("div");
dayRain.id = "day__Rain";
dayRain.innerHTML = `<div>降雨機率：<span></span></div>`;
day_info.appendChild(dayRain);
const dayRain_span = document.querySelector("#day__Rain span");
// dayRain_span.innerText = weatherTmr["pop"];

// // 主畫面 > 細節 > 詳情 > 白天 > 圖片
// const dayImg = document.createElement("div")
// let dayicon = "/static/images/weather/lightning.png";
// // dayImg.style.backgroundImage = 'url(' + dayicon + ')'
// dayImg.className = "day__img";
// day.appendChild(dayImg)

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
    // weekly_i_day.innerText = "星期一"
    weekly_i.appendChild(weekly_i_day)

    // 主畫面 > 一周概括 > 每一天 > 圖片
    const weekly_i_img = document.createElement("div");
    weekly_i_img.className = "weekly__img"
    weekly_i_img.id = "weekly_" + i + "_img";
    let weekly_i_image = "/static/images/weather/lightning.png"
    // weekly_i_img.style.backgroundImage = 'url(' + weekly_i_image + ')';
    weekly_i.appendChild(weekly_i_img)

    // 主畫面 > 一周概括 > 每一天 > 氣溫
    const weekly_i_Temp = document.createElement("div");
    weekly_i_Temp.className = "weekly__Temp"
    weekly_i_Temp.id = "weekly_" + i + "_Temp";
    // weekly_i_Temp.innerText = "20° - 23°";
    weekly_i.appendChild(weekly_i_Temp)
}

// 初始載入
getData("/api/temperature?locationName=臺北市")
getWeekData("/api/weekly_basic_data?location_name=臺北市")