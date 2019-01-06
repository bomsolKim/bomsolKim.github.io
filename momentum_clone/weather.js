const weather = document.querySelector(".js-weather");
const API_KEY = "73802ef806505c879618d720993ec62e";
const COORDS = "coords";



function getWeather(lat,lon) {
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)

	.then(function(response){
		return	response.json();
	}).then(function(json){
		const temperature = json.main.temp;
		const place = json.name;
		weather.innerText = `${temperature} @ ${place}`;

	});
}



function saveCoords(coordsOBJ){
	localStorage.setItem(COORDS, JSON.stringify(coordsOBJ));
}

function handleGeoSusses (position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
	  	latitude : latitude,
        longitude: longitude
	};

	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}



function handleGeoError(){
	console.log("cant access geo location");
}

function askForCoords() {
	navigator.geolocation.getCurrentPosition(handleGeoSusses, handleGeoError);
}



function loadcoords() {
	const loadedCords = localStorage.getItem(COORDS);
	if(loadedCords === null ) {
		askForCoords();
	} else {
		const parsedCoords = JSON.parse(loadedCords);
		getWeather(parsedCoords.latitude, parsedCoords.longitude);
	}

}

function init(){

	loadcoords();

}

init();