let taiwanMap = document.querySelector(".taiwan-area__container");
let mouseDiv = document.createElement("div");
mouseDiv.className = "taiwan-area__mouse";
taiwanMap.appendChild(mouseDiv);

function handleMapClick(target) {
  let group = target.closest("g");

  if (group || target.classList.contains("taiwan-area__block")) {
    let mapName = group
      ? group.getAttribute("name")
      : target.getAttribute("name");

    let bbox = target.getBoundingClientRect();
    let relX = bbox.x - taiwanMap.getBoundingClientRect().x;
    let relY = bbox.y - taiwanMap.getBoundingClientRect().y;

    mouseDiv.style.left = `${relX}px`;
    mouseDiv.style.top = `${relY}px`;
    mouseDiv.style.display = "block";
    mouseDiv.textContent = mapName;

    document.querySelectorAll(".taiwan-area__block").forEach((path) => {
      path.classList.remove("taiwan-area__block--active");
    });

    if (group) {
      group.classList.add("taiwan-area__block--active");
    } else {
      target.classList.add("taiwan-area__block--active");
    }

    // update scroll-area item status
    document.querySelectorAll(".scroll-area__content-name").forEach((el) => {
      el.classList.remove("active");
      if (el.textContent === mapName) {
        el.classList.add("active");
        el.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    });

    // call temperature
    getData(`/api/temperature?locationName=${mapName}`);

    // call weekly_data_basic
    getWeekData(`/api/weekly_basic_data?location_name=${mapName}`);
  }
}

taiwanMap.addEventListener("click", function (e) {
  handleMapClick(e.target);
});

// initial load
handleMapClick(document.querySelector(".taiwan-area__block[name='臺北市']"));
