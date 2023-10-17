// 主畫面
const weatherDetail = document.querySelector(".weather-area__container")

// 主畫面 > 總覽
const detailOverview = document.createElement("div")
detailOverview.className = "content__weatherDetail--overview"
weatherDetail.appendChild(detailOverview)

// 主畫面 > 總覽 > 圖片
const overviewImg = document.createElement("div")
let img = "/static/images/weather/lightning.png";
overviewImg.style.backgroundImage = 'url(' + img + ')'
overviewImg.className = "overview__img";
detailOverview.appendChild(overviewImg)

// 主畫面 > 總覽 > 資料
const overviewInfo = document.createElement("div");
overviewInfo.className = "overview__info"
detailOverview.appendChild(overviewInfo)

// 主畫面 > 總覽 > 資料 > 名字
const infoAreaName = document.createElement("div");
infoAreaName.className = "info__areaName";
infoAreaName.innerText = "臺北市";
overviewInfo.appendChild(infoAreaName)

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
infoTemp_span.innerText = "25° - 30°"

// 主畫面 > 總覽 > 資料 > 細節 > 降雨量
const infoRain = document.createElement("div");
infoRain.id = "info__Rain";
infoRain.className = "title"
infoRain.innerHTML = `<div>降雨機率<br/><span></span></div>`;
infoDetail.appendChild(infoRain);
const infoRain_span = document.querySelector("#info__Rain span");
infoRain_span.className = "content"
infoRain_span.innerText = "10%"

// 主畫面 > 細節
const dn = document.createElement("div");
dn.className = "dn";
weatherDetail.appendChild(dn)

// 主畫面 > 細節 > 延伸綫
const line = document.createElement("div");
line.className = "line"
dn.appendChild(line)

// 主畫面 > 細節 > 詳情
const dn_info = document.createElement("div")
dn_info.className = "dn__info"
dn.appendChild(dn_info)

// 主畫面 > 細節 > 詳情 > 白天
const day = document.createElement("div");
day.className = "day"
dn_info.appendChild(day)

// 主畫面 > 細節 > 詳情 > 白天 > "白天"
const day_time = document.createElement("div")
day_time.className = "day__time"
day.appendChild(day_time)

const day_time_t = document.createElement("span")
day_time_t.innerText = "白"
day_time.appendChild(day_time_t)

const day_time_b = document.createElement("span")
day_time_b.innerText = "天"
day_time.appendChild(day_time_b)

// 主畫面 > 細節 > 詳情 > 白天 > 詳情
const day_info = document.createElement("div")
day_info.className = "day__info"
day.appendChild(day_info)

// 主畫面 > 細節 > 詳情 > 白天 > 詳情 > 時段
const dayPeriod = document.createElement("div");
dayPeriod.id = "day__Period";
dayPeriod.innerText = "06:00 - 18:00";
day_info.appendChild(dayPeriod);

// 主畫面 > 細節 > 詳情 > 白天 > 詳情 > 氣溫
const dayTemp = document.createElement("div");
dayTemp.id = "day__Temp";
dayTemp.innerHTML = `<div>氣溫：<span></span></div>`;
day_info.appendChild(dayTemp);
const dayTemp_span = document.querySelector("#day__Temp span");
dayTemp_span.innerText = "26° - 33°";

// 主畫面 > 細節 > 詳情 > 白天 > 詳情 > 降雨
const dayRain = document.createElement("div");
dayRain.id = "day__Rain";
dayRain.innerHTML = `<div>降雨機率：<span></span></div>`;
day_info.appendChild(dayRain);
const dayRain_span = document.querySelector("#day__Rain span");
dayRain_span.innerText = "10%";

// 主畫面 > 細節 > 詳情 > 白天 > 圖片
const dayImg = document.createElement("div")
let dayicon = "/static/images/weather/lightning.png";
dayImg.style.backgroundImage = 'url(' + dayicon + ')'
dayImg.className = "day__img";
day.appendChild(dayImg)

// 主畫面 > 細節 > 詳情 > 晚上
const night = document.createElement("div");
night.className = "night"
dn_info.appendChild(night)

// 主畫面 > 細節 > 詳情 > 晚上 > "晚上"
const night_time = document.createElement("div")
night_time.className = "night__time"
night.appendChild(night_time)

const night_time_t = document.createElement("span")
night_time_t.innerText = "晚"
night_time.appendChild(night_time_t)

const night_time_b = document.createElement("span")
night_time_b.innerText = "上"
night_time.appendChild(night_time_b)

// 主畫面 > 細節 > 詳情 > 晚上 > 詳情
const night_info = document.createElement("div")
night_info.className = "night__info"
night.appendChild(night_info)

// 主畫面 > 細節 > 詳情 > 晚上 > 詳情 > 時段
const nightPeriod = document.createElement("div");
nightPeriod.id = "night__Period";
nightPeriod.innerText = "18:00 - 06:00";
night_info.appendChild(nightPeriod);

// 主畫面 > 細節 > 詳情 > 晚上 > 詳情 > 氣溫
const nightTemp = document.createElement("div");
nightTemp.id = "night__Temp";
nightTemp.innerHTML = `<div>氣溫：<span></span></div>`;
night_info.appendChild(nightTemp);
const nightTemp_span = document.querySelector("#night__Temp span");
nightTemp_span.innerText = "20° - 23°";

// 主畫面 > 細節 > 詳情 > 晚上 > 詳情 > 降雨
const nightRain = document.createElement("div");
nightRain.id = "night__Rain";
nightRain.innerHTML = `<div>降雨機率：<span></span></div>`;
night_info.appendChild(nightRain);
const nightRain_span = document.querySelector("#night__Rain span");
nightRain_span.innerText = "15%";

// 主畫面 > 細節 > 詳情 > 晚上 > 圖片
const nightImg = document.createElement("div")
let nighticon = "/static/images/weather/lightning.png";
nightImg.style.backgroundImage = 'url(' + nighticon + ')'
nightImg.className = "night__img";
night.appendChild(nightImg)

// 主畫面 > 一周概括
const weekly = document.createElement("div")
weekly.className = "weekly"
weatherDetail.appendChild(weekly)

for (i=0 ; i<5 ; i++){
    // 主畫面 > 一周概括 > 每一天
    const weekly_i = document.createElement("div")
    weekly_i.className = "weekly__each"
    weekly_i.id = "weekly__" + i
    weekly.appendChild(weekly_i)

    // 主畫面 > 一周概括 > 每一天 > 星期幾
    const weekly_i_day = document.createElement("div");
    weekly_i_day.className = "weekly__title"
    weekly_i_day.id = "weekly_" + i + "_day";
    weekly_i_day.innerText = "星期一"
    weekly_i.appendChild(weekly_i_day)

    // 主畫面 > 一周概括 > 每一天 > 圖片
    const weekly_i_img = document.createElement("div");
    weekly_i_img.className = "weekly__img"
    let weekly_i_image = "/static/images/weather/lightning.png"
    weekly_i_img.style.backgroundImage = 'url(' + weekly_i_image + ')';
    weekly_i.appendChild(weekly_i_img)

    // 主畫面 > 一周概括 > 每一天 > 氣溫
    const weekly_i_Temp = document.createElement("div");
    weekly_i_Temp.className = "weekly__Temp"
    weekly_i_Temp.id = "weekly_" + i + "_Temp";
    weekly_i_Temp.innerText = "20° - 23°";
    weekly_i.appendChild(weekly_i_Temp)

    // // 主畫面 > 一周概括 > 每一天 > 降雨
    // const weekly_i_Rain = document.createElement("div");
    // weekly_i_Rain.className = "weekly__Rain"
    // weekly_i_Rain.id = "weekly_" + i + "_Rain";
    // weekly_i_Rain.innerText = "15%";
    // weekly_i.appendChild(weekly_i_Rain)
}