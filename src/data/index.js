const API_KEYS_ID = '30c86d2d694cfe000c55ade37cae3d76';

export async function fetchData(city) {
	try {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEYS_ID}`,
			{ mode: 'cors' }
		);
		const data = await res.json();

		return data;
	} catch (err) {
		console.log(`RESULT ERROR :::${err}`);
	}
}
