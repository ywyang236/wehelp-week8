let taiwanMap = document.querySelector(".taiwan-area__container");
let mouseDiv = document.createElement("div");
mouseDiv.className = "taiwan-area__mouse";
taiwanMap.appendChild(mouseDiv);

function handleMouseEvent(e) {
  let path = e.target.closest("path");
  if (path) {
    let { left, top } = taiwanMap.getBoundingClientRect();
    let relX = e.clientX - left;
    let relY = e.clientY - top;
    mouseDiv.style.left = `${relX}px`;
    mouseDiv.style.top = `${relY}px`;
    mouseDiv.style.display = "block";
    mouseDiv.textContent =
      path.getAttribute("name") || path.parentNode.getAttribute("name");
  }
}

taiwanMap.addEventListener("click", handleMouseEvent);

function handleMapClick(target) {
  let group = target.closest("g");

  if (group || target.classList.contains("taiwan-area__block")) {
    let mapName = group
      ? group.getAttribute("name")
      : target.getAttribute("name");

    document.querySelectorAll(".taiwan-area__block").forEach((path) => {
      path.classList.remove("taiwan-area__block--active");
    });

    if (group) {
      group.classList.add("taiwan-area__block--active");
    } else {
      target.classList.add("taiwan-area__block--active");
    }

    // temperature
    fetch(`/api/temperature?locationName=${mapName}`)
      .then((response) => response.json())
      .then((data) => {
        // data processing
        document.querySelector(".info__areaName").textContent =
          data.location_name;
        data.weather_data.forEach((item, index) => {
          if (index === 0) {
            document.querySelector(
              "#info__temp .content"
            ).textContent = `${item.minT} - ${item.maxT}`;
            document.querySelector("#info__Rain .content").textContent =
              item.pop;
          } else if (index === 1) {
            document.querySelector("#day__Period").textContent =
              item.descriptionTime;
            document.querySelector(
              "#day__Temp span"
            ).textContent = `${item.minT} - ${item.maxT}`;
            document.querySelector("#day__Rain span").textContent = item.pop;
          } else if (index === 2) {
            document.querySelector("#night__Period").textContent =
              item.descriptionTime;
            document.querySelector(
              "#night__Temp span"
            ).textContent = `${item.minT} - ${item.maxT}`;
            document.querySelector("#night__Rain span").textContent = item.pop;
          }
        });
      })
      .catch((error) => {
        console.error("Error calling temperature:", error);
      });

    // weekly_data
    // fetch(`/api/weekly_data?locationName=${mapName}&data_type=10`)
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => {
    //     console.error("Error calling weekly_data:", error);
    //   });
  }
}

taiwanMap.addEventListener("click", function (e) {
  handleMapClick(e.target);
});
