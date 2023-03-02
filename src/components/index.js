import '../style/main.scss';
import { fetchData } from '../data';
import { setAttributes } from '../helper';

function convertKelvin(kelvin) {
	const convertString = parseInt(kelvin);
	const result = convertString - 273.15;

	return result.toFixed(2);
}

export function component() {
	const element = document.createElement('div');
	const elementUl = document.createElement('div');
	const elementContainer = document.createElement('div');
	const elementSearch = document.createElement('div');
	const elementHeader = document.createElement('header');
	const elementFooter = document.createElement('footer');
	const searchBar = document.createElement('input');
	const searchBtn = document.createElement('input');

	setAttributes(elementContainer, {
		class: 'elementContainer',
		id: 'elementContainer'
	});

	setAttributes(elementSearch, {
		class: 'elementContainer__search',
		id: 'elementSearch'
	});

	setAttributes(searchBar, {
		class: 'elementContainer__search--Bar',
		id: 'searchTextBar',
		type: 'text'
	});

	setAttributes(searchBtn, {
		class: 'elementContainer__search--Button',
		id: 'submitButton',
		type: 'submit',
		value: 'search'
	});

	setAttributes(elementHeader, {
		class: 'elementHeader',
		id: 'elementHeader'
	});

	setAttributes(elementFooter, {
		class: 'elementFooter',
		id: 'elementFooter'
	});

	function searchLocation() {
		const selectedTextBox = document.querySelector('#searchTextBar').value;
		const selectedResult = fetchData(selectedTextBox);

		setAttributes(elementUl, {
			class: 'elementContainer__box',
			id: 'weatherContainer'
		});

		selectedResult.then((properties) => {
			const { name, coord, main, weather, wind } = properties;

			elementUl.innerHTML = `
				<div class="elementContainer__box--weatherIcon">
					<img src=" http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="${
				weather[0].description
			} class="elementContainer__box--weatherIcon__icon"/>
				</div>
				<div class="elementContainer__box--weatherStatus">
					<div class="elementContainer__box--weatherStatus__temp">Temperature: ${convertKelvin(
						main.temp
					)}&#8451;</div>
					<div class="elementContainer__box--weatherStatus__desc">Weather Status: ${
						weather[0].description
					}</div>
					<div class="elementContainer__box--weatherStatus__wind">Wind Speed: ${
						wind['speed']
					}</div>
				</div>
				<div class="elementContainer__box--weatherInfo">
					<div class="elementContainer__box--weatherInfo__name">${name}</div>
					<div class="elementContainer__box--weatherInfo__lat">Latitude: ${
						coord['lat']
					}</div>
					<div class="elementContainer__box--weatherInfo__lon">Longtitude: ${
						coord['lon']
					}</div>
				</div>
			`;
		});
	}

	searchBtn.addEventListener('click', searchLocation);

	elementSearch.appendChild(searchBar);
	elementSearch.appendChild(searchBtn);
	elementContainer.appendChild(elementSearch);
	elementContainer.appendChild(elementUl);
	element.appendChild(elementHeader);
	element.appendChild(elementContainer);
	element.appendChild(elementFooter);

	return element;
}

document.body.appendChild(component());
