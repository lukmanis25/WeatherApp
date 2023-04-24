

/* DOM DISPLAY */


//Display error under searchBar and above weather icon
export const displayError = (msg) => {
    document.getElementById("searchBar__error").innerText = msg
    //TODO !!!!!!!!!!
    //add new section in html for information
    //add display error func body
};


//Refresh screen
export const refresh = (weatherObj) => {
    //hide and clear
    toogleDisplay()
    clearDisplay()

    //set bg
    const weatherClass = getWeatherClass(weatherObj["icon"])
    setBGImage(weatherClass)

    //update DOM
    document.getElementById("searchBar__text").value = weatherObj["city"]; //change searchbar value
    updateCurrentForecastContainer(weatherObj)
    updateCurrentForecastMetrics(weatherObj)
    updateWeekForecast(weatherObj)

    //show
    setTimeout(toogleDisplay, 100)

}

const setBGImage = (weatherClass) => {
  document.documentElement.classList.add(weatherClass);
  document.documentElement.classList.forEach((img) => {
    if (img !== weatherClass) document.documentElement.classList.remove(img);
  });
};

const getWeatherClass = (icon) => {
  const firstTwoChars = icon.slice(0, 2);
  const lastChar = icon.slice(2);
  const weatherLookup = {
    "09": "snow",
    10: "rain",
    11: "rain",
    13: "snow",
    50: "fog"
  };
  let weatherClass;
  if (weatherLookup[firstTwoChars]) {
    weatherClass = weatherLookup[firstTwoChars];
  } else if (lastChar === "d") {
    weatherClass = "clouds";
  } else {
    weatherClass = "night";
  }
  return weatherClass;
};

const updateCurrentForecastContainer = (weatherObj) => {
    const currentForecast = document.getElementById("currentForecast");

    const currentForecastContainer = document.createElement("div")
    currentForecastContainer.setAttribute("id", "currentForecast__container")
    currentForecastContainer.classList.add("currentForecast__container")

    const currentForecastImage = document.createElement("div")
    currentForecastImage.setAttribute("id", "currentForecast__image")
    currentForecastImage.classList.add("currentForecast__image")
    currentForecastImage.appendChild(createIconFontAwesome(weatherObj["icon"]))

    const currentForecastTemp = document.createElement("div")
    currentForecastTemp.setAttribute("id", "currentForecast__temp")
    currentForecastTemp.classList.add("currentForecast__temp")
    currentForecastTemp.innerHTML = Math.floor(weatherObj["temp"]) + " <span>&deg;</span>" 

    const currentForecastWeather = document.createElement("div")
    currentForecastWeather.setAttribute("id", "currentForecast__weather")
    currentForecastWeather.classList.add("currentForecast__weather")
    currentForecastWeather.innerText = weatherObj["weatherType"].charAt(0).toUpperCase()
    + weatherObj["weatherType"].slice(1) //upper first letter

    const currentForecastDate = document.createElement("div")
    currentForecastDate.setAttribute("id", "currentForecast__date")
    currentForecastDate.classList.add("currentForecast__date")
    currentForecastDate.innerText = `${weatherObj["city"]} - ${weatherObj["date"]["dayWeekName"]}, ${weatherObj["date"]["day"]} ${weatherObj["date"]["mounth"]}`

    currentForecastContainer.appendChild(currentForecastImage)
    currentForecastContainer.appendChild(currentForecastTemp)
    currentForecastContainer.appendChild(currentForecastWeather)
    currentForecastContainer.appendChild(currentForecastDate)
    currentForecast.appendChild(currentForecastContainer)
}

const updateCurrentForecastMetrics= (weatherObj) => {
    const currentForecast = document.getElementById("currentForecast");

    const currentForecastMetrics = document.createElement("div")
    currentForecastMetrics.setAttribute("id", "currentForecast__metrics")
    currentForecastMetrics.classList.add("currentForecast__metrics")

    const createMetricDiv = (icon, val, metric, name) => {
        const metric1 = document.createElement("div")
        const i1 = document.createElement("i")
        i1.classList.add("fa-solid",  icon);
        const p1_val = document.createElement("p")
        p1_val.innerText = val + metric
        const p1_name = document.createElement("p")
        p1_name.innerText = name
        p1_name.classList.add("metricName")
        metric1.appendChild(i1)
        metric1.appendChild(p1_val)
        metric1.appendChild(p1_name)
        return metric1
    }

    const metric1 = createMetricDiv("fa-wind", weatherObj["wind"], "km/h", "Wind")
    const metric2 = createMetricDiv("fa-droplet", weatherObj["humidity"], "%", "Humidity")
    const metric3 = createMetricDiv("fa-person-arrow-down-to-line", weatherObj["pressure"], "hPa", "Pressure")

    currentForecastMetrics.appendChild(metric1)
    currentForecastMetrics.appendChild(metric2)
    currentForecastMetrics.appendChild(metric3)
    currentForecast.appendChild(currentForecastMetrics)
}

const updateWeekForecast = (weatherObj) => {
    const weekForecast = document.getElementById("weekForecast")
    for(let i = 0; i < 5; i++){
        const weekForecastOneDay = document.createElement("div")
        weekForecastOneDay.classList.add("weekForecast_oneDay")

        const dayAbbrevation = document.createElement("p")
        dayAbbrevation.classList.add("dayAbbrevation")
        dayAbbrevation.innerText = weatherObj["nextFiveDaysWeather"][i.toString()]["dayWeekName"]

        const img = document.createElement("img")
        img.setAttribute("src", `https://openweathermap.org/img/wn/${weatherObj["nextFiveDaysWeather"][i.toString()]["icon"]}.png`)
        img.setAttribute("alt", "weather icon")

        const temp = document.createElement("p")
        temp.classList.add("temp")
        temp.innerHTML = Math.floor(weatherObj["nextFiveDaysWeather"][i.toString()]["temp"]) + "&deg;"

        weekForecastOneDay.appendChild(dayAbbrevation)
        weekForecastOneDay.appendChild(img)
        weekForecastOneDay.appendChild(temp)
        weekForecast.appendChild(weekForecastOneDay)
    }
}

const createIconFontAwesome = (icon) => {
    const i = document.createElement("i");
    const firstTwoChars = icon.slice(0, 2);
    const lastChar = icon.slice(2);
    switch (firstTwoChars) {
      case "01":
        if (lastChar === "d") {
          i.classList.add("far", "fa-sun");
        } else {
          i.classList.add("far", "fa-moon");
        }
        break;
      case "02":
        if (lastChar === "d") {
          i.classList.add("fas", "fa-cloud-sun");
        } else {
          i.classList.add("fas", "fa-cloud-moon");
        }
        break;
      case "03":
        i.classList.add("fas", "fa-cloud");
        break;
      case "04":
        i.classList.add("fas", "fa-cloud-meatball");
        break;
      case "09":
        i.classList.add("fas", "fa-cloud-rain");
        break;
      case "10":
        if (lastChar === "d") {
          i.classList.add("fas", "fa-cloud-sun-rain");
        } else {
          i.classList.add("fas", "fa-cloud-moon-rain");
        }
        break;
      case "11":
        i.classList.add("fas", "fa-poo-storm");
        break;
      case "13":
        i.classList.add("far", "fa-snowflake");
        break;
      case "50":
        i.classList.add("fas", "fa-smog");
        break;
      default:
        i.classList.add("far", "fa-question-circle");
    }
    return i;
};

const toogleDisplay = () => {
    const currentForecast = document.getElementById("currentForecast");
    currentForecast.classList.toggle("zero-vis");
    currentForecast.classList.toggle("fade-in");
    const weekForecast = document.getElementById("weekForecast");
    weekForecast.classList.toggle("zero-vis");
    weekForecast.classList.toggle("fade-in");
}

const clearDisplay = () => {
    document.getElementById("searchBar__error").innerText = ""
    const currentForecast = document.getElementById("currentForecast")
    deleteContents(currentForecast)
    const weekForecast = document.getElementById("weekForecast");
    deleteContents(weekForecast);
}

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while (child) {
      parentElement.removeChild(child);
      child = parentElement.lastElementChild;
    }
};

/* ANIMATIONS */

//Add load animation to element (element next sibling must be animated icon !!!)
export const addLoadAnimation = (element) => {
    animateButton(element);
    setTimeout(animateButton, 1000, element);
};

const animateButton = (element) => {
    element.classList.toggle("none");
    element.nextElementSibling.classList.toggle("block");
    element.nextElementSibling.classList.toggle("none");
};