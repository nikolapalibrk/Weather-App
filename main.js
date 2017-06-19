var xml = new XMLHttpRequest();
var searchDiv = document.getElementById('search');
var sendBtn = document.getElementById('sendRequest');
var defaultBtn = document.getElementById('default');
var city;

searchDiv.addEventListener('focus', function() {
    searchDiv.value = "";
    searchDiv.style.color = "black";
    defaultBtn.className = "btn btn-default";
    defaultBtn.innerHTML = "Set as Default";
});

window.addEventListener('load', function() {
    defaultBtn.innerHTML = "Set as Default";
    if (localStorage.defaultCity) {
        city = localStorage.defaultCity;
        xml.open('get', 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&APPID=cd1c4a909ff0e2771c1a0a3d35cf5ac0');
        xml.send();
    }
});

sendBtn.addEventListener('click', function(e) {
    e.preventDefault();
    city = searchDiv.value;
    xml.open('get', 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&APPID=cd1c4a909ff0e2771c1a0a3d35cf5ac0');
    xml.send();
    searchDiv.value = "";
});

xml.addEventListener('readystatechange', function() {
    getData(xml);
})

function getData(xml) {
    if (xml.status === 200 && xml.readyState === 4) {
        var data = xml.responseText;
        var jsonData = JSON.parse(data);
        display(jsonData);
    }
}

function display(json) {
    var table = document.querySelector('tbody tr');
    var text = "";
    text += '<td>' + json.name + '</td>';
    text += '<td>' + json.main.temp.toString() + ' ℃' + '</td>';
    text += '<td>' + json.main.pressure.toString() + ' hPa' + '</td>';
    text += '<td>' + json.main.humidity.toString() + ' %' + '</td>';
    table.innerHTML = text;
}

defaultBtn.addEventListener('click', function() {
    if (searchDiv.value === "") {
        searchDiv.value = "Please enter city name";
        searchDiv.style.color = "red";
    } else {
        localStorage.defaultCity = searchDiv.value.charAt().toUpperCase() + searchDiv.value.slice(1);
        defaultBtn.innerHTML = "Successfully set";
        defaultBtn.className = "btn btn-success"
    }
});
