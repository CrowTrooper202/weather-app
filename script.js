var userFormEl = document.querySelector('#city-form');
// var languageButtonsEl = document.querySelector('#language-buttons');
var nameInputEl = document.querySelector('#cityname');
var WeatherEl = document.querySelector('#weather-container');
var weatherSearchTerm = document.querySelector('#weather-search-term');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = nameInputEl.value.trim();

  if (city) {
    getCityWeather(city);

    WeatherEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a city');
  }
};


// var key = '301252a2716c4ab44bf8bb0c50a5efeb'

var getCityWeather = function (city) {
    var key = '301252a2716c4ab44bf8bb0c50a5efeb'
  var apiUrl = "api.openweathermap.org/data/2.5/forecast?q=" + {nameInputEl} + "&appid=" + {key};

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, city);
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
  
    if (!email) {
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
userFormEl.addEventListener('submit', function(event){
    event.preventDefault

    var city = document.querySelector("#cityname").valu;

    if (city === ''){
        alert("error")
    } else {
        alert("success")
    }

    localStorage.setItem("city", city)
    renderLastCity();
});
