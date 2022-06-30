const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp_real_val = document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status")
const dataHide = document.querySelector(".middle_layer");
const today = document.getElementById("day");
const today_date = document.getElementById("today_date");
// console.log(process.env.API_KEY)
const getInfo = async(e) => {
    e.preventDefault();
    let cityVal = cityName.value;
    let data;
    try {

        let getData = await fetch(`/api/weather/${cityVal}`)
        let response = await getData.json();
        data = JSON.parse(response);
    } catch (error) {
        console.log(error);
    }

    if (cityVal === "") {
        city_name.innerText = "Please write the name before you search";
        dataHide.classList.add("data_hide");
    } else {
        try {
            const arrData = [data];
            temp_real_val.innerText = arrData[0].main.temp;
            //temp_status.innerText = arrData[0].weather[0].main;
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;

            const tempStatus = arrData[0].weather[0].main;
            if (tempStatus == "Clear") {
                temp_status.innerHTML =
                    "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempStatus == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color: #009ad8;'></i>";
            } else if (tempStatus == "Rainy") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else if (tempStatus == "Mist") {
                temp_status.innerHTML =
                    "<i class='fas fa-smog' style='color: #d4d4d4;'></i>";
            } else if (tempStatus == "Rain") {
                temp_status.innerHTML = " <i class='fas fa-cloud-rain' style='color: #009ad8;'></i>"
            }

            dataHide.classList.remove("data_hide");
        } catch (err) {
            city_name.innerText = "Please enter the city name properly";
            dataHide.classList.add("data_hide");
        }
    }
}
submitBtn.addEventListener("click", getInfo);



const getCurrentDay = () => {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    let currentTime = new Date();
    let day = weekday[currentTime.getDay()];
    today.innerText = day;
}

getCurrentDay();

const getCurrentTime = () => {
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    var now = new Date();
    var month = months[now.getMonth()];
    var date = now.getDate();
    today_date.innerText = `${date} ${month}`;
}
getCurrentTime();