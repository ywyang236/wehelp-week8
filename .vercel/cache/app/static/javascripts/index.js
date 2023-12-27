// 按鈕左右移動
let listContent = document.querySelector('.scroll-area__content-container');
let scrollAmount = 200;

function moveContentLeft() {
    listContent.scrollLeft -= scrollAmount;
}

function moveContentRight() {
    listContent.scrollLeft += scrollAmount;
}

// 使用 fetch 取得行政地區資料
function fetchLocationData() {
    fetch('/api/location')
        .then(response => response.json())
        .then(data => {
            const locationElements = data.data.map(item => {
                const span = document.createElement('span');
                span.textContent = item.name;
                span.className = 'scroll-area__content-name';

                if (item.name === "臺北市") {
                    span.classList.add('active');
                }

                span.onclick = function () {
                    // 找到對應的SVG元素
                    let correspondingSVGElement = document.querySelector(`[name="${item.name}"]`);

                    if (correspondingSVGElement) {
                        // 模擬對SVG元素的點擊事件
                        correspondingSVGElement.dispatchEvent(new Event('click', { bubbles: true }));
                    }

                    // 移除其他 span 的 .active class
                    document.querySelectorAll('.scroll-area__content-name').forEach(el => el.classList.remove('active'));

                    // 給當前的 span 添加 .active class
                    span.classList.add('active');
                };
                return span;
            });

            const contentContainer = document.querySelector('.scroll-area__content-container');
            locationElements.forEach(el => contentContainer.appendChild(el));
        })
        .catch(error => {
            console.error("There was an error fetching the location data:", error);
        });
}

window.onload = fetchLocationData;

