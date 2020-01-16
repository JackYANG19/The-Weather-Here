let lat, lon, weather, air;

if ('geolocation' in navigator) {
	console.log('geolocation is availble');
	navigator.geolocation.getCurrentPosition(async position => {
		try {
			console.log(position);
			lat = position.coords.latitude.toFixed(2);
			lon = position.coords.longitude.toFixed(2);
			document.getElementById('latitude').textContent = lat.toFixed(2);
			document.getElementById('longitude').textContent = lon.toFixed(2);
			const response = await fetch(`/weather/${lat},${lon}`);
			const json = await response.json();
			console.log(json);
			weather = json.weather.currently;
			air = json.air_quality.results[0].measurements[0];
			document.getElementById('summary').textContent = weather.summary;
			document.getElementById('temperature').textContent = weather.temperature;
			document.getElementById('aq_parameter').textContent = air.parameter;
			document.getElementById('aq_value').textContent = air.value;
			document.getElementById('aq_unit').textContent = air.unit;
			document.getElementById('aq_date').textContent = air.lastUpdated;
		} catch (error) {
			console.log('Something went wrong!')
		}
		const data = {
			lat,
			lon,
			weather,
			air
		}
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}
		const db_response = await fetch('/api', options);
		const db_json = await db_response.json();
		console.log(db_json);
	});
} else {
	console.log('geolocation is not availble');
}