const mymap = L.map('checkinmap').setView([0, 0], 1); // latitude, longitude, zoom level
const tileUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
const attribution =
	'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const token = 'pk.eyJ1IjoiamFja3lhbmcxOSIsImEiOiJjazU1aXc1YjIwdXNxM2RxaGN4aWhjZmg2In0.QIYCAS3egPb737mMucfpUw';

L.tileLayer(tileUrl, {
	attribution: attribution,
	maxZoom: 18,
	id: 'mapbox/streets-v11',
	accessToken: token
}).addTo(mymap);

getData();

async function getData() {
	const response = await fetch('/api');
	const data = await response.json();
	for (let item of data) {
		console.log(item)
		const marker = L.marker([item.lat, item.lon]).addTo(mymap);
		const txt = `The weather here at ${item.lat}&deg;, ${item.lon}&deg; is
		${item.weather.summary} with a temperature of ${item.weather.temperature}&deg;C.
		The concentration of particulate matter (${item.air.parameter}) is
		${item.air.value}${item.air.unit} last read on ${item.air.lastUpdate}`

		marker.bindPopup(txt);

	}
}