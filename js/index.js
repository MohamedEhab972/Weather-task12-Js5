var icon = document.getElementById("icon");
var search = document.getElementById("search");
var erooor = document.getElementById("Eror");
var myVideo = document.getElementById("myVideo");

var array = [];
async function getData(par) {
  var http = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=aedea5f0fcb1483f8e1202445240806&q=${par}&days=7`
  );
  var data = await http.json();
  array = data;
  console.log(array);
  display();
}
getData("cairo");
async function display() {
  if (array.current.condition.text.toLocaleLowerCase() == "clear") {
    myVideo.setAttribute("src", "image/clear-day.jpg");
  } else if (array.current.condition.text.toLocaleLowerCase() == "sunny") {
    myVideo.setAttribute("src", "image/Sunny-day.jpg");
  } else if (
    array.current.condition.text.toLocaleLowerCase() == "partly cloudy"
  ) {
    myVideo.setAttribute("src", "image/cloudy-day.jpg");
  } else {
    myVideo.setAttribute("src", "image/else-day.jpg");
  }
  try {
    const d = new Date();
    const m = new Date(array.forecast.forecastday[1].date);
    const o = new Date(array.forecast.forecastday[2].date);
    box = `<div id="thisDay" class="col-md-4 p-0 ">
  <div class="box">
    <div
      class="wInfo d-flex justify-content-between text-white my-2 px-3"
    >
      <p id="day" class="m-0">${d.toDateString().split(" ")[0] + "day"}</p>
      <p id="datee" class="m-0">${
        d.toDateString().split(" ")[2] + d.toDateString().split(" ")[1]
      }</p>
    </div>
    <div class="information text-white text-start p-3">
      <p id="location">${array.location.name}</p>
      <h1 id="temp" class="m-0 text-center ">${
        array.current.temp_c
      }<sup>o</sup>C</h1>
      <img
        class="w-25"
        src="${"http:" + array.current.condition.icon}"
        alt=""
      />
      <p id="weatherCondition">${array.current.condition.text}</p>
    </div>
    <div class="airInfo d-flex justify-content-between px-2">
      <div class="info1 text-white d-flex py-2 px-1">
        <i class="fas fa-umbrella mx-1 d-flex align-items-center"></i>
        <p class="m-0">${array.current.wind_mph}</p>
      </div>
      <div class="info1 text-white d-flex py-2 px-1">
        <i class="fas fa-wind mx-1 d-flex align-items-center"></i> 
        <p class="m-0">${array.current.wind_kph}km/h</p>
      </div>
      <div class="info1 text-white d-flex py-2 px-1">
        <i class="far fa-compass mx-1 d-flex align-items-center"></i> 
        <p class="m-0">${array.current.wind_dir}</p>
      </div>
    </div>
  </div>
</div>
<div id="thisDay" class="col-md-4 p-0 ">
            <div class="box h-100 ">
              <div
                class="wInfo1 d-flex justify-content-center text-white py-2 px-3"
              >
                <p id="day" class="m-0 text-center">
                  ${m.toDateString().split(" ")[0] + "day"}
                </p>
              </div>
              <div class="weatherInfo text-white p-2 my-5">
                <img
                  src="${
                    "http:" + array.forecast.forecastday[1].day.condition.icon
                  }"
                  alt=""
                />
                <h3 class="m-0 text-center">
                ${array.forecast.forecastday[1].day.avgtemp_c}<sup>o</sup>C
                </h3>
                <p class="m-0 text-center">
                ${array.forecast.forecastday[1].day.avgtemp_f}<sup>o</sup>F
                </p>
                <P class="my-3" id="weatherCondition"> ${
                  array.forecast.forecastday[1].day.condition.text
                }</P>
              </div>
            </div>
          </div>
          <div id="thisDay" class="col-md-4 p-0 ">
            <div class="box1 h-100 ">
              <div
                class="wInfo2 d-flex justify-content-center text-white py-2 px-3"
              >
                <p id="day" class="m-0 text-center">
                  ${o.toDateString().split(" ")[0] + "day"}
                </p>
              </div>
              <div class="weatherInfo text-white p-2 my-5">
                <img
                  src="${
                    "http:" + array.forecast.forecastday[2].day.condition.icon
                  }"
                  alt=""
                />
                <h3 class="m-0 text-center">
                ${array.forecast.forecastday[2].day.avgtemp_c}<sup>o</sup>C
                </h3>
                <p class="m-0 text-center">
                ${array.forecast.forecastday[2].day.avgtemp_f}<sup>o</sup>F
                </p>
                <P class="my-3" id="weatherCondition"> ${
                  array.forecast.forecastday[2].day.condition.text
                }</P>
              </div>
            </div>
          </div>
`;
    document.getElementById("row").innerHTML = box;
  } catch (error) {}
}

search.addEventListener("input", function () {
  var len = search.value;
  if (len.length >= 3) {
    getData(search.value);
    erooor.classList.add("d-none");
  }
});
var latitude;
var longitude;
var city;
navigator.geolocation.getCurrentPosition(
  function (position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        city = data.city;
        getData(city);
      });
  },
  function (Eroor) {
    erooor.innerHTML = Eroor.message + "..... you can search for any city";
    erooor.classList.remove("d-none");
  }
);
