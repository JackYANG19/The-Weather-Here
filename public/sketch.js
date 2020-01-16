let lat, lon, weather, air;

function setup() {
	noCanvas();
	const latP = select('#latitude');
	const lonP = select('#longitude');
	const button = select('#checkin');
	const summaryP = select('#summary');
	const temperatureP = select('#temperature');
	const aq_parameter = select('#aq_parameter');
	const aq_value = select('#aq_value');
	const aq_unit = select('#aq_unit');
	const aq_date = select('#aq_date');
	if ('geolocation' in navigator) {
		try {
			console.log('geolocation is availble');
			navigator.geolocation.getCurrentPosition(async position => {
				console.log(position);
				lat = position.coords.latitude.toFixed(2);
				lon = position.coords.longitude.toFixed(2);
				latP.html(lat);
				lonP.html(lon);
				const response = await fetch(`/weather/${lat},${lon}`);
				const json = await response.json();
				console.log(json);
				weather = json.weather.currently;
				air = json.air_quality.results[0].measurements[0];
				summaryP.html(weather.summary);
				temperatureP.html(weather.temperature);
				aq_parameter.html(air.parameter);
				aq_value.html(air.value);
				aq_unit.html(air.unit);
				aq_date.html(air.lastUpdated);

			});
		} catch (error) {
			console.log('Something went wrong!')
		}
	} else {
		console.log('geolocation is not availble');
	}

	button.mousePressed(async event => {
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
		const response = await fetch('/api', options);
		const json = await response.json();
		console.log(json);
	});
}