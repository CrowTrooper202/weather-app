var userFormEl = document.querySelector('#city-form');
// var languageButtonsEl = document.querySelector('#language-buttons');
var nameInputEl = document.querySelector('#cityname');
var WeatherEl = document.querySelector('#weather-container');
var weatherSearchTerm = document.querySelector('#weather-search-term');
var key = '26cec7eda3c26c23cb50e92611870d4e'
var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = nameInputEl.value.trim();

  if (city) {
    // getCityWeather(city);
    geoCode(city)
    WeatherEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a city');
  }
};

function geoCode(city) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          getCityWeather(data[0].lat, data[0].lon)
          getCityforecast(data[0].lat, data[0].lon)

        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to weather');
    });
}
// var key = '26cec7eda3c26c23cb50e92611870d4e'

var getCityWeather = function (lat, lon) {
  var key = '26cec7eda3c26c23cb50e92611870d4e'
  var apiLatLon = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`

  fetch(apiLatLon)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          // displayRepos(data, city);
          console.log(data);
          var temp = document.createElement('h3')
          temp.textContent = 'temp: ' + data.main.temp,




            document.getElementById('forecast-container').append(temp)
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to weather');
    });
};



var getCityforecast = function (lat, lon) {
  var key = '26cec7eda3c26c23cb50e92611870d4e'
  var apiLatLon = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`

  fetch(apiLatLon)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          // displayRepos(data, city);
          console.log(data);

          for (let i = 3; i < data.list.length; i=i+8) {
            console.log(data.list[i]);
            var temp = document.createElement('h3')
            temp.textContent = 'temp: ' + data.list[i].main.temp



            document.getElementById('5dayWeather').append(temp)
          }




        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to weather');
    });
};


function renderLastCity() {
  var city = localStorage.getItem("city");

  if (!city) {
    return;
  }

  weatherSearchTerm.textContent = city;
}

var displayweather = function (weather, searchTerm) {
  if (weather.length === 0) {
    repoContainerEl.textContent = 'No Weather found found.';
    return;
  }

  weatherSearchTerm.textContent = searchTerm;

  for (var i = 0; i < weather.length; i++) {
    var repoName = weather[i].owner.login + '/' + weather[i].name;

    var repoEl = document.createElement('div');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
userFormEl.addEventListener('submit', function (event) {
  event.preventDefault

  var city = document.querySelector("#cityname").value;

  // if (city != '') {
  //   alert("error")
  // } 

  localStorage.setItem("city", city)
  renderLastCity();
});
