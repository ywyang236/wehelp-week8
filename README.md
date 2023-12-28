### 第七組 - 氣象資訊站

網址：http://34.211.88.122:3500//
成員：楊于葳（組長）、徐欣彤、陳佳欣、張嘉媛、丁育如

#### Demo

##### (１) 點擊地圖後左側會顯示相對應的資料

<img src="static/images/readme/taiwan.gif" width="800px" />

##### (２) 可根據上方列表選擇顯示，且地圖選擇可同時連動更新至列表

<img src="static/images/readme/location-list.gif" width="800px" />

##### (３) RWD 頁面展示（1200px 以下）

<img src="static/images/readme/rwd-1200.gif" width="400px" />

##### (４) RWD 頁面展示（640px 以下）

<img src="static/images/readme/rwd-640.gif" width="400px" />

#### 組內分工
- 組長／楊于葳 [<img src="static/images/readme/link.png" style="line-height:18px" height="18px"/>](https://github.com/ywyang236)
    - 取得團隊信任
    - 繪製網站設計圖初稿、建立基礎專案程式架構
    - 建立與整合團隊共識，在事情走到非預期結果之前即時導正
    - 設定專案開發邊界，讓每份努力都能在有限的時間內發揮最大的功效
    - 各項功能的整合連動，以及版面樣式設計調整

- 徐欣彤 [<img src="static/images/readme/link.png" style="line-height:18px" height="18px"/>](https://github.com/Angel-Tsui)
    - 整體版面RWD
    - 天氣預報的排版和資料顯示
        - 天氣圖形的分類和顯示
        - 一天，三個時段，每一個框均可根據時段互換，按照資料的時段調整顔色和内容
        - 一周的樣式佈局

- 陳佳欣 [<img src="static/images/readme/link.png" style="line-height:18px" height="18px"/>](https://github.com/stella0320)
    - 臺灣各縣市天氣預報 
    - 今明 36 小時天氣預報 API
    - 臺灣縣市資料 API
    - 專案部署到 AWS

- 張嘉媛 [<img src="static/images/readme/link.png" style="line-height:18px" height="18px"/>](https://github.com/Aliceeeee2023)
    - 臺灣各縣市一周天氣總資料 API
    - 臺灣各縣市一周基本天氣狀況 API
    - 處理 README Demo 及統整

- 丁育如 [<img src="static/images/readme/link.png" style="line-height:18px" height="18px"/>](https://github.com/aiwlulu)
    - 地圖繪製：負責繪製臺灣地圖，包括離島區域
    - 地圖互動及分群：開發互動功能，點擊特定地區時同時選取相關地區（例如：點擊臺東縣選擇臺東、綠島、蘭嶼）
    - 地圖連動行政區捲軸：實現捲軸功能，以實現地圖的行政區連動
