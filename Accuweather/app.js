
const weatherApi = {
    key: "bab281d79e5f1e9755a68d754cc313e7",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {
    
    if(event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }

});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`) // units=metric convert api temp in degree
    .then(weather => {
        return weather.json();  // return data in json format so it return on showweatherReport details come from api in json format
    }).then(showWeatherReport);       // pass the fun here to show our data on ui
}

// Show Weather Report
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');// enter city in search box from user we get through it
    city.innerText = `${weather.name}, ${weather.sys.country}`; // weather is our json object in a property sys in which we have country

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`; // temp ka data in main in api

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;
   // floor use for min and ceil for max temp


    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`; // waether array in api at 0 index main property 


    // now me manage date at botom sec


    let date = document.getElementById('date');
    let todayDate = new Date(); // it give me all details day month year time but we need only date month year so we fetch only that using fun
    date.innerText = dateManage(todayDate); //using fun datemange

    // if type change then background also change  like clear cloudy etc
 
   
    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('clear.jpg')"; // background change in body part of section in css
        
    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('cloud.jpg')";
        
    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('cloud.jpg')";
        
    }     else if(weatherType.textContent == 'Rain') {
        
        document.body.style.backgroundImage = "url('rain.jpg')";
        
    } else if(weatherType.textContent == 'Snow') {
        
        document.body.style.backgroundImage = "url('snow.jpg')";
    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('thunderstorm.jpg')";
        
    } 
}

// Date manage
function dateManage(dateArg) { // we pass any argument

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`; // it is return on date manage and automatically inner text change
}